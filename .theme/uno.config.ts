import { presetBrand } from '@0x-jerry/unocss-preset-brand'
import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetIcons(),
    presetWind3(),
    presetAttributify(),
    presetBrand({
      brand: {
        primary: 'rose',
        gray: 'gray',
      },
    }),
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
