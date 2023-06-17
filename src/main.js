import "./assets/main.css";
import { createRouter, createWebHistory } from 'vue-router'
import { createApp } from 'vue'
import Home from './pages/index.vue'
import Stock from './pages/stock.vue'
import App from './App.vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import {store} from './stores/index.js'


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
    {
        path: '/login',
        name: 'Login',
        component: () => import('./pages/login.vue'),
    },
    {
        path: '/register',
        name: 'Register',
        component: () => import('./pages/register.vue'),
    },
    {
        path: '/request',
        name: 'Request',
        component: () => import('./pages/requestStock.vue'),
    },
    {
        path: '/listrequest',
        name: 'ListRequest',
        component: () => import('./pages/listRequest.vue'),
        beforeEnter: (to, from) => {
            if (store.state.role == "Admin"){
                return true;
            }else{
                return to.path = '/error';
            }
        }
    },
    {
        path: '/tentang',
        name: 'Tentang',
        component: () => import('./pages/tentang.vue'),
    },
    {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: () => import('./pages/errorPage.vue'),
    }

]
const router = createRouter({
    history: createWebHistory(),
    routes,
})

router.beforeEach((to, from, next) => {
    const publicPages = ['/login', '/register'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('token');
    if (authRequired && !loggedIn) {
        return next('/login');
    }else if (to.path == '/login' && loggedIn){
        return next('/');
    }
    next();
})

const app = createApp(App)
app.use(VueAxios, axios)
app.use(router)
app.use(store)

app.mount('#app')