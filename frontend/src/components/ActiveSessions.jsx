import {
  ArrowRightIcon,
  Code2Icon,
  CrownIcon,
  LockIcon,
  RefreshCwIcon,
  SearchIcon,
  SparklesIcon,
  UsersIcon,
  ZapIcon,
  LoaderIcon,
} from "lucide-react";
import { Link } from "react-router";
import { getDifficultyBadgeClass } from "../lib/utils";

const ActiveSessions = ({
  sessions,
  isLoading,
  isUserInSession,
  title = "Live Sessions",
  emptyMessage = "Be the first to create one!",
  searchQuery = "",
  onSearchChange,
  onRefresh,
  isRefreshing = false,
  showSessionCount = true,
}) => {
  return (
    <div
      className="relative rounded-2xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm overflow-hidden transition-all duration-300 hover:border-green-500/40"
      style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
    >
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
        }}
      />

      <div className="p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center border border-green-500/30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
                boxShadow: "0 0 16px rgba(34,197,94,0.15)",
              }}
            >
              <ZapIcon className="size-5 text-green-400" />
            </div>
            <h2
              className="text-2xl font-black"
              style={{
                background:
                  "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {title}
            </h2>
          </div>

          {showSessionCount && (
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-xs font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              {sessions.length} active
            </div>
          )}
        </div>

        {(onSearchChange || onRefresh) && (
          <div className="flex flex-col sm:flex-row gap-3 mb-5">
            {onSearchChange && (
              <div className="relative flex-1">
                <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-green-500/80" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Search by Session ID"
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl text-sm text-green-300 border border-green-500/25 bg-gray-950/70 focus:outline-none focus:border-green-500/50"
                />
              </div>
            )}

            {onRefresh && (
              <button
                onClick={onRefresh}
                disabled={isRefreshing}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border border-green-500/30 bg-gray-950/70 text-green-300 hover:border-green-500/50 disabled:opacity-60"
              >
                <RefreshCwIcon
                  className={`w-4 h-4 ${isRefreshing ? "animate-spin" : ""}`}
                />
                Refresh
              </button>
            )}
          </div>
        )}

        {/* Sessions list */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
          {/* Loading */}
          {isLoading && (
            <div className="flex items-center justify-center py-20">
              <LoaderIcon className="size-8 animate-spin text-green-400" />
            </div>
          )}

          {/* Sessions */}
          {!isLoading &&
            sessions.length > 0 &&
            sessions.map((session) => (
              <div
                key={session._id}
                className="group relative rounded-xl border border-green-500/15 bg-gray-950/50 hover:border-green-500/35 overflow-hidden transition-all duration-200"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 0% 50%, rgba(34,197,94,0.06), transparent 70%)",
                  }}
                />

                <div className="relative z-10 flex items-center justify-between gap-4 p-4">
                  {/* Left */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    {/* Icon */}
                    <div className="relative flex-shrink-0">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center border border-green-500/30"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(22,163,74,0.05))",
                          boxShadow: "0 0 14px rgba(34,197,94,0.15)",
                        }}
                      >
                        <Code2Icon className="size-5 text-green-400" />
                      </div>
                      {/* Live dot */}
                      <div
                        className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border-2 border-gray-950"
                        style={{ boxShadow: "0 0 6px rgba(34,197,94,0.8)" }}
                      />
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                        <h3 className="font-bold text-white truncate">
                          {session.problem}
                        </h3>
                        <span
                          className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`}
                        >
                          {session.difficulty.slice(0, 1).toUpperCase() +
                            session.difficulty.slice(1)}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <CrownIcon className="size-3 text-yellow-400" />
                          <span className="font-medium text-gray-400">
                            {session.host?.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <UsersIcon className="size-3" />
                          <span>{session.participant ? "2/2" : "1/2"}</span>
                        </div>
                        {session.isPasswordProtected && (
                          <div className="flex items-center gap-1 text-amber-400">
                            <LockIcon className="size-3" />
                            <span>Protected</span>
                          </div>
                        )}
                        {session.participant && !isUserInSession(session) ? (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border border-red-500/40 bg-red-500/10 text-red-400">
                            FULL
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold border border-green-500/40 bg-green-500/10 text-green-400">
                            <span className="w-1 h-1 rounded-full bg-green-400 animate-pulse" />
                            OPEN
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right — action */}
                  {session.participant && !isUserInSession(session) ? (
                    <button
                      disabled
                      className="flex-shrink-0 px-4 py-2 rounded-full text-sm font-semibold text-gray-600 border border-gray-700 bg-gray-800/50 cursor-not-allowed"
                    >
                      Full
                    </button>
                  ) : (
                    <Link
                      to={`/session/${session._id}`}
                      className="group/btn relative flex-shrink-0 inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm text-black overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95"
                      style={{
                        background: "linear-gradient(135deg, #4ade80, #16a34a)",
                        boxShadow: "0 0 16px rgba(34,197,94,0.3)",
                      }}
                    >
                      <span>
                        {isUserInSession(session) ? "Rejoin" : "Join"}
                      </span>
                      <ArrowRightIcon className="size-4 group-hover/btn:translate-x-0.5 transition-transform" />
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700 ease-in-out" />
                    </Link>
                  )}
                </div>
              </div>
            ))}

          {/* Empty state */}
          {!isLoading && sessions.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center border border-green-500/20"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(22,163,74,0.03))",
                }}
              >
                <SparklesIcon className="w-8 h-8 text-green-500/30" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-1">
                  No active sessions
                </p>
                <p className="text-sm text-gray-600">{emptyMessage}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveSessions;
