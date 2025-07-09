// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Dashboard from '../components/Dashboard.vue'
import MenuList from '../components/HubungiKami.vue'
import Order from '../components/Order.vue'
import TentangKami from '../components/TentangKami.vue'
import Profil from '../components/Profil.vue'


const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: Login },
  { path: '/dashboard', component: Dashboard },
  { path: '/menu', component: MenuList },
  { path: '/delivery-order', name: 'Order', component: Order },  
  { path: '/tentang-kami', component: TentangKami },
  { path : '/profil', component: Profil },
  { path: '/hubungi', component: MenuList } // Assuming HubungiKami.vue is the same as MenuList.vue
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
