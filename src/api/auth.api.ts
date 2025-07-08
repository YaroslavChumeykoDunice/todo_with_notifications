import api from ".";
import { AuthResponse, User, UserData } from "../types/userTypes";

export const signIn = async (body: UserData) => {
  const { data } = await api.post<AuthResponse>(`auth/login`, body);
  return data;
}

export const signUp = async (body: UserData) => {
  const { data } = await api.post<AuthResponse>(`auth/register`, body);
  return data;
}

export const getMyProfile = async () => {
  const { data } = await api.get<User>('auth/profile');
  return data;
}
