---
title: ・时区
createTime: 2026/04/05 22:00:00
permalink: /cheat-sheet/python/date-time-timezone/
---


::: tip 重要结论
- **时间戳是绝对时间，与时区无关，同一时刻在地球上任意地点生成的时间戳都是一样的。**
- **本地时间只是在显示时加上了时区偏移。**
:::


## 1️⃣ 时间戳是什么

* **时间戳（Timestamp）**通常是指自某个固定时间点（**纪元 epoch**）起经过的秒数或毫秒数。
* 在大多数系统中：

  * Unix 时间戳以 **1970-01-01 00:00:00 UTC** 为纪元。
  * 例如：

    * `0` → UTC 时间 `1970-01-01 00:00:00`
    * `1767268800` → UTC 时间 `2026-01-01 12:00:00`

**关键点**：时间戳本身是**绝对的时间点**，与时区无关。


## 2️⃣ 时区是什么

* **时区（Time Zone）**是相对于 UTC 的偏移。
* 常见偏移：
  * 北京时间（CST, 中国标准时间） → UTC+8
  * 纽约时间（EST/EDT） → UTC-5 或 UTC-4（夏令时）
* 时区决定了**时间的显示方式**，而不是时间本身。


## 3️⃣ 时间戳与本地时间的转换

公式：

$$
\text{本地时间} = \text{UTC时间} + \text{时区偏移}
$$

* **UTC 时间** = 时间戳 → 转换为格林威治标准时间。
* **本地时间** = UTC 时间 + 时区偏移。

**例子**：

| 时间戳     | UTC 时间            | 北京时间（UTC+8）   |
| ---------- | ------------------- | ------------------- |
| 1767268800 | 2026-01-01 12:00:00 | 2026-01-01 20:00:00 |


## 4️⃣ 常见误区

1. **时间戳不是“本地时间”**

   * 时间戳永远代表 UTC 时间点。
   * 本地时间只是显示的偏移。

2. **存储数据时建议使用 UTC**

   * 避免夏令时、跨时区转换等问题。
   * 显示给用户时再转换到对应时区。

3. **时区变化不影响时间戳**

   * 比如从 UTC+8 切换到 UTC+5，本地显示时间会改变，但时间戳不变。


## 5️⃣ 程序示例（Python）

```python
dt1 = arrow.now('local')           # 本地时间
dt2 = arrow.now('Asia/Shanghai')   # 上海时间
dt3 = arrow.now('+02:00')          # UTC+02时间
dt4 = arrow.utcnow()               # UTC时间
dt5 = dt4.to('Asia/Shanghai')      # 切换时区到上海时间
dt = [dt1, dt2, dt3, dt4, dt5]

for i, d in enumerate(dt): 
    print(i+1, ' ',int(d.timestamp()),' ', d.format('YYYY-MM-DD HH:mm:ss ZZ'))

# 输出：
# 1   1776523902   2026-04-18 22:51:42 +08:00
# 2   1776523902   2026-04-18 22:51:42 +08:00
# 3   1776523902   2026-04-18 16:51:42 +02:00
# 4   1776523902   2026-04-18 14:51:42 +00:00
# 5   1776523902   2026-04-18 22:51:42 +08:00
```

## 6️⃣ 常用时区

- 中国、日韩、东南亚、印度、中东、俄罗斯等**没有夏令时**；
- IANA 时区框架会自动根据当地法规切换冬 / 夏令时，业务开发**优先用 IANA 名称**，不要写死 UTC 偏移。
- 完整时区名称列表：[List of tz database time zones](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)

开发常用时区表（UTC = GMT）：

| 地区     | 标准时 (冬)    | 夏令时 (夏)    | 常用 IANA           |
| -------- | -------------- | -------------- | ------------------- |
| 北京时间 | UTC+08:00 CST  | 无             | Asia/Shanghai       |
| 纽约     | UTC−05:00 EST  | UTC−04:00 EDT  | America/New_York    |
| 洛杉矶   | UTC−08:00 PST  | UTC−07:00 PDT  | America/Los_Angeles |
| 德 / 法  | UTC+01:00 CET  | UTC+02:00 CEST | Europe/Berlin       |
| 伦敦     | UTC±00:00 GMT  | UTC+01:00 BST  | Europe/London       |
| 悉尼     | UTC+10:00 AEST | UTC+11:00 AEDT | Australia/Sydney    |
| 东京     | UTC+09:00 JST  | 无             | Asia/Tokyo          |


