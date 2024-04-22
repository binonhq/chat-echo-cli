import { createStore } from 'vuex'
import user from '@/store/modules/user.ts'

const store = createStore({
  modules: {
    user
  }
})

export default store