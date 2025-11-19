<script lang="ts" setup>
import VExcerpt from '@@/components/VExcerpt.vue'
import VTag from '@@/components/VTag.vue'
import VTitle from '@@/components/VTitle.vue'
import { data } from '@@/data/excerpts.data'
import { useTheme } from '@@/hooks/useTheme'
import { useI18n } from '@@/lib/i18n'
import { useUrlSearchParams } from '@vueuse/core'
import { computed } from 'vue'

const { t } = useI18n()
const theme = useTheme()

const title = computed(() => t('title.tags', [theme.value.name]))

const query = useUrlSearchParams<{ t: string }>()

const tags = computed(() => {
  const tags: string[] = []

  data.forEach((item) => {
    tags.push(...(item.data.tags || []))
  })

  return [...new Set(tags)]
})

const artilces = computed(() => {
  if (!query.t) {
    return data
  }

  return data.filter((n) => n.data.tags?.includes(query.t))
})

function selectTag(tag: string) {
  if (query.t === tag) {
    query.t = ''
  } else {
    query.t = tag
  }
}
</script>

<template>
  <div>
    <VTitle class="mb-3" :title="title" show-back></VTitle>

    <div class="flex-(~ wrap) gap-2 justify-center">
      <VTag
        class="cursor-pointer"
        @click="selectTag(tag)"
        v-for="tag in tags"
        :class="{ 'is-selected': tag === query.t }"
      >
        {{ tag }}
      </VTag>
    </div>
    <div class="mt-4 pt-4 border-(0 t solid gray-2) flex-(~ col) gap-2">
      <template v-for="o in artilces" :key="o.data.title">
        <VExcerpt v-bind="o.data" :href="o.url"> </VExcerpt>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.is-selected {
  @apply border-bPrimary-4 bg-bPrimary-1;
}
</style>
