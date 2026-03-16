import axios from "axios";

const FALLBACK_BACKEND_URL = "https://code-vista-fxqq.onrender.com/api";

const resolveBackendUrl = () => {
  const configuredUrl = import.meta.env.VITE_BACKEND_URL?.trim();

  if (!configuredUrl) {
    return FALLBACK_BACKEND_URL;
  }

  if (typeof window !== "undefined") {
    const isFrontendRunningLocally = ["localhost", "127.0.0.1"].includes(
      window.location.hostname,
    );
    const isConfiguredUrlLocal =
      /^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/i.test(configuredUrl);

    if (!isFrontendRunningLocally && isConfiguredUrlLocal) {
      return FALLBACK_BACKEND_URL;
    }
  }

  return configuredUrl.replace(/\/$/, "");
};

const axiosInstance = axios.create({
  baseURL: resolveBackendUrl(),
  withCredentials: true,
});

export default axiosInstance;
