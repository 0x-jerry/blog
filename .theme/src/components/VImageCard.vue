<script lang="ts" setup>
import VSentence from './VSentence.vue'
</script>

<template>
  <div
    class="relative border-(1 solid gray-100) bg-black"
    style="width: 100%; aspect-ratio: 16 / 9; max-height: 500px"
  >
    <img
      class="block object-cover w-full h-full"
      src="https://0x-jerry.icu/api/img"
    />
    <div
      class="w-full h-full absolute top-0 left-0 flex items-center justify-center"
    >
      <div
        class="w-4/5 bg-(black opacity-10) rounded-lg backdrop-(filter blur-sm) text-(white sm)"
        style="text-shadow: 0 0 2px rgb(240, 240, 240)"
      >
        <ClientOnly>
          <VSentence> </VSentence>
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
