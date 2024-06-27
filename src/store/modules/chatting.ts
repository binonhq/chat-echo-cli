import { ChattingState } from '@/types/states/chattingState.ts'
import { CallRequest, HistoryChat, Message, User } from '@/types/types.ts'

export enum Types {
  SET_ONLINE_USERS = 'setOnlineUsers',
  SET_WEB_SOCKET = 'setWebSocket',
  SET_CONVERSATION = 'setConversation',
  ADD_CONVERSATION = 'addConversation',
  SET_CHAT_HISTORY = 'setChatHistory',
  SET_CALL_REQUEST = 'setCallRequest',
  SET_IN_CALL = 'setInCall',
  SET_IS_END_CONVERSATION = 'setIsEndConversation'
}

export enum MutationTypes {
  SET_ONLINE_USERS = 'setOnlineUsers',
  SET_WEB_SOCKET = 'setWebSocket',
  SET_CONVERSATION = 'setConversation',
  SET_CHAT_HISTORY = 'setChatHistory',
  SET_CALL_REQUEST = 'setCallRequest',
  ADD_CONVERSATION = 'addConversation',
  SET_IN_CALL = 'setInCall',
  SET_IS_END_CONVERSATION = 'setIsEndConversation'
}

const state: ChattingState = {
  onlineUsers: [] as User[],
  webSocket: null as WebSocket | null,
  conversation: [] as Message[],
  historyChat: [] as HistoryChat[],
  callRequest: null as CallRequest | null,
  inCall: false
}

const mutations = {
  [MutationTypes.SET_ONLINE_USERS](state: ChattingState, payload: User[]) {
    state.onlineUsers = payload
  },
  [MutationTypes.SET_WEB_SOCKET](state: ChattingState, payload: WebSocket) {
    state.webSocket = payload
  },
  [MutationTypes.SET_CONVERSATION](state: ChattingState, payload: Message[]) {
    state.conversation = payload
  },
  [MutationTypes.SET_CHAT_HISTORY](
    state: ChattingState,
    payload: HistoryChat[]
  ) {
    state.historyChat = payload
  },
  [MutationTypes.SET_CALL_REQUEST](state: ChattingState, payload: CallRequest) {
    state.callRequest = payload
  },
  [MutationTypes.SET_IN_CALL](state: ChattingState, payload: boolean) {
    state.inCall = payload
  },
  [MutationTypes.ADD_CONVERSATION](state: ChattingState, payload: Message[]) {
    state.conversation = [...payload, ...state.conversation]
  },
  [MutationTypes.SET_IS_END_CONVERSATION](
    state: ChattingState,
    payload: boolean
  ) {
    state.isEndConversation = payload
  }
}

const actions = {
  [Types.SET_ONLINE_USERS]({ commit }, payload: User[]) {
    commit(MutationTypes.SET_ONLINE_USERS, payload)
  },
  async [Types.SET_WEB_SOCKET]({ commit }, payload: WebSocket) {
    commit(MutationTypes.SET_WEB_SOCKET, payload)
  },
  [Types.SET_CONVERSATION]({ commit }, payload: Message[]) {
    commit(MutationTypes.SET_CONVERSATION, payload)
  },
  [Types.SET_CHAT_HISTORY]({ commit }, payload: HistoryChat[]) {
    commit(MutationTypes.SET_CHAT_HISTORY, payload)
  },
  [Types.SET_CALL_REQUEST]({ commit }, payload: CallRequest) {
    commit(MutationTypes.SET_CALL_REQUEST, payload)
  },
  [Types.SET_IN_CALL]({ commit }, payload: boolean) {
    commit(MutationTypes.SET_IN_CALL, payload)
  },
  [Types.ADD_CONVERSATION]({ commit }, payload: Message[]) {
    commit(MutationTypes.ADD_CONVERSATION, payload)
  },
  [Types.SET_IS_END_CONVERSATION]({ commit }, payload: boolean) {
    commit(MutationTypes.SET_IS_END_CONVERSATION, payload)
  }
}

export default {
  state,
  mutations,
  actions
}
