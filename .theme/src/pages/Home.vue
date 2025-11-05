<script setup lang="ts">
import VExcerpt from '@@/components/VExcerpt.vue'
import VTitle from '@@/components/VTitle.vue'
import { data } from '@@/data/excerpts.data'
import { useTheme } from '@@/hooks/useTheme'
import { useI18n } from '@@/lib/i18n'
import { computed } from 'vue'

const theme = useTheme()

const { t } = useI18n()

const title = t('title.index', [theme.value.name])

const articles = computed(() =>
  import.meta.env.DEV ? data : data.filter((n) => n.data.publish),
)
</script>

<template>
  <VTitle class="mb-4" :title="title"></VTitle>
  <div class="description">
    <Content></Content>
  </div>
  <div class="flex-(~ col) gap-2">
    <template v-for="o in articles" :key="o.data.title">
      <VExcerpt v-bind="o.data" :href="o.url"> </VExcerpt>
    </template>
  </div>
</template>

<style scoped>
ul {
  padding-left: 0;
}

li {
  list-style: none;
}
</style>
