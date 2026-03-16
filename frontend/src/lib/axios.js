import axios from "axios";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_BACKEND_URL || "https://code-vista-fxqq.onrender.com/api",
  withCredentials: true,
});

export default axiosInstance;
