---
title: ・经纬度（草稿）
createTime: 2026-04-19 22:51:21
permalink: /cheat-sheet/universe/space/lat-lon/
---

### 1️⃣ 简介



### 2️⃣ 坐标转换

WGS84

GCJ02

BD09



### 3️⃣ 计算距离

#### 3.1 两点之间的距离

- 通常使用 `geopy.distance.distance` 即可满足要求。
- 更高精度要求可以使用 `pyproj.Geod`（可以指定坐标系）。

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

```python title="计算不同纬度偏移距离" :collapsed-lines
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



#### 3.3 路径规划(todo)



### 4️⃣ 绘图

[Folium](https://python-visualization.github.io/folium/latest/)



