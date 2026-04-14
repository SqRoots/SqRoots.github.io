<script setup lang="ts">
import { computed } from 'vue'

type PresetColor = 'theme' | 'accent' | 'red' | 'orange' | 'yellow' | 'green' | 'cyan' | 'blue' | 'purple'

interface Props {
  text?: string
  url?: string
  icon?: string
  color?: string
  newTab?: boolean
  size?: 'md' | 'xs'
}

const props = withDefaults(defineProps<Props>(), {
  text: '按钮',
  url: '#',
  icon: '',
  color: 'theme',
  size: 'md',
})

const presetColorMap: Record<PresetColor, string> = {
  theme: 'var(--vp-c-brand-1)',
  accent: 'var(--vp-c-brand-2)',
  red: '#ef4444',
  orange: '#f59e0b',
  yellow: '#eab308',
  green: '#10b981',
  cyan: '#06b6d4',
  blue: '#3b82f6',
  purple: '#8b5cf6',
}

const isExternal = computed(() => /^(https?:)?\/\//.test(props.url) || props.url.startsWith('mailto:'))

const openInNewTab = computed(() => props.newTab ?? isExternal.value)

const rel = computed(() => (openInNewTab.value ? 'noopener noreferrer' : undefined))

const normalizeColor = (input: string): string => {
  const value = input.trim()
  if (!value) return presetColorMap.theme
  const key = value.toLowerCase() as PresetColor
  if (key in presetColorMap) return presetColorMap[key]
  return value
}

const resolvedBg = computed(() => {
  return normalizeColor(props.color)
})

const iconSrc = computed(() => {
  const value = props.icon.trim()
  if (!value) return ''
  if (/^(https?:)?\/\//.test(value) || value.startsWith('/')) return value
  if (value.includes(':')) return `https://api.iconify.design/${encodeURIComponent(value)}.svg`
  return ''
})

const iconText = computed(() => {
  return iconSrc.value ? '' : props.icon.trim()
})

const buttonStyle = computed(() => ({
  '--action-btn-bg': resolvedBg.value,
}))
</script>

<template>
  <a
    class="action-btn no-icon"
    :class="{ 'action-btn--xs': size === 'xs' }"
    :href="url"
    :target="openInNewTab ? '_blank' : undefined"
    :rel="rel"
    :style="buttonStyle"
  >
    <img v-if="iconSrc" class="action-btn__icon-img" :src="iconSrc" alt="" loading="lazy">
    <span v-else-if="iconText" class="action-btn__icon">{{ iconText }}</span>
    <span class="action-btn__text">{{ text }}</span>
  </a>
</template>

<style scoped>
.action-btn {
  --action-btn-bg: var(--vp-c-brand-1);
  --action-btn-bg-soft: color-mix(in srgb, var(--action-btn-bg) 16%, transparent);
  --action-btn-bd: color-mix(in srgb, var(--action-btn-bg) 34%, transparent);
  --action-btn-bg-hover: color-mix(in srgb, var(--action-btn-bg) 24%, transparent);

  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  min-height: 34px;
  padding: 7px 12px;
  border-radius: 999px;
  border: 1px solid var(--action-btn-bd);
  background: var(--action-btn-bg-soft);
  color: color-mix(in srgb, var(--action-btn-bg) 82%, #111);
  font-weight: 650;
  font-size: 14px;
  line-height: 1;
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.2s ease, background-color 0.2s ease, border-color 0.2s ease;
  box-shadow: 0 4px 14px -12px color-mix(in srgb, var(--action-btn-bg) 50%, transparent);
}

.action-btn:hover {
  background: var(--action-btn-bg-hover);
  transform: translateY(-1px);
  border-color: color-mix(in srgb, var(--action-btn-bg) 46%, transparent);
}

.action-btn:active {
  transform: translateY(0);
}

.action-btn:focus-visible {
  outline: 2px solid color-mix(in srgb, var(--action-btn-bg) 55%, #fff);
  outline-offset: 2px;
}

.action-btn__icon {
  font-size: 15px;
  line-height: 1;
}

.action-btn__icon-img {
  display: inline-block;
  width: 18px !important;
  height: 18px !important;
  min-width: 18px;
  max-width: 18px !important;
  margin: 0 !important;
  padding: 0;
  flex: 0 0 18px;
  object-fit: contain;
  vertical-align: middle;
}

.action-btn__text {
  line-height: 1;
}

.action-btn--xs {
  min-height: 26px;
  padding: 4px 9px;
  font-size: 12px;
  gap: 6px;
}
</style>
