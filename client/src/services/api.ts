import { api } from "../configs/axios.ts";

interface User {
  nome: string;
  email: string;
  data_nascimento: string;
  id?: string;
}

async function getUsers(): Promise<User[]> {
  const response = await api.get<User[]>(
    `http://127.0.0.1:5000/users`,
  );
  return response.data;
}

async function getUser(id: number): Promise<User> {
  const response = await api.get<User>(
    `http://127.0.0.1:5000/users/${id}`,
  );
  return response.data;
}

export {
  getUsers,
  getUser
};

export type { User };
