<script lang="ts" setup>
import VFooter from '@@/components/VFooter.vue'
import LayoutHeader from './components/LayoutHeader.vue'
</script>

<template>
  <div class="default-layout h-screen w-full">
    <div class="text-right" id="layout-content-left">
      <LayoutHeader class="sidebar"></LayoutHeader>
    </div>
    <div class="flex flex-col min-h-screen w-full xl:w-700px xl:mx-0">
      <div class="flex-1">
        <slot></slot>
      </div>

      <div class="mt-6">
        <VFooter />
      </div>
    </div>
    <div class="hidden xl:block" id="layout-content-right">
      <!-- used by Teleport -->
    </div>
  </div>
</template>

<style lang="less" scoped>
.default-layout {
  display: grid;

  grid-template: 
    "nav" 
    "content" 
    "content-nav";
}

#layout-content-left {
  align-self: start;
  z-index: 10;
}

.sidebar {
  display: flex;
}

@media (min-width: 1280px) {
  .default-layout {
    grid-template: 1fr /  1fr auto 1fr;
  }

  .sidebar {
    display: inline-block;
    position: fixed;
    top: 0;
    margin-right: 2rem;

    @apply transition;
    transform: translate(calc(-100% - 2rem), -40px);
    opacity: 0.05;
    filter: blur(2px) grayscale(1);

    &:hover {
      transform: translate(calc(-100% - 2rem), 0);
      opacity: 1;
      filter: none;
    }
  }
}
</style>
