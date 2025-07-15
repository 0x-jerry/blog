<script lang="ts" setup>
import { useMounted } from '@vueuse/core'

const mounted = useMounted()
</script>

<template>
  <ClientOnly>
    <Teleport v-if="mounted" to="#layout-content-right">
      <slot></slot>
    </Teleport>
  </ClientOnly>
</template>
