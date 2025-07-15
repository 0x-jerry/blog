<script lang="ts" setup>
import VButton from '@@/components/VButton.vue'
import VChangeBrand from '@@/components/VChangeBrand.vue'
import { useTheme } from '@@/hooks/useTheme'
import { useI18n } from '@@/lib/i18n'

const { t } = useI18n()
const theme = useTheme()

interface SidebarMenu {
  label: string
  path: string
  icon: string
}

const menus: SidebarMenu[] = [
  {
    path: '/',
    icon: 'i-carbon-home',
    label: t('menu.title.home'),
  },
  {
    path: '/tags',
    icon: 'i-carbon-tag',
    label: t('menu.title.tags'),
  },
  {
    path: '/about',
    icon: 'i-carbon-user',
    label: t('menu.title.about'),
  },
  {
    path: '/search',
    icon: 'i-carbon-search',
    label: t('button.search'),
  },
]

const linksIconMapper: Record<string, string> = {
  github: 'i-logos-github-icon',
}
</script>

<template>
  <div class="h-12 xl:h-screen">
    <div
      class="flex items-center border-(b gray-100) gap-2 px-4 bg-bGray-50 w-full xl:(h-full w-72 border-(r gray-100) flex-col px-6 pb-10 overflow-auto)"
    >
      <a
        href="/"
        class="rounded-full overflow-hidden h-2/3 xl:h-4/5 xl:(h-auto w-4/5 mt-20)"
      >
        <img
          class="transition duration-1000 rotate-0 hover:rotate-360 w-full h-full object-cover aspect-1"
          :src="theme.avatar"
        />
      </a>
      <div class="tools py-2 w-full justify-center hidden xl:flex">
        <VChangeBrand></VChangeBrand>
      </div>
      <div class="text-xl whitespace-nowrap flex-1 xl:flex-none xl:(text-3xl)">
        {{ theme.name }}
      </div>
      <div
        class="hidden text-bGray-400 text-xs flex-(1 shrink-10) xl:(block) xl:(my-2 flex-none)"
        v-if="theme.motto"
        v-html="theme.motto"
      ></div>
      <div class="xl:mt-2">
        <a v-for="(value, key) in theme.links" :href="value" target="_blank">
          <i :class="linksIconMapper[key]"></i>
        </a>
      </div>
      <div class="gap-2 hidden sm:(flex) xl:(flex-col w-full)">
        <a v-for="menu in menus" :href="menu.path">
          <!-- ignore button click event, otherwise this will refresh the page -->
          <VButton class="w-full pointer-events-none">
            <i :class="menu.icon"></i>
            <span class="flex-1 hidden xl:inline-block">{{ menu.label }}</span>
          </VButton>
        </a>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped></style>
