<script lang="ts" setup>
import { useAsyncData } from '@0x-jerry/vue-kit'
import { useRoute } from 'vitepress'

const route = useRoute()

const likesCount = useAsyncData(getCount)
likesCount.load(0)

// todo
async function getCount(likes: number = 0) {
  const resp = await fetch('https://0x-jerry.icu/api/blog/likes', {
    method: 'post',
    body: JSON.stringify({
      path: route.path,
      likes,
    }),
  })

  return resp.json()
}
</script>

<template>
  <div class="heart">
    <div class="icon"></div>
    <div class="count">{{}}</div>
  </div>
</template>

<style lang="less" scoped></style>
