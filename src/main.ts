import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from "./router";

const app = createApp(App);
app.use(router)

window.__APP_ROUTER__ = router

app.mount('#app')