import "./assets/main.css";
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import Home from './pages/index.vue'
import App from './App.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')