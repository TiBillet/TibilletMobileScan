// polyfill pour fonction "at" pour javascript(webview) ne lesupportant pas
import 'core-js/features/array/at'

// Components
import App from './App.vue'

// Composables
import {createApp, markRaw} from 'vue'
import router from './router'
import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// Plugins
import {registerPlugins} from '@/plugins'

const app = createApp(App)
const pinia = createPinia()

// accès au router dans le store (this.router)
pinia.use(({store}) => {
  store.router = markRaw(router)
})
// données du store persistantes
pinia.use(piniaPluginPersistedstate)
app.use(pinia)
registerPlugins(app)

app.mount('#app')
