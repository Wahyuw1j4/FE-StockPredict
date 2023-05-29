import "./assets/main.css";
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import Home from './pages/index.vue'
import Stock from './pages/stock.vue'
import App from './App.vue'
const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/stock',
        name: 'Stock',
        component: Stock,
    },
]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp(App)

app.use(router)

app.mount('#app')