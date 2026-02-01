import { SignInData, SignUpData } from "@/types/auth.types";
import api from "./api";

export const authService = {
  signUp: async (userData: SignUpData) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },
  signIn: async (userData: SignInData) => {
    const { data } = await api.post("/auth/login", userData);
    return data;
  },
};
