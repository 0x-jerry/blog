<script lang="ts" setup>
import { watchEffect, reactive, computed } from 'vue'

interface VLinkProps {
  theme?: 'gray' | 'white' | 'text' | 'primary'
  href?: string
  hiddenIcon?: boolean
  active?: boolean
}

const props = withDefaults(defineProps<VLinkProps>(), { href: '' })

const data = reactive({
  isRelative: false,
  isAnchor: false,
  isEmail: false,
  theme: '',
})

watchEffect(() => {
  data.isRelative = !/^https?/.test(props.href)
  data.isEmail = /^mailto:/.test(props.href)
  data.isAnchor = props.href.startsWith('#')
})

const url = computed(() => props.href)
</script>

<template>
  <a
    :class="['link', theme, { 'is-active': active }]"
    :title="url"
    :href="url"
    :target="data.isEmail || !data.isRelative ? '_blank' : ''"
  >
    <template v-if="!data.isRelative">
      <span>
        <slot />
      </span>
    </template>
    <template v-else>
      <slot />
    </template>
  </a>
</template>

<style lang="less" scoped>
.link {
  @apply transition-colors;
  @apply text-bPrimary-500;
  @apply break-all inline-block;
  @apply inline-flex;
  text-decoration: none;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    bottom: 0px;

    width: 0;
    height: 1px;
    @apply bg-bPrimary-5;
    @apply transition;
    transition-property: width;
  }

  &.is-active,
  &:hover {
    @apply text-bPrimary-600;
    &::before {
      width: 100%;
    }
  }

  &.disabled {
    pointer-events: none;
  }

  &.gray {
    @apply text-bGray-800;

    &.is-active,
    &:hover {
      @apply text-bPrimary-600;
      &::before {
        width: 100%;
      }
    }
  }
}
</style>
