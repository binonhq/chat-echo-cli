import { createStore, Store } from 'vuex'
import user from '@/store/modules/user.ts'
import context from '@/store/modules/context.ts'
import chatting from '@/store/modules/chatting.ts'
import { ContextState } from '@/types/states/contextState.ts'
import { UserState } from '@/types/states/userState.ts'
import { ChattingState } from '@/types/states/chattingState.ts'

export type RootState = {
  user: UserState
  context: ContextState
  chatting: ChattingState
}

const store: Store<RootState> = createStore({
  modules: {
    user,
    context,
    chatting
  }
})

export default store
