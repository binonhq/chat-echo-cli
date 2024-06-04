import { ComputedRef } from 'vue'

export type SetIsRedirecting = (value: boolean) => void;

export interface UseContextState {
}

export interface UseContext {
  isRedirecting: ComputedRef<boolean>;
  setIsRedirecting: SetIsRedirecting;
  isLoading: ComputedRef<boolean>;
  setIsLoading: (value: boolean) => void;
}

export type UseContextReturn = () => UseContext;