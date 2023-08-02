import { createApp } from 'vue'

import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'normalize.css/normalize.css'
import './Tailwind/index.css'

const app = createPinia()
createApp(App).use(router).use(app).mount('#app')
