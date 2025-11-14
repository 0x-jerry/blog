<script lang='ts' setup>
import { sleep } from '@0x-jerry/utils'
import { computed, nextTick, reactive, shallowRef, useTemplateRef } from 'vue'
import VIcon from './VIcon.vue'

const props = defineProps<{
  selector: string
}>()

const rootEl = useTemplateRef('rootEl')
const contentEl = useTemplateRef('contentEl')

const imgElements = shallowRef<Element[]>([])

const state = reactive({
  current: 0,
  visible: false,
  visibleClass: false,
})

const elState = {
  currentImg: null as HTMLElement | null,
  currentState: {
    scale: 1,
    x: 0,
    y: 0,
    rotate: 0,
  },
}

const totalCount = computed(() => imgElements.value.length)

const btnStatus = computed(() => {
  const current = state.current
  const total = totalCount.value

  return {
    prev: {
      disabled: current === 0,
    },
    next: {
      disabled: current === total - 1,
    },
  }
})

const actionButtons = [
  {
    name: 'reset',
    icon: 'i-carbon:reset',
    action() {
      resetCurrentImgStyle()
    },
  },
  {
    name: 'rotateLeft',
    icon: 'i-carbon:rotate-counterclockwise',
    action() {
      rotateImage(-90)
    },
  },
  {
    name: 'rotateRight',
    icon: 'i-carbon:rotate-clockwise',
    action() {
      rotateImage(90)
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
  const images = rootEl.value?.querySelectorAll(props.selector) || []

  imgElements.value = Array.from(images)

  const idx = imgElements.value.indexOf(e.target as Element)
  if (idx === -1) {
    return
  }

  state.current = idx
  show()
}

async function show() {
  state.visible = true
  state.visibleClass = true

  await nextTick()

  if (!contentEl.value) return

  const el = cloneElement(state.current)

  elState.currentImg = el

  resetCurrentImgStyle()

  contentEl.value.appendChild(el)
}

async function hide() {
  state.visibleClass = false

  await sleep(150)
  state.visible = false

  elState.currentImg = null
}

function handlePrev() {
  if (btnStatus.value.prev.disabled) {
    return
  }

  const currentImg = elState.currentImg

  if (currentImg) {
    currentImg.addEventListener('transitionend', () => {
      currentImg.remove()
    })

    const transformStr = `translate(100%, -50%) scale(1) rotate(0deg)`
    currentImg.style.transform = transformStr
  }

  elState.currentImg = null
  state.current -= 1

  // new img
  const el = cloneElement(state.current)
  elState.currentImg = el
  contentEl.value?.appendChild(el)

  resetCurrentImgState()

  requestAnimationFrame(() => {
    applyCurrentImageStyle()
  })
}

function handleNext() {
  if (btnStatus.value.next.disabled) {
    return
  }

  const currentImg = elState.currentImg

  if (currentImg) {
    currentImg.addEventListener('transitionend', () => {
      currentImg.remove()
    })

    const transformStr = `translate(-200%, -50%) scale(1) rotate(0deg)`
    currentImg.style.transform = transformStr
  }

  elState.currentImg = null
  state.current += 1

  // new img
  const el = cloneElement(state.current)
  elState.currentImg = el
  contentEl.value?.appendChild(el)

  resetCurrentImgState()

  requestAnimationFrame(() => {
    applyCurrentImageStyle()
  })
}

function resetCurrentImgState() {
  elState.currentState.scale = 1
  elState.currentState.x = 0
  elState.currentState.y = 0
  elState.currentState.rotate = 0
}

function resetCurrentImgStyle() {
  resetCurrentImgState()
  applyCurrentImageStyle()
}

function rotateImage(deg: number) {
  elState.currentState.rotate += deg

  applyCurrentImageStyle()
}

function cloneElement(index: number) {
  const el = imgElements.value[index]?.cloneNode() as HTMLElement

  if (!el) {
    throw new Error(`index ${index} is out of range`)
  }

  el.style.position = 'absolute'
  el.style.maxHeight = '80%'
  el.style.maxWidth = '80%'
  el.style.top = '50%'
  el.style.left = '50%'
  el.style.transition = 'transform .4s ease'
  el.style.transform = 'translate(100%, -50%)'

  return el
}

// todo, support mobile gestures
function handleResize(evt: WheelEvent) {
  const step = 0.1
  let scale = elState.currentState.scale + (evt.deltaY < 0 ? 1 : -1) * step

  scale = Math.max(0.1, Math.min(scale, 5))

  elState.currentState.scale = scale

  applyCurrentImageStyle()
}

function applyCurrentImageStyle() {
  if (!elState.currentImg) {
    return
  }

  const { scale, x, y, rotate } = elState.currentState
  const transformStr = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px)) scale(${scale}) rotate(${rotate}deg)`
  elState.currentImg.style.transform = transformStr
}

function handleContentClick(e: MouseEvent) {
  if (e.target !== e.currentTarget) {
    e.stopPropagation()
  }
}
</script>

<template>
  <div ref="rootEl" class="v-image-previewer" @click="handleClick">
    <slot></slot>
  </div>

  <Teleport to="body">
    <div class="v-image-previewer-container" v-if="state.visible" :class="{ 'is-visible': state.visibleClass }"
      @wheel.stop @click="hide">
      <div class="v-image-toolbar py-2 px-4 flex items-center z-10" @click.stop>
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

      <div class="preview-content" @wheel="handleResize">
        <div ref="contentEl" class="img-content" @click="handleContentClick">

        </div>

        <div class="left-btn icon-btn" :class="{ 'is-disabled': btnStatus.prev.disabled }" @click.stop="handlePrev">
          <VIcon class="i-carbon:chevron-left"></VIcon>
        </div>
        <div class="right-btn icon-btn" :class="{ 'is-disabled': btnStatus.next.disabled }" @click.stop="handleNext">
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

  .v-image-toolbar {
    background: rgba(0, 0, 0, 0.2);
  }

  .preview-content {
    flex: 1;
    height: 0;
    position: relative;
  }

  .img-content {
    overflow: scroll;

    &::-webkit-scrollbar {
      display: none;
    }
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
    z-index: 10;
  }

  .left-btn {
    left: 1rem;
  }

  .right-btn {
    right: 1rem;
  }
}
</style>
