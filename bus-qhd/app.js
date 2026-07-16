const COLORS = ["#1769e0", "#ef5b55", "#16a47a", "#8b5cf6", "#f59e0b", "#0ea5b7", "#e74694", "#65758b", "#84a71e", "#d35f18", "#5b74d6", "#00a0c7"];
const state = { data: null, selected: new Set(), routeColors: new Map(), activeStation: null, direction: 0, layers: new Map(), stationHighlight: null, scalableCircles: [] };

const map = new BMapGL.Map("map", { enableMapClick: false });
map.centerAndZoom(toBaiduPoint(119.58, 39.93), 11);
map.enableScrollWheelZoom(true);
map.addControl(new BMapGL.ZoomControl({ anchor: BMAP_ANCHOR_BOTTOM_RIGHT }));
map.addEventListener("zoomend", updateCircleSizes);

const byId = id => document.getElementById(id);
const routeList = byId("route-list");
const stationList = byId("station-list");

fetch("./bus-data.json")
  .then(response => response.json())
  .then(data => {
    state.data = data;
    byId("data-summary").textContent = `${routeGroups().length} 条线路 · ${uniqueStations().length} 个站点`;
    renderRoutes();
    renderStations();
  })
  .catch(() => {
    byId("data-summary").textContent = "数据加载失败，请使用本地服务器打开";
  });

function uniqueStations() {
  const stations = new Map();
  state.data.lines.forEach(line => line.stations.forEach(station => {
    if (!stations.has(station.name)) stations.set(station.name, { name: station.name, routeNames: new Set() });
    stations.get(station.name).routeNames.add(line.name);
  }));
  return [...stations.values()].sort((a, b) => b.routeNames.size - a.routeNames.size || a.name.localeCompare(b.name, "zh-CN"));
}

function routeGroups() {
  const groups = new Map();
  state.data.lines.forEach(line => {
    if (!groups.has(line.name)) groups.set(line.name, { name: line.name, directions: [] });
    groups.get(line.name).directions.push(line);
  });
  return [...groups.values()];
}

function lineForDirection(group) {
  return group.directions[state.direction] || group.directions[0];
}

function colorFor(routeName) {
  if (!state.routeColors.has(routeName)) state.routeColors.set(routeName, COLORS[state.routeColors.size % COLORS.length]);
  return state.routeColors.get(routeName);
}

function renderRoutes() {
  const query = byId("route-search").value.trim().toLowerCase();
  const groups = routeGroups().filter(group => group.directions.some(line => `${line.full_name} ${line.origin} ${line.destination}`.toLowerCase().includes(query)));
  byId("route-result-count").textContent = `${groups.length} 条`;
  routeList.innerHTML = groups.map(group => {
    const line = lineForDirection(group);
    const selected = state.selected.has(group.name);
    return `<button class="route-row ${selected ? "selected" : ""}" data-route-name="${escapeHtml(group.name)}">
      <span class="route-swatch" style="background:${selected ? colorFor(group.name) : "#b9c5d2"}"></span>
      <span class="route-main"><span class="route-name">${escapeHtml(group.name)}</span><span class="route-meta">${escapeHtml(line.origin)} → ${escapeHtml(line.destination)} · ${line.station_count}站</span></span>
      <span class="check"></span>
    </button>`;
  }).join("") || `<div class="no-results">没有找到匹配线路</div>`;
}

function renderStations() {
  const query = byId("station-search").value.trim().toLowerCase();
  let stations = uniqueStations();
  if (query) stations = stations.filter(station => station.name.toLowerCase().includes(query));
  else stations = stations.slice(0, 80);
  stationList.innerHTML = stations.map(station => `<button class="station-row ${state.activeStation === station.name ? "active" : ""}" data-station="${escapeHtml(station.name)}">
    <span class="station-name">${escapeHtml(station.name)}</span><span class="station-count">${station.routeNames.size} 条线路</span>
  </button>`).join("") || `<div class="no-results">没有找到匹配站点</div>`;
}

function toggleRoute(routeName) {
  if (state.selected.has(routeName)) state.selected.delete(routeName); else state.selected.add(routeName);
  state.activeStation = null;
  sync();
}

function selectStation(name) {
  state.activeStation = name;
  state.selected.clear();
  state.data.lines.forEach(line => {
    if (line.stations.some(station => station.name === name)) state.selected.add(line.name);
  });
  byId("station-hint").textContent = `“${name}”共有 ${state.selected.size} 条途经线路，已全部展示。`;
  sync();
}

