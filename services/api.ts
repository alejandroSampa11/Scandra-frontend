import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000/api",
  timeout: 30000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar token automáticamente
api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // El servidor respondió con un código de error
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        `Error: ${error.response.status}`;
      return Promise.reject(new Error(message));
    } else if (error.request) {
      // La petición se hizo pero no hubo respuesta
      return Promise.reject(new Error("No response from server"));
    } else {
      // Algo pasó al configurar la petición
      return Promise.reject(new Error(error.message || "Connection error"));
    }
  },
);

export default api;
