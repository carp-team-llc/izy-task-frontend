import axios from "axios";
import { useAuth } from "./authContext";

const AxiosClient = (url?: string, headers = {}) => {
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

  // Interceptor để thêm token vào headers
  api.interceptors.request.use(
    (config) => {
      const { token } = useAuth(); // Hook context để lấy token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      // Xử lý dữ liệu response nếu cần
      // Ví dụ: Log response hoặc kiểm tra các điều kiện cụ thể
      console.log('Response:', response);

      // Nếu response có trường dữ liệu cụ thể, bạn có thể điều chỉnh dữ liệu ở đây
      // return response.data; // Nếu bạn chỉ cần trả về dữ liệu và không cần toàn bộ response

      return response; // Trả về toàn bộ response nếu cần
    },
    (error) => {
      // Xử lý lỗi response
      // Ví dụ: Xử lý lỗi 401 (Unauthorized) và logout người dùng, hoặc thông báo lỗi cho người dùng

      if (error.response && error.response.status === 401) {
        // Ví dụ: Xử lý lỗi unauthorized (401) bằng cách logout người dùng
        const { removeToken } = useAuth();
        removeToken();
        window.location.href = '/login'; // Điều hướng đến trang đăng nhập
      }

      // Bạn có thể thêm các điều kiện xử lý lỗi khác ở đây

      return Promise.reject(error);
    }
  );

  return api;
}

export default AxiosClient;