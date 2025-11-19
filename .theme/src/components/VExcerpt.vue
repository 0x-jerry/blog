<script lang="ts" setup>
import dayjs from 'dayjs'
import type { ExcerptData } from '../../types'
import VAutoResize from './VAutoResize.vue'
import VLink from './VLink.vue'
import VTag from './VTag.vue'

interface VExcerptProps extends ExcerptData {
  href: string
}

withDefaults(defineProps<VExcerptProps>(), {
  tags: () => [],
})
</script>

<template>
  <div class="flex-(~ col) gap-2 xl:flex-row">
    <div class="flex-(~ wrap) gap-2 items-center">
      <VTag>{{ dayjs.tz(date).format('YYYY-MM-DD') }}</VTag>
      <VLink :href="href">{{ title }}</VLink>
    </div>
    <VAutoResize class="border-(0 b solid bGray-1) mb-2 pb-2 xl:(border-0 mb-0 pb-0)" v-if="tags.length" :list="tags"
      inner-class="xl:(p-0 m-0 border-none) flex gap-2 items-center">
      <template #default="{ item: tag }">
        <VTag :href="`/tags?t=${tag}`">{{ tag }}</VTag>
      </template>
      <template #collapsed="{ items }">
        <VTag :title="items.join(',')">+{{ items.length }}</VTag>
      </template>
    </VAutoResize>
  </div>
</template>

<style scoped>
</style>
