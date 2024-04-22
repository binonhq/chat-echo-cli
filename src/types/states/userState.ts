export type UserState = {
  user: User | null;
};

export type User = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  is_active: boolean;
};