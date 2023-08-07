import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'
import './Tailwind/index.css'
import './Tailwind/preflight.css'
import { piniaStorePlugin } from './store/plugin'

const pinia = createPinia()

pinia.use(piniaStorePlugin)
createApp(App).use(router).use(pinia).mount('#app')
