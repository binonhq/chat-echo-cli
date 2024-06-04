import { ContextState } from '@/types/states/contextState.ts'

export enum Types {
  SET_REDIRECTING = 'setRedirecting',
  SET_LOADING = 'setLoading'
}

export enum MutationTypes {
  SET_REDIRECTING = 'setRedirecting',
  SET_LOADING = 'setLoading'
}

const state: ContextState = {
  isRedirecting: false,
  isLoading: false
}

const mutations = {
  [MutationTypes.SET_REDIRECTING](state: ContextState, payload: boolean) {
    state.isRedirecting = payload
  },
  [MutationTypes.SET_LOADING](state: ContextState, payload: boolean) {
    state.isLoading = payload
  }
}

const actions = {
  [Types.SET_REDIRECTING]({ commit }, payload: boolean) {
    commit(MutationTypes.SET_REDIRECTING, payload)
  },
  [Types.SET_LOADING]({ commit }, payload: boolean) {
    commit(MutationTypes.SET_LOADING, payload)
  }
}

export default {
  state,
  mutations,
  actions
}