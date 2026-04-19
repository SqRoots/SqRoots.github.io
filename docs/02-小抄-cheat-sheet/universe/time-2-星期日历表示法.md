---
title: ・星期日历表示法
createTime: 2026/04/05 22:00:00
permalink: /cheat-sheet/universe/time/calendar/
---

## 1️⃣ 什么是星期日历表示法

格式：`年份-W当年第几周-当周星期几`。例如`1926年8月17日`可写成`1926-W33-2`或`1926W332`。

使用年份和星期表示某一日期的格式形如`YYYYWwwD`或`YYYY-Www-D`，YYYY表示年份，其值与年月日格式中的年份略有差别；Www表示该日期所属星期是今年的第几个星期，范围在W01到W53之间；D表示该日是本星期的第几天，范围在1到7之间，**每个星期以周一作为第1天**。

每年的第一个星期可以用如下方法决定（以下四种方法等价）：
- 本年度第一个星期四所在的星期；
- 1月4日所在的星期；
- 本年度第一个至少有4天在同一星期内的星期；
- 星期一在去年12月29日至今年1月4日以内的星期。
推理可得，如果1月1日是星期一、星期二、星期三或者星期四，它所在星期就是本年第一个星期；如果1月1日是星期五、星期六或星期日，则它所在星期就是上一年第52或者53个日历星期；12月28日总是在一年最后一个星期。

[ISO 8601](https://zh.wikipedia.org/wiki/ISO_8601)


## 2️⃣ 测试结论

测试以下4种包的星期日历表示法是否一致 `arrow`, `pandas`, `datetime`, `time`，结论：
- 正常的：arrow, pandas, datetime
- 不同的：time（出现了W00，默认周日=0）

## 3️⃣ 测试过程

表：输出结果（df）

|      | date       | arrow      | pandas     | datetime   | time（不同） |
| ---: | :--------- | :--------- | :--------- | :--------- | :----------- |
|    0 | 2025-12-27 | 2025-W52-6 | 2025-W52-6 | 2025-W52-6 | 2025-W51-6   |
|    1 | 2025-12-28 | 2025-W52-7 | 2025-W52-7 | 2025-W52-7 | 2025-W51-0   |
|    2 | 2025-12-29 | 2026-W01-1 | 2026-W01-1 | 2026-W01-1 | 2025-W52-1   |
|    3 | 2025-12-30 | 2026-W01-2 | 2026-W01-2 | 2026-W01-2 | 2025-W52-2   |
|    4 | 2025-12-31 | 2026-W01-3 | 2026-W01-3 | 2026-W01-3 | 2025-W52-3   |
|    5 | 2026-01-01 | 2026-W01-4 | 2026-W01-4 | 2026-W01-4 | 2026-W00-4   |
|    6 | 2026-01-02 | 2026-W01-5 | 2026-W01-5 | 2026-W01-5 | 2026-W00-5   |
|    7 | 2026-01-03 | 2026-W01-6 | 2026-W01-6 | 2026-W01-6 | 2026-W00-6   |
|    8 | 2026-01-04 | 2026-W01-7 | 2026-W01-7 | 2026-W01-7 | 2026-W00-0   |
|    9 | 2026-01-05 | 2026-W02-1 | 2026-W02-1 | 2026-W02-1 | 2026-W01-1   |
|   10 | 2026-01-06 | 2026-W02-2 | 2026-W02-2 | 2026-W02-2 | 2026-W01-2   |

测试代码：

``` python title="测试不同包的结果是否一致"
import time
import datetime
import arrow
import pandas as pd
from dateutil import tz

d1 = arrow.get('2025-12-27')
d2 = d1.shift(days=+10)
df = []
for d in arrow.Arrow.range('day', d1, d2):
    
    # dstr = d.format('YYYY-MM-DD HH:mm:ss ZZ')
    dstr = d.format('YYYY-MM-DD')
    
    # arrow
    # https://arrow.readthedocs.io/en/latest/index.html
    # arrow.get('2013-05-11T21:23:58.970460+07:00')
    dx = arrow.get(dstr)
    year, week, week_day = dx.isocalendar()
    iso_calendar_arrow = f'{year}-W{week:02.0f}-{week_day}'

    # pandas
    dx = pd.Timestamp(dstr)
    year, week, week_day = dx.isocalendar()
    iso_calendar_pd = f'{year}-W{week:02.0f}-{week_day}'

    # datetime
    # https://docs.python.org/zh-tw/3.5/library/datetime.html
    dx = datetime.datetime.fromisoformat(dstr)
    year, week, week_day = dx.isocalendar()
    iso_calendar_datetime =f'{year}-W{week:02.0f}-{week_day}'
    
    # time
    dx = time.strptime(dstr, '%Y-%m-%d')
    iso_calendar_time = time.strftime("%Y-W%W-%w", dx)

                            
    df.append(
        {
            'date': dstr,
            'arrow': iso_calendar_arrow, 
            'pandas': iso_calendar_pd, 
            'datetime': iso_calendar_datetime,
            'time': iso_calendar_time, 
        }
    )

df = pd.DataFrame(df) 
df
```
