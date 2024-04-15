import { createRouter, createWebHistory } from 'vue-router'
import LandingPage from '../views/pages/LandingPage.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import RegisterPage from '@/views/pages/RegisterPage.vue'
import ChatPage from '@/views/pages/ChatPage.vue'
import MainLayout from '@/views/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: LandingPage },
    { path: '/login', component: LoginPage },
    { path: '/register', component: RegisterPage },
    {
      path: '/chat/:id', component: MainLayout, children: [
        { path: '', component: ChatPage }
      ]
    }
  ]
})

export default router