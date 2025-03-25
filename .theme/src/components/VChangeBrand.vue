<script lang="ts" setup>
import VIcon from './VIcon.vue'
import { randomBrand } from '@@/hooks/useBrand'
</script>

<template>
  <VIcon class="i-carbon:color-palette cursor-pointer hover:text-bPrimary" title="Change brand color"
    @click="randomBrand" />
</template>

<style lang="less" scoped></style>
