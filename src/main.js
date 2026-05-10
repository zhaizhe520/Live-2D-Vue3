import { createApp } from 'vue'
import { createPinia } from 'pinia' // 1. 引入工廠函式
import App from './App.vue'
import { vPetTip } from './composables/petTip' // 引入指令

const app = createApp(App)
const pinia = createPinia() // 2. 創建 Pinia 實例

app.use(pinia) // 3. 註冊插件 (這步最關鍵！)
app.directive('pet-tip', vPetTip) // 這裡註冊後，HTML 裡就能用 v-pet-tip
app.mount('#app')//掛載