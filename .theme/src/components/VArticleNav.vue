<script lang="ts" setup>
import { type Header } from 'vitepress'
import { useEventListener } from '@vueuse/core'
import { onMounted, ref } from 'vue'
import VNavComp from './VNavComp.vue'
import { toFixed } from '@0x-jerry/utils'

const props = defineProps<{
  headers: Header[]
}>()

const activeAnchor = ref<Header>()
const checkOffsetTop = 200

const scrollContainerEl = ref<HTMLElement | null>()

const percentage = ref('0%')

useEventListener(scrollContainerEl, 'scroll', calcActiveAnchor)

onMounted(() => {
  scrollContainerEl.value = document.getElementById('default-layout')
  console.log(scrollContainerEl.value)

  calcActiveAnchor()
})

function calcActiveAnchor() {
  activeAnchor.value = calcTheLatestAnchor(props.headers) ?? props.headers.at(0)
  percentage.value = calcPercentage()
}

function calcPercentage() {
  if (import.meta.env.SSR) return '0%'

  const h = (scrollContainerEl.value?.scrollHeight || 0) - window.innerHeight
  const y = scrollContainerEl.value?.scrollTop || 0
  return `${toFixed((y / h) * 100, 2)}%`
}

function calcTheLatestAnchor(headers: Header[]): Header | undefined {
  for (const header of [...headers].reverse()) {
    if (header.children.length) {
      const anchor = calcTheLatestAnchor(header.children)
      if (anchor) return anchor
    }

    const target = document.querySelector(header.link)

    const top = target?.getBoundingClientRect().top || Number.POSITIVE_INFINITY

    if (top < checkOffsetTop) {
      return header
    }
  }
}
</script>

<template>
  <div class="v-article-nav" :style="{ '--scroll-progress': percentage }">
    <VNavComp :headers="headers" :active="activeAnchor" />
  </div>
</template>

<style lang="less" scoped>
.v-article-nav {

  &::before,
  &::after {
    content: '';
    position: absolute;
    left: -1px;
    top: 0;

    width: 1px;
    height: 100%;
    @apply bg-bGray-2;
  } 
  
  &::after {
    z-index: 1;
    height: var(--scroll-progress, 0px);
    @apply bg-bPrimary;
  }
}
</style>
