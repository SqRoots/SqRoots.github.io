<script setup lang="ts">
interface FriendLink {
  name: string
  desc: string
  url: string
  logo: string
  border?: boolean
  padding?: number
}

const { list } = defineProps<{
  list: FriendLink[]
}>()
</script>

<template>
  <ul class="friend-links">
    <li v-for="item in list" :key="item.url" class="friend-link">
      <a :href="item.url" target="_blank" rel="noopener noreferrer" class="friend-link-card no-icon">
        <span
          class="logo" :class="{ border: item.border }" :style="{
            padding: item.padding ? `${item.padding}px` : undefined,
          }"
        >
          <img class="no-view" :src="item.logo" :alt="`${item.name} logo`" loading="lazy">
        </span>
        <span class="name">{{ item.name }}</span>
        <span class="desc" :data-full="item.desc">{{ item.desc }}</span>
      </a>
    </li>
  </ul>
</template>

<style scoped>
.friend-links {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 24px 14px;
  list-style: none;
  padding: 0;
  margin-top: 48px;
}

.friend-link {
  width: 160px;
  height: 100%;
  margin: auto;
}

@media (min-width: 640px) {
  .friend-links {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  }
  .friend-link {
    width: 180px;
  }
}

.friend-link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  color: var(--vp-c-text-1);
  text-decoration: none;
  text-align: center;
  font-size: 14px;
  position: relative;
}

.friend-link-card .logo {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 10px;
  overflow: hidden;
  background: var(--vp-c-bg);
}

.friend-link-card .logo.border {
  border: 1px solid var(--vp-c-divider);
}

.friend-link-card .logo img {
  width: 100%;
}

.friend-link-card .name {
  font-weight: 600;
  line-height: 1.4;
}

.friend-link-card .desc {
  width: 100%;
  display: block;
  position: relative;
  height: 0;
  overflow: visible;
  font-size: 0;
  line-height: 0;
  color: transparent;
  pointer-events: none;
}

.friend-link-card .desc::after {
  content: attr(data-full);
  position: absolute;
  top: 0;
  left: 0;
  transform: none;
  min-width: 100%;
  max-width: 260px;
  padding: 6px 8px;
  border-radius: 6px;
  background: var(--vp-c-bg);
  color: #666;
  font-size: 13px;
  line-height: 1.5;
  white-space: normal;
  word-break: break-word;
  box-shadow: 0 2px 8px rgb(0 0 0 / 8%);
  opacity: 0;
  visibility: hidden;
  pointer-events: none;
  z-index: 10;
  transition: opacity 0.2s ease;
}

.friend-link-card:hover .desc,
.friend-link-card:focus-visible .desc,
.friend-link-card:focus-within .desc {
  overflow: visible;
}

.friend-link-card:hover .desc::after,
.friend-link-card:focus-visible .desc::after,
.friend-link-card:focus-within .desc::after {
  opacity: 1;
  visibility: visible;
}
</style>
