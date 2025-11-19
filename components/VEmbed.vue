<script lang="ts" setup>
import { type CSSProperties, computed } from 'vue'
import IframePreview, { type IFramePreviewProps } from './IframePreview.vue'

const props = withDefaults(
  defineProps<{
    type?: 'iframe'
    data: IFramePreviewProps
    width?: number | string
    height?: number | string
    aspect?: string
  }>(),
  {
    type: 'iframe',
    width: '100%',
    aspect: '16/9',
  },
)

const style = computed(() => {
  const s: CSSProperties = {
    aspectRatio: props.aspect,
    width: props.width,
    height: props.height,
  }

  return s
})
</script>

<template>
  <IframePreview :style="style" v-bind="data" />
</template>

<style lang="less" scoped></style>
