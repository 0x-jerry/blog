import { changeBrand } from '@0x-jerry/unocss-preset-brand/runtime'
import { rand, useLocalStorage } from '@vueuse/core'

export const grayColors = ['slate', 'gray', 'zinc', 'neutral', 'stone']

export const brandColors = [
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
  gray: 'gray',
})

export function initBrand() {
  if (!import.meta.env.SSR) {
    changeBrand(brand.value)
  }
}

export function randomBrand() {
  const gray = grayColors[rand(0, grayColors.length)]
  const primary = brandColors[rand(0, brandColors.length)]
  brand.value = {
    gray,
    primary,
  }

  changeBrand(brand.value)
}
