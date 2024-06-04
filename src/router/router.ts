import { createRouter, createWebHistory } from 'vue-router'
import { Types as ContextTypes } from '@/store/modules/context.ts'
import { Types as UserTypes } from '@/store/modules/user.ts'

import store from '@/store/store.ts'

import LandingPage from '../views/pages/LandingPage.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import RegisterPage from '@/views/pages/RegisterPage.vue'
import ChatPage from '@/views/pages/ChatPage.vue'
import MainLayout from '@/views/layouts/MainLayout.vue'
import SettingPage from '@/views/pages/SettingPage.vue'
import CommunityPage from '@/views/pages/CommunityPage.vue'
import IndexLayout from '@/views/layouts/IndexLayout.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/', component: IndexLayout, children: [
        { path: '/', component: LandingPage },
        { path: '/login', component: LoginPage },
        { path: '/register', component: RegisterPage },
        {
          path: '/', component: MainLayout, children: [
            { path: '/chat', component: ChatPage },
            { path: '/setting', component: SettingPage },
            { path: '/community', component: CommunityPage }
          ]
        }
      ]
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const user = store.state.user.currentUser.email
  if (!user) {
    await store.dispatch(UserTypes.GET_USER)
  }
  await store.dispatch(ContextTypes.SET_REDIRECTING, true)
  next()
})

router.afterEach(() => {
  store.dispatch(ContextTypes.SET_REDIRECTING, false)
})

export default router