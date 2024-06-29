import { createRouter, createWebHistory } from 'vue-router'
import { Types as ContextTypes } from '@/store/modules/context.ts'
import { Types as UserTypes } from '@/store/modules/user.ts'

import LandingPage from '../views/pages/LandingPage.vue'
import LoginPage from '@/views/pages/LoginPage.vue'
import RegisterPage from '@/views/pages/RegisterPage.vue'
import ChatPage from '@/views/pages/ChatPage.vue'
import MainLayout from '@/views/layouts/MainLayout.vue'
import CommunityPage from '@/views/pages/CommunityPage.vue'
import IndexLayout from '@/views/layouts/IndexLayout.vue'
import AccountPage from '@/views/pages/AccountPage.vue'
import VoiceSettingPage from '@/views/pages/VoiceSettingPage.vue'
import CallPage from '@/views/pages/CallPage.vue'
import SettingLayout from '@/views/layouts/SettingLayout.vue'
import SettingGeneral from '@/views/pages/SettingGeneral.vue'
import SettingPersonalInfo from '@/views/pages/SettingPersonalInfo.vue'
import SettingSecurity from '@/views/pages/SettingSecurity.vue'
import { useStore } from 'vuex'
import store from '@/store/store.ts'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: IndexLayout,
      children: [
        { path: '/', component: LandingPage },
        { path: 'login', component: LoginPage },
        { path: 'register', component: RegisterPage },
        { path: 'call', component: CallPage, meta: { requiresAuth: true } },
        {
          path: '/',
          component: MainLayout,
          meta: { requiresAuth: true },
          children: [
            { path: 'chat', component: ChatPage },
            {
              path: 'setting',
              component: SettingLayout,
              children: [
                {
                  path: 'general',
                  component: SettingGeneral
                },
                {
                  path: 'personal-information',
                  component: SettingPersonalInfo
                },
                {
                  path: 'security',
                  component: SettingSecurity
                }
              ]
            },
            { path: 'community', component: CommunityPage },
            { path: 'community/:userId', component: AccountPage },
            { path: 'account', component: AccountPage },
            { path: 'voice', component: VoiceSettingPage }
          ]
        }
      ]
    }
  ]
})

router.beforeEach(async (to, _from, next) => {
  let user = store.state.user.currentUser.email
  if (!user) {
    await store.dispatch(UserTypes.GET_USER)
  }
  await store.dispatch(ContextTypes.SET_REDIRECTING, true)

  if (to.meta.requiresAuth) {
    user = store.state.user.currentUser.email
    if (user) {
      next()
    } else {
      next('/login')
    }
  } else {
    next()
  }
})

router.afterEach(() => {
  const store = useStore()
  store.dispatch(ContextTypes.SET_REDIRECTING, false)
})

export default router
