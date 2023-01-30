export interface Recado {
  id: string;
  description: string;
  detail: string;
}

export interface User {
  name: string;
  email: string;
  password: string;
  recados: Recado[];
}

export type Users = User[];