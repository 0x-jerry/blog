<script setup>
import VTitle from '@@/components/VTitle.vue'
import { useI18n } from '@@/lib/i18n'
import { useRouter } from 'vitepress'
import { onMounted, reactive, shallowRef, watch } from 'vue'

const { t } = useI18n()

const state = reactive({
  input: getSearchFromQuery(),
  results: [],
})

const pagefind = shallowRef()

// workaround for loading pagefind js
const getPageFindJs = Function(`return import("/pagefind/pagefind.js")`)

onMounted(init)

async function init() {
  pagefind.value = await getPageFindJs()
  pagefind.value.init()
}

function getSearchFromQuery() {
  if (import.meta.env.SSR) return ''
  const u = new URL(location.href)

  return u.searchParams.get('s') || ''
}

const router = useRouter()

watch(
  () => [state.input, pagefind.value],
  async () => {
    if (!pagefind.value) return

    router.go(`/search?s=${state.input}`)

    const resp = await pagefind.value.search(state.input)

    const p = resp.results.map((n) => n.data())

    state.results = await Promise.all(p)
  },
)
</script>

<template>
  <div>
    <VTitle class="mb-3" show-back :title="t('title.search')"></VTitle>
    <div class="mb-3 px-2">
      <input
        class="v-search-input w-full border-1 border-solid border-gray-3 rounded py-1 px-2 text-lg"
        v-model="state.input"
        placeholder="Give me something to search"
      />
    </div>
    <div class="flex-(~ col) gap-3">
      <div v-for="result in state.results">
        <div class="title mb-2">
          <a :href="result.url">
            {{ result.meta.title }}
          </a>
        </div>
        <div class="p-2 border-(1 solid gray-2) heti max-w-full">
          <div v-html="result.excerpt"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
.v-search-input {

  &:focus {
    @apply border-blue-4;
    outline: none;
  }
}
</style>
