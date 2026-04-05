<template>
  <div class="jxg-wrapper">
    <div ref="boardRef" class="jxg-container" :style="{ width, height }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const boardRef = ref(null)

const props = defineProps({
  width: {
    type: String,
    default: '100%'
  },
  height: {
    type: String,
    default: '500px'
  },
  boundingbox: {
    type: Array,
    default: () => [-6, 6, 6, -6]
  },
  axis: {
    type: Boolean,
    default: false
  },
  grid: {
    type: Boolean,
    default: false
  },
  // 新增：保持纵横比
  keepAspectRatio: {
    type: Boolean,
    default: true
  },
  code: {
    type: String,
    default: ''
  }
})

let board = null

// 加载 JSXGraph
function loadJSXGraph() {
  return new Promise((resolve) => {
    if (window.JXG) return resolve()
    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = 'https://cdn.jsdelivr.net/npm/jsxgraph@1.9.1/distrib/jsxgraph.css'
    document.head.appendChild(css)

    const script = document.createElement('script')
    script.src = 'https://cdn.jsdelivr.net/npm/jsxgraph@1.9.1/distrib/jsxgraphcore.js'
    script.onload = resolve
    document.body.appendChild(script)
  })
}

onMounted(async () => {
  await loadJSXGraph()
  if (!boardRef.value) return

  board = window.JXG.JSXGraph.initBoard(boardRef.value, {
    boundingbox: props.boundingbox,
    axis: props.axis,
    grid: props.grid,
    keepAspectRatio: props.keepAspectRatio,
    showNavigation: false,
    showCopyright: false,

    // 网格不密集 + 更美观
    gridX: 1,
    gridY: 1,
    ticksX: 1,
    ticksY: 1
  })

  if (props.code) {
    try {
      new Function('board', props.code)(board)
    } catch (e) {
      console.error('JSXGraph 绘图错误：', e)
    }
  }
})

defineExpose({
  destroy() {
    board?.clear()
  }
})
</script>

<style scoped>
.jxg-wrapper {
  width: 100%;
  display: flex;
  justify-content: center; /* 非100%宽度时自动水平居中 */
  margin: 20px 0;
}
.jxg-container {
  border: 1px solid #eee;
  border-radius: 8px;
}
</style>