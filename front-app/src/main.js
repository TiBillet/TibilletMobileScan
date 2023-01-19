import {createApp} from 'vue'
import router from './router'

import './style.css'
import App from './App.vue'

/*
try {
  if (cordova) {
    document.addEventListener('deviceready', () => {
      const app = createApp(App)
      app.use(router)
      app.mount('#app')
    }, false)
  }
} catch (e) {

 */
  const app = createApp(App)
  app.use(router)
  app.mount('#app')
// }
