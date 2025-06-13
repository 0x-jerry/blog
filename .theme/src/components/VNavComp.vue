<script lang="ts" setup>
import { type Header } from 'vitepress'
import NavComp from './VNavComp.vue'
import VLink from './VLink.vue'

const porps = defineProps<{
  headers: Header[]
  active?: Header
  child?: boolean
}>()

</script>

<template>
  <ul>
    <li v-for="header in headers" class="truncate">
      <VLink class="inline!" :href="header.link" theme="gray" :active="active === header">
        {{ header.title }}
      </VLink>
      <NavComp v-if="header.children" :headers="header.children" :active="active" child />
    </li>
  </ul>
</template>

<style lang="less" scoped>
li {
  margin-bottom: 4px;

  &:last-child {
    margin-bottom: 0;
  }

  ul {
    margin-top: 4px;
  }
}

ul {
  padding-left: 0;
}

li {
  ul {
    padding-left: 1rem;
  }
}
</style>
