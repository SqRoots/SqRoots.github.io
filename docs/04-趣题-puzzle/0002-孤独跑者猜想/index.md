---
title: 孤独跑者猜想
createTime: 2026-05-10 09:38:31
permalink: /puzzle/0002/
tags: 
  - 数论
  - 未解决
  - AI辅助撰写
---

::: tip 问题
若 $N$ 名跑者从同一点出发，在周长为 $1$ 的圆形跑道上以两两不同的恒定速度一直跑下去，那么每一名跑者是否都会在某个时刻变得“孤独”：他与其他所有跑者沿圆周的距离都至少为 $1/N$？
:::

<!-- more -->

这个问题叫 **孤独跑者猜想**（Lonely Runner Conjecture, LRC）。它的表述很像一个脑筋急转弯，但本质上是一个关于**丢番图逼近**、**组合数论**和**离散几何**的公开难题。

截至 2026-05-10，通用情形仍未解决。最新进展是：已有预印本给出计算机辅助证明，声称猜想对 **13 名跑者以内**成立。

## 一、什么叫“孤独”

先把跑道看成长度为 $1$ 的圆。若一个实数 $x$ 表示跑者位置，那么它在圆上的位置只看小数部分；到起点 $0$ 的圆周距离记为

$$
\lVert x\rVert=\min_{m\in\mathbb{Z}}|x-m|
$$

也就是说，$\lVert x\rVert$ 是 $x$ 到最近整数的距离，例如 $\lVert 0.2\rVert=0.2$，$\lVert 0.8\rVert=0.2$。

假设我们关心某一名跑者。把他的速度当成 $0$，其他跑者速度改成相对速度 $v_1,\ldots,v_k$，其中 $k=N-1$。那么“这名跑者在时刻 $t$ 孤独”等价于

$$
\lVert tv_i\rVert\geq \frac{1}{k+1},\quad i=1,\ldots,k
$$

于是猜想可以写成下面这个更紧凑的形式：

::: info 孤独跑者猜想
对任意非零且互异的速度 $v_1,\ldots,v_k$，存在实数 $t$，使得

$$
\min_{1\leq i\leq k}\lVert tv_i\rVert\geq \frac{1}{k+1}
$$

换句话说，总能找到一个时刻，让所有相对跑者都离选定跑者至少 $1/(k+1)$ 圈。
:::

很多文献会直接把 $v_i$ 限制为正整数。这个限制不是偷换问题：实数速度版本可以归约到整数速度版本。

## 二、一个具体例子

下面固定一名跑者在起点，另外三名跑者的相对速度为 $1,2,4$。此时总共有 $4$ 名跑者，所以孤独阈值是 $1/4$。当三名运动跑者都离起点至少 $1/4$ 圈时，固定跑者就是孤独的。

| 相对速度 $v$ | 在 $t=3/8$ 时的位置 $\{vt\}$ | 到起点的圆周距离 $\lVert vt\rVert$ |
| --- | --- | --- |
| $1$ | $3/8$ | $3/8$ |
| $2$ | $3/4$ | $1/4$ |
| $4$ | $3/2\equiv 1/2$ | $1/2$ |

这个例子的一个孤独时刻是 $t=3/8$：

$$
\lVert 1\cdot 3/8\rVert=3/8,\quad
\lVert 2\cdot 3/8\rVert=1/4,\quad
\lVert 4\cdot 3/8\rVert=1/2
$$

三个距离都不少于 $1/4$，所以固定跑者孤独。

## 三、为什么阈值刚好是 $1/N$

猜想里的 $1/N$ 不能再提高。考虑 $N$ 名跑者，固定一名跑者速度为 $0$，其他跑者速度为

$$
1,2,\ldots,N-1
$$

如果某个时刻 $t$ 让固定跑者距离所有其他跑者都严格大于 $1/N$，那么

$$
\{t\},\{2t\},\ldots,\{(N-1)t\}
$$

都要避开 $0$ 附近长度为 $2/N$ 的危险区。直观上，这些倍数会把圆周切得太满，不可能全部同时留出超过 $1/N$ 的空隙。更正式地说，这可以由抽屉原理或 Dirichlet 逼近定理推出。因此 $1/N$ 是可能成立的最佳常数。

这也是猜想迷人的地方：它不是问“能不能离开一点点”，而是问一个已经被极端例子卡死的**最优距离**是否总能达到。

## 四、目前进展

孤独跑者猜想最早由 Jörg M. Wills 在 1967 年前后以数论形式提出；Thomas W. Cusick 后来给出了等价的“视线遮挡”几何版本；现在常用的跑者故事表述则来自后来的组合数学文献。

按总跑者数 $N$ 来说，进展大致如下：

