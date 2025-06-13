<script lang="ts" setup>
import { useAsyncData } from '@0x-jerry/vue-kit'
import { computed } from 'vue'

const hitokoto = useAsyncData(fetchHitokoto, {})
hitokoto.load()

async function fetchHitokoto() {
  const url = `https://0x-jerry.icu/api/hitokoto?t=${new Date().getTime()}`
  const resp = await (await fetch(url)).json()
  return resp.data
}

const from = computed(() => {
  const data = hitokoto.data.value

  return [data.from, data.from_who].filter(Boolean).join(' - ')
})
</script>

<template>
  <div class="text-lg">
    <div class="v-sentence text-center px-4">
      <template v-if="hitokoto.isLoading.value">
        <div class="flex justify-center py-4 gap-2">
          <div>Loading</div>
          <div class="flex gap-1 justify-center relative top-1">
            <span class="dot" v-for="_ in 3">•️</span>
          </div>
        </div>
      </template>
      <template v-else>
        <p class="font-italic">「 {{ hitokoto.data.value?.hitokoto }} 」</p>
        <p class="text-right">--- {{ from }}</p>
      </template>
    </div>
  </div>
</template>

<style lang="less" scoped>
.dot {
  @apply block animate-bounce;

  &:nth-child(1n) {
    animation-delay: 0ms;
  }

  &:nth-child(2n) {
    animation-delay: 100ms;
  }

  &:nth-child(3n) {
    animation-delay: 200ms;
  }
}
</style>
