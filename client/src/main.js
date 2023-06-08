import './assets/main.css'

import { OhVueIcon, addIcons } from 'oh-vue-icons'
import { GiHamburgerMenu } from 'oh-vue-icons/icons'

addIcons(GiHamburgerMenu)

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)
app.component('v-icon', OhVueIcon)

app.mount('#app')
