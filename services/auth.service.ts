import { SignInData, SignUpData } from "@/types/auth.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "./api";

export const authService = {
  signUp: async (userData: SignUpData) => {
    const { data } = await api.post("/auth/register", userData);
    if (data.token) {
      await AsyncStorage.setItem("token", data.token);
    }
    return data;
  },
  signIn: async (userData: SignInData) => {
    const { data } = await api.post("/auth/login", userData);
    if (data.token) {
      await AsyncStorage.setItem("token", data.token);
    }
    return data;
  },
  signOut: async () => {
    await AsyncStorage.removeItem("token");
  },
};
