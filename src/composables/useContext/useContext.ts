import { SetIsRedirecting, UseContextReturn } from '@/composables/useContext/types.ts'
import { useStore } from 'vuex'
import { Types } from '@/store/modules/context.ts'
import { computed } from 'vue'

export const useContext: UseContextReturn = () => {
  const store = useStore()

  const isRedirecting = computed(() => store.state.context.isRedirecting)

  const setIsRedirecting: SetIsRedirecting = async (value: boolean) => {
    await store.dispatch(Types.SET_REDIRECTING, value)
  }

  const isLoading = computed(() => store.state.context.isLoading)

  const setIsLoading = async (value: boolean) => {
    await store.dispatch(Types.SET_LOADING, value)
  }

  return {
    isRedirecting,
    isLoading,
    setIsLoading,
    setIsRedirecting
  }
}