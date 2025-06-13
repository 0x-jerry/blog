<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { useRoute } from 'vitepress'
import VGiscus from '@@/components/VGiscus.vue'
import VTitle from '@@/components/VTitle.vue'
import VArticleNav from '@@/components/VArticleNav.vue'
import LayoutRightSlot from '@@/layout/components/LayoutRightSlot.vue'
import { useWindowScroll } from '@vueuse/core'
import { toFixed } from '@0x-jerry/utils'

const attrs = useAttrs()

const route = useRoute()

const enableComment = computed(() => attrs.comment ?? import.meta.env.PROD)

const headers = computed(() => route.data.headers)

const { y } = useWindowScroll()

const percentage = computed(() => {
  if (import.meta.env.SSR) return 0

  const h = (document.documentElement.scrollHeight || 0) - window.innerHeight
  return `${toFixed((y.value / h) * 100, 2)}%`
})
</script>

<template>
  <div class="v-post">
    <VTitle :title="route.data.title" show-back></VTitle>

    <div class="flex mt-4">
      <div class="post-content flex-1 w-0 px-4 xl:px-2">
        <div class="heti text-left max-w-full" ref="content">
          <Content></Content>

          <div class="pt-6">
            <div class="text-center c-bPrimary-2 text-6xl relative">
              <span> 完 </span>
              <span
                class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block size-1.8em border-(2 dashed bPrimary-1) rounded-full"
              />
            </div>
          </div>
        </div>

        <br />

        <ClientOnly>
          <VGiscus class="mt-8" v-if="enableComment" />
        </ClientOnly>
      </div>
      <LayoutRightSlot v-if="headers.length">
        <div class="post-nav" :style="{ '--scroll-progress': percentage }">
          <VArticleNav :headers="headers" />
        </div>
      </LayoutRightSlot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.post-nav {
  @apply w-300px hidden xl:block;

  position: fixed;
  top: 50%;
  transform: translate(1rem, -50%);
  padding-left: 1rem;

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
