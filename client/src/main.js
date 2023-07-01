import './assets/main.css'
import 'vue3-toastify/dist/index.css'

// Other stuff
import { createPinia } from 'pinia'
import Vue3Toasity from 'vue3-toastify';

// Icons
import { addIcons } from 'oh-vue-icons'
import { GiHamburgerMenu } from 'oh-vue-icons/icons'
import { BiSearch } from 'oh-vue-icons/icons'
import { MdArrowdropupSharp, MdArrowdropdownSharp } from 'oh-vue-icons/icons'
import '@vueup/vue-quill/dist/vue-quill.snow.css'

addIcons(GiHamburgerMenu, BiSearch, MdArrowdropupSharp, MdArrowdropdownSharp)

import { createApp } from 'vue'


import App from './App.vue'
import router from './router'

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.use(Vue3Toasity)

app.mount('#app')