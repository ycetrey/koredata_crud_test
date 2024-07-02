import axios from "axios";
import { empty } from "../helpers";

export const api = axios.create({
  timeout: 10000,
});

api.interceptors.request.use((config) => {
  const storagedUser = localStorage.getItem("@RAuth:usuario") || "";
  const storagedToken = localStorage.getItem("@RAuth:token") || "";

  if (!empty(storagedUser) && !empty(storagedToken)) {
    if (config != null) {
      config!.headers!.Authorization = `Bearer ${storagedToken}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 403 || error.response.status === 401) {
      localStorage.removeItem("@RAuth:usuario");
      localStorage.removeItem("@RAuth:token");
      window.location.href = "/";
    }
    return Promise.reject(error);
  },
);
