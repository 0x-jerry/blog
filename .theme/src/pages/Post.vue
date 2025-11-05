<script lang="ts" setup>
import VArticleNav from '@@/components/VArticleNav.vue'
import VGiscus from '@@/components/VGiscus.vue'
import VImagePreview from '@@/components/VImagePreviewer.vue'
import VTitle from '@@/components/VTitle.vue'
import LayoutRightSlot from '@@/layout/components/LayoutRightSlot.vue'
import { useRoute } from 'vitepress'
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()

const route = useRoute()

const enableComment = computed(() => attrs.comment ?? import.meta.env.PROD)

const headers = computed(() => route.data.headers)
</script>

<template>
  <div class="v-post">
    <VTitle :title="route.data.title" show-back></VTitle>

    <VImagePreview selector="img">
      <div class="flex mt-4">
        <div class="post-content flex-1 w-0 px-4 xl:px-2">
          <div class="heti text-left max-w-full" ref="content">
            <Content></Content>

            <div class="pt-6">
              <div class="text-center c-bPrimary-2 text-6xl relative">
                <span> 完 </span>
                <span
                  class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 inline-block size-1.8em border-(2 dashed bPrimary-1) rounded-full" />
              </div>
            </div>
          </div>

          <br />

          <ClientOnly>
            <VGiscus class="mt-8" v-if="enableComment" />
          </ClientOnly>
        </div>
      </div>
    </VImagePreview>

    <LayoutRightSlot v-if="headers.length">
      <VArticleNav class="post-nav" :headers="headers" />
    </LayoutRightSlot>
  </div>
</template>

<style lang="less" scoped>
.post-nav {
  @apply hidden xl:block;

  position: fixed;
  top: 50%;
  transform: translate(1rem, -50%);
  padding-left: 1rem;
}
</style>
