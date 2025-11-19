<script lang="ts" setup generic="T">
import { useElementSize } from '@vueuse/core'
import { computed, nextTick, ref, watch } from 'vue'

const props = defineProps<{
  innerClass?: any
  itemKey?: string
  list: T[]
}>()

const wrapperEl = ref<HTMLElement>()

const hideCount = ref(0)

const wrapperSize = useElementSize(wrapperEl)

watch(wrapperSize.width, calcHideCount)

const splittedList = computed(calcSplitList)

async function calcHideCount() {
  const el = wrapperEl.value
  if (!el) return

  let previousHideCount = hideCount.value

  while (props.list.length > 1) {
    const hasScrollbar = el.scrollWidth > el.clientWidth

    const len = props.list.length
    const max = len - 1
    const _nextHideCount = hasScrollbar
      ? previousHideCount + 1
      : previousHideCount - 1

    const nextHideCount =
      _nextHideCount >= 0 && _nextHideCount <= max ? _nextHideCount : false

    if (nextHideCount === false) {
      break
    }

    hideCount.value = nextHideCount
    await nextTick()

    const checkHasScrollbarAgain = el.scrollWidth > el.clientWidth
    if (hasScrollbar && !checkHasScrollbarAgain) {
      break
    }

    if (!hasScrollbar && checkHasScrollbarAgain) {
      hideCount.value = previousHideCount
      break
    }

    previousHideCount = nextHideCount
  }
}

function calcSplitList() {
  const result = {
    left: [] as T[],
    right: [] as T[],
  }

  if (!props.list.length) {
    return result
  }

  if (!hideCount.value) {
    result.left = [...props.list]
    return result
  }

  result.right = props.list.slice(-hideCount.value)
  result.left = props.list.slice(0, -hideCount.value)

  return result
}
</script>

<template>
  <div class="v-ar-wrapper" ref="wrapperEl">
    <div class="v-ar-inner" :class="innerClass">
      <template v-for="item in splittedList.left" :key="item">
        <slot :item="item"></slot>
      </template>
      <slot name="collapsed" v-if="splittedList.right.length" :items="splittedList.right"></slot>
    </div>
  </div>
</template>

<style lang="less" scoped>
.v-ar-wrapper {
  overflow: hidden;
}

.v-ar-inner {
  width: fit-content;
}
</style>
