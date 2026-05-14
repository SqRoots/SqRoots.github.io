---
title: 勾股定理及其兄弟姐妹定理
createTime: 2026-05-14 00:00:00
permalink: /puzzle/0007/
tags:
  - 几何
  - 勾股定理
  - AI辅助撰写
---

::: tip 问题
我们熟悉勾股定理 $a^2+b^2=c^2$，下图另外3个图中线段的关系看起来很像“倒数版的勾股定理”。
:::

<!-- more -->

<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 18px; align-items: start;">

<div>

<JSXGraph
  height="280px"
  :boundingbox="[-1, 7, 8, -1.6]"
  code="const A = board.create('point', [0, 0], { name: '', fixed: true, color: '#111827', size: 3 }); const B = board.create('point', [6, 0], { name: '', fixed: true, color: '#111827', size: 3 }); const C = board.create('point', [6, 4], { name: '', fixed: true, color: '#111827', size: 3 }); board.create('polygon', [A, B, C], { fillColor: '#dbeafe', fillOpacity: 0.32, borders: { strokeColor: '#4b5563', strokeWidth: 3 } }); board.create('nonreflexangle', [A, B, C], { radius: 0.45, withLabel: false, type: 'square' }); board.create('text', [2.8, -0.45, 'a'], { fontSize: 1.1, fontUnit: 'rem', strokeColor: '#111827' }); board.create('text', [6.3, 2, 'b'], { fontSize: 1.1, fontUnit: 'rem', strokeColor: '#111827' }); board.create('text', [2.7, 2.55, 'c'], { fontSize: 1.1, fontUnit: 'rem', strokeColor: '#111827' }); board.create('text', [2.15, 5.7, '勾股定理'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#374151', cssStyle: 'font-weight: 700;' });"
/>

<div style="text-align: center;">

$$
a^2+b^2=c^2
$$

</div>

</div>

<div>

<JSXGraph
  height="280px"
  :boundingbox="[-1, 6.6, 8, -1.8]"
  code="const A = board.create('point', [0, 0], { name: '', fixed: true, color: '#111827', size: 3 }); const B = board.create('point', [7, 0], { name: '', fixed: true, color: '#111827', size: 3 }); const C = board.create('point', [4, Math.sqrt(12)], { name: '', fixed: true, color: '#111827', size: 3 }); const H = board.create('point', [4, 0], { name: '', fixed: true, color: '#111827', size: 3 }); board.create('polygon', [A, B, C], { fillColor: '#dcfce7', fillOpacity: 0.28, borders: { strokeColor: '#4b5563', strokeWidth: 3 } }); board.create('segment', [C, H], { strokeColor: '#2563eb', strokeWidth: 3 }); board.create('nonreflexangle', [A, C, B], { radius: 0.42, withLabel: false, type: 'square' }); board.create('nonreflexangle', [C, H, B], { radius: 0.35, withLabel: false, type: 'square' }); board.create('text', [1.75, 2.25, 'x'], { fontSize: 1.1, fontUnit: 'rem', strokeColor: '#111827' }); board.create('text', [5.85, 2.2, 'y'], { fontSize: 1.1, fontUnit: 'rem', strokeColor: '#111827' }); board.create('text', [4.22, 1.72, 'z'], { fontSize: 1.1, fontUnit: 'rem', strokeColor: '#2563eb' }); board.create('text', [1.55, 5.85, '倒数勾股定理'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#374151', cssStyle: 'font-weight: 700;' });"
/>

<div style="text-align: center;">

$$
\frac1{x^2}+\frac1{y^2}=\frac1{z^2}
$$

</div>

</div>

<div>

<JSXGraph
  height="280px"
  :boundingbox="[-0.8, 6.2, 8.2, -1.8]"
  code="const O1 = board.create('point', [2, 2.4], { name: '', fixed: true, color: '#111827', size: 3 }); const O2 = board.create('point', [5.6, 1.35], { name: '', fixed: true, color: '#111827', size: 3 }); const O3 = board.create('point', [4.057, 0.441], { name: '', fixed: true, color: '#111827', size: 3 }); const T1 = board.create('point', [2, 0], { name: '', fixed: true, visible: false }); const T2 = board.create('point', [5.6, 0], { name: '', fixed: true, visible: false }); const T3 = board.create('point', [4.057, 0], { name: '', fixed: true, visible: false }); board.create('line', [[-0.5, 0], [8, 0]], { straightFirst: false, straightLast: false, strokeColor: '#4b5563', strokeWidth: 3 }); board.create('circle', [O1, 2.4], { strokeColor: '#4b5563', strokeWidth: 3 }); board.create('circle', [O2, 1.35], { strokeColor: '#4b5563', strokeWidth: 3 }); board.create('circle', [O3, 0.441], { strokeColor: '#4b5563', strokeWidth: 3 }); board.create('segment', [O1, T1], { strokeColor: '#6b7280', strokeWidth: 2 }); board.create('segment', [O2, T2], { strokeColor: '#6b7280', strokeWidth: 2 }); board.create('segment', [O3, T3], { strokeColor: '#2563eb', strokeWidth: 2 }); board.create('text', [1.1, 1.35, 'x'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#111827' }); board.create('text', [5.95, 0.85, 'y'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#111827' }); board.create('text', [4.27, 0.26, 'z'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#2563eb' }); board.create('text', [1.4, 5.45, '三圆同切于一直线'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#374151', cssStyle: 'font-weight: 700;' });"