| 跑者数 $N$ | 状态 | 备注 |
| --- | --- | --- |
| $N\leq 7$ | 已证明 | 这些小规模情形已有非计算机或较传统的证明整理。 |
| $N=8$ | 已证明 | Rosenfeld 在 2025 年给出计算机辅助证明。 |
| $N=9,10$ | 已证明 | Trakulthongchai 在 2025 年把 Rosenfeld 的方法改进到 9、10 名跑者。 |
| $N=11,12,13$ | 预印本声称已证明 | Sungkawichai 与 Trakulthongchai 于 2026-04-26 提交预印本，给出计算机辅助证明。 |
| 任意 $N$ | 仍未解决 | 还没有一般证明，也没有反例。 |

这里需要注意一个记号差异：不少论文把固定跑者以外的相对速度数记为 $k$，于是“$k$ 个速度”对应“$k+1$ 名跑者”。例如 2026 年预印本证明 $k\in\{10,11,12\}$，换成跑者故事就是 $N\in\{11,12,13\}$。

## 五、最近突破靠什么

早期证明通常依赖对低维情形的细致分析。近几年的突破，核心是把“无限多种速度组合”压缩成“有限但很大的检查任务”。

Tao 在 2018 年证明了一个重要的有限检查原则：若要证明固定规模的孤独跑者猜想，只需要检查速度不超过某个显式上界的整数情形。不过这个上界仍然大得不适合直接算。

2025 年，Malikiosis、Santos 与 Schymura 把这个有限检查上界大幅改进到近似 $n^{2n}$ 的量级。这个结果本身还不是完整证明，但它让“排除所有最小反例”的计算路径变得更现实。

Rosenfeld 的 2025 年证明继续推进这条路：假设存在反例，则反例的速度乘积必须被许多素数整除；如果能证明“足够多”的素数都必须整除这个乘积，就会迫使反例超过有限检查上界，从而矛盾。Trakulthongchai 以及后续工作又加入筛法和多项式方法，让同一策略扩展到更多跑者。

粗略地说，最近的计算机辅助证明不是暴力枚举所有速度，而是在证明：

> 如果反例存在，它必须同时满足越来越多非常苛刻的整除条件；这些条件最终把反例挤没了。

## 六、为什么它难

这个问题难在它同时有两种相反气质：

1. 对任意一组具体速度，找一个孤独时刻往往不难，画图或计算都能发现。
2. 对所有速度组合给出统一证明却很难，因为最坏情形可能藏在高度结构化的数论配置里。

随机选速度时，跑者通常会“非常孤独”：最大分离距离可以接近 $1/2$。真正麻烦的是那些特殊构造，它们让所有倍数 $tv_i$ 在圆上高度相关，像一群很会抱团的点。

## 七、相关变体

孤独跑者猜想还有几个常见方向：

- **带初始位置的版本**：每名跑者不从同一点出发，而是允许不同初始位置。这叫 shifted lonely runner conjecture，通常更难。
- **视线遮挡问题**：在高维空间里放置周期性障碍物，问从原点发出的射线是否一定会撞到障碍物。
- **距离图染色问题**：把整数点按某些距离连边，孤独跑者猜想与这类图的色数界有关。
- **弱化常数版本**：把 $1/N$ 换成更小的 $c/N$。当 $c$ 接近 $1/2$ 时已有一些一般下界，但距离完整猜想的 $c=1$ 还很远。

## 八、小结

孤独跑者猜想可以记成一句话：

> 无论一群跑者速度如何不同，每个人终会拥有一个至少 $1/N$ 圈的清净时刻。

它的表述很童话，边界却很锋利：$1/N$ 是最优常数；小规模已经逐步攻克；截至 2026-05-10，最新预印本把验证推进到 13 名跑者以内，但一般情形仍然开放。

## 参考资料

- Jörg M. Wills, [Zwei Sätze über inhomogene diophantische Approximation von Irrationalzahlen](https://doi.org/10.1007/BF01302334), 1967.
- Terence Tao, [Some remarks on the lonely runner conjecture](https://arxiv.org/abs/1709.02045), 2018.
- Guillem Perarnau, Oriol Serra, [The Lonely Runner Conjecture turns 60](https://arxiv.org/abs/2409.20160), 2024.
- Romanos D. Malikiosis, Francisco Santos, Matthias Schymura, [Linearly exponential checking is enough for the Lonely Runner Conjecture and some of its variants](https://www.cambridge.org/core/journals/forum-of-mathematics-sigma/article/linearly-exponential-checking-is-enough-for-the-lonely-runner-conjecture-and-some-of-its-variants/A51A991DE89B8C9C2E2FF13FBD4501DA), 2025.
- Matthieu Rosenfeld, [The lonely runner conjecture holds for eight runners](https://arxiv.org/abs/2509.14111), 2025.
- Tanupat Trakulthongchai, [Nine and ten lonely runners](https://arxiv.org/abs/2511.22427), 2025.
- Touch Sungkawichai, Tanupat Trakulthongchai, [Eleven, twelve, and thirteen lonely runners](https://arxiv.org/abs/2604.23906), 2026.
