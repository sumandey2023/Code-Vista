import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import { sessionApi } from "../api/sessions";

export const useActiveSessions = () => {
  const { getToken, isLoaded } = useAuth();

  const result = useQuery({
    queryKey: ["activeSessions"],
    queryFn: async () => sessionApi.getActiveSessions(await getToken()),
    enabled: isLoaded,
  });
  return result;
};

export const useCreateSession = () => {
  const { getToken } = useAuth();

  const result = useMutation({
    mutationKey: ["createSession"],
    mutationFn: async (data) =>
      sessionApi.createSession(data, await getToken()),
    onSuccess: () => toast.success("Session created successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to create room!"),
  });
  return result;
};

export const useMyRecentSessions = () => {
  const { getToken, isLoaded } = useAuth();

  const result = useQuery({
    queryKey: ["myRecentSessions"],
    queryFn: async () => sessionApi.getMyRecentSessions(await getToken()),
    enabled: isLoaded,
  });
  return result;
};

export const useSessionById = (id) => {
  const { getToken, isLoaded } = useAuth();

  const result = useQuery({
    queryKey: ["sessions", id],
    queryFn: async () => sessionApi.getSessionById(id, await getToken()),
    enabled: !!id && isLoaded,
    refetchInterval: 5000,
  });
  return result;
};

export const useJoinSession = () => {
  const { getToken } = useAuth();

  const result = useMutation({
    mutationKey: ["joinSession"],
    mutationFn: async ({ id, sessionPassword }) =>
      sessionApi.joinSession(id, sessionPassword, await getToken()),
    onSuccess: () => toast.success("Joined session successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to join session!"),
  });
  return result;
};

export const useEndSession = () => {
  const { getToken } = useAuth();

  const result = useMutation({
    mutationKey: ["endSession"],
    mutationFn: async (id) => sessionApi.endSession(id, await getToken()),
    onSuccess: () => toast.success("Session ended successfully!"),
    onError: (error) =>
      toast.error(error.response?.data?.message || "Failed to end session!"),
  });
  return result;
};