/>

<div style="text-align: center;">

$$
\frac1{\sqrt x}+\frac1{\sqrt y}=\frac1{\sqrt z}
$$

</div>

</div>

<div>

<JSXGraph
  height="280px"
  :boundingbox="[-0.8, 5.8, 8.2, -1.8]"
  code="const A = board.create('point', [0.2, 0], { name: '', fixed: true, color: '#111827', size: 3 }); const B = board.create('point', [2, 4.4], { name: '', fixed: true, color: '#111827', size: 3 }); const C = board.create('point', [5.7, 0], { name: '', fixed: true, color: '#111827', size: 3 }); const D = board.create('point', [7.0, 3.2], { name: '', fixed: true, color: '#111827', size: 3 }); const base = board.create('line', [A, C], { straightFirst: false, straightLast: false, strokeColor: '#4b5563', strokeWidth: 3 }); const left = board.create('line', [A, B], { straightFirst: false, straightLast: false, strokeColor: '#4b5563', strokeWidth: 3 }); const right = board.create('line', [C, D], { straightFirst: false, straightLast: false, strokeColor: '#4b5563', strokeWidth: 3 }); const diag1 = board.create('line', [A, D], { straightFirst: false, straightLast: false, strokeColor: '#4b5563', strokeWidth: 3 }); const diag2 = board.create('line', [B, C], { straightFirst: false, straightLast: false, strokeColor: '#4b5563', strokeWidth: 3 }); const P = board.create('intersection', [diag1, diag2, 0], { name: '', fixed: true, color: '#111827', size: 3 }); const zLine = board.create('parallel', [left, P], { visible: false }); const Q = board.create('intersection', [zLine, base, 0], { name: '', fixed: true, color: '#2563eb', size: 3 }); board.create('segment', [Q, P], { strokeColor: '#2563eb', strokeWidth: 3 }); board.create('text', [0.9, 2.2, 'x'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#111827' }); board.create('text', [6.55, 1.6, 'y'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#111827' }); board.create('text', [3.55, 1.22, 'z'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#2563eb' }); board.create('text', [1.8, 5.05, '交叉线的调和长度'], { fontSize: 1, fontUnit: 'rem', strokeColor: '#374151', cssStyle: 'font-weight: 700;' });"
/>

<div style="text-align: center;">

$$
\frac1x+\frac1y=\frac1z
$$

</div>
</div>
</div>


## 一、三圆同切：倒平方根相加

先看左边的圆。设两个大圆和一个小圆都与同一条直线相切，且小圆夹在两个大圆之间，同时与它们都相切。若三个圆的半径分别为 $x,y,z$，其中 $z$ 是夹在中间的小圆半径，那么有

$$
\frac1{\sqrt x}+\frac1{\sqrt y}=\frac1{\sqrt z}.
$$

这个公式可以从圆心距离直接算出来。两个半径为 $r,s$、都切于同一条水平线的圆，若它们彼此外切，则圆心的水平距离为

$$
2\sqrt{rs}.
$$

因为圆心高度分别是 $r,s$，圆心距离为 $r+s$，所以水平距离 $d$ 满足

$$
d^2+(r-s)^2=(r+s)^2,
$$

也就是 $d=2\sqrt{rs}$。这一步已经偷偷用到了勾股定理。

把中间小圆分别与两个大圆相切的水平距离相加，就等于两个大圆圆心之间的水平距离：

$$
2\sqrt{xz}+2\sqrt{yz}=2\sqrt{xy}.
$$

两边除以 $2\sqrt{xyz}$，便得到

$$
\frac1{\sqrt x}+\frac1{\sqrt y}=\frac1{\sqrt z}.
$$

若用“曲率”语言说会更简洁。圆的曲率是半径的倒数 $k=1/r$，直线可以看成半径无穷大的圆，曲率为 $0$。**笛卡尔圆定理**（[Descartes' theorem](https://en.wikipedia.org/wiki/Descartes'_theorem)）在这个特殊情形下正好化成

$$
\sqrt{k_z}=\sqrt{k_x}+\sqrt{k_y}.
$$

所以这个公式不是孤零零的技巧，而是相切圆曲率加法的一个影子。

## 二、交叉线：倒数相加

第二个图可以这样理解：有两条平行的斜边，长度分别为 $x,y$，它们的下端落在同一条底线上；把左下端连到右上端、左上端连到右下端，两条线交于一点。过交点作一条与那两条斜边平行的线段，长度为 $z$，那么

$$
\frac1x+\frac1y=\frac1z.
$$

换句话说，

$$
z=\frac{xy}{x+y}.
$$

