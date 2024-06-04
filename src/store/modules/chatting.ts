import { ChattingState } from '@/types/states/chattingState.ts'
import { User } from '@/types/types.ts'

export enum Types {
  SET_ONLINE_USERS = 'setOnlineUsers',
  SET_WEB_SOCKET = 'setWebSocket'
}

export enum MutationTypes {
  SET_ONLINE_USERS = 'setOnlineUsers',
  SET_WEB_SOCKET = 'setWebSocket'
}

const state: ChattingState = {
  onlineUsers: [] as User[],
  webSocket: null as WebSocket | null
}

const mutations = {
  [MutationTypes.SET_ONLINE_USERS](state: ChattingState, payload: User[]) {
    state.onlineUsers = payload
  },
  [MutationTypes.SET_WEB_SOCKET](state: ChattingState, payload: WebSocket) {
    state.webSocket = payload
  }
}

const actions = {
  [Types.SET_ONLINE_USERS]({ commit }, payload: User[]) {
    commit(MutationTypes.SET_ONLINE_USERS, payload)
  },
  async [Types.SET_WEB_SOCKET]({ commit }, payload: WebSocket) {
    commit(MutationTypes.SET_WEB_SOCKET, payload)
  }
}

export default {
  state,
  mutations,
  actions
}