function sync() {
  renderRoutes();
  renderStations();
  drawSelected();
  byId("selected-count").textContent = state.selected.size;
  byId("empty-map").classList.toggle("hidden", state.selected.size > 0);
  byId("map-title").textContent = state.activeStation ? `途经“${state.activeStation}”的线路` : state.selected.size ? `已展示 ${state.selected.size} 条线路` : "选择公交线路开始查看";
  byId("map-subtitle").textContent = state.selected.size ? "点击地图中的站点可查看站名" : "每条线路将使用不同颜色展示";
}

function drawSelected() {
  state.layers.forEach(overlays => overlays.forEach(overlay => map.removeOverlay(overlay)));
  state.layers.clear();
  state.scalableCircles = [];
  if (state.stationHighlight) {
    state.stationHighlight.forEach(overlay => map.removeOverlay(overlay));
    state.stationHighlight = null;
  }
  const bounds = [];
  const legendItems = [];
  routeGroups().filter(routeGroup => state.selected.has(routeGroup.name)).forEach(routeGroup => {
    const line = lineForDirection(routeGroup);
    const color = colorFor(routeGroup.name);
    const points = line.stations.filter(s => s.lat && s.lng).map(s => toBaiduPoint(s.lng, s.lat));
    if (points.length < 2) return;
    const overlays = [];
    const outline = new BMapGL.Polyline(points, { strokeColor: "#fff", strokeWeight: 8, strokeOpacity: .9 });
    const routeLine = new BMapGL.Polyline(points, { strokeColor: color, strokeWeight: 4, strokeOpacity: .9 });
    [outline, routeLine].forEach(overlay => { map.addOverlay(overlay); overlays.push(overlay); });
    line.stations.filter(s => s.lat && s.lng).forEach((station, index) => {
      const point = toBaiduPoint(station.lng, station.lat);
      const isTerminus = index === 0 || index === line.stations.length - 1;
      const baseRadius = isTerminus ? 8 : 5;
      const marker = new BMapGL.Circle(point, visibleCircleRadius(point, baseRadius, isTerminus ? 5 : 4), {
        strokeColor: color, strokeWeight: 2, strokeOpacity: 1, fillColor: "#fff", fillOpacity: 1
      });
      state.scalableCircles.push({ overlay: marker, point, baseRadius, minPixels: isTerminus ? 5 : 4 });
      marker.addEventListener("click", () => {
        const content = `<strong>${escapeHtml(station.name)}</strong><br>${escapeHtml(line.full_name)}<br>第 ${station.sequence} 站`;
        map.openInfoWindow(new BMapGL.InfoWindow(content, { title: "公交站点" }), point);
      });
      map.addOverlay(marker);
      overlays.push(marker);
    });
    state.layers.set(line.name, overlays);
    bounds.push(...points);
    legendItems.push(`<div class="legend-item"><span class="legend-line" style="background:${color}"></span><span class="legend-text">${escapeHtml(line.full_name)}</span></div>`);
  });
  drawActiveStationHighlight();
  byId("legend").innerHTML = legendItems.join("");
  byId("legend").classList.toggle("visible", legendItems.length > 0);
  if (bounds.length) map.setViewport(bounds, { margins: [55, 55, 55, 55], enableAnimation: true, zoomFactor: -1 });
}

function drawActiveStationHighlight() {
  if (!state.activeStation) return;

  const coordinates = new Map();
  state.data.lines.forEach(line => line.stations.forEach(station => {
    if (station.name !== state.activeStation || !station.lat || !station.lng) return;
    coordinates.set(`${station.lat.toFixed(5)},${station.lng.toFixed(5)}`, toBaiduPoint(station.lng, station.lat));
  }));

  const overlays = [];
  coordinates.forEach(point => {
    const halo = new BMapGL.Circle(point, visibleCircleRadius(point, 24, 12), { strokeColor: "#fff", strokeWeight: 4, strokeOpacity: 1, fillColor: "#ffb000", fillOpacity: .38 });
    const dot = new BMapGL.Circle(point, visibleCircleRadius(point, 12, 7), { strokeColor: "#8a4b00", strokeWeight: 3, strokeOpacity: 1, fillColor: "#ffd54a", fillOpacity: 1 });
    state.scalableCircles.push(
      { overlay: halo, point, baseRadius: 24, minPixels: 12 },
      { overlay: dot, point, baseRadius: 12, minPixels: 7 }
    );
    const label = new BMapGL.Label(`<span class="active-station-label">${escapeHtml(state.activeStation)}</span>`, { position: point, offset: new BMapGL.Size(-35, -42) });
    label.setStyle({ border: "0", background: "transparent" });
    dot.addEventListener("click", () => map.openInfoWindow(new BMapGL.InfoWindow(`<strong>${escapeHtml(state.activeStation)}</strong><br>当前筛选站点`), point));
    [halo, dot, label].forEach(overlay => { map.addOverlay(overlay); overlays.push(overlay); });
  });
  state.stationHighlight = overlays;
}

