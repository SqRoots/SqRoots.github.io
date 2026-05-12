---
title: 格言
createTime: 2026/04/05 20:03:17
pageLayout: page
permalink: /motto/
---


<div class="motto">
    <br/>
    <div class="motto_content"><p id="motto_content" motto-id="1" style="text-align:center;white-space:pre-wrap;">{{ displayText }}</p></div>
    <br>
    <div id="motto_author" class="motto_author">{{ displayAuthor }}</div>
    <br>
    <button class="btn btn-primary" @click="changeText">更换一条</button>
    <br><br>
    <button class="btn btn-secondary" @click="copyURLtoClipboard">分享链接</button>
    <br><br>
    <a href="https://fc-data.lixuan.xyz/motto/admin.html" target="_blank" style="position:fixed; bottom:100px; transform: translate(-50%, 0); color: rgba(128,128,128,0.01);">编辑格言</a>
</div>

<script setup>
import { ref } from 'vue'
import { Layout } from 'vuepress-theme-plume/client'

// 定义要展示的文字（响应式数据）
const displayText = ref('客官别急，一大波格言正在赶来')
const displayAuthor = ref('. . . Loading . . .')

// ===== 一次性加载全部数据 =====
let motto_list = [];
let motto = null;
let url_motto_id = getURLMottoID();
loadAllData();

// 修改文字的方法
const changeText = () => {
    motto = updateMotto();
    if(motto && motto.content !== undefined){
      displayText.value = motto.content || '客官别急，一大波格言正在赶来';
      displayAuthor.value = formatDisplayAuthor(motto);
    }

}

async function loadAllData() {
  try {
    const res = await fetch(
      'https://oss1.ali.lixuan.xyz/fc--data/motto/data.txt',
      { headers: {"Content-Type": "application/json; charset=utf-8"} });
    const text = await res.text();
    motto_list = JSON.parse('['+text.trim().slice(0,-1)+']');
  } catch (e) {
    motto_list = [];
  }
  motto_list = [...motto_list];

    // 初始化元素内容
    motto = updateMotto(url_motto_id);
    if(motto && motto.content !== undefined){
      displayText.value = motto.content || '客官别急，一大波格言正在赶来';
      displayAuthor.value = formatDisplayAuthor(motto)
    }
}

function formatDisplayAuthor(motto) {
  const author = (motto?.author || '').trim();
  const source = (motto?.source || '').trim();
  const displaySource = source === '不详' ? '' : source;
  const displayName = author && author !== '佚名' ? author : displaySource || '佚名';

  return `—— ${displayName} ——`;
}

// 随机抽取一条格式，并展示
function updateMotto(id) {
  if(typeof document !== "undefined"){
    const mottoContentEl = document.getElementById("motto_content");

    if(id==null){
      // 随机抽取一条格言
      const old_id = mottoContentEl?.getAttribute('motto-id') || motto?.id;
      motto = getRandomMottoExcept(old_id);
    } else {
      // 按id取格言
      motto = getMottoByID(id) || getRandomMottoExcept()
    }

    if(!motto){
      return null;
    }

    // 更新 id
    mottoContentEl?.setAttribute('motto-id', motto.id);
    setURLMottoID(motto.id);
    displayText.value = motto.content || '客官别急，一大波格言正在赶来';
    displayAuthor.value = formatDisplayAuthor(motto)
    return motto;
    // // 更新 格言内容
    // document.getElementById("motto_content").innerHTML = motto.content.replaceAll('\n', '<br>') + '<br>';
    // // 更新 作者
    // document.getElementById("motto_author").innerHTML = "—— " + motto.author + " ——";
  }
}
// 复制分享链接到剪切板
function copyURLtoClipboard(){
  if (typeof window !== "undefined") {
    navigator.clipboard.writeText(window.location.href)
  }
}
// 按id取格言
function getMottoByID(id){
  for (let v of motto_list) {
  if(String(v.id) === String(id)){return v}
  }
}
// 按序号取格言
// function getMottoByIndex(i){
//   return motto_list[i]
// }
function getRandomMottoExcept(old_id) {
  const candidates = old_id == null
    ? motto_list
    : motto_list.filter(item => String(item.id) !== String(old_id));
  const pool = candidates.length > 0 ? candidates : motto_list;

  return pool[Math.floor(Math.random() * pool.length)];
}
// 获取URL中的 id 参数
function getURLMottoID(){
  if (typeof window !== "undefined") {
    const motto_id = new URLSearchParams(window.location.search).get('id');
    return motto_id;
  }
}
// 设置URL中的 id 参数
function setURLMottoID(id){
  if (typeof window !== "undefined") {
    const url = new URL(window.location);
    url.searchParams.set('id', id); // add or update the parameter
    window.history.replaceState({}, '', url); // update the address bar without reload
  }
}
</script>

<style scoped>
.motto{
  text-align: center;
}

:deep(.vp-page) {
  min-height: calc(100vh - var(--vp-nav-height, 0px));
  display: flex;
  align-items: center;
  justify-content: center;
}

:deep(.vp-page) .motto {
  transform: translateY(12px);
}

.motto_content {
  min-height: 200px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
}
.motto_author {
  color: #aaa;
  font-size: 0.8em;
}

    /* 基础现代按钮样式 */
    .btn {
        padding: 12px 28px;
        border: none;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 500;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    
    /* 主按钮（深色渐变） */
    .btn-primary {
        background: #1cd0fd;
        color: #333;
        border: 1px solid #e2e8f0;
    }
    
    /* 次按钮（浅色风格） */
    .btn-secondary {
        background: #ccc;
        color: #333;
        border: 1px solid #e2e8f0;
    }
    
    /* 悬停动画效果 */
    .btn:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    }
    
    /* 点击效果 */
    .btn:active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
</style>
