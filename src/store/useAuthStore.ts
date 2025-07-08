import { create } from "zustand";
import { UserData, User } from "../types/userTypes";
import { getMyProfile, signIn, signUp } from "../api/auth.api";
import { AxiosError } from "axios";

interface AuthStore {
  isLoading: boolean;
  user: User | null;
  error: string | null;
  signIn: (user: UserData) => Promise<void>;
  signOut: () => void;
  signUp: (user: UserData) => Promise<void>;
  getMyProfile: () => Promise<void>;
  setError: (error: string | null) => void;
}

const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  isLoading: false,
  error: null,
  signIn: async (userData: UserData) => {
    try {
      set({ isLoading: true });
      const { user, token } = await signIn(userData);
      set({ user });
      localStorage.setItem("token", token);
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ error: error?.response?.data.message });
      } else set({ error: "Что-то пошло не так" });
    } finally {
      set({ isLoading: false });
    }
  },
  signOut: () => {
    set({ user: null });
    localStorage.removeItem("token");
  },
  signUp: async (userData: UserData) => {
    try {
      set({ isLoading: true });
      const { user, token } = await signUp(userData);
      set({ user });
      localStorage.setItem("token", token);
    } catch (error) {
      if (error instanceof AxiosError) {
        set({ error: error?.response?.data.message });
      } else set({ error: "Что-то пошло не так" });
    } finally {
      set({ isLoading: false });
    }
  },
  getMyProfile: async () => {
    try {
      set({ isLoading: true });
      const user = await getMyProfile();
      set({ user });
    } catch (error) {
      console.log(error);
    } finally {
      set({ isLoading: false });
    }
  },

  setError: (error) => set({ error }),
}))

export default useAuthStore;
