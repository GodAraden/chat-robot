import { createApp } from 'vue'
import App from './App.vue'

import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import { VMdPreview, VueMarkdownEditor } from './plugin/editor'

import '@arco-design/web-vue/dist/arco.css'
import './api/interceptor'
import './style.css'

const app = createApp(App)

app.use(ArcoVue)
app.use(ArcoVueIcon)

app.use(VueMarkdownEditor)
app.use(VMdPreview)

app.mount('#app')
