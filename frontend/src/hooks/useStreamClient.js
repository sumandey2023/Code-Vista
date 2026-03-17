import { useAuth } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { StreamChat } from "stream-chat";
import { sessionApi } from "../api/sessions";
import { disconnectStreamClient, initializeStreamClient } from "../lib/stream";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
  const { getToken, isLoaded } = useAuth();
  const [streamClient, setStreamClient] = useState(null);
  const [call, setCall] = useState(null);
  const [chatClient, setChatClient] = useState(null);
  const [channel, setChannel] = useState(null);
  const [isInitializingCall, setIsInitializingCall] = useState(true);

  const callId = session?.callId;
  const isCompleted = session?.status === "completed";

  useEffect(() => {
    let isMounted = true;
    let videoCall = null;
    let chatClientInstance = null;

    const cleanup = async () => {
      try {
        if (videoCall) await videoCall.leave();
        if (chatClientInstance) await chatClientInstance.disconnectUser();
        await disconnectStreamClient();
      } catch (error) {
        console.error("Cleanup error:", error);
      }
    };

    const resetState = () => {
      if (!isMounted) return;
      setCall(null);
      setChannel(null);
      setChatClient(null);
      setStreamClient(null);
      setIsInitializingCall(false);
    };

    const initCall = async () => {
      if (!isLoaded || loadingSession) return;

      if (!callId || isCompleted || (!isHost && !isParticipant)) {
        resetState();
        return;
      }

      setIsInitializingCall(true);

      try {
        const authToken = await getToken();
        const { token, userId, userName, userImage } =
          await sessionApi.getStreamToken(authToken);

        const client = await initializeStreamClient(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token,
        );

        videoCall = client.call("default", callId);
        await videoCall.join({ create: false });

        const apiKey = import.meta.env.VITE_STREAM_API_KEY;
        chatClientInstance = StreamChat.getInstance(apiKey);

        await chatClientInstance.connectUser(
          {
            id: userId,
            name: userName,
            image: userImage,
          },
          token,
        );

        const chatChannel = chatClientInstance.channel("messaging", callId);
        await chatChannel.watch();

        if (!isMounted) {
          await cleanup();
          return;
        }

        setStreamClient(client);
        setCall(videoCall);
        setChatClient(chatClientInstance);
        setChannel(chatChannel);
      } catch (error) {
        toast.error("Failed to join video call");
        console.error("Error init call", error);
        resetState();
      } finally {
        if (isMounted) setIsInitializingCall(false);
      }
    };

    initCall();

    return () => {
      isMounted = false;
      void cleanup();
    };
  }, [
    callId,
    getToken,
    isCompleted,
    isHost,
    isLoaded,
    isParticipant,
    loadingSession,
  ]);

  return {
    streamClient,
    call,
    chatClient,
    channel,
    isInitializingCall,
  };
}

export default useStreamClient;
