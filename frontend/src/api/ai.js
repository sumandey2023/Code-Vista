import axiosInstance from "../lib/axios";

export const aiApi = {
  explainProblem: async (payload) => {
    const response = await axiosInstance.post("/ai/problem/explain", payload);
    return response.data;
  },
  generateFullCode: async (payload) => {
    const response = await axiosInstance.post("/ai/problem/generate", payload);
    return response.data;
  },
};
