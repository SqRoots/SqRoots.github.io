(function loadBaiduMap() {
  const ak = String(window.BAIDU_MAP_AK || "").trim();
  const mapElement = document.getElementById("map");

  function showError(title, detail) {
    mapElement.innerHTML = `<div class="map-load-error"><strong>${title}</strong><span>${detail}</span></div>`;
  }

  if (!ak) {
    showError("请配置百度地图 AK", "在 web/config.js 中填入浏览器端 AK 后刷新页面。");
    return;
  }

  const callbackName = `initBaiduMap_${Date.now()}`;
  const script = document.createElement("script");
  let timeoutId;

  window[callbackName] = function () {
    clearTimeout(timeoutId);
    delete window[callbackName];
    const appScript = document.createElement("script");
    appScript.src = "./app.js?v=20260621-4";
    document.body.appendChild(appScript);
  };

  script.src = `https://api.map.baidu.com/api?v=1.0&type=webgl&ak=${encodeURIComponent(ak)}&callback=${callbackName}`;
  script.async = true;
  script.onerror = function () {
    clearTimeout(timeoutId);
    showError("百度地图加载失败", "请检查网络、AK 和 Referer 白名单配置。");
  };
  timeoutId = setTimeout(() => {
    showError("百度地图加载超时", "请检查 AK、Referer 白名单或网络连接。");
  }, 12000);
  document.head.appendChild(script);
})();
