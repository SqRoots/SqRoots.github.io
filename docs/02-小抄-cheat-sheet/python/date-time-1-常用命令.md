---
title: ・常用命令
createTime: 2026/04/05 22:00:00
permalink: /cheat-sheet/python/date-time-formate/
---

## 1️⃣ 安装 arrow

在 Python 中使用 `arrow` 包来处理日期和时间比内建包好用很多，同时也能避遇到诸如 `星期日历表示法` 不一致的问题。

- 安装：`pip install -U arrow`
- 文档：[官方文档](https://arrow.readthedocs.io/en/latest/index.html)


## 2️⃣ 获取当前时间
``` python title="获取当前所在时区的时间（arrow对象）"
# 以下4种方式都可以获取当前北京的时间
local0 = arrow.now()			             # 在东8区运行，默认是local
local1 = arrow.now('local')			         # 在东8区运行，指定local
local2 = arrow.now('Asia/Shanghai')	         # 在东8区运行，指定东8区
local3 = arrow.utcnow() 					 # 在东8区运行，获取UTC时间
local4 = arrow.utcnow().to('Asia/Shanghai')  # 在东8区运行，切换到东8区

# 每种方式得到的时间戳都一样，只是local3和local4的时间和时区表示不同
for i, v in enumerate([local0,local1,local2,local3,local4]): 
    print(i, int(v.timestamp()), v.format())
# ----------------------------------------------------------------------
# 0 1775659832 2026-04-08 22:50:32+08:00
# 1 1775659832 2026-04-08 22:50:32+08:00
# 2 1775659832 2026-04-08 22:50:32+08:00
# 3 1775659832 2026-04-08 14:50:32+00:00
# 4 1775659832 2026-04-08 22:50:32+08:00
```

## 3️⃣ 字符串|时间戳→时间
``` python title="把字符串转化为时间（arrow对象）"
date_time1 = arrow.get('2013-05-11')
date_time2 = arrow.get('2013-05-11 21:23:58')
date_time3 = arrow.get('2013-05-11 21:23:58+08:00')	 # 比date_time2小8*3600秒
date_time4 = arrow.get('2013-05-11T21:23:58.970460+08:00')

date_time5 = arrow.get(1767268800)
```

## 4️⃣ 时间→字符串
``` python title="把时间（arrow对象）转化为字符串"
date_time3.format()                          # '2013-05-11 21:23:58+08:00'
date_time3.format('YYYY-MM-DD HH:mm:ss ZZ')  # '2013-05-11 21:23:58 +08:00'
date_time3.humanize()                        # '12 years ago'
date_time3.humanize(locale='zh-cn')          # '12年前'
```

## 5️⃣ 时间→时间戳
``` python title="把时间（arrow对象）转化为时间戳"
date_time3.timestamp()
```

## 6️⃣ 时间加减
``` python title="加减时间"
date_time3.shift(years=1, months=-2, days=-3,         # 年月日
                 weeks=10,                            # 周
                 hours=100, minutes=200, seconds=300  # 时分秒
                 )
```

## 7️⃣ 月初月末，周初周末
``` python title="月初月末，周初周末"
# 月初，月末
arrow.now().floor('month').format('YYYY-MM-DD')
arrow.now().ceil('month').format('YYYY-MM-DD')

# 周初，周末（周初：周一）
arrow.now().floor('week').format('YYYY-MM-DD')
arrow.now().ceil('week').format('YYYY-MM-DD')

# 周初，周末（周初：周日）
arrow.now().floor('week').shift(days=-1).format('YYYY-MM-DD')
arrow.now().ceil('week').shift(days=-1).format('YYYY-MM-DD')
```

## 8️⃣ 遍历日期

遍历时可以使用的单位（frame）：`year`, `month`, `day`, `hour`, `minute`, `second`, `microsecond`, `week`, `quarter`，也可以在单位后面加上`s`（`years`, `months`, `days`, `hours`, `minutes`, `seconds`, `microseconds`, `weeks`, `quarters`）。

``` python title="range 遍历值"
start = datetime(2013, 5, 5, 12, 30)
end = datetime(2013, 5, 5, 17, 15)
for r in arrow.Arrow.range('hour', start, end):
    print(repr(r))

# 输出：
# <Arrow [2013-05-05T12:30:00+00:00]>
# <Arrow [2013-05-05T13:30:00+00:00]>
# <Arrow [2013-05-05T14:30:00+00:00]>
# <Arrow [2013-05-05T15:30:00+00:00]>
# <Arrow [2013-05-05T16:30:00+00:00]>
```

``` python title="span_range 遍历区间"
start = datetime(2013, 5, 5, 12, 30)
end = datetime(2013, 5, 5, 17, 15)
for r in arrow.Arrow.span_range('hour', start, end):
    print(r)
# 输出：
# (<Arrow [2013-05-05T12:00:00+00:00]>, <Arrow [2013-05-05T12:59:59.999999+00:00]>)
# (<Arrow [2013-05-05T13:00:00+00:00]>, <Arrow [2013-05-05T13:59:59.999999+00:00]>)
# (<Arrow [2013-05-05T14:00:00+00:00]>, <Arrow [2013-05-05T14:59:59.999999+00:00]>)
# (<Arrow [2013-05-05T15:00:00+00:00]>, <Arrow [2013-05-05T15:59:59.999999+00:00]>)
# (<Arrow [2013-05-05T16:00:00+00:00]>, <Arrow [2013-05-05T16:59:59.999999+00:00]>)
# (<Arrow [2013-05-05T17:00:00+00:00]>, <Arrow [2013-05-05T17:59:59.999999+00:00]>)
```


## 附录：每种字母的含义

[Supported Tokens](https://arrow.readthedocs.io/en/latest/guide.html#SupportedTokens)

|                    | Token | Output                                                       |
| ------------------ | ----- | ------------------------------------------------------------ |
| Year               | YYYY  | 2000, 2001, 2002 … 2012, 2013                                |
|                    | YY    | 00, 01, 02 … 12, 13                                          |
| Month              | MMMM  | [January,   February, March … 1](https://arrow.readthedocs.io/en/latest/guide.html#t1) |
|                    | MMM   | [Jan,   Feb, Mar … 1](https://arrow.readthedocs.io/en/latest/guide.html#t1) |
|                    | MM    | 01, 02, 03 … 11, 12                                          |
|                    | M     | 1, 2, 3 … 11, 12                                             |
| Day of Year        | DDDD  | 001, 002, 003 … 364, 365                                     |
|                    | DDD   | 1, 2, 3 … 364, 365                                           |
| Day of Month       | DD    | 01, 02, 03 … 30, 31                                          |
|                    | D     | 1, 2, 3 … 30, 31                                             |
|                    | Do    | 1st, 2nd, 3rd … 30th, 31st                                   |
| Day of Week        | dddd  | [Monday,   Tuesday, Wednesday … 2](https://arrow.readthedocs.io/en/latest/guide.html#t2) |
|                    | ddd   | [Mon,   Tue, Wed … 2](https://arrow.readthedocs.io/en/latest/guide.html#t2) |
|                    | d     | 1, 2, 3 … 6, 7                                               |
| ISO week date      | W     | 2011-W05-4, 2019-W17                                         |
| Hour               | HH    | 00, 01, 02 … 23, 24                                          |
|                    | H     | 0, 1, 2 … 23, 24                                             |
|                    | hh    | 01, 02, 03 … 11, 12                                          |
|                    | h     | 1, 2, 3 … 11, 12                                             |
| AM / PM            | A     | [AM,   PM, am, pm 1](https://arrow.readthedocs.io/en/latest/guide.html#t1) |
|                    | a     | [am,   pm 1](https://arrow.readthedocs.io/en/latest/guide.html#t1) |
| Minute             | mm    | 00, 01, 02 … 58, 59                                          |
|                    | m     | 0, 1, 2 … 58, 59                                             |
| Second             | ss    | 00, 01, 02 … 58, 59                                          |
|                    | s     | 0, 1, 2 … 58, 59                                             |
| Sub-second         | S…    | [0,   02, 003, 000006, 123123123123… 3](https://arrow.readthedocs.io/en/latest/guide.html#t3) |
| Timezone           | ZZZ   | [Asia/Baku,   Europe/Warsaw, GMT … 4](https://arrow.readthedocs.io/en/latest/guide.html#t4) |
|                    | ZZ    | -07:00, -06:00 … +06:00, +07:00, +08, Z                      |
|                    | Z     | -0700, -0600 … +0600, +0700, +08, Z                          |
| Seconds Timestamp  | X     | [1381685817,   1381685817.915482 … 5](https://arrow.readthedocs.io/en/latest/guide.html#t5) |
| ms or µs Timestamp | x     | 1569980330813, 1569980330813221       