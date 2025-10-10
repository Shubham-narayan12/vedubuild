import axios from "axios";

const axiosInstance = axios.create({
  //"https://api.vedubuild.org/api",

  baseURL: import.meta.env.VITE_LOCAL_API_BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // or sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
