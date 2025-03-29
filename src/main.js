import './style.css'
import 'primeicons/primeicons.css'

import App from './App.vue'
import router from './router'

import { createApp } from 'vue'
import ToastService from 'primevue/toastservice'
import { createPinia } from 'pinia'
import PrimeVue from 'primevue/config'
import { VueQueryPlugin } from '@tanstack/vue-query'
import Aura from '@primeuix/themes/aura'
import ConfirmationService from 'primevue/confirmationservice'

export const app = createApp(App)
app.use(router)
app.use(VueQueryPlugin)
app.use(PrimeVue, {
  theme: {
    preset: Aura,
    options: {
      darkModeSelector: false,
      mode: 'light',
    },
  },
})
app.use(ToastService)
app.use(ConfirmationService)
app.use(createPinia())
app.mount('#app')
