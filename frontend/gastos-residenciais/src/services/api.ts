// src/services/api.ts
// Aqui é onde criou o axios, para usar-lo em cada hook.


import axios from "axios"

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export default api;
