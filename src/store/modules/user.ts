import { UserState } from '@/types/states/userState.ts'
import { toast } from '@/components/ui/toast'
import { mainAxios } from '@/main.ts'
import { User, UserRegisterSchema } from '@/types/types.ts'
import { getToken } from '@/utils/util.ts'

const basePath = '/auth'

export enum Types {
  LOGIN = 'login',
  REGISTER = 'register',
  LOGOUT = 'logout',
  GET_USER = 'getUser'
}

export enum MutationTypes {
  SET_USER = 'setUser',
  SET_AUTH_ERROR = 'setAuthError'
}

const state = (): UserState => ({
  currentUser: {} as User,
  authError: ''
})

const mutations = {
  [MutationTypes.SET_USER](state: UserState, payload: User) {
    state.currentUser = payload
  },
  [MutationTypes.SET_AUTH_ERROR](state: UserState, payload: string) {
    state.authError = payload
  }
}

const actions = {
  async [Types.LOGIN](
    { commit },
    payload: { email: string; password: string }
  ) {
    try {
      const response = await mainAxios.post(`${basePath}/login`, {
        email: payload.email,
        password: payload.password
      })
      const userData: User = {
        ...response.data.user,
        isActive: true
      }
      commit(MutationTypes.SET_USER, userData)
      localStorage.setItem('access_token', response.data.token)
      localStorage.setItem('refresh_token', response.data.refreshToken)
      mainAxios.defaults.headers.common['Authorization'] =
        getToken().accessToken
      toast({
        title: 'Success',
        description: 'You have successfully logged in'
      })
      return {
        success: true
      }
    } catch (err: any) {
      return {
        success: false,
        errorMessage: err.response.data.message
      }
    }
  },
  async [Types.REGISTER]({}, payload: UserRegisterSchema) {
    try {
      const response = await mainAxios.post(`${basePath}/register`, payload)
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      toast({
        title: 'Success',
        description: 'You have successfully registered'
      })
      return {
        success: true
      }
    } catch (err: any) {
      return {
        success: false,
        errorMessage: err.response.data.message
      }
    }
  },
  [Types.LOGOUT]({ commit }) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    mainAxios
      .post(`${basePath}/logout`)
      .then(() =>
        toast({
          title: 'Success',
          description: 'You have successfully logged out'
        })
      )
      .catch((err: any) => {
        toast({
          title: 'Error',
          description: 'There was an error logging out'
        })
        console.log(err)
      })
    commit(MutationTypes.SET_USER, {} as User)
    mainAxios.defaults.headers.common['Authorization'] = null
  },
  async [Types.GET_USER]({ commit }) {
    try {
      const token = localStorage.getItem('access_token')
      if (!token) {
        commit(MutationTypes.SET_USER, {} as User)
        return
      }
      const response = await mainAxios.get(`${basePath}/current-user`)
      if (!response.data.user) {
        commit(MutationTypes.SET_USER, {} as User)
        return
      }
      const userData: User = {
        ...response.data.user,
        isActive: true
      }
      commit(MutationTypes.SET_USER, userData)
    } catch (err) {
      commit(MutationTypes.SET_USER, {} as User)
    }
  }
}

export default {
  state,
  mutations,
  actions
}
