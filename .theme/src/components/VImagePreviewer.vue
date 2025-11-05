<script lang='ts' setup>
import { sleep } from '@0x-jerry/utils'
import { computed, reactive, shallowRef } from 'vue'
import VIcon from './VIcon.vue'

const props = defineProps<{
  selector: string
}>()

const imgElements = shallowRef<Element[]>([])

const state = reactive({
  current: 0,
  visible: false,
  visibleClass: false,
  prev: {
    disabled: true,
  },
  next: {
    disabled: true,
  },
})

const totalCount = computed(() => imgElements.value.length)

const actionButtons = [
  {
    name: 'reset',
    icon: 'i-carbon:reset',
    action() {
      // todo
    },
  },
  {
    name: 'rotateLeft',
    icon: 'i-carbon:rotate-counterclockwise',
    action() {
      // todo
    },
  },
  {
    name: 'rotateRight',
    icon: 'i-carbon:rotate-clockwise',
    action() {
      // todo
    },
  },
  {
    name: 'close',
    icon: 'i-carbon:close-large',
    action() {
      hide()
    },
  },
]

function handleClick(e: MouseEvent) {
  const images = document.querySelectorAll(props.selector)

  imgElements.value = Array.from(images)

  const idx = imgElements.value.indexOf(e.target as Element)
  if (idx === -1) {
    return
  }

  state.current = idx
  show()
}

function show() {
  //
  state.visible = true
  state.visibleClass = true
}

async function hide() {
  state.visibleClass = false

  await sleep(150)
  state.visible = false
}

function handlePrev() {
  // todo
}

function handleNext() {
  // todo
}
</script>

<template>
  <div class="v-image-previewer" @click="handleClick">
    <slot></slot>
  </div>

  <Teleport to="body">
    <div class="v-image-previewer-container" v-if="state.visible" :class="{ 'is-visible': state.visibleClass }">
      <div class="v-img-toolbar py-2 px-4 flex items-center" @click.stop>
        <div class="flex-1 font-mono">
          {{ state.current + 1 }} / {{ totalCount }}
        </div>
        <div class="flex gap-4">
          <template v-for="action in actionButtons" :key="action.name">
            <div class="icon-btn" @click="action.action">
              <VIcon :class="action.icon"></VIcon>
            </div>
          </template>
        </div>
      </div>

      <div class="preview-content">
        <div class="content">

        </div>
        <div class="left-btn icon-btn" :class="{ 'is-disabled': state.prev.disabled }" @click.stop="handlePrev">
          <VIcon class="i-carbon:chevron-left"></VIcon>
        </div>
        <div class="right-btn icon-btn" :class="{ 'is-disabled': state.next.disabled }" @click.stop="handleNext">
          <VIcon class="i-carbon:chevron-right"></VIcon>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style lang='less' scoped>
.v-image-previewer {
  display: contents;
}

.v-image-previewer-container {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.8);
  color: white;

  width: 100vw;
  height: 100vh;

  opacity: 0;
  flex-direction: column;

  @apply transition;

  &.is-visible {
    display: flex;
    opacity: 1;

    @starting-style {
      opacity: 0;
    }
  }

  .preview-content {
    flex: 1;
    height: 0;
  }

  .icon-btn {
    @apply hover:bg-bGray-9 w-8 aspect-ratio-square rounded transition cursor-pointer flex items-center justify-center;


    &.is-disabled {
      opacity: 0.5;
      cursor: not-allowed;

      @apply bg-bGray-9;
    }
  }

  .right-btn,
  .left-btn {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

  }

  .left-btn {
    left: 1rem;
  }

  .right-btn {
    right: 1rem;
  }
}
</style>
