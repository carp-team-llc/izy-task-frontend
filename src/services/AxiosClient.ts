import axios from "axios";

const AxiosClient = (url: string, headers = {}) => {
  if (!url) {
    throw new Error("URL is required");
  }
  const api = axios.create({
    baseURL: url,
    timeout: 100000,
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
      ...headers,
    },
  });

  api.interceptors.request.use(
    async (config) => {
      const token = await localStorage.getItem("AUTH_IZY_TASK")
      if (!token) {
        console.log("Need login!")
      }
      try {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (err) {
        console.error("Error in handle auth: ", err)
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => {
      console.log("Response:", response); // nhớ xoá cái này nha đmmm

      return response;
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        // const { removeToken } = useAuth();
        // removeToken();
        // window.location.href = '/login';
      }

      return Promise.reject(error);
    }
  );

  return api;
};

export default AxiosClient;
