---
draft: true
title: Test JSXGraph
createTime: 2026/04/05 12:38:17
permalink: /puzzle/c638ma9l/
---

# JSXGraph 几何画板

<JSXGraph
  width="500px"
  height="450px"
  :boundingbox="[-8, 6, 8, -6]"
  :code="`
    const A = board.create('point', [1,2], {name:'A'})
    const B = board.create('point', [3,-1], {name:'B'})
    board.create('segment', [A,B])
  `"
/>

<JSXGraph height="400px" axis
:code="`
  const p1 = board.create('point', [0,3])
  const p2 = board.create('point', [-3,-1])
  const p3 = board.create('point', [3,-1])
  board.create('polygon', [p1,p2,p3])
`" />

<JSXGraph height="400px" grid
:code="`
  const p1 = board.create('point', [0,3])
  const p2 = board.create('point', [-3,-1])
  const p3 = board.create('point', [3,-1])
  board.create('polygon', [p1,p2,p3])
`" />

<JSXGraph height="400px" axis :keepAspectRatio="false"
:code="`
  const p1 = board.create('point', [0,3])
  const p2 = board.create('point', [-3,-1])
  const p3 = board.create('point', [3,-1])
  board.create('polygon', [p1,p2,p3])
`" />
