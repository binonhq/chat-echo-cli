import { User } from '@/types/types.ts'

export type UserState = {
  currentUser: User | null;
  authError: string;
};
