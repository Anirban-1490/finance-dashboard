import type { User } from "@/modules/auth/type";
import { create } from "zustand";

interface IAuthState {
  user: User | null;
  setUser: (user: User | null) => void;
}
export const useAuth = create<IAuthState>((set) => ({
  user: JSON.parse(localStorage.getItem("user") || "null") as User | null,
  setUser: (user: User | null) => set({ user }),
}));
