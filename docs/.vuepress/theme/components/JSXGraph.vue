<template>
  <div ref="boardRef" class="jxg-container" :style="{ height }"></div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'

const boardRef = ref(null)
const props = defineProps({
  height: {
    type: String,
    default: '500px'
  },
  code: {
    type: String,
    default: ''
  }
})

// 加载资源（只加载一次）
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

// 初始化画板
let board = null
onMounted(async () => {
  await loadJSXGraph()

  if (boardRef.value) {
    board = window.JXG.JSXGraph.initBoard(boardRef.value, {
      boundingbox: [-6, 6, 6, -6],
      axis: true,
      grid: true
    })

    // 执行用户写的绘图代码
    if (props.code) {
      try {
        new Function('board', props.code)(board)
      } catch (e) {
        console.error('绘图错误：', e)
      }
    }
  }
})

// 切换页面时销毁画板
defineExpose({
  destroy() {
    if (board) board.clear()
  }
})
</script>

<style scoped>
.jxg-container {
  width: 100%;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 20px 0;
}
</style>