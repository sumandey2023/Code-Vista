import MainNav from "../components/MainNav";
import { useNavigate } from "react-router";
import { useUser } from "@clerk/clerk-react";
import { useState } from "react";
import {
  useActiveSessions,
  useCreateSession,
  useMyRecentSessions,
} from "../hooks/useSessions";
import WelcomeSection from "../components/WelcomeSection";
import ActiveSessions from "../components/ActiveSessions";
import RecentSessions from "../components/RecentSessions";
import CreateSessionModal from "../components/CreateSessionModal";
import StatsCards from "../components/StatsCards";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [liveSessionSearch, setLiveSessionSearch] = useState("");
  const [roomConfig, setRoomConfig] = useState({
    problem: "",
    difficulty: "",
    sessionPassword: "",
  });
  const createSessionMutation = useCreateSession();
  const {
    data: activeSessionsData,
    isLoading: loadingActiveSessions,
    isRefetching: refreshingActiveSessions,
    refetch: refetchActiveSessions,
  } = useActiveSessions();
  const { data: recentSessionsData, isLoading: loadingRecentSessions } =
    useMyRecentSessions();

  const handleCreateRoom = () => {
    if (
      !roomConfig.problem ||
      !roomConfig.difficulty ||
      !roomConfig.sessionPassword ||
      roomConfig.sessionPassword.trim().length < 4
    ) {
      return;
    }

    createSessionMutation.mutate(
      {
        problem: roomConfig.problem,
        difficulty: roomConfig.difficulty.toLowerCase(),
        sessionPassword: roomConfig.sessionPassword.trim(),
      },
      {
        onSuccess: (data) => {
          setShowCreateModal(false);
          setRoomConfig({ problem: "", difficulty: "", sessionPassword: "" });
          navigate(`/session/${data.session._id}`);
        },
      },
    );
  };

  const activeSessions = activeSessionsData?.sessions || [];
  const recentSessions = recentSessionsData?.sessions || [];

  const isUserInSession = (session) => {
    if (!user.id) return false;
    return (
      session.host?.clerkId === user.id ||
      session.participant?.clerkId === user.id
    );
  };

  const myLiveSessions = activeSessions.filter(
    (session) => session.host?.clerkId === user?.id,
  );

  const otherLiveSessions = activeSessions.filter(
    (session) => session.host?.clerkId !== user?.id,
  );

  const normalizedSearch = liveSessionSearch.trim().toLowerCase();
  const filteredOtherLiveSessions = normalizedSearch
    ? otherLiveSessions.filter((session) =>
        session._id?.toLowerCase().includes(normalizedSearch),
      )
    : otherLiveSessions;

  return (
    <>
      <div className="relative min-h-screen overflow-x-hidden">
        {/* Grid background */}
        <div
          className="fixed inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Orbs — fixed so they stay while scrolling */}
        <div
          className="fixed top-[-5%] left-[-5%] w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #22c55e, transparent)",
          }}
        />
        <div
          className="fixed bottom-[-5%] right-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #16a34a, transparent)",
          }}
        />
        <div
          className="fixed top-[45%] left-[40%] w-64 h-64 rounded-full opacity-8 blur-3xl pointer-events-none"
          style={{
            background: "radial-gradient(circle, #4ade80, transparent)",
          }}
        />

        {/* Content */}
        <div className="relative z-10">
          <MainNav />
          <WelcomeSection onCreateSession={() => setShowCreateModal(true)} />

          <div className="container mx-auto px-6 pb-16">
            <div className="mb-5 max-w-2xl">
              <StatsCards
                activeSessionsCount={activeSessions.length}
                recentSessionsCount={recentSessions.length}
              />
            </div>

            <div className="space-y-6">
              <ActiveSessions
                sessions={filteredOtherLiveSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
                title="Live Sessions"
                emptyMessage={
                  normalizedSearch
                    ? "No session found with this ID."
                    : "No other live sessions available now."
                }
                searchQuery={liveSessionSearch}
                onSearchChange={setLiveSessionSearch}
                onRefresh={refetchActiveSessions}
                isRefreshing={refreshingActiveSessions}
                showSessionCount={false}
              />

              <ActiveSessions
                sessions={myLiveSessions}
                isLoading={loadingActiveSessions}
                isUserInSession={isUserInSession}
                title="Your Live Sessions"
                emptyMessage="You have no live sessions right now."
                showSessionCount={false}
              />
            </div>

            <RecentSessions
              sessions={recentSessions}
              isLoading={loadingRecentSessions}
            />
          </div>
        </div>
      </div>

      <CreateSessionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        roomConfig={roomConfig}
        setRoomConfig={setRoomConfig}
        onCreateRoom={handleCreateRoom}
        isCreating={createSessionMutation.isPending}
      />
    </>
  );
};

export default Dashboard;
