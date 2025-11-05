<script lang="ts" setup>
import { randomBrand } from '@@/hooks/useBrand'
import VIcon from './VIcon.vue'
</script>

<template>
  <VIcon class="i-carbon:color-palette cursor-pointer hover:text-bPrimary" title="Change brand color"
    @click="randomBrand" />
</template>

<style lang="less" scoped></style>
