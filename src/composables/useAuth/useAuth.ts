import { Login, Logout, Register, UseAuthReturn } from '@/composables/useAuth/types.ts'
import { useStore } from 'vuex'
import { Types } from '@/store/modules/user.ts'
import { computed } from 'vue'

export const useAuth: UseAuthReturn = () => {
  const store = useStore()
  const login: Login = async (email, password) => {
    await store.dispatch(Types.LOGIN, { email, password })
  }

  const logout: Logout = async () => {
    await store.dispatch(Types.LOGOUT)
  }

  const register: Register = async (email, password, confirmPassword) => {
    await store.dispatch(Types.REGISTER, { email, password, confirmPassword })
  }

  const isAuthenticated = computed(() => {
    return localStorage.getItem('access_token') !== null
  })

  return {
    login,
    logout,
    register,
    isAuthenticated
  }
}