import { ComputedRef } from 'vue'
import { User, UserRegisterSchema } from '@/types/types.ts'

export type Login = (email: string, password: string) => Promise<any>;
export type Logout = () => void;
export type Register = (payload: UserRegisterSchema) => Promise<any>;
export type GetCurrentUser = () => Promise<any>;

export interface UseAuth {
  login: Login;
  logout: Logout;
  register: Register;
  getCurrentUser: GetCurrentUser;
  isAuthenticated: ComputedRef<boolean>;
  errorAuthMessage: ComputedRef<string>;
  currentUser: ComputedRef<User>
}

export type UseAuthReturn = () => UseAuth;