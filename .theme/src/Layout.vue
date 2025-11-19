<script lang="ts" setup>
import dayjs from 'dayjs'
import { useRoute } from 'vitepress'
import { useTheme } from './hooks/useTheme'
import DefaultLayout from './layout/DefaultLayout.vue'
import { getRouteComponent } from './routes'

const route = useRoute()

const theme = useTheme()

if (theme.value.timezone) {
  dayjs.tz.setDefault(theme.value.timezone)
}
</script>

<template>
  <DefaultLayout>
    <component :is="getRouteComponent(route)"> </component>
  </DefaultLayout>
</template>

<style lang="less"></style>
