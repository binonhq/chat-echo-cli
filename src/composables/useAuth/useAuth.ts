import { GetCurrentUser, Login, Logout, Register, UseAuthReturn } from '@/composables/useAuth/types.ts'
import { useStore } from 'vuex'
import { Types } from '@/store/modules/user.ts'
import { computed } from 'vue'
import { UserRegisterSchema } from '@/types/types.ts'

export const useAuth: UseAuthReturn = () => {
  const store = useStore()

  const login: Login = async (email, password) => {
    return await store.dispatch(Types.LOGIN, { email, password })
  }

  const logout: Logout = async () => {
    await store.dispatch(Types.LOGOUT)
    return
  }

  const register: Register = async (payload: UserRegisterSchema) => {
    return await store.dispatch(Types.REGISTER, payload)
  }

  const getCurrentUser: GetCurrentUser = async () => {
    return await store.dispatch(Types.GET_USER)
  }

  const isAuthenticated = computed(() => {
    return !!store.state.user.currentUser.email
  })

  const errorAuthMessage = computed(() => {
    return store.state.user.authError
  })

  const currentUser = computed(() => {
    return store.state.user.currentUser
  })

  return {
    login,
    logout,
    register,
    getCurrentUser,
    isAuthenticated,
    errorAuthMessage,
    currentUser
  }
}