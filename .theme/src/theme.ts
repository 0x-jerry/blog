import type { Theme } from 'vitepress'
import Layout from './Layout.vue'
import { install as installI18n } from './lib/i18n'

import 'heti/umd/heti.min.css'
import 'normalize.css'
import './styles/main.less'
import 'uno.css'
import dayjs from 'dayjs'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'
import { initBrand } from './hooks/useBrand'
import { loadingIndicator } from './lib/loading'

dayjs.extend(utc)
dayjs.extend(timezone)

export const theme: Theme = {
  Layout,
  NotFound: () => 'custom 404', // <- this is a Vue 3 functional component
  enhanceApp({ app, router, siteData }) {
    app.use(installI18n)

    const t = loadingIndicator()

    router.onBeforePageLoad = (to) => {
      t.show()
    }

    router.onAfterPageLoad = (to) => {
      t.hide()
    }

    initBrand()

    // app is the Vue 3 app instance from `createApp()`. router is VitePress'
    // custom router. `siteData`` is a `ref`` of current site-level metadata.
  },
}
