<script setup lang="ts">
import VImageCard from '@@/components/VImageCard.vue'
</script>

<template>
  <div class="flex-(~ col) items-center gap-4 mt-3">
    <div class="rainbow w-full p-10">
      <div class="heti max-w-full">
        <Content></Content>
      </div>
    </div>

    <VImageCard></VImageCard>
  </div>
</template>

<style lang="less" scoped>
:root {
  --angle: 45deg;
  --opacity: 0.5;
}

.rainbow {
  --border-size: 0.3rem;
  border: var(--border-size) solid transparent;

  /* Paint an image in the border */
  border-image: conic-gradient(
      from var(--angle),
      #d53e33 0deg 90deg,
      #fbb300 90deg 180deg,
      #377af5 180deg 270deg,
      #399953 270deg 360deg
    )
    1 stretch;
  background: rgb(255 255 255 / var(--opacity));
}

/* Animate when Houdini is available */
@supports (background: paint(houdini)) {
  @property --opacity {
    syntax: '<number>';
    initial-value: 0.5;
    inherits: false;
  }

  @property --angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }

  @keyframes opacityChange {
    to {
      --opacity: 1;
    }
  }

  @keyframes rotate {
    to {
      --angle: 360deg;
    }
  }

  .rainbow {
    animation: rotate 4s linear infinite, opacityChange 3s infinite alternate;
  }
}
</style>
