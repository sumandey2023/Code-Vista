import axiosInstance from "../lib/axios";

const getAuthConfig = (token) => ({
  headers: token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {},
});

export const sessionApi = {
  createSession: async (data, token) => {
    const response = await axiosInstance.post(
      "/session",
      data,
      getAuthConfig(token),
    );
    return response.data;
  },
  getActiveSessions: async (token) => {
    const response = await axiosInstance.get(
      "/session/active",
      getAuthConfig(token),
    );
    return response.data;
  },
  getMyRecentSessions: async (token) => {
    const response = await axiosInstance.get(
      "/session/my-recent",
      getAuthConfig(token),
    );
    return response.data;
  },
  getSessionById: async (id, token) => {
    const response = await axiosInstance.get(
      `/session/${id}`,
      getAuthConfig(token),
    );
    return response.data;
  },
  joinSession: async (id, token) => {
    const response = await axiosInstance.post(
      `/session/${id}/join`,
      {},
      getAuthConfig(token),
    );
    return response.data;
  },
  getStreamToken: async (token) => {
    const response = await axiosInstance.get(
      `/chat/token`,
      getAuthConfig(token),
    );
    return response.data;
  },
  endSession: async (id, token) => {
    const response = await axiosInstance.post(
      `/session/${id}/end`,
      {},
      getAuthConfig(token),
    );
    return response.data;
  },
};
