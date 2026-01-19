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
    // const token = await AsyncStorage.getItem('token');
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error),
);

// Interceptor para manejar errores globalmente
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || "Error de conexión";
    return Promise.reject(new Error(message));
  },
);

export default api;
