---
title: ・经纬度
createTime: 2026-04-19 22:51:21
permalink: /cheat-sheet/universe/space/lat-lon/
---

### 1️⃣ 简介

在地理坐标系中，用经度和纬度两个坐标，确定地球表面上的平面位置，不同使用场景的坐标系有所差异，经纬度的定义大体如下：
- **纬度**：平行于赤道，东西闭合，赤道的纬度是 0°，北半球纬度是正的，北极是 90°，南半球的纬度是负的，南极是 -90°。
- **经度**：垂直于纬度，经过南北两极，不闭合，英国格林尼治天文台的经度是 0°，该天文台以东经度为正、以西经度为负，并且 +180° 与 -180° 这两条经线重叠，约等于国际日期变更线（是一条折线，基本都在太平洋上）。

### 2️⃣ 坐标转换

在国内使用地图经纬度时，常用的坐标系有以下4种。在做坐标转换时，分为两块 `Web Mercator <--> WGS-84` 之间的转换，以及 `WGS-84，GCJ-02，BD-09` 之间的相互转换：
- **Web Mercator**（Web墨卡托投影）是墨卡托投影的一种变体，被Web地图应用业界普遍采纳。几乎所有主要的在线地图提供商都使用这一标准，包括谷歌地图、Mapbox、Bing地图、OpenStreetMap、MapQuest、Esri等等。其正式的EPSG标识符是EPSG:3857。

- **WGS-84**（世界大地测量系统，World Geodetic System, WGS）是使用最广泛的坐标系，也是世界通用的坐标系，GPS设备得到的经纬度就是在WGS84坐标系下的经纬度。通常通过底层接口得到的定位信息都是WGS84坐标系。

- **GCJ-02**（国测局坐标：G-Guojia国家，C-Cehui测绘，J-Ju局），又被称为火星坐标系，是一种基于WGS-84制定的大地测量系统，由中国国测局制定。此坐标系所采用的混淆算法会在经纬度中加入随机的偏移。国家规定，中国大陆所有公开地理数据都需要至少用GCJ-02进行加密，也就是说我们从国内公司的产品中得到的数据，一定是经过了加密的。绝大部分国内互联网地图提供商都是使用GCJ-02坐标系，包括高德地图，谷歌地图中国区等。

- **BD-09**（百度坐标系，Baidu, BD）是百度地图使用的地理坐标系，其在GCJ-02上多增加了一次变换，用来保护用户隐私。从百度产品中得到的坐标都是BD-09坐标系。


```bash title="安装用到的包"
pip install pyproj coord-convert
```


```python title="WGS84, GCJ-02, BD-09 之间互转"
# 注意，输入坐标和输出坐标均是（经度，纬度）
from coord_convert.transform import (
    wgs2gcj,
    gcj2wgs,
    gcj2bd,
    bd2gcj,
    wgs2bd,
    bd2wgs,
)

# ---------- WGS84 <-> GCJ-02 ----------
wgs2gcj(lng, lat)
gcj2wgs(lng, lat)

# ---------- GCJ-02 <-> BD-09 ----------
gcj2bd(lng, lat)
bd2gcj(lng, lat)

# ---------- WGS84 <-> BD-09 ----------
wgs2bd(lng, lat)
bd2wgs(lng, lat)
```

```python title="Web Mercator <-> WGS84"
# 注意，输入坐标和输出坐标均是（经度，纬度）
wgs84_to_web_mercator = Transformer.from_crs( "EPSG:4326", "EPSG:3857", always_xy=True)
web_mercator_to_wgs84 = Transformer.from_crs("EPSG:3857", "EPSG:4326", always_xy=True)

def wgs84_to_web(lng, lat):
    x, y = wgs84_to_web_mercator.transform(lng, lat)
    return x, y

def web_to_wgs84(x, y):
    lng, lat = web_mercator_to_wgs84.transform(x, y)
    return lng, lat
```


### 3️⃣ 计算距离

#### 3.1 两点之间的距离

- 通常使用 `geopy.distance.distance` 即可满足要求。
- 更高精度要求可以使用 `pyproj.Geod`（可以指定坐标系）。

::: tip 注意：不同包中经纬度的顺序不同！
- geopy 常见写法：(lat, lon)
- pyproj 常见写法：(lon, lat)
- shapely.Point(x, y)：通常理解成 (lon, lat)
:::


