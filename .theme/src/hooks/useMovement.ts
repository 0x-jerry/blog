import { useEventListener } from '@vueuse/core'
import { reactive } from 'vue'

export interface UseMovementOptions {
    onUpdate?:() => void;
}

export function useMovement(opt?: UseMovementOptions) {
  const state = reactive({
    isMoving: false,
    x: 0,
    y: 0,
  })

  useEventListener(window, 'pointermove', (evt) => {
    if (!state.isMoving) return

    state.x += evt.movementX
    state.y += evt.movementY

    opt?.onUpdate?.()
  })

  useEventListener(window, 'pointerup', () => {
    state.isMoving = false
  })

  useEventListener(window, 'pointerleave', () => {
    state.isMoving = false
  })

  return {
    state,
    start() {
      state.isMoving = true
    },
    reset() {
      state.x = 0
      state.y = 0
    },
  }
}
