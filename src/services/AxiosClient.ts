import axios from "axios";
import { useAuth } from "./authContext";

const AxiosClient = (url: string, token: string | null, headers = {}) => {
  if (!url) {
    throw new Error("URL is required");
  }
  const api = axios.create({
    baseURL: url,
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      ...headers
    }
  })

  api.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      console.log('Response:', response);

      return response;
    },
    (error) => {

      if (error.response && error.response.status === 401) {
        const { removeToken } = useAuth();
        removeToken();
        // window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  return api;
}

export default AxiosClient;