每个时区的代表性时区：

| UTC 偏移  | 标准时（缩写｜IANA 时区）                          | 夏令时（缩写｜IANA 时区）                           |
| --------- | -------------------------------------------------- | --------------------------------------------------- |
| UTC−12:00 | BIT｜Etc/GMT+12                                    | 无                                                  |
| UTC−11:00 | SST｜Pacific/Pago_Pago                             | 无                                                  |
| UTC−10:00 | HAT｜Pacific/Honolulu                              | 无                                                  |
| UTC−09:00 | AKST｜America/Anchorage                            | AKDT｜America/Anchorage                             |
| UTC−08:00 | PST｜America/Los_Angeles, America/Vancouver        | PDT｜America/Los_Angeles, America/Vancouver         |
| UTC−07:00 | MST｜America/Denver, America/Phoenix               | MDT｜America/Denver                                 |
| UTC−06:00 | CST｜America/Chicago, America/Mexico_City          | CDT｜America/Chicago, America/Mexico_City           |
| UTC−05:00 | EST｜America/New_York, America/Toronto             | EDT｜America/New_York, America/Toronto              |
| UTC−04:00 | AST｜America/Santiago                              | 无                                                  |
| UTC−03:00 | BRT｜America/Sao_Paulo, America/Buenos_Aires       | 无                                                  |
| UTC−02:00 | FNT｜Atlantic/South_Georgia                        | 无                                                  |
| UTC−01:00 | WET-1｜Atlantic/Azores                             | 无                                                  |
| UTC±00:00 | GMT/UTC｜Etc/UTC, Europe/London                    | BST｜Europe/London                                  |
| UTC+01:00 | CET｜Europe/Paris, Europe/Berlin, Europe/Rome      | CEST｜Europe/Paris, Europe/Berlin, Europe/Rome      |
| UTC+02:00 | EET｜Europe/Athens, Africa/Cairo, Europe/Bucharest | EEST｜Europe/Athens, Africa/Cairo, Europe/Bucharest |
| UTC+03:00 | MSK｜Europe/Moscow, Asia/Riyadh                    | 无                                                  |
| UTC+03:30 | IRST｜Asia/Tehran                                  | 无                                                  |
| UTC+04:00 | GST｜Asia/Dubai, Asia/Baku                         | 无                                                  |
| UTC+04:30 | AFT｜Asia/Kabul                                    | 无                                                  |
| UTC+05:00 | PKT｜Asia/Karachi, Asia/Tashkent                   | 无                                                  |
| UTC+05:30 | IST｜Asia/Kolkata, Asia/Colombo                    | 无                                                  |
| UTC+05:45 | NPT｜Asia/Kathmandu                                | 无                                                  |
| UTC+06:00 | BST｜Asia/Dhaka                                    | 无                                                  |
| UTC+06:30 | MMT｜Asia/Yangon                                   | 无                                                  |
| UTC+07:00 | ICT｜Asia/Bangkok, Asia/Jakarta, Asia/Ho_Chi_Minh  | 无                                                  |
| UTC+08:00 | CST｜Asia/Shanghai, Asia/Taipei, Asia/Singapore    | 无                                                  |
| UTC+09:00 | JST/KST｜Asia/Tokyo, Asia/Seoul                    | 无                                                  |
| UTC+09:30 | ACST｜Australia/Adelaide                           | ACDT｜Australia/Adelaide                            |
| UTC+10:00 | AEST｜Australia/Sydney, Australia/Melbourne        | AEDT｜Australia/Sydney, Australia/Melbourne         |
| UTC+11:00 | VUT｜Pacific/Noumea                                | 无                                                  |
| UTC+12:00 | NZST｜Pacific/Auckland, Pacific/Fiji               | NZDT｜Pacific/Auckland                              |
| UTC+14:00 | LINT｜Pacific/Kiritimati                           | 无                                                  |