import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Layout from '@/layouts/Layout.vue'
import flickity from "@toneflix-code/flickity-vue";

import './assets/main.css'

const app = createApp(App)

app.use(router)
app.component('Layout', Layout)
app.use(flickity)

app.mount('#app')
