import{C as e,L as t,V as n,b as r}from"./vue-C44AmwQs.js";import{t as i}from"./app-D6CO4WHP.js";var a=JSON.parse(`{"path":"/puzzle/c638ma9l/","title":"Test JSXGraph | 谜题","lang":"zh-CN","frontmatter":{"draft":true,"title":"Test JSXGraph","createTime":"2026/04/02 00:00:00","permalink":"/puzzle/c638ma9l/"},"readingTime":{"minutes":1.66,"words":499},"git":{"createdTime":1775379511000,"updatedTime":1778380813000,"contributors":[{"name":"SqRoots","username":"SqRoots","email":"lixuan.xyz@gmail.com","commits":6,"avatar":"https://avatars.githubusercontent.com/SqRoots?v=4","url":"https://github.com/SqRoots"}]},"filePathRelative":"04-趣题-puzzle/00-说明-JSXGraph.md","headers":[],"categoryList":[]}`),o={name:`00-说明-JSXGraph.md`};function s(i,a,o,s,c,l){let u=n(`JSXGraph`);return t(),r(`div`,null,[e(u,{width:`500px`,height:`450px`,boundingbox:[-1,13,9,-1],code:`
    const A = board.create('point', [0,12], {name:'A'})
    const B = board.create('point', [0,0], {name:'B'})
    const C = board.create('point', [8,0], {name:'C'})
    const D = board.create('point', [2,9], {name:'D'})
    const E = board.create('point', [0,9], {name:'E'})
    const F = board.create('point', [2,0], {name:'F'})
    board.create('segment', [A,B])
    board.create('segment', [B,C])
    board.create('segment', [C,A])
    board.create('polygon', [D,E,B,F])
    board.create('text', [0,11, '3'])
    board.create('text', [5,0, '6'])
  `}),e(u,{height:`400px`,boundingbox:[-1,7,9,-1],code:`
// 初始化画布
// 1. 定义直角三角形的三个固定顶点
// B 点作为直角顶点（垂足），置于原点 (0,0)
const pB = board.create('point', [0, 0], { name: 'B', fixed: true, color: 'black' });
const pA = board.create('point', [0, 5], { name: 'A', fixed: true, color: 'black' });
const pC = board.create('point', [7, 0], { name: 'C', fixed: true, color: 'black' });
// 2. 绘制三角形的边
const lineAB = board.create('segment', [pA, pB], { strokeColor: 'black', strokeWidth: 2 });
const lineBC = board.create('segment', [pB, pC], { strokeColor: 'black', strokeWidth: 2 });
const lineAC = board.create('segment', [pA, pC], { strokeColor: 'black', strokeWidth: 3 });
// 3. 在斜边 AC 上创建动点 D
const pD = board.create('glider', [2, 2, lineAC], { name: 'D', color: 'red' });
// 4. 构造垂线段 DE (D 到 AB 的垂线)
// 因为 AB 在 Y 轴上，E 点的坐标始终是 (0, D.y)
const pE = board.create('point', [0, () => pD.Y()], { name: 'E', color: 'blue', size: 2, fixed: true });
const segDE = board.create('segment', [pD, pE], { dash: 2, strokeColor: 'blue' });
// 5. 构造垂线段 DF (D 到 BC 的垂线)
// 因为 BC 在 X 轴上，F 点的坐标始终是 (D.x, 0)
const pF = board.create('point', [() => pD.X(), 0], { name: 'F', color: 'blue', size: 2, fixed: true });
const segDF = board.create('segment', [pD, pF], { dash: 2, strokeColor: 'blue' });
// 6. 添加直角标记
board.create('nonreflexangle', [pA, pB, pC], { radius: 0.5, withLabel: false, type: 'square' });
board.create('nonreflexangle', [pD, pE, pB], { radius: 0.3, withLabel: false, type: 'square' });
board.create('nonreflexangle', [pB, pF, pD], { radius: 0.3, withLabel: false, type: 'square' });
// 7. 填充矩形
board.create('polygon', [pD,pE,pB,pF]);
// 8. 文字
board.create('text', [-0.5,4, '3']);
board.create('text', [5,-0.5, '6']);
board.create('text', [1,2, '矩形面积？']);
`}),e(u,{height:`400px`,grid:``,code:`
  const p1 = board.create('point', [0,3])
  const p2 = board.create('point', [-3,-1])
  const p3 = board.create('point', [3,-1])
  board.create('polygon', [p1,p2,p3])
`}),e(u,{height:`400px`,axis:``,keepAspectRatio:!1,code:`
  const p1 = board.create('point', [0,3])
  const p2 = board.create('point', [-3,-1])
  const p3 = board.create('point', [3,-1])
  board.create('polygon', [p1,p2,p3])
`})])}var c=i(o,[[`render`,s]]);export{a as _pageData,c as default};