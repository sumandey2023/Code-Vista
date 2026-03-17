import { useUser } from "@clerk/clerk-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import {
  useEndSession,
  useJoinSession,
  useSessionById,
} from "../hooks/useSessions";
import { PROBLEMS } from "../data/problems";
import { executeCode } from "../lib/judge0";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { getDifficultyBadgeClass } from "../lib/utils";
import { Loader2Icon, LogOutIcon, PhoneOffIcon } from "lucide-react";
import CodeEditorPanel from "../components/CodeEditorPanel";
import OutputPanel from "../components/OutputPanel";
import { StreamCall, StreamVideo } from "@stream-io/video-react-sdk";
import VideoCallUI from "../components/VideoCallUI";
import MainNav from "../components/MainNav";
import useStreamClient from "../hooks/useStreamClient";

function SessionPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useUser();
  const [output, setOutput] = useState(null);
  const [isRunning, setIsRunning] = useState(false);

  const {
    data: sessionData,
    isLoading: loadingSession,
    refetch,
  } = useSessionById(id);

  const joinSessionMutation = useJoinSession();
  const endSessionMutation = useEndSession();

  const session = sessionData?.session;
  const isHost = session?.host?.clerkId === user?.id;
  const isParticipant = session?.participant?.clerkId === user?.id;

  const { call, channel, chatClient, isInitializingCall, streamClient } =
    useStreamClient(session, loadingSession, isHost, isParticipant);

  const problemData = session?.problem
    ? Object.values(PROBLEMS).find((p) => p.title === session.problem)
    : null;

  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [code, setCode] = useState(
    problemData?.starterCode?.[selectedLanguage] || "",
  );

  useEffect(() => {
    if (!session || !user || loadingSession) return;
    if (isHost || isParticipant) return;
    joinSessionMutation.mutate(id, { onSuccess: refetch });
  }, [id, isHost, isParticipant, joinSessionMutation, loadingSession, refetch, session, user]);

  useEffect(() => {
    if (!session || loadingSession) return;
    if (session.status === "completed") navigate("/dashboard");
  }, [session, loadingSession, navigate]);

  useEffect(() => {
    if (problemData?.starterCode?.[selectedLanguage]) {
      setCode(problemData.starterCode[selectedLanguage]);
    }
  }, [problemData, selectedLanguage]);

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setSelectedLanguage(newLang);
    setCode(problemData?.starterCode?.[newLang] || "");
    setOutput(null);
  };

  const handleRunCode = async () => {
    setIsRunning(true);
    setOutput(null);
    const result = await executeCode(selectedLanguage, code);
    setOutput(result);
    setIsRunning(false);
  };

  const handleEndSession = () => {
    if (confirm("Are you sure you want to end this session? All participants will be notified.")) {
      endSessionMutation.mutate(id, {
        onSuccess: () => navigate("/dashboard"),
      });
    }
  };

  return (
    <div className="h-screen flex flex-col overflow-hidden relative">

      {/* Grid background */}
      <div
        className="fixed inset-0 opacity-10 pointer-events-none z-0"
        style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orbs */}
      <div
        className="fixed top-[-5%] left-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
      />
      <div
        className="fixed bottom-[-5%] right-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none z-0"
        style={{ background: "radial-gradient(circle, #16a34a, transparent)" }}
      />

      {/* Nav */}
      <div className="relative z-10 flex-shrink-0">
        <MainNav />
      </div>

      {/* Panels */}
      <div className="relative z-10 flex-1 overflow-hidden p-2 pt-0">
        <PanelGroup direction="horizontal" className="h-full gap-0">

          {/* LEFT PANEL */}
          <Panel defaultSize={50} minSize={30} className="h-full overflow-hidden">
            <PanelGroup direction="vertical" className="h-full">

              {/* Problem description */}
              <Panel defaultSize={50} minSize={20} className="overflow-hidden">
                <div className="h-full flex flex-col overflow-hidden rounded-xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm"
                  style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
                >
                  {/* Top glow */}
                  <div className="relative flex-shrink-0">
                    <div
                      className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)" }}
                    />
                    {/* Header */}
                    <div
                      className="px-5 py-4 border-b border-green-500/15"
                      style={{ background: "linear-gradient(135deg, rgba(34,197,94,0.07), rgba(22,163,74,0.03))" }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h1 className="text-xl font-black text-white truncate">
                            {session?.problem || "Loading..."}
                          </h1>
                          {problemData?.category && (
                            <p className="text-xs text-gray-500 mt-0.5">{problemData.category}</p>
                          )}
                          <p className="text-xs text-gray-600 mt-1">
                            Host: <span className="text-gray-400">{session?.host?.name || "..."}</span>
                            {" "}·{" "}
                            <span className="text-gray-400">{session?.participant ? 2 : 1}/2</span> participants
                          </p>
                        </div>

                        <div className="flex items-center gap-2 flex-shrink-0">
                          <span className={`badge badge-sm ${getDifficultyBadgeClass(session?.difficulty)}`}>
                            {session?.difficulty
                              ? session.difficulty.slice(0, 1).toUpperCase() + session.difficulty.slice(1)
                              : "Easy"}
                          </span>

                          {isHost && session?.status === "active" && (
                            <button
                              onClick={handleEndSession}
                              disabled={endSessionMutation.isPending}
                              className="group relative inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs text-white overflow-hidden border border-red-500/40 bg-red-500/10 hover:bg-red-500/20 hover:border-red-500/60 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50"
                              style={{ boxShadow: "0 0 12px rgba(239,68,68,0.15)" }}
                            >
                              {endSessionMutation.isPending
                                ? <Loader2Icon className="w-3 h-3 animate-spin" />
                                : <LogOutIcon className="w-3 h-3" />
                              }
                              End Session
                            </button>
                          )}

                          {session?.status === "completed" && (
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/30 bg-green-500/10 text-green-400 text-xs font-semibold">
                              Completed
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Scrollable content */}
                  <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">

                    {/* Description */}
                    {problemData?.description && (
                      <div className="rounded-xl border border-green-500/15 bg-gray-950/50 p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)" }}
                        />
                        <h2 className="text-xs font-bold uppercase tracking-widest mb-3"
                          style={{
                            background: "linear-gradient(135deg, #4ade80, #22c55e)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >Description</h2>
                        <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
                          <p>{problemData.description.text}</p>
                          {problemData.description.notes?.map((note, idx) => (
                            <p key={idx} className="text-gray-400">{note}</p>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Examples */}
                    {problemData?.examples?.length > 0 && (
                      <div className="rounded-xl border border-green-500/15 bg-gray-950/50 p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)" }}
                        />
                        <h2 className="text-xs font-bold uppercase tracking-widest mb-4"
                          style={{
                            background: "linear-gradient(135deg, #4ade80, #22c55e)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >Examples</h2>
                        <div className="space-y-4">
                          {problemData.examples.map((example, idx) => (
                            <div key={idx}>
                              <div className="flex items-center gap-2 mb-2">
                                <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
                                  style={{ background: "linear-gradient(135deg, #4ade80, #16a34a)" }}
                                >{idx + 1}</div>
                                <p className="text-sm font-semibold text-green-300">Example {idx + 1}</p>
                              </div>
                              <div className="rounded-lg border border-green-500/10 bg-gray-900/60 p-3 font-mono text-xs space-y-1.5">
                                <div className="flex gap-3">
                                  <span className="text-green-400 font-bold min-w-[60px]">Input:</span>
                                  <span className="text-gray-300">{example.input}</span>
                                </div>
                                <div className="flex gap-3">
                                  <span className="text-yellow-400 font-bold min-w-[60px]">Output:</span>
                                  <span className="text-gray-300">{example.output}</span>
                                </div>
                                {example.explanation && (
                                  <div className="pt-2 border-t border-green-500/10 mt-1 text-gray-500 text-xs">
                                    <span className="text-gray-400 font-semibold">Explanation:</span>{" "}
                                    {example.explanation}
                                  </div>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Constraints */}
                    {problemData?.constraints?.length > 0 && (
                      <div className="rounded-xl border border-green-500/15 bg-gray-950/50 p-4 relative overflow-hidden">
                        <div className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                          style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)" }}
                        />
                        <h2 className="text-xs font-bold uppercase tracking-widest mb-3"
                          style={{
                            background: "linear-gradient(135deg, #4ade80, #22c55e)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                          }}
                        >Constraints</h2>
                        <ul className="space-y-2">
                          {problemData.constraints.map((constraint, idx) => (
                            <li key={idx} className="flex gap-3 items-start">
                              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
                                style={{ boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
                              />
                              <code className="text-xs text-gray-300 font-mono leading-relaxed">{constraint}</code>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="h-2" />
                  </div>
                </div>
              </Panel>

              <PanelResizeHandle className="h-1.5 my-1 bg-green-500/10 hover:bg-green-500/40 active:bg-green-500/60 transition-colors duration-200 cursor-row-resize rounded-full" />

              {/* Code editor + output */}
              <Panel defaultSize={50} minSize={20} className="overflow-hidden">
                <PanelGroup direction="vertical" className="h-full">
                  <Panel defaultSize={70} minSize={30} className="overflow-hidden">
                    <div className="h-full rounded-xl border border-green-500/20 bg-gray-900/60 overflow-hidden"
                      style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
                    >
                      <CodeEditorPanel
                        selectedLanguage={selectedLanguage}
                        code={code}
                        isRunning={isRunning}
                        onLanguageChange={handleLanguageChange}
                        onCodeChange={(value) => setCode(value)}
                        onRunCode={handleRunCode}
                      />
                    </div>
                  </Panel>

                  <PanelResizeHandle className="h-1.5 my-1 bg-green-500/10 hover:bg-green-500/40 active:bg-green-500/60 transition-colors duration-200 cursor-row-resize rounded-full" />

                  <Panel defaultSize={30} minSize={15} className="overflow-hidden">
                    <div className="h-full rounded-xl border border-green-500/20 bg-gray-900/60 overflow-hidden"
                      style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
                    >
                      <OutputPanel output={output} isRunning={isRunning} />
                    </div>
                  </Panel>
                </PanelGroup>
              </Panel>

            </PanelGroup>
          </Panel>

          <PanelResizeHandle className="w-1.5 mx-1 bg-green-500/10 hover:bg-green-500/40 active:bg-green-500/60 transition-colors duration-200 cursor-col-resize rounded-full" />

          {/* RIGHT PANEL — Video */}
          <Panel defaultSize={50} minSize={30} className="h-full overflow-hidden">
            <div className="h-full rounded-xl border border-green-500/20 bg-gray-950/80 overflow-hidden relative"
              style={{ boxShadow: "0 0 30px rgba(0,0,0,0.4)" }}
            >
              {/* Top glow */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
                style={{ background: "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)" }}
              />

              {isInitializingCall ? (
                <div className="h-full flex items-center justify-center relative overflow-hidden">
                  <div
                    className="absolute top-[-10%] left-[-5%] w-64 h-64 rounded-full opacity-15 blur-3xl pointer-events-none"
                    style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
                  />
                  <div className="relative z-10 text-center space-y-4">
                    <div className="relative mx-auto w-16 h-16">
                      <div className="absolute inset-0 rounded-xl border border-green-500/30 animate-ping opacity-30" />
                      <div
                        className="relative w-16 h-16 rounded-xl flex items-center justify-center border border-green-500/40"
                        style={{
                          background: "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
                          boxShadow: "0 0 30px rgba(34,197,94,0.2)",
                        }}
                      >
                        <Loader2Icon className="w-7 h-7 animate-spin text-green-400" />
                      </div>
                    </div>
                    <div>
                      <p className="font-bold text-white">Connecting to video call...</p>
                      <p className="text-xs text-gray-500 mt-1">Setting up your session</p>
                    </div>
                    <div className="w-36 mx-auto h-1 rounded-full bg-gray-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-green-500 to-green-400"
                        style={{ animation: "loadingBar 1.5s ease-in-out infinite" }}
                      />
                    </div>
                  </div>
                  <style>{`
                    @keyframes loadingBar {
                      0% { width: 0%; margin-left: 0%; }
                      50% { width: 60%; margin-left: 20%; }
                      100% { width: 0%; margin-left: 100%; }
                    }
                  `}</style>
                </div>

              ) : !streamClient || !call ? (
                <div className="h-full flex items-center justify-center p-6">
                  <div
                    className="relative w-full max-w-sm rounded-2xl border border-red-500/25 bg-gray-900/80 p-8 text-center overflow-hidden"
                    style={{ boxShadow: "0 0 40px rgba(239,68,68,0.1)" }}
                  >
                    <div
                      className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(239,68,68,0.4), transparent)" }}
                    />
                    <div
                      className="w-16 h-16 mx-auto mb-4 rounded-2xl flex items-center justify-center border border-red-500/30"
                      style={{ background: "linear-gradient(135deg, rgba(239,68,68,0.15), rgba(239,68,68,0.05))", boxShadow: "0 0 20px rgba(239,68,68,0.15)" }}
                    >
                      <PhoneOffIcon className="w-7 h-7 text-red-400" />
                    </div>
                    <h2 className="text-xl font-black text-white mb-2">Connection Failed</h2>
                    <p className="text-sm text-gray-500">Unable to connect to the video call</p>
                  </div>
                </div>

              ) : (
                <div className="h-full">
                  <StreamVideo client={streamClient}>
                    <StreamCall call={call}>
                      <VideoCallUI chatClient={chatClient} channel={channel} />
                    </StreamCall>
                  </StreamVideo>
                </div>
              )}
            </div>
          </Panel>

        </PanelGroup>
      </div>
    </div>
  );
}

export default SessionPage;