function visibleCircleRadius(point, baseRadius, minPixels) {
  const metersPerPixel = 156543.03392 * Math.cos(point.lat * Math.PI / 180) / Math.pow(2, map.getZoom());
  return Math.max(baseRadius, minPixels * metersPerPixel);
}

function updateCircleSizes() {
  state.scalableCircles.forEach(circle => {
    circle.overlay.setRadius(visibleCircleRadius(circle.point, circle.baseRadius, circle.minPixels));
  });
}

routeList.addEventListener("click", event => {
  const row = event.target.closest(".route-row");
  if (row) toggleRoute(row.dataset.routeName);
});
stationList.addEventListener("click", event => {
  const row = event.target.closest(".station-row");
  if (row) selectStation(row.dataset.station);
});
byId("route-search").addEventListener("input", renderRoutes);
byId("station-search").addEventListener("input", renderStations);
byId("clear-all").addEventListener("click", () => { state.selected.clear(); state.activeStation = null; byId("station-hint").textContent = "选择站点后，将展示所有经过该站的线路。"; sync(); });
byId("fit-map").addEventListener("click", drawSelected);
document.querySelectorAll(".direction-button").forEach(button => button.addEventListener("click", () => {
  state.direction = Number(button.dataset.direction);
  document.querySelectorAll(".direction-button").forEach(item => {
    const active = item === button;
    item.classList.toggle("active", active);
    item.setAttribute("aria-pressed", String(active));
  });
  renderRoutes();
  if (state.selected.size) drawSelected();
}));
document.querySelectorAll(".tab").forEach(tab => tab.addEventListener("click", () => {
  document.querySelectorAll(".tab").forEach(item => item.classList.toggle("active", item === tab));
  document.querySelectorAll(".panel").forEach(panel => panel.classList.toggle("active", panel.id === `${tab.dataset.tab}-panel`));
}));

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#039;" })[character]);
}

// bus-data.json stores WGS-84 coordinates for the former OSM map.
// Baidu Maps uses BD-09, so convert every station before drawing it.
function toBaiduPoint(wgsLng, wgsLat) {
  const [gcjLng, gcjLat] = wgs84ToGcj02(wgsLng, wgsLat);
  const x = gcjLng;
  const y = gcjLat;
  const z = Math.sqrt(x * x + y * y) + 0.00002 * Math.sin(y * Math.PI * 3000 / 180);
  const theta = Math.atan2(y, x) + 0.000003 * Math.cos(x * Math.PI * 3000 / 180);
  return new BMapGL.Point(
    z * Math.cos(theta) + 0.0065,
    z * Math.sin(theta) + 0.006
  );
}

function wgs84ToGcj02(lng, lat) {
  if (lng < 72.004 || lng > 137.8347 || lat < 0.8293 || lat > 55.8271) return [lng, lat];
  let dLat = transformLatitude(lng - 105, lat - 35);
  let dLng = transformLongitude(lng - 105, lat - 35);
  const radLat = lat / 180 * Math.PI;
  let magic = Math.sin(radLat);
  magic = 1 - 0.006693421622965943 * magic * magic;
  const sqrtMagic = Math.sqrt(magic);
  dLat = dLat * 180 / ((6335552.717000426 / (magic * sqrtMagic)) * Math.PI);
  dLng = dLng * 180 / ((6378245 / sqrtMagic * Math.cos(radLat)) * Math.PI);
  return [lng + dLng, lat + dLat];
}

function transformLatitude(x, y) {
  let value = -100 + 2 * x + 3 * y + 0.2 * y * y + 0.1 * x * y + 0.2 * Math.sqrt(Math.abs(x));
  value += (20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2 / 3;
  value += (20 * Math.sin(y * Math.PI) + 40 * Math.sin(y / 3 * Math.PI)) * 2 / 3;
  return value + (160 * Math.sin(y / 12 * Math.PI) + 320 * Math.sin(y * Math.PI / 30)) * 2 / 3;
}

function transformLongitude(x, y) {
  let value = 300 + x + 2 * y + 0.1 * x * x + 0.1 * x * y + 0.1 * Math.sqrt(Math.abs(x));
  value += (20 * Math.sin(6 * x * Math.PI) + 20 * Math.sin(2 * x * Math.PI)) * 2 / 3;
  value += (20 * Math.sin(x * Math.PI) + 40 * Math.sin(x / 3 * Math.PI)) * 2 / 3;
  return value + (150 * Math.sin(x / 12 * Math.PI) + 300 * Math.sin(x / 30 * Math.PI)) * 2 / 3;
}
