<script lang='ts' setup>
import '../lib/img-previewer/index.less'
import VIcon from './VIcon.vue';

const props = defineProps<{
  selector: string
}>()


function handleClick(e: MouseEvent) {
  // 

}

</script>

<template>
  <div class="v-image-previewer" @click="handleClick">
    <slot></slot>
  </div>

  <div class="img-pre__container">
    <div class="img-pre__header img-pre__animated">
      <div class="img-pre__nums">
        <p>
          <span id="img-pre__current-index"></span>
          <span class="img-pre__nums-delimiter">/</span>
          <span id="img-pre__total-index"></span>
        </p>
      </div>
      <div class="img-pre__buttons" id="J_header-buttons">
        <button class="img-pre__button-item" data-action="reset">
          <VIcon class="i-carbon:reset" />
        </button>
        <button class="img-pre__button-item" data-action="rotateLeft">
          <VIcon class="i-carbon:rotate-counterclockwise" />
        </button>
        <button class="img-pre__button-item" data-action="rotateRight">
          <VIcon class="i-carbon:rotate-clockwise" />
        </button>
        <button class="img-pre__button-item" data-action="close">
          <VIcon class="i-carbon:close-large" />
        </button>
      </div>
    </div>
    <div class="img-pre__content-wrapper" id="J_content-wrapper">
      <div class="img-pre__img-item img-pre__animated current-index" id="J_current-index">
        <img alt="" id="img-pre__image" src="" />
      </div>
    </div>
  </div>
</template>

<style lang='less'>
.v-image-previewer {
  display: contents;
}
</style>
