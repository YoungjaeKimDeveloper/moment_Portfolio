import axios from "axios";

const host = import.meta.env.VITE_LOCAL_HOST;

const axiosInstance = axios.create({
  baseURL: `http://${host}/api/products/`,
});

export default axiosInstance;
