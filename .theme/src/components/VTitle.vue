<script lang="ts" setup>
import { useRouter } from 'vitepress'

defineProps<{
  title: string
  showBack?: boolean
}>()

const router = useRouter()

function back() {
  router.go('/')
}
</script>

<template>
  <div class="pt-3 sticky top-0 bg-white pb-2 border-(0 b solid gray-2) z-20">
    <div class="flex items-center pl-2 gap-3 text-xl xl:text-2xl">
      <a v-if="showBack" class="cursor-pointer flex" @click="back">
        <span class="inline-flex text-lg bg-bGray-100 p-1 rounded">
          <i class="i-carbon-arrow-left"></i>
        </span>
      </a>
      <slot>{{ title }} </slot>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
