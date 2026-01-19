import api from "./api";

interface SignUpData {
  fullName: string;
  email: string;
  passwordHash: string;
}

export const authService = {
  signUp: async (userData: SignUpData) => {
    const { data } = await api.post("/auth/register", userData);
    return data;
  },
};
