<script lang="ts" setup>
import { useWindowScroll } from '@vueuse/core'
import { TocLink } from 'virtual:blog'
import { onMounted, ref, watchEffect } from 'vue'

const props = defineProps<{ toc: TocLink[] }>()

const pos = useWindowScroll()

const activeLabel = ref('')

function updateToc() {
  if (import.meta.env.SSR) return

  const y = pos.y.value

  activeLabel.value = ''

  for (let idx = 0; idx < props.toc.length; idx++) {
    const toc = props.toc[idx]

    const el = document.getElementById(toc.id)
    if (!el) return

    const top = el.offsetTop - 70

    if (y <= top) {
      activeLabel.value = (props.toc[idx - 1] || props.toc[idx]).label
      break
    }
  }

  if (!activeLabel.value) {
    activeLabel.value = props.toc[props.toc.length - 1]?.label || ''
  }
}

onMounted(() => updateToc())
watchEffect(() => updateToc())
</script>

<template>
  <ul class="v-post-toc">
    <li v-for="o in toc">
      <v-link :href="`#${o.id}`" theme="text">
        <span
          :class="[{ active: o.label === activeLabel }, `level level-${o.level}`]"
          text="gray-300 hover:gray-500"
          transition="~ colors"
        >
          {{ o.label }}
        </span>
      </v-link>
    </li>
  </ul>
</template>

<style lang="less" scoped>
.level {
  &-2 {
    padding: 0;
  }

  &-3 {
    padding-left: 1em;
  }

  &-4 {
    padding-left: 2em;
  }

  &.active {
    @apply text-gray-600;
  }
}
</style>