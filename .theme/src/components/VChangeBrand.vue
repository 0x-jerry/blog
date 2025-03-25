<script lang="ts" setup>
import { rand, useLocalStorage } from '@vueuse/core'
import VIcon from './VIcon.vue'
import { changeBrand } from '@0x-jerry/unocss-preset-brand/runtime'

const grayColors = ['slate', 'gray', 'zinc', 'neutral', 'stone']

const colors = [
  'red',
  'orange',
  'amber',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
]

const brand = useLocalStorage('brand-config', {
  primary: 'rose',
  gray: 'gray'
})


if (!import.meta.env.SSR) {
  changeBrand(brand.value)
}

function randomBrand() {
  const gray = grayColors[rand(0, grayColors.length)]
  const primary = colors[rand(0, colors.length)]
  brand.value = {
    gray,
    primary
  }

  changeBrand(brand.value)
}
</script>

<template>
  <VIcon class="i-carbon:color-palette cursor-pointer hover:text-bPrimary" title="Change brand color"
    @click="randomBrand" />
</template>

<style lang="less" scoped></style>
