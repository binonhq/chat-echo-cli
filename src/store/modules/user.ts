import { User, UserState } from '@/types/states/userState.ts'
import { toast } from '@/components/ui/toast'
import axios from 'axios'

const basePath = '/users'

export enum Types {
  LOGIN = 'login',
  REGISTER = 'register',
  LOGOUT = 'logout',
}

export enum MutationTypes {
  SET_USER = 'setUser',
}

const state = (): UserState => ({
  user: {} as User
})

const mutations = {
  [MutationTypes.SET_USER](state: UserState, payload: User) {
    state.user = payload
  }
}

const actions = {
  async [Types.LOGIN]({ commit }, payload: { email: string; password: string }) {
    try {
      const response = await axios.post(`${basePath}/login`, {
        email: payload.email,
        password: payload.password
      })
      // commit(MutationTypes.SET_USER, response.data.user)
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      toast(
        {
          title: 'Success',
          description: 'You have successfully logged in'
        }
      )
    } catch (err) {
      console.log(err)
      toast(
        {
          title: 'Error',
          description: 'There was an error logging in'
        }
      )
    }
  },
  async [Types.REGISTER]({ commit }, payload: { email: string; password: string, confirmPassword: string }) {
    try {
      const response = await axios.post(`${basePath}/register`, {
        email: payload.email,
        password: payload.password,
        confirm_password: payload.confirmPassword
      })
      // commit(MutationTypes.SET_USER, response.data.user)
      localStorage.setItem('access_token', response.data.access_token)
      localStorage.setItem('refresh_token', response.data.refresh_token)
      toast(
        {
          title: 'Success',
          description: 'You have successfully registered'
        }
      )
    } catch (err) {
      console.log(err)
      toast(
        {
          title: 'Error',
          description: 'There was an error registering'
        }
      )
    }
  },
  [Types.LOGOUT]({ commit }) {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    axios.post(`${basePath}/logout`)
    commit(MutationTypes.SET_USER, {} as User)
  }
}

export default {
  state,
  mutations,
  actions
}