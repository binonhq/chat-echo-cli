import { createStore } from 'vuex'
import user from '@/store/modules/user.ts'
import context from '@/store/modules/context.ts'
import chatting from '@/store/modules/chatting.ts'


const store = createStore({
  modules: {
    user,
    context,
    chatting
  }
})

export default store