这看起来像“半个调和平均数”。如果把 $x,y$ 看成两个方向相同的高度，交点把两条对角线按比例分割。相似三角形告诉我们，交点到下底的那段平行长度，恰好是两边长度的调和组合。

用坐标一行就能看清。设底边左端为 $A$，右端为 $D$。令左斜边为向量 $x\mathbf u$，右斜边为向量 $y\mathbf u$，其中 $\mathbf u$ 是同一个方向的单位向量。于是左上点是

$$
B=A+x\mathbf u,
$$

右上点是

$$
E=D+y\mathbf u.
$$

对角线 $AE$ 与 $BD$ 的交点 $P$ 同时满足

$$
P=A+t(D+y\mathbf u)=B+t(D-B).
$$

比较 $\mathbf u$ 方向的系数，得到

$$
ty=x(1-t),
$$

所以

$$
t=\frac{x}{x+y},\qquad z=ty=\frac{xy}{x+y}.
$$

于是倒数形式就是

$$
\frac1x+\frac1y=\frac1z.
$$

这里的加法来自相似三角形和比例，而不是垂直三角形；但它和勾股定理一样，都在说：真正容易相加的，未必是原来的长度，而可能是换了一个视角后的量。

## 三、斜边高：倒平方相加

第三个图最像“倒过来的勾股定理”。设直角三角形两条直角边为 $x,y$，从直角顶点向斜边作高，长度为 $z$。那么

$$
\frac1{x^2}+\frac1{y^2}=\frac1{z^2}.
$$

证明很短。设斜边为 $c$。由勾股定理，

$$
c^2=x^2+y^2.
$$

同一个三角形面积可以用直角边计算，也可以用斜边和斜边上的高计算：

$$
\frac12xy=\frac12cz.
$$

因此

$$
z=\frac{xy}{c}.
$$

两边取倒平方：

$$
\frac1{z^2}
=\frac{c^2}{x^2y^2}
=\frac{x^2+y^2}{x^2y^2}
=\frac1{x^2}+\frac1{y^2}.
$$

所以这一个真的是勾股定理的亲兄弟：它几乎就是勾股定理加上面积公式之后换了一副面孔。

## 四、它们到底有没有内在关联

有，但不是说它们都是同一个定理的简单改写。更准确地说，它们共享一种数学结构：

> 在合适的几何对象上，直接长度不一定相加；换成平方、倒数、倒平方、曲率或平方根曲率之后，关系反而变成加法。

勾股定理里，相加的是平方：

$$
a^2+b^2=c^2.
$$

斜边高公式里，相加的是倒平方：

$$
x^{-2}+y^{-2}=z^{-2}.
$$

交叉线公式里，相加的是倒数：

$$
x^{-1}+y^{-1}=z^{-1}.
$$

三圆同切公式里，相加的是倒平方根：

$$
x^{-1/2}+y^{-1/2}=z^{-1/2}.
$$

这些指数的变化并不神秘，它们来自不同几何量的“自然坐标”。直角三角形的自然坐标是平方长度；相似三角形里的自然坐标是比例；相切圆的自然坐标是曲率，也就是半径倒数。把问题放进它最自然的坐标系里，原本弯弯绕绕的图形关系就会突然变成一条加法公式。

这也是数学里经常出现的一种审美：好定理不只是告诉我们一个答案，还告诉我们“应该用什么量来描述世界”。勾股定理说，在直角几何里，平方长度才是会相加的量；它的这些兄弟姐妹则提醒我们，在相切、相似和投影的世界里，倒数家族同样很会说话。

## 五、小结

把四个公式放在一起，可以这样记：

| 图形 | 条件 | 公式 | 加法发生在 |
| --- | --- | --- | --- |
| 直角三角形 | 两边垂直 | $a^2+b^2=c^2$ | 平方长度 |
| 三圆同切于一直线 | 三圆两两相切且同切一线 | $\frac1{\sqrt x}+\frac1{\sqrt y}=\frac1{\sqrt z}$ | 半径倒数的平方根 |
| 交叉线 | 两条平行边与两条交叉连线 | $\frac1x+\frac1y=\frac1z$ | 长度倒数 |
| 斜边高 | 直角三角形斜边上的高 | $\frac1{x^2}+\frac1{y^2}=\frac1{z^2}$ | 长度倒平方 |

所以，图中的三个定理不是勾股定理的复制品，却都带着同一种味道：它们把几何限制转译成某种“加法守恒”。一旦找对该相加的量，图形就不再只是图形，而变成了一句简洁的公式。

## 参考资料

- H. S. M. Coxeter, *Introduction to Geometry*, 2nd ed., Wiley, 1969. 其中包含相切圆、曲率与经典平面几何的相关内容。
- Frederick Soddy, “The Kiss Precise”, *Nature*, 137, 1936, pp. 1021. 诗体介绍了笛卡尔圆定理的相切圆关系。
- Roger A. Johnson, *Advanced Euclidean Geometry*, Dover, 2007. 参考其中关于直角三角形、相似三角形与圆的经典定理。
