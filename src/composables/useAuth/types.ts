import { ComputedRef } from 'vue'

export type Login = (email: string, password: string) => Promise<void>;
export type Logout = () => void;
export type Register = (email: string, password: string, confirmPassword: string) => Promise<void>;

export interface UseAuth {
  login: Login;
  logout: Logout;
  register: Register;
  isAuthenticated: ComputedRef<boolean>;
}

export type UseAuthReturn = () => UseAuth;