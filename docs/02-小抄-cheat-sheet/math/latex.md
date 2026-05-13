---
title: LaTex 数学公式
createTime: 2026/04/05 22:00:00
permalink: /cheat-sheet/math/latex/
---

更完整的LaTeX文档：
- [LaTeX 公式编辑器](https://www.latexlive.com/)
  - [帮助文档](https://www.latexlive.com/help)
  - [帮助文档 GitHub](https://github.com/BubblyJuly/LaTeXLive)

## 01 FAQ

【Q】：在行内公式中，如何不让巨算符的上下标被压缩？

【A1】：在巨算符后紧跟`\limits`。相反，如果希望公式被压缩可以在巨算符后紧跟`\nolimits`。

【A2】：将公式放入`aligned`环境中。

## 02 宏包

- `amsmath` 最主要的包，提供了许多呈现公式和其他数学结构的特征。
- `amstext` 提供了`\text`命令去排版类似于分段函数中条件的片段。
- `amsopn` 提供给了`\DeclareMathOperator`命令去定义一个新的"operator name"。
- `amsbsy` 因为向后的兼容性，这个包仍然能够被使用，但是官方建议使用最新的 bm 包去代替这个旧的包。
- `amscd` 提供了 CD 环境。
- `amsxtra` 暂时不明白它的功能

`amsmath`宏包集合了`amstext`、`amsbsy`、`amsopn`。对于`amscd`、`amsxtra`仅仅可以去调用使用。

amsmath宏包提供了许多可选的公式呈现结构，下面提供了一些在LaTeX中基本的结构：

| 自动编号         | 不自动编号     | 自动编号    | 不自动编号    |
| ------------ | --------- | ------- | -------- |
| equation     | equation* | align   | align*   |
| gather       | gather*   | flalign | flalign* |
| multline     | multline* | alignat | alignat* |
| split        |           |         |          |
| ~~eqnarray~~ |           |         |          |

注意：尽管标准的 eqnarray 环境仍然是可用的，但是最好使用 align 环境或者 equation+split 环境代替。

## 03 公式序号与交叉引用

标记介绍：

| 类别   | 标记                      | 作用                   |
| ---- | ----------------------- | -------------------- |
| 序号   | `\nonumber`，`\notag`    | 临时取消序号               |
| 序号   | `\tag{标号}`              | 自定义序号                |
| 序号   | `\tag*{标号}`             | 与`\tag`相同，只是标号两侧无括号  |
| 交叉引用 | `\label{xx}`，`\ref{xx}` | 前者在公式中设置标签，后者在文章中引用之 |
- 在 aligned 环境中，所有行无序号
- 在 align 环境中，每行公式都有序号
	- 在 align 环境中，在换行前使用 notag 时，这一行无序号
	- 在 align 环境中，在换行前使用 notag 时，这一行无序号
- 使用 equation + aligned 环境时，多行公式只有 1 个序号


示例：

$$
\begin{align}
\text{说明：在 align 环境中，每行公式都有序号} \notag\\
a = &1 \\
bb =&2 \\
ccc =&3\\
dddd = &4 \\
eeeeee=&5
\end{align}
$$

$$
\begin{aligned}
\text{说明：在 aligned 环境中，所有行无序号}\\
a = &1 \\
bb =&2 \\
ccc =&3\\
dddd = &4 \\
eeeeee=&5
\end{aligned}
$$

$$
\begin{equation}
\begin{aligned}
&\text{说明：使用 equation + aligned 环境时，多行公式只有 1 个序号} \\
a &= 1 \\
bb &= 2 \\
ccc &= 3 \\
dddd &= 4 \\
eeeeee &= 5
\end{aligned}
\end{equation}
$$



$$
\begin{align}
a = &1 \\
bb =&2 \\
ccc =&3 \qquad \text{说明：在 align 环境中，在换行前使用 notag 时，本行无序号}\notag\\
dddd = &4 \\
eeeeee=&5
\end{align}
$$


$$
\int_a^b\sin x\;\mathrm{d}x \qquad \text{说明：部分 Markdown 渲染器不支持公式内的 label/ref 交叉引用}
$$
交叉引用写法示例：在公式中用 `\label{eq1}` 标记、在正文中用 `\ref{eq1}` 引用。

## 04 函数、符号及特殊字符

|     | type     | code                                                                                                                                                                        | value                                                                                                                                                                       |
| --: | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
|   0 | 声调/变音符号  | `\dot{a}, \ddot{a}, \acute{a}, \grave{a}`                                                                                                                                   | $\dot{a}, \ddot{a}, \acute{a}, \grave{a}$                                                                                                                                   |
|   1 | 声调/变音符号  | `\check{a}, \breve{a}, \tilde{a}, \bar{a}`                                                                                                                                  | $\check{a}, \breve{a}, \tilde{a}, \bar{a}$                                                                                                                                  |
|   2 | 声调/变音符号  | `\hat{a}, \widehat{a}, \vec{a}`                                                                                                                                             | $\hat{a}, \widehat{a}, \vec{a}$                                                                                                                                             |
|   3 | 标准函数     | `\exp_a b = a^b, \exp b = e^b, 10^m`                                                                                                                                        | $\exp_a b = a^b, \exp b = e^b, 10^m$                                                                                                                                        |
|   4 | 标准函数     | `\ln c, \lg d = \log e, \log_{10} f`                                                                                                                                        | $\ln c, \lg d = \log e, \log_{10} f$                                                                                                                                        |
|   5 | 标准函数     | `\sin a, \cos b, \tan c, \cot d, \sec e, \csc f`                                                                                                                            | $\sin a, \cos b, \tan c, \cot d, \sec e, \csc f$                                                                                                                            |
|   6 | 标准函数     | `\arcsin a, \arccos b, \arctan c`                                                                                                                                           | $\arcsin a, \arccos b, \arctan c$                                                                                                                                           |
|   7 | 标准函数     | `\operatorname{arccot} d, \operatorname{arcsec} e, \operatorname{arccsc} f`                                                                                                 | $\operatorname{arccot} d, \operatorname{arcsec} e, \operatorname{arccsc} f$                                                                                                 |
|   8 | 标准函数     | `\sinh a, \cosh b, \tanh c, \coth d`                                                                                                                                        | $\sinh a, \cosh b, \tanh c, \coth d$                                                                                                                                        |
|   9 | 标准函数     | `\operatorname{sh}k, \operatorname{ch}l, \operatorname{th}m, \operatorname{coth}n`                                                                                          | $\operatorname{sh}k, \operatorname{ch}l, \operatorname{th}m, \operatorname{coth}n$                                                                                          |
|  10 | 标准函数     | `\operatorname{argsh}o, \operatorname{argch}p, \operatorname{argth}q`                                                                                                       | $\operatorname{argsh}o, \operatorname{argch}p, \operatorname{argth}q$                                                                                                       |
|  11 | 标准函数     | `\operatorname{sgn} r, \left\vert s \right\vert`                                                                                                                            | $\operatorname{sgn} r, \left\vert s \right\vert$                                                                                                                            |
|  12 | 标准函数     | `\min(x,y), \max(x,y)`                                                                                                                                                      | $\min(x,y), \max(x,y)$                                                                                                                                                      |
|  13 | 界限       | `\min x, \max y, \inf s, \sup t`                                                                                                                                            | $\min x, \max y, \inf s, \sup t$                                                                                                                                            |
|  14 | 界限       | `\lim u, \liminf v, \limsup w`                                                                                                                                              | $\lim u, \liminf v, \limsup w$                                                                                                                                              |
|  15 | 界限       | `\dim p, \deg q, \det m, \ker\phi`                                                                                                                                          | $\dim p, \deg q, \det m, \ker\phi$                                                                                                                                          |
|  16 | 投射       | `\Pr j, \hom l, \lVert z \rVert, \arg z`                                                                                                                                    | $\Pr j, \hom l, \lVert z \rVert, \arg z$                                                                                                                                    |
|  17 | 微分及导数    | `dt, \mathrm{d}t, \partial t, \nabla\psi`                                                                                                                                   | $dt, \mathrm{d}t, \partial t, \nabla\psi$                                                                                                                                   |
|  18 | 微分及导数    | `dy/dx, \mathrm{d}y/\mathrm{d}x, \frac{dy}{dx}, \frac{\mathrm{d}y}{\mathrm{d}x}, \frac{\partial^2}{\partial x_1\partial x_2}y`                                              | $dy/dx, \mathrm{d}y/\mathrm{d}x, \frac{dy}{dx}, \frac{\mathrm{d}y}{\mathrm{d}x}, \frac{\partial^2}{\partial x_1\partial x_2}y$                                              |
|  19 | 微分及导数    | `\prime, \backprime, f^\prime, f', f'', f^{(3)}, \dot y, \ddot y`                                                                                                           | $\prime, \backprime, f^\prime, f', f'', f^{(3)}, \dot y, \ddot y$                                                                                                           |
|  20 | 类字母符号及常数 | `\infty, \aleph, \complement, \backepsilon, \eth, \Finv, \hbar`                                                                                                             | $\infty, \aleph, \complement, \backepsilon, \eth, \Finv, \hbar$                                                                                                             |
|  21 | 类字母符号及常数 | `\Im, \imath, \jmath, \Bbbk, \ell, \mho, \wp, \Re, \circledS, \S, \P, \AA`                                                                                                  | $\Im, \imath, \jmath, \Bbbk, \ell, \mho, \wp, \Re, \circledS, \S, \P, \AA$                                                                                                  |
|  22 | 模算数      | `s_k \equiv 0 \pmod{m}`                                                                                                                                                     | $s_k \equiv 0 \pmod{m}$                                                                                                                                                     |
|  23 | 模算数      | `a \bmod b`                                                                                                                                                                 | $a \bmod b$                                                                                                                                                                 |
|  24 | 模算数      | `\gcd(m, n), \operatorname{lcm}(m, n)`                                                                                                                                      | $\gcd(m, n), \operatorname{lcm}(m, n)$                                                                                                                                      |
|  25 | 模算数      | `\mid, \nmid, \shortmid, \nshortmid`                                                                                                                                        | $\mid, \nmid, \shortmid, \nshortmid$                                                                                                                                        |
|  26 | 根号       | `\surd, \sqrt{2}, \sqrt[n]{}, \sqrt[3]{\frac{x^3+y^3}{2}}`                                                                                                                  | $\surd, \sqrt{2}, \sqrt[n]{}, \sqrt[3]{\frac{x^3+y^3}{2}}$                                                                                                                  |
|  27 | 运算符      | `+, -, \pm, \mp, \dotplus`                                                                                                                                                  | $+, -, \pm, \mp, \dotplus$                                                                                                                                                  |
|  28 | 运算符      | `\times, \div, \divideontimes, /, \backslash`                                                                                                                               | $\times, \div, \divideontimes, /, \backslash$                                                                                                                               |
|  29 | 运算符      | `\cdot, * \ast, \star, \circ, \bullet`                                                                                                                                      | $\cdot, * \ast, \star, \circ, \bullet$                                                                                                                                      |
|  30 | 运算符      | `\boxplus, \boxminus, \boxtimes, \boxdot`                                                                                                                                   | $\boxplus, \boxminus, \boxtimes, \boxdot$                                                                                                                                   |
|  31 | 运算符      | `\oplus, \ominus, \otimes, \oslash, \odot`                                                                                                                                  | $\oplus, \ominus, \otimes, \oslash, \odot$                                                                                                                                  |
|  32 | 运算符      | `\circleddash, \circledcirc, \circledast`                                                                                                                                   | $\circleddash, \circledcirc, \circledast$                                                                                                                                   |
|  33 | 运算符      | `\bigoplus, \bigotimes, \bigodot`                                                                                                                                           | $\bigoplus, \bigotimes, \bigodot$                                                                                                                                           |
|  34 | 集合       | `\{ \}, \emptyset, \varnothing`                                                                                                                                             | $\{ \}, \emptyset, \varnothing$                                                                                                                                             |
|  35 | 集合       | `\in, \notin \not\in, \ni, \not\ni`                                                                                                                                         | $\in, \notin \not\in, \ni, \not\ni$                                                                                                                                         |
|  36 | 集合       | `\cap, \Cap, \sqcap, \bigcap`                                                                                                                                               | $\cap, \Cap, \sqcap, \bigcap$                                                                                                                                               |
|  37 | 集合       | `\cup, \Cup, \sqcup, \bigcup, \bigsqcup, \uplus, \biguplus`                                                                                                                 | $\cup, \Cup, \sqcup, \bigcup, \bigsqcup, \uplus, \biguplus$                                                                                                                 |
|  38 | 集合       | `\setminus, \smallsetminus, \times`                                                                                                                                         | $\setminus, \smallsetminus, \times$                                                                                                                                         |
|  39 | 集合       | `\subset, \Subset, \sqsubset`                                                                                                                                               | $\subset, \Subset, \sqsubset$                                                                                                                                               |
|  40 | 集合       | `\supset, \Supset, \sqsupset`                                                                                                                                               | $\supset, \Supset, \sqsupset$                                                                                                                                               |
|  41 | 集合       | `\subseteq, \nsubseteq, \subsetneq, \varsubsetneq, \sqsubseteq`                                                                                                             | $\subseteq, \nsubseteq, \subsetneq, \varsubsetneq, \sqsubseteq$                                                                                                             |
|  42 | 集合       | `\supseteq, \nsupseteq, \supsetneq, \varsupsetneq, \sqsupseteq`                                                                                                             | $\supseteq, \nsupseteq, \supsetneq, \varsupsetneq, \sqsupseteq$                                                                                                             |
|  43 | 集合       | `\subseteqq, \nsubseteqq, \subsetneqq, \varsubsetneqq`                                                                                                                      | $\subseteqq, \nsubseteqq, \subsetneqq, \varsubsetneqq$                                                                                                                      |
|  44 | 集合       | `\supseteqq, \nsupseteqq, \supsetneqq, \varsupsetneqq`                                                                                                                      | $\supseteqq, \nsupseteqq, \supsetneqq, \varsupsetneqq$                                                                                                                      |
|  45 | 关系符号     | `=, \ne, \neq, \equiv, \not\equiv`                                                                                                                                          | $=, \ne, \neq, \equiv, \not\equiv$                                                                                                                                          |
|  46 | 关系符号     | `\doteq, \doteqdot, \overset{\underset{\mathrm{def}}{}}{=}, :=`                                                                                                             | $\doteq, \doteqdot, \overset{\underset{\mathrm{def}}{}}{=}, :=$                                                                                                             |
|  47 | 关系符号     | `\sim, \nsim, \backsim, \thicksim, \simeq, \backsimeq, \eqsim, \cong, \ncong`                                                                                               | $\sim, \nsim, \backsim, \thicksim, \simeq, \backsimeq, \eqsim, \cong, \ncong$                                                                                               |
|  48 | 关系符号     | `\approx, \thickapprox, \approxeq, \asymp, \propto, \varpropto`                                                                                                             | $\approx, \thickapprox, \approxeq, \asymp, \propto, \varpropto$                                                                                                             |
|  49 | 关系符号     | `<, \nless, \ll, \not\ll, \lll, \not\lll, \lessdot`                                                                                                                         | $<, \nless, \ll, \not\ll, \lll, \not\lll, \lessdot$                                                                                                                         |
|  50 | 关系符号     | `>, \ngtr, \gg, \not\gg, \ggg, \not\ggg, \gtrdot`                                                                                                                           | $>, \ngtr, \gg, \not\gg, \ggg, \not\ggg, \gtrdot$                                                                                                                           |
|  51 | 关系符号     | `\le, \leq, \lneq, \leqq, \nleq, \nleqq, \lneqq, \lvertneqq`                                                                                                                | $\le, \leq, \lneq, \leqq, \nleq, \nleqq, \lneqq, \lvertneqq$                                                                                                                |
|  52 | 关系符号     | `\ge, \geq, \gneq, \geqq, \ngeq, \ngeqq, \gneqq, \gvertneqq`                                                                                                                | $\ge, \geq, \gneq, \geqq, \ngeq, \ngeqq, \gneqq, \gvertneqq$                                                                                                                |
|  53 | 关系符号     | `\lessgtr, \lesseqgtr, \lesseqqgtr, \gtrless, \gtreqless, \gtreqqless`                                                                                                      | $\lessgtr, \lesseqgtr, \lesseqqgtr, \gtrless, \gtreqless, \gtreqqless$                                                                                                      |
|  54 | 关系符号     | `\leqslant, \nleqslant, \eqslantless`                                                                                                                                       | $\leqslant, \nleqslant, \eqslantless$                                                                                                                                       |
|  55 | 关系符号     | `\geqslant, \ngeqslant, \eqslantgtr`                                                                                                                                        | $\geqslant, \ngeqslant, \eqslantgtr$                                                                                                                                        |
|  56 | 关系符号     | `\lesssim, \lnsim, \lessapprox, \lnapprox`                                                                                                                                  | $\lesssim, \lnsim, \lessapprox, \lnapprox$                                                                                                                                  |
|  57 | 关系符号     | `\gtrsim, \gnsim, \gtrapprox, \gnapprox`                                                                                                                                    | $\gtrsim, \gnsim, \gtrapprox, \gnapprox$                                                                                                                                    |
|  58 | 关系符号     | `\prec, \nprec, \preceq, \npreceq, \precneqq`                                                                                                                               | $\prec, \nprec, \preceq, \npreceq, \precneqq$                                                                                                                               |
|  59 | 关系符号     | `\succ, \nsucc, \succeq, \nsucceq, \succneqq`                                                                                                                               | $\succ, \nsucc, \succeq, \nsucceq, \succneqq$                                                                                                                               |
|  60 | 关系符号     | `\preccurlyeq, \curlyeqprec`                                                                                                                                                | $\preccurlyeq, \curlyeqprec$                                                                                                                                                |
|  61 | 关系符号     | `\succcurlyeq, \curlyeqsucc`                                                                                                                                                | $\succcurlyeq, \curlyeqsucc$                                                                                                                                                |
|  62 | 关系符号     | `\precsim, \precnsim, \precapprox, \precnapprox`                                                                                                                            | $\precsim, \precnsim, \precapprox, \precnapprox$                                                                                                                            |
|  63 | 关系符号     | `\succsim, \succnsim, \succapprox, \succnapprox`                                                                                                                            | $\succsim, \succnsim, \succapprox, \succnapprox$                                                                                                                            |
|  64 | 几何符号     | `\parallel, \nparallel, \shortparallel, \nshortparallel`                                                                                                                    | $\parallel, \nparallel, \shortparallel, \nshortparallel$                                                                                                                    |
|  65 | 几何符号     | `\perp, \angle, \sphericalangle, \measuredangle, 45^\circ`                                                                                                                  | $\perp, \angle, \sphericalangle, \measuredangle, 45^\circ$                                                                                                                  |
|  66 | 几何符号     | `\Box, \blacksquare, \diamond, \Diamond \lozenge, \blacklozenge, \bigstar`                                                                                                  | $\Box, \blacksquare, \diamond, \Diamond \lozenge, \blacklozenge, \bigstar$                                                                                                  |
|  67 | 几何符号     | `\bigcirc, \triangle, \bigtriangleup, \bigtriangledown`                                                                                                                     | $\bigcirc, \triangle, \bigtriangleup, \bigtriangledown$                                                                                                                     |
|  68 | 几何符号     | `\vartriangle, \triangledown`                                                                                                                                               | $\vartriangle, \triangledown$                                                                                                                                               |
|  69 | 几何符号     | `\blacktriangle, \blacktriangledown, \blacktriangleleft, \blacktriangleright`                                                                                               | $\blacktriangle, \blacktriangledown, \blacktriangleleft, \blacktriangleright$                                                                                               |
|  70 | 逻辑符号     | `\forall, \exists, \nexists`                                                                                                                                                | $\forall, \exists, \nexists$                                                                                                                                                |
|  71 | 逻辑符号     | `\therefore, \because, \And`                                                                                                                                                | $\therefore, \because, \And$                                                                                                                                                |
|  72 | 逻辑符号     | `\lor, \vee, \curlyvee, \bigvee`                                                                                                                                            | $\lor, \vee, \curlyvee, \bigvee$                                                                                                                                            |
|  73 | 逻辑符号     | `\land, \wedge, \curlywedge, \bigwedge`                                                                                                                                     | $\land, \wedge, \curlywedge, \bigwedge$                                                                                                                                     |
|  74 | 逻辑符号     | `\bar{q}, \bar{abc}, \overline{q}, \overline{abc}`                                                                                                                          | $\bar{q}, \bar{abc}, \overline{q}, \overline{abc}$                                                                                                                          |
|     | 逻辑符号     | `\lnot \neg, \not\operatorname{R}, \bot, \top`                                                                                                                              | $\lnot \neg, \not\operatorname{R}, \bot, \top$                                                                                                                              |
|  75 | 逻辑符号     | `\vdash \dashv, \vDash, \Vdash, \models`                                                                                                                                    | $\vdash \dashv, \vDash, \Vdash, \models$                                                                                                                                    |
|  76 | 逻辑符号     | `\Vvdash \nvdash \nVdash \nvDash \nVDash`                                                                                                                                   | $\Vvdash \nvdash \nVdash \nvDash \nVDash$                                                                                                                                   |
|  77 | 逻辑符号     | `\ulcorner \urcorner \llcorner \lrcorner`                                                                                                                                   | $\ulcorner \urcorner \llcorner \lrcorner$                                                                                                                                   |
|  78 | 箭头       | `\Rrightarrow, \Lleftarrow`                                                                                                                                                 | $\Rrightarrow, \Lleftarrow$                                                                                                                                                 |
|  79 | 箭头       | `\Rightarrow, \nRightarrow, \Longrightarrow \implies`                                                                                                                       | $\Rightarrow, \nRightarrow, \Longrightarrow \implies$                                                                                                                       |
|  80 | 箭头       | `\Leftarrow, \nLeftarrow, \Longleftarrow`                                                                                                                                   | $\Leftarrow, \nLeftarrow, \Longleftarrow$                                                                                                                                   |
|  81 | 箭头       | `\Leftrightarrow, \nLeftrightarrow, \Longleftrightarrow \iff`                                                                                                               | $\Leftrightarrow, \nLeftrightarrow, \Longleftrightarrow \iff$                                                                                                               |
|  82 | 箭头       | `\Uparrow, \Downarrow, \Updownarrow`                                                                                                                                        | $\Uparrow, \Downarrow, \Updownarrow$                                                                                                                                        |
|  83 | 箭头       | `\rightarrow \to, \nrightarrow, \longrightarrow`                                                                                                                            | $\rightarrow \to, \nrightarrow, \longrightarrow$                                                                                                                            |
|  84 | 箭头       | `\leftarrow \gets, \nleftarrow, \longleftarrow`                                                                                                                             | $\leftarrow \gets, \nleftarrow, \longleftarrow$                                                                                                                             |
|  85 | 箭头       | `\leftrightarrow, \nleftrightarrow, \longleftrightarrow`                                                                                                                    | $\leftrightarrow, \nleftrightarrow, \longleftrightarrow$                                                                                                                    |
|  86 | 箭头       | `\uparrow, \downarrow, \updownarrow`                                                                                                                                        | $\uparrow, \downarrow, \updownarrow$                                                                                                                                        |
|  87 | 箭头       | `\nearrow, \swarrow, \nwarrow, \searrow`                                                                                                                                    | $\nearrow, \swarrow, \nwarrow, \searrow$                                                                                                                                    |
|  88 | 箭头       | `\mapsto, \longmapsto`                                                                                                                                                      | $\mapsto, \longmapsto$                                                                                                                                                      |
|  89 | 箭头       | `\rightharpoonup \rightharpoondown \leftharpoonup \leftharpoondown \upharpoonleft \upharpoonright \downharpoonleft \downharpoonright \rightleftharpoons \leftrightharpoons` | $\rightharpoonup \rightharpoondown \leftharpoonup \leftharpoondown \upharpoonleft \upharpoonright \downharpoonleft \downharpoonright \rightleftharpoons \leftrightharpoons$ |
|  90 | 箭头       | `\curvearrowleft \circlearrowleft \Lsh \upuparrows \rightrightarrows \rightleftarrows \rightarrowtail \looparrowright`                                                      | $\curvearrowleft \circlearrowleft \Lsh \upuparrows \rightrightarrows \rightleftarrows \rightarrowtail \looparrowright$                                                      |
|  91 | 箭头       | `\curvearrowright \circlearrowright \Rsh \downdownarrows \leftleftarrows \leftrightarrows \leftarrowtail \looparrowleft`                                                    | $\curvearrowright \circlearrowright \Rsh \downdownarrows \leftleftarrows \leftrightarrows \leftarrowtail \looparrowleft$                                                    |
|  92 | 箭头       | `\hookrightarrow \hookleftarrow \multimap \leftrightsquigarrow \rightsquigarrow \twoheadrightarrow \twoheadleftarrow`                                                       | $\hookrightarrow \hookleftarrow \multimap \leftrightsquigarrow \rightsquigarrow \twoheadrightarrow \twoheadleftarrow$                                                       |
|  93 | 特殊符号     | `\amalg \P \S \% \dagger \ddagger \ldots \cdots`                                                                                                                          | $\amalg \P \S \% \dagger \ddagger \ldots \cdots$                                                                                                                          |
|  94 | 特殊符号     | `\smile \frown \wr \triangleleft \triangleright`                                                                                                                            | $\smile \frown \wr \triangleleft \triangleright$                                                                                                                            |
|  95 | 特殊符号     | `\diamondsuit, \heartsuit, \clubsuit, \spadesuit, \Game, \flat, \natural, \sharp`                                                                                           | $\diamondsuit, \heartsuit, \clubsuit, \spadesuit, \Game, \flat, \natural, \sharp$                                                                                           |
|  96 | 未排序      | `\diagup \diagdown \centerdot \ltimes \rtimes \leftthreetimes \rightthreetimes`                                                                                             | $\diagup \diagdown \centerdot \ltimes \rtimes \leftthreetimes \rightthreetimes$                                                                                             |
|  97 | 未排序      | `\eqcirc \circeq \triangleq \bumpeq \Bumpeq \doteqdot \risingdotseq \fallingdotseq`                                                                                         | $\eqcirc \circeq \triangleq \bumpeq \Bumpeq \doteqdot \risingdotseq \fallingdotseq$                                                                                         |
|  98 | 未排序      | `\intercal \barwedge \veebar \doublebarwedge \between \pitchfork`                                                                                                           | $\intercal \barwedge \veebar \doublebarwedge \between \pitchfork$                                                                                                           |
|  99 | 未排序      | `\vartriangleleft \ntriangleleft \vartriangleright \ntriangleright`                                                                                                         | $\vartriangleleft \ntriangleleft \vartriangleright \ntriangleright$                                                                                                         |
| 100 | 未排序      | `\trianglelefteq \ntrianglelefteq \trianglerighteq \ntrianglerighteq`                                                                                                       | $\trianglelefteq \ntrianglelefteq \trianglerighteq \ntrianglerighteq$                                                                                                       |
| 101 | 未排序      | `\not6, \frac{1\not6}{\not64}=\frac{1}{4}`                                                                                                                                  | $\not6, \frac{1\not6}{\not64}=\frac{1}{4}$                                                                                                                                  |

---

## 05 上标、下标及积分等

|     | type                                                                  | code                                                                    | value                                                                   |
| --: | :-------------------------------------------------------------------- | :---------------------------------------------------------------------- | :---------------------------------------------------------------------- |
|   0 | 上标                                                                    | `a^2`                                                                   | $a^2$                                                                   |
|   1 | 下标                                                                    | `a_2`                                                                   | $a_2$                                                                   |
|   2 | 组合                                                                    | `a^{2+2}`                                                               | $a^{2+2}$                                                               |
|   3 | 组合                                                                    | `a_{i,j}`                                                               | $a_{i,j}$                                                               |
|   4 | 结合上下标                                                                 | `x_2^3`                                                                 | $x_2^3$                                                                 |
|   5 | 前置上下标                                                                 | `{}_1^2\!X_3^4`                                                         | ${}_1^2\!X_3^4$                                                         |
|   6 | 上下标错开                                                                 | `{x_1}^2=x_1 \times x_1`                                                | ${x_1}^2=x_1 \times x_1$                                                |
|   7 | 导数（HTML）                                                              | `x'`                                                                    | $x'$                                                                    |
|   8 | 导数（PNG）                                                               | `x^\prime`                                                              | $x^\prime$                                                              |
|   9 | 导数（错误）                                                                | `x\prime`                                                               | $x\prime$                                                               |
|  10 | 导数点                                                                   | `\dot{x}`                                                               | $\dot{x}$                                                               |
|  11 | 导数点                                                                   | `\ddot{y}`                                                              | $\ddot{y}$                                                              |
|  12 | 向量                                                                    | `\vec{c}`                                                               | $\vec{c}$                                                               |
|  13 | 向量                                                                    | `\overleftarrow{a b}`                                                   | $\overleftarrow{a b}$                                                   |
|  14 | 向量                                                                    | `\overrightarrow{c d}`                                                  | $\overrightarrow{c d}$                                                  |
|  15 | 向量                                                                    | `\overleftrightarrow{a b}`                                              | $\overleftrightarrow{a b}$                                              |
|  16 | 向量                                                                    | `\widehat{e f g}`                                                       | $\widehat{e f g}$                                                       |
|  17 | 上弧                                                            | `\overset{\frown} {AB}` （注: 正确应该用 \overarc，但使用 \overarc 时需要引入{arcs}包。）    | $\overset{\frown} {AB}$ |
|  18 | 上划线                                                                   | `\overline{h i j}`                                                      | $\overline{h i j}$                                                      |
|  19 | 下划线                                                                   | `\underline{k l m}`                                                     | $\underline{k l m}$                                                     |
|  20 | 上括号                                                                   | `\overbrace{1+2+\cdots+100}`                                            | $\overbrace{1+2+\cdots+100}$                                            |
|  21 | 上括号                                                                   | `\overbrace{ 1+2+\cdots+100 }^{5050}`                                   | $\overbrace{ 1+2+\cdots+100 }^{5050}$                                   |
|  22 | 下括号                                                                   | `\underbrace{a+b+\cdots+z}`                                             | $\underbrace{a+b+\cdots+z}$                                             |
|  23 | 下括号                                                                   | `\underbrace{ a+b+\cdots+z }_{26}`                                      | $\underbrace{ a+b+\cdots+z }_{26}$                                      |
|  24 | 求和                                                                    | `\sum_{k=1}^N k^2`                                                      | $\sum_{k=1}^N k^2$                                                      |
|  25 | 求和                                                                    | `\begin{matrix} \sum_{k=1}^N k^2 \end{matrix}`                          | $\begin{matrix} \sum_{k=1}^N k^2 \end{matrix}$                          |
|  26 | 求积                                                                    | `\prod_{i=1}^N x_i`                                                     | $\prod_{i=1}^N x_i$                                                     |
|  27 | 求积                                                                    | `\begin{matrix} \prod_{i=1}^N x_i \end{matrix}`                         | $\begin{matrix} \prod_{i=1}^N x_i \end{matrix}$                         |
|  28 | 上积                                                                    | `\coprod_{i=1}^N x_i`                                                   | $\coprod_{i=1}^N x_i$                                                   |
|  29 | 上积                                                                    | `\begin{matrix} \coprod_{i=1}^N x_i \end{matrix}`                       | $\begin{matrix} \coprod_{i=1}^N x_i \end{matrix}$                       |
|  30 | 极限                                                                    | `\lim_{n \to \infty}x_n`                                                | $\lim_{n \to \infty}x_n$                                                |
|  31 | 极限                                                                    | `\begin{matrix} \lim_{n \to \infty}x_n \end{matrix}`                    | $\begin{matrix} \lim_{n \to \infty}x_n \end{matrix}$                    |
|  32 | 积分                                                                    | `\int_{-N}^{N} e^x\, \mathrm{d}x`                                       | $\int_{-N}^{N} e^x\, \mathrm{d}x$                                       |
|  33 | 积分                                                                    | `\begin{matrix} \int_{-N}^{N} e^x\, \mathrm{d}x \end{matrix}`           | $\begin{matrix} \int_{-N}^{N} e^x\, \mathrm{d}x \end{matrix}$           |
|  34 | 双重积分                                                                  | `\iint_{D}^{W} \, \mathrm{d}x\,\mathrm{d}y`                             | $\iint_{D}^{W} \, \mathrm{d}x\,\mathrm{d}y$                             |
|  35 | 三重积分                                                                  | `\iiint_{E}^{V} \, \mathrm{d}x\,\mathrm{d}y\,\mathrm{d}z`               | $\iiint_{E}^{V} \, \mathrm{d}x\,\mathrm{d}y\,\mathrm{d}z$               |
|  36 | 四重积分                                                                  | `\iiiint_{F}^{U} \, \mathrm{d}x\,\mathrm{d}y\,\mathrm{d}z\,\mathrm{d}t` | $\iiiint_{F}^{U} \, \mathrm{d}x\,\mathrm{d}y\,\mathrm{d}z\,\mathrm{d}t$ |
|  37 | 闭合的曲线积分、曲面积分                                                          | `\oint_{C} x^3\, \mathrm{d}x + 4y^2\, \mathrm{d}y`                      | $\oint_{C} x^3\, \mathrm{d}x + 4y^2\, \mathrm{d}y$                      |
|  38 | 交集                                                                    | `\bigcap_1^{n} p`                                                       | $\bigcap_1^{n} p$                                                       |
|  39 | 并集                                                                    | `\bigcup_1^{k} p`                                                       | $\bigcup_1^{k} p$                                                       |

---

## 06 分数、矩阵和行列式

|     | type                                         | code                                                                           | value                                                                          |
| --: | :------------------------------------------- | :----------------------------------------------------------------------------- | :----------------------------------------------------------------------------- |
|   0 | 分数                                           | `\frac{2}{4}=0.5`                                                              | $\frac{2}{4}=0.5$                                                              |
|   1 | 分数                                           | `{2 \over 3}`                                                                  | ${2 \over 3}$                                                                  |
|   2 | 分数                                           | `{{a+b} \over {a-b}}`                                                          | ${{a+b} \over {a-b}}$                                                          |
|   3 | 小型分数                                         | `\tfrac{2}{4} = 0.5`                                                           | $\tfrac{2}{4} = 0.5$                                                           |
|   4 | 大型分数（嵌套）                                     | `\cfrac{2}{c + \cfrac{2}{d + \cfrac{2}{4}}} = a`                               | $\cfrac{2}{c + \cfrac{2}{d + \cfrac{2}{4}}} = a$                               |
|   5 | 大型分数（不嵌套）                                    | `\dfrac{2}{4} = 0.5 \qquad \dfrac{2}{c + \dfrac{2}{d + \dfrac{2}{4}}} = a `    | $\dfrac{2}{4} = 0.5 \qquad \dfrac{2}{c + \dfrac{2}{d + \dfrac{2}{4}}} = a$     |
|   6 | 二项式系数                                        | `\dbinom{n}{r}=\binom{n}{n-r}=\mathrm{C}_n^r=\mathrm{C}_n^{n-r}`               | $\dbinom{n}{r}=\binom{n}{n-r}=\mathrm{C}_n^r=\mathrm{C}_n^{n-r}$               |
|   7 | 二项式系数                                        | `\binom{n}{n-r}, \binom{n^2}{r_1}, \binom{a-b}{c+d}, \binom{n}{0}+\binom{n}{1}` | $\binom{n}{n-r}, \binom{n^2}{r_1}, \binom{a-b}{c+d}, \binom{n}{0}+\binom{n}{1}$ |
|   8 | 小型[二项式](https://zh.wikipedia.org/wiki/二项式)系数 | `\tbinom{n}{r}=\tbinom{n}{n-r}=\mathrm{C}_n^r=\mathrm{C}_n^{n-r}`              | $\tbinom{n}{r}=\tbinom{n}{n-r}=\mathrm{C}_n^r=\mathrm{C}_n^{n-r}$              |
|   9 | 大型[二项式](https://zh.wikipedia.org/wiki/二项式)系数 | `\binom{n}{r}=\dbinom{n}{n-r}=\mathrm{C}_n^r=\mathrm{C}_n^{n-r}`               | $\binom{n}{r}=\dbinom{n}{n-r}=\mathrm{C}_n^r=\mathrm{C}_n^{n-r}$               |

矩阵：
$$
\begin{matrix}
x & y \\
z & v
\end{matrix}
$$

$$
\begin{vmatrix}
x & y \\
z & v
\end{vmatrix}
$$

$$
\begin{Vmatrix}
x & y \\
z & v
\end{Vmatrix}
$$

$$
\begin{bmatrix}
0      & \cdots & 0      \\
\vdots & \ddots & \vdots \\
0      & \cdots & 0
\end{bmatrix}
$$

$$
\begin{Bmatrix}
x & y \\
z & v
\end{Bmatrix}
$$

$$
\begin{pmatrix}
x & y \\
z & v
\end{pmatrix}
$$

$$
\bigl( \begin{smallmatrix}
a&b\\ c&d
\end{smallmatrix} \bigr)
$$

条件定义：
$$
f(n) =
\begin{cases} 
n/2,  & \text{if }n\text{ is even} \\
3n+1, & \text{if }n\text{ is odd}
\end{cases}
$$
多行等式、同余式：
$$
\begin{align}
f(x) & = (m+n)^2 \\
& = m^2+2mn+n^2 \\
\end{align}
$$

$$
\begin{align}
3^{6n+3}+4^{6n+3} 
& \equiv (3^3)^{2n+1}+(4^3)^{2n+1}\\  
& \equiv 27^{2n+1}+64^{2n+1}\\  
& \equiv 27^{2n+1}+(-27)^{2n+1}\\ 
& \equiv 27^{2n+1}-27^{2n+1}\\
& \equiv 0 \pmod{91}\\
\end{align}
$$

$$
\begin{alignat}{3}
f(x) & = (m-n)^2 \\
f(x) & = (-m+n)^2 \\
& = m^2-2mn+n^2 \\
\end{alignat}
$$

多行等式（左对齐）：
$$
\begin{array}{lcl}
z        & = & a \\
f(x,y,z) & = & x + y + z 
\end{array}
$$
多行等式（右对齐）：
$$
\begin{array}{lcr}
z        & = & a \\
f(x,y,z) & = & x + y + z    
\end{array}
$$
方程组：
$$
\begin{cases}
3x + 5y +  z \\
7x - 2y + 4z \\
-6x + 3y + 2z
\end{cases}
$$

数组：
$$
\begin{array}{|c|c||c|} a & b & S \\ \hline 0&0&1\\ 0&1&1\\ 1&0&1\\ 1&1&0\\ \end{array}
$$

---

## 07 字体

|     | type           | code                                                          | value                                                         |
| --: | :------------- | :------------------------------------------------------------ | :------------------------------------------------------------ |
|   0 | 希腊字母           | `A B \Gamma \Delta E Z H \Theta`                              | $A B \Gamma \Delta E Z H \Theta$                              |
|   1 | 希腊字母           | `I K \Lambda M N \Xi O \Pi`                                   | $I K \Lambda M N \Xi O \Pi$                                   |
|   2 | 希腊字母           | `P \Sigma T \Upsilon \Phi X \Psi \Omega`                      | $P \Sigma T \Upsilon \Phi X \Psi \Omega$                      |
|   3 | 希腊字母           | `\alpha \beta \gamma \delta \epsilon \zeta \eta \theta`       | $\alpha \beta \gamma \delta \epsilon \zeta \eta \theta$       |
|   4 | 希腊字母           | `\iota \kappa \lambda \mu \nu \xi \omicron \pi`               | $\iota \kappa \lambda \mu \nu \xi \omicron \pi$               |
|   5 | 希腊字母           | `\rho \sigma \tau \upsilon \phi \chi \psi \omega`             | $\rho \sigma \tau \upsilon \phi \chi \psi \omega$             |
|   6 | 希腊字母           | `\varepsilon \digamma \varkappa \varpi`                       | $\varepsilon \digamma \varkappa \varpi$                       |
|   7 | 希腊字母           | `\varrho \varsigma \vartheta \varphi`                         | $\varrho \varsigma \vartheta \varphi$                         |
|   8 | 希伯来符号          | `\aleph \beth \gimel \daleth`                                 | $\aleph \beth \gimel \daleth$                                 |
|   9 | 黑板报粗体          | `\mathbb{ABCDEFGHI}`                                          | $\mathbb{ABCDEFGHI}$                                          |
|  10 | 黑板报粗体          | `\mathbb{JKLMNOPQR}`                                          | $\mathbb{JKLMNOPQR}$                                          |
|  11 | 黑板报粗体          | `\mathbb{STUVWXYZ}`                                           | $\mathbb{STUVWXYZ}$                                           |
|  12 | 粗体             | `\mathbf{ABCDEFGHI}`                                          | $\mathbf{ABCDEFGHI}$                                          |
|  13 | 粗体             | `\mathbf{JKLMNOPQR}`                                          | $\mathbf{JKLMNOPQR}$                                          |
|  14 | 粗体             | `\mathbf{STUVWXYZ}`                                           | $\mathbf{STUVWXYZ}$                                           |
|  15 | 粗体             | `\mathbf{abcdefghijklm}`                                      | $\mathbf{abcdefghijklm}$                                      |
|  16 | 粗体             | `\mathbf{nopqrstuvwxyz}`                                      | $\mathbf{nopqrstuvwxyz}$                                      |
|  17 | 粗体             | `\mathbf{0123456789}`                                         | $\mathbf{0123456789}$                                         |
|  18 | 粗体希腊字母         | `\boldsymbol{AB\Gamma\Delta EZH\Theta}`                       | $\boldsymbol{AB\Gamma\Delta EZH\Theta}$                       |
|  19 | 粗体希腊字母         | `\boldsymbol{IK\Lambda MN\Xi \Pi P}`                          | $\boldsymbol{IK\Lambda MN\Xi \Pi P}$                          |
|  20 | 粗体希腊字母         | `\boldsymbol{\Sigma T\Upsilon \Phi X\Psi \Omega}`             | $\boldsymbol{\Sigma T\Upsilon \Phi X\Psi \Omega}$             |
|  21 | 粗体希腊字母         | `\boldsymbol{\alpha\beta\gamma\delta\epsilon\zeta\eta\theta}` | $\boldsymbol{\alpha\beta\gamma\delta\epsilon\zeta\eta\theta}$ |
|  22 | 粗体希腊字母         | `\boldsymbol{\iota\kappa\lambda\mu\nu\xi\pi\rho}`             | $\boldsymbol{\iota\kappa\lambda\mu\nu\xi\pi\rho}$             |
|  23 | 粗体希腊字母         | `\boldsymbol{\sigma\tau\upsilon\phi\chi\psi\omega}`           | $\boldsymbol{\sigma\tau\upsilon\phi\chi\psi\omega}$           |
|  24 | 粗体希腊字母         | `\boldsymbol{\varepsilon\digamma\varkappa\varpi}`             | $\boldsymbol{\varepsilon\digamma\varkappa\varpi}$             |
|  25 | 粗体希腊字母         | `\boldsymbol{\varrho\varsigma\vartheta\varphi}`               | $\boldsymbol{\varrho\varsigma\vartheta\varphi}$               |
|  26 | 斜体（拉丁字母默认）     | `\mathit{0123456789}`                                         | $\mathit{0123456789}$                                         |
|  27 | 斜体希腊字母（小写字母默认） | `\mathit{AB\Gamma\Delta EZH\Theta}`                           | $\mathit{AB\Gamma\Delta EZH\Theta}$                           |
|  28 | 斜体希腊字母（小写字母默认） | `\mathit{IK\Lambda MN\Xi O\Pi P}`                             | $\mathit{IK\Lambda MN\Xi O\Pi P}$                             |
|  29 | 斜体希腊字母（小写字母默认） | `\mathit{P\Sigma T\Upsilon \Phi X\Psi \Omega}`                | $\mathit{P\Sigma T\Upsilon \Phi X\Psi \Omega}$                |
|  30 | 罗马体            | `\mathrm{ABCDEFGHI}`                                          | $\mathrm{ABCDEFGHI}$                                          |
|  31 | 罗马体            | `\mathrm{JKLMNOPQR}`                                          | $\mathrm{JKLMNOPQR}$                                          |
|  32 | 罗马体            | `\mathrm{STUVWXYZ}`                                           | $\mathrm{STUVWXYZ}$                                           |
|  33 | 罗马体            | `\mathrm{abcdefghijklm}`                                      | $\mathrm{abcdefghijklm}$                                      |
|  34 | 罗马体            | `\mathrm{nopqrstuvwxyz}`                                      | $\mathrm{nopqrstuvwxyz}$                                      |
|  35 | 罗马体            | `\mathrm{0123456789}`                                         | $\mathrm{0123456789}$                                         |
|  36 | 无衬线体           | `\mathsf{ABCDEFGHI}`                                          | $\mathsf{ABCDEFGHI}$                                          |
|  37 | 无衬线体           | `\mathsf{JKLMNOPQR}`                                          | $\mathsf{JKLMNOPQR}$                                          |
|  38 | 无衬线体           | `\mathsf{STUVWXYZ}`                                           | $\mathsf{STUVWXYZ}$                                           |
|  39 | 无衬线体           | `\mathsf{abcdefghijklm}`                                      | $\mathsf{abcdefghijklm}$                                      |
|  40 | 无衬线体           | `\mathsf{nopqrstuvwxyz}`                                      | $\mathsf{nopqrstuvwxyz}$                                      |
|  41 | 无衬线体           | `\mathsf{0123456789}`                                         | $\mathsf{0123456789}$                                         |
|  42 | 无衬线体希腊字母（仅大写）  | `\mathsf{A B \Gamma \Delta E Z H \Theta}`                     | $\mathsf{A B \Gamma \Delta E Z H \Theta}$                     |
|  43 | 无衬线体希腊字母（仅大写）  | `\mathsf{I K \Lambda M N \Xi \Pi P}`                          | $\mathsf{I K \Lambda M N \Xi \Pi P}$                          |
|  44 | 无衬线体希腊字母（仅大写）  | `\mathsf{\Sigma T \Upsilon \Phi X \Psi \Omega}`               | $\mathsf{\Sigma T \Upsilon \Phi X \Psi \Omega}$               |
|  45 | 手写体/花体         | `\mathcal{ABCDEFGHI}`                                         | $\mathcal{ABCDEFGHI}$                                         |
|  46 | 手写体/花体         | `\mathcal{JKLMNOPQR}`                                         | $\mathcal{JKLMNOPQR}$                                         |
|  47 | 手写体/花体         | `\mathcal{STUVWXYZ}`                                          | $\mathcal{STUVWXYZ}$                                          |
|  48 | Fraktur体       | `\mathfrak{ABCDEFGHI}`                                        | $\mathfrak{ABCDEFGHI}$                                        |
|  49 | Fraktur体       | `\mathfrak{JKLMNOPQR}`                                        | $\mathfrak{JKLMNOPQR}$                                        |
|  50 | Fraktur体       | `\mathfrak{STUVWXYZ}`                                         | $\mathfrak{STUVWXYZ}$                                         |
|  51 | Fraktur体       | `\mathfrak{abcdefghijklm}`                                    | $\mathfrak{abcdefghijklm}$                                    |
|  52 | Fraktur体       | `\mathfrak{nopqrstuvwxyz}`                                    | $\mathfrak{nopqrstuvwxyz}$                                    |
|  53 | Fraktur体       | `\mathfrak{0123456789}`                                       | $\mathfrak{0123456789}$                                       |
|  54 | 小型手写体          | `{\scriptstyle\text{abcdefghijklm}}`                          | ${\scriptstyle\text{abcdefghijklm}}$                          |
|     |                |                                                               |                                                               |

## 08 混合字体

|    | type                                     | code                          | value                         |
|---:|:-----------------------------------------|:------------------------------|:------------------------------|
|  0 | 斜体字符（忽略空格）                     | `x y z`                       | $x y z$                       |
|  1 | 非斜体字符                               | `\text{x y z}`                | $\text{x y z}$                |
|  2 | 混合斜体（差）                           | `\text{if} n \text{is even}`  | $\text{if} n \text{is even}$  |
|  3 | 混合斜体（好）                           | `\text{if }n\text{ is even}`  | $\text{if }n\text{ is even}$  |
|  4 | 混合斜体（ 替代品：~  或者"\ "强制空格） | `\text{if}~n\ \text{is even}` | $\text{if}~n\ \text{is even}$ |

## 09 括号

|    | type           | code                                                 | value                                                |
|---:|:---------------|:-----------------------------------------------------|:-----------------------------------------------------|
|  0 | 短括号         | `( \frac{1}{2} )`                                    | $( \frac{1}{2} )$                                    |
|  1 | 长括号         | `\left( \frac{1}{2} \right)`                         | $\left( \frac{1}{2} \right)$                         |
|  2 | 圆括号，小括号 | `\left( \frac{a}{b} \right)`                         | $\left( \frac{a}{b} \right)$                         |
|  3 | 方括号，中括号 | `\left[ \frac{a}{b} \right]`                         | $\left[ \frac{a}{b} \right]$                         |
|  4 | 花括号，大括号 | `\left\{ \frac{a}{b} \right\}`                       | $\left\{ \frac{a}{b} \right\}$                       |
|  5 | 角括号         | `\left \langle \frac{a}{b} \right \rangle`           | $\left \langle \frac{a}{b} \right \rangle$           |
|  6 | 单竖线，绝对值 | `\left\| \frac{a}{b} \right\|`                         | $\left\| \frac{a}{b} \right\|$                         |
|  7 | 双竖线，范数   | `\left \| \frac{a}{b} \right \|`                     | $\left \| \frac{a}{b} \right \|$                     |
|  8 | 高斯符号       | `\left \lbrack \frac{a}{b} \right \rbrack`           | $\left \lbrack \frac{a}{b} \right \rbrack$           |
|  9 | 取底符号       | `\left \lfloor \frac{a}{b} \right \rfloor`           | $\left \lfloor \frac{a}{b} \right \rfloor$           |
| 10 | 取顶符号       | `\left \lceil \frac{c}{d} \right \rceil`             | $\left \lceil \frac{c}{d} \right \rceil$             |
| 11 | 斜线与反斜线   | `\left / \frac{a}{b} \right \backslash`              | $\left / \frac{a}{b} \right \backslash$              |
| 12 | 上下箭头       | `\left \uparrow \frac{a}{b} \right \downarrow`       | $\left \uparrow \frac{a}{b} \right \downarrow$       |
| 13 | 上下箭头       | `\left \Uparrow \frac{a}{b} \right \Downarrow`       | $\left \Uparrow \frac{a}{b} \right \Downarrow$       |
| 14 | 上下箭头       | `\left \updownarrow \frac{a}{b} \right \Updownarrow` | $\left \updownarrow \frac{a}{b} \right \Updownarrow$ |
| 15 | 混合括号       | `\left[ 0,1 \right)\left\langle \psi \right\Vert`    | $\left[ 0,1 \right)\left\langle \psi \right\Vert$    |
| 16 | 单左括号       | `\left \{ \frac{a}{b} \right .`                      | $\left \{ \frac{a}{b} \right .$                      |
| 17 | 单右括号       | `\left . \frac{a}{b} \right \}`                      | $\left . \frac{a}{b} \right \}$                      |


注：可以使用 `\big, \Big, \bigg, \Bigg` 控制括号的大小，比如代码`\Bigg ( \bigg [ \Big \{ \big \langle \left | \| \frac{a}{b} \| \right | \big \rangle \Big \} \bigg ] \Bigg )`

显示︰$\Bigg ( \bigg [ \Big \{ \big \langle \left | \| \frac{a}{b} \| \right | \big \rangle \Big \} \bigg ] \Bigg )$

## 10 空格

|     | type     | code                | value               | 宽度                                |
| --: | :------- | :------------------ | :------------------ | :-------------------------------- |
|   0 | 2个quad空格 | `\alpha\qquad\beta` | $\alpha\qquad\beta$ | ${\displaystyle 2m\ }$            |
|   1 | quad空格   | `\alpha\quad\beta`  | $\alpha\quad\beta$  | ${\displaystyle m\ }$             |
|   2 | 大空格      | `\alpha\ \beta`     | $\alpha\ \beta$     | ${\displaystyle {\frac {m}{3}}}$  |
|   3 | 中等空格     | `\alpha\;\beta`     | $\alpha\;\beta$     | ${\displaystyle {\frac {2m}{7}}}$ |
|   4 | 小空格      | `\alpha\,\beta`     | $\alpha\,\beta$     | ${\displaystyle {\frac {m}{6}}}$  |
|   5 | 没有空格     | `\alpha\beta`       | $\alpha\beta$       | ${\displaystyle 0\ }$             |
|   6 | 紧贴       | `\alpha\!\beta`     | $\alpha\!\beta$     | ${\displaystyle -{\frac {m}{6}}}$ |

注意$\TeX$能够自动处理大多数的空格，但是您有时候需要自己来控制。

## 11 颜色

字体颜色︰`{\color{色调}表达式}`

背景颜色︰`{\pagecolor{色调}表达式}`

注︰输入时第一个字母必需以大写输入，如`\color{OliveGreen}`

支持色调表：

| 0                                                | 1                                                | 2                                          | 3                                              |
|:-------------------------------------------------|:-------------------------------------------------|:-------------------------------------------|:-----------------------------------------------|
| $\color {Apricot}{\text{Apricot}}$               | $\color {Aquamarine}{\text{Aquamarine}}$         | $\color {Bittersweet}{\text{Bittersweet}}$ | $\color {Black}{\text{Black}}$                 |
| $\color {Blue}{\text{Blue}}$                     | $\color {BlueGreen}{\text{BlueGreen}}$           | $\color {BlueViolet}{\text{BlueViolet}}$   | $\color {BrickRed}{\text{BrickRed}}$           |
| $\color {Brown}{\text{Brown}}$                   | $\color {BurntOrange}{\text{BurntOrange}}$       | $\color {CadetBlue}{\text{CadetBlue}}$     | $\color {CarnationPink}{\text{CarnationPink}}$ |
| $\color {Cerulean}{\text{Cerulean}}$             | $\color {CornflowerBlue}{\text{CornflowerBlue}}$ | $\color {Cyan}{\text{Cyan}}$               | $\color {Dandelion}{\text{Dandelion}}$         |
| $\color {DarkOrchid}{\text{DarkOrchid}}$         | $\color {Emerald}{\text{Emerald}}$               | $\color {ForestGreen}{\text{ForestGreen}}$ | $\color {Fuchsia}{\text{Fuchsia}}$             |
| $\color {Goldenrod}{\text{Goldenrod}}$           | $\color {Gray}{\text{Gray}}$                     | $\color {Green}{\text{Green}}$             | $\color {GreenYellow}{\text{GreenYellow}}$     |
| $\color {JungleGreen}{\text{JungleGreen}}$       | $\color {Lavender}{\text{Lavender}}$             | $\color {LimeGreen}{\text{LimeGreen}}$     | $\color {Magenta}{\text{Magenta}}$             |
| $\color {Mahogany}{\text{Mahogany}}$             | $\color {Maroon}{\text{Maroon}}$                 | $\color {Melon}{\text{Melon}}$             | $\color {MidnightBlue}{\text{MidnightBlue}}$   |
| $\color {Mulberry}{\text{Mulberry}}$             | $\color {NavyBlue}{\text{NavyBlue}}$             | $\color {OliveGreen}{\text{OliveGreen}}$   | $\color {Orange}{\text{Orange}}$               |
| $\color {OrangeRed}{\text{OrangeRed}}$           | $\color {Orchid}{\text{Orchid}}$                 | $\color {Peach}{\text{Peach}}$             | $\color {Periwinkle}{\text{Periwinkle}}$       |
| $\color {PineGreen}{\text{PineGreen}}$           | $\color {Plum}{\text{Plum}}$                     | $\color {ProcessBlue}{\text{ProcessBlue}}$ | $\color {Purple}{\text{Purple}}$               |
| $\color {RawSienna}{\text{RawSienna}}$           | $\color {Red}{\text{Red}}$                       | $\color {RedOrange}{\text{RedOrange}}$     | $\color {RedViolet}{\text{RedViolet}}$         |
| $\color {Rhodamine}{\text{Rhodamine}}$           | $\color {RoyalBlue}{\text{RoyalBlue}}$           | $\color {RoyalPurple}{\text{RoyalPurple}}$ | $\color {RubineRed}{\text{RubineRed}}$         |
| $\color {Salmon}{\text{Salmon}}$                 | $\color {SeaGreen}{\text{SeaGreen}}$             | $\color {Sepia}{\text{Sepia}}$             | $\color {SkyBlue}{\text{SkyBlue}}$             |
| $\color {SpringGreen}{\text{SpringGreen}}$       | $\color {Tan}{\text{Tan}}$                       | $\color {TealBlue}{\text{TealBlue}}$       | $\color {Thistle}{\text{Thistle}}$             |
| $\color {Turquoise}{\text{Turquoise}}$           | $\color {Violet}{\text{Violet}}$                 | $\color {VioletRed}{\text{VioletRed}}$     | $\color {White}{\text{White}}$                 |
| $\color {WildStrawberry}{\text{WildStrawberry}}$ | $\color {Yellow}{\text{Yellow}}$                 | $\color {YellowGreen}{\text{YellowGreen}}$ | $\color {YellowOrange}{\text{YellowOrange}}$   |

## 12 小型数学公式

此功能并不常用，可以使用 `\begin{smallmatrix}...\end{smallmatrix}`，或直接使用`{{Smallmath}}` 模板：`{{Smallmath|f=  f(x)=5+\frac{1}{5} }}`。

- 行内公式，这样可能并不好看：$f(x)=5+{\frac{1}{5}}$。
- 行内公式，这样可能好看一些：$\begin{smallmatrix} f(x)=5+\frac{1}{5} \end{smallmatrix}$。

