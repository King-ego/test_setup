import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import Routes from "./routes";

createApp(App).use(Routes).mount('#app')
