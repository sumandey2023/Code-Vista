import {
  CallControls,
  CallingState,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { Loader2Icon, MessageSquareIcon, UsersIcon, XIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import {
  Channel,
  Chat,
  MessageInput,
  MessageList,
  Thread,
  Window,
} from "stream-chat-react";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import "stream-chat-react/dist/css/v2/index.css";

function VideoCallUI({
  chatClient,
  channel,
  questionPanelVisible = true,
  interviewerMode = false,
}) {
  const navigate = useNavigate();
  const { useCallCallingState, useParticipantCount } = useCallStateHooks();
  const callingState = useCallCallingState();
  const participantCount = useParticipantCount();
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    if (interviewerMode && !questionPanelVisible && isChatOpen) {
      setIsChatOpen(false);
    }
  }, [interviewerMode, isChatOpen, questionPanelVisible]);

  if (callingState === CallingState.JOINING) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 mx-auto animate-spin text-primary mb-4" />
          <p className="text-lg">Joining call...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`h-full flex gap-3 relative str-video codevista-call-layout ${
        questionPanelVisible ? "questions-visible" : "questions-hidden"
      }`}
    >
      <div className="flex-1 flex flex-col gap-3">
        {/* Participants count badge and Chat Toggle */}
        <div className="flex items-center justify-between gap-2 bg-base-100 p-3 rounded-lg shadow">
          <div className="flex items-center gap-2">
            <UsersIcon className="w-5 h-5 text-primary" />
            <span className="font-semibold">
              {participantCount}{" "}
              {participantCount === 1 ? "participant" : "participants"}
            </span>
          </div>
          {chatClient && channel && (
            <button
              onClick={() => setIsChatOpen(!isChatOpen)}
              className={`btn btn-sm gap-2 ${isChatOpen ? "btn-primary" : "btn-ghost"}`}
              title={isChatOpen ? "Hide chat" : "Show chat"}
            >
              <MessageSquareIcon className="size-4" />
              Chat
            </button>
          )}
        </div>

        <div className="flex-1 bg-base-300 rounded-lg overflow-hidden relative">
          <SpeakerLayout
            participantsBarPosition={
              interviewerMode && !questionPanelVisible ? "right" : "bottom"
            }
          />

          <div className="absolute top-3 left-3 z-20 px-2.5 py-1 rounded-full border border-white/20 bg-black/45 text-[11px] text-white/90 font-medium backdrop-blur-sm">
            Screen share + camera tiles visible
          </div>
        </div>

        <div className="bg-base-100 p-3 rounded-lg shadow flex justify-center">
          <CallControls onLeave={() => navigate("/dashboard")} />
        </div>
      </div>

      {/* CHAT SECTION */}

      {chatClient && channel && (
        <div
          className={`flex flex-col rounded-lg shadow overflow-hidden bg-[#272a30] transition-all duration-300 ease-in-out ${
            isChatOpen && !(interviewerMode && !questionPanelVisible)
              ? "w-72 opacity-100"
              : "w-0 opacity-0"
          }`}
        >
          {isChatOpen && (
            <>
              <div className="bg-[#1c1e22] p-3 border-b border-[#3a3d44] flex items-center justify-between">
                <h3 className="font-semibold text-white">Session Chat</h3>
                <button
                  onClick={() => setIsChatOpen(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                  title="Close chat"
                >
                  <XIcon className="size-5" />
                </button>
              </div>
              <div className="flex-1 overflow-hidden stream-chat-dark">
                <Chat client={chatClient} theme="str-chat__theme-dark">
                  <Channel channel={channel}>
                    <Window>
                      <MessageList />
                      <MessageInput />
                    </Window>
                    <Thread />
                  </Channel>
                </Chat>
              </div>
            </>
          )}
        </div>
      )}

      <style>{`
        .codevista-call-layout .str-video__speaker-layout {
          height: 100%;
        }

        .codevista-call-layout .str-video__participant-bar {
          position: absolute;
          left: 10px;
          right: 10px;
          bottom: 10px;
          z-index: 21;
          padding: 6px;
          border-radius: 12px;
          background: rgba(3, 7, 18, 0.58);
          backdrop-filter: blur(6px);
          border: 1px solid rgba(74, 222, 128, 0.3);
          max-height: 96px;
          overflow-x: auto;
          overflow-y: hidden;
        }

        .codevista-call-layout .str-video__speaker-layout__spotlight {
          padding-bottom: 90px;
        }

        .codevista-call-layout.questions-hidden .str-video__speaker-layout__spotlight {
          padding-bottom: 12px;
          padding-right: 124px;
        }

        .codevista-call-layout.questions-hidden .str-video__participant-bar {
          top: 10px;
          bottom: 10px;
          left: auto;
          right: 10px;
          width: 110px;
          max-height: none;
          overflow-y: auto;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}
export default VideoCallUI;