```python title="计算两点距离（简洁）"
from geopy.distance import distance, geodesic, great_circle

# 新加坡滨海湾金沙
p1 = (1.2834, 103.8607)   # (lat, lon)

# 樟宜机场
p2 = (1.3644, 103.9915)

# 默认
d1 = distance(p1, p2).m

# 更精确，按椭球模型
d2 = geodesic(p1, p2).m

# 更快，按球面近似
d3 = great_circle(p1, p2).m


print(f"distance:     {d1:.2f} 米")
print(f"geodesic:     {d2:.2f} 米")
print(f"great_circle: {d3:.2f} 米")

# 输出：
# distance:     17091.47 米
# geodesic:     17091.47 米
# great_circle: 17104.00 米
```

```python title="计算两点距离（专业）"
from pyproj import Geod

geod = Geod(ellps="WGS84")

lon1, lat1 = 103.8607, 1.2834
lon2, lat2 = 103.9915, 1.3644

az12, az21, distance_m = geod.inv(lon1, lat1, lon2, lat2)

print(f"forward azimuth = {az12:.2f}")
print(f"back azimuth    = {az21:.2f}")
print(f"distance        = {distance_m:.2f} m")

# 输出：
# forward azimuth = 58.40
# back azimuth    = -121.60
# distance        = 17091.47 m
```

#### 3.1 不同纬度偏移 `+0.01°` 的偏移距离

- 同样 `经度+0.01°`，纬度越高，偏移越小（1113米→0米）
- 同样 `纬度+0.01°`，不同纬度，偏移基本相同（1106米→1117米）

| 经度 | 纬度 | `经度+0.01` 后偏移距离（米） | `纬度+0.01` 后偏移距离（米） |
| :--: | :--: | :--------------------------: | :--------------------------: |
|  0   |  0   |           1113.19            |           1105.74            |
|  0   |  5   |           1108.99            |           1105.83            |
|  0   |  10  |           1096.39            |           1106.08            |
|  0   |  15  |           1075.50            |           1106.49            |
|  0   |  20  |           1046.47            |           1107.04            |
|  0   |  25  |           1009.50            |           1107.73            |
|  0   |  30  |            964.86            |           1108.53            |
|  0   |  35  |            912.88            |           1109.41            |
|  0   |  40  |            853.94            |           1110.35            |
|  0   |  45  |            788.47            |           1111.32            |
|  0   |  50  |            716.96            |           1112.29            |
|  0   |  55  |            639.94            |           1113.24            |
|  0   |  60  |            558.00            |           1114.12            |
|  0   |  65  |            471.76            |           1114.93            |
|  0   |  70  |            381.87            |           1115.62            |
|  0   |  75  |            289.02            |           1116.18            |
|  0   |  80  |            193.93            |           1116.60            |
|  0   |  85  |            97.35             |           1116.85            |
|  0   |  86  |            77.91             |           1116.88            |
|  0   |  87  |            58.46             |           1116.91            |
|  0   |  88  |            38.98             |           1116.93            |
|  0   |  89  |            19.49             |           1116.94            |

```python title="计算不同纬度偏移距离" :collapsed-lines=1
from pyproj import Geod
import numpy as np

rs = []
geod = Geod(ellps="WGS84")
lat = np.arange(0,90,1)
lon = 0 * np.arange(0,90,1)

for lon, lat in zip(lon,lat): 
    az12, az21, distance_m1 = geod.inv(lon, lat, lon + 0.01, lat)
    az12, az21, distance_m2 = geod.inv(lon, lat, lon, lat + 0.01)
    r = [lon, lat, distance_m1, distance_m2]
    print(f'{r[0]:.0f}\t{r[1]:.0f}\t{r[2]:.2f}\t{r[3]:.2f}')
    rs.append(r)
```


### 4️⃣ 绘图

在 Python 中绘制可交互的地图，并需要导出 HTML 文件，使用 [Folium](https://python-visualization.github.io/folium/latest/) 是个不错的选择，注意使用 `WGS84` 坐标系。

```python title="示例：在地图上标记3家门店"
import folium
from folium.plugins import MarkerCluster

stores = [
    {"name": "门店A", "lat": 31.2304, "lon": 121.4737, "sales": 120},
    {"name": "门店B", "lat": 31.2200, "lon": 121.4600, "sales": 80},
    {"name": "门店C", "lat": 31.2500, "lon": 121.4900, "sales": 300},
]

m = folium.Map(location=[31.2304, 121.4737], zoom_start=12)
cluster = MarkerCluster().add_to(m)

for s in stores:
    color = "green" if s["sales"] >= 200 else "blue" if s["sales"] >= 100 else "orange"
    html = f"""
    <b>{s['name']}</b><br>
    销量: {s['sales']}
    """
    folium.Marker(
        location=[s["lat"], s["lon"]],
        popup=html,
        icon=folium.Icon(color=color)
    ).add_to(cluster)

folium.LayerControl().add_to(m)

m # 展示
# m.save("store_map.html") # 保存
```



