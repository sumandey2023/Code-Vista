import { Code2, Clock, Users, Trophy, Loader } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";
import { formatDistanceToNow } from "date-fns";

const RecentSessions = ({ sessions, isLoading }) => {
  return (
    <div
      className="relative rounded-2xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm overflow-hidden mt-6 hover:border-green-500/40 transition-all duration-300"
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
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center border border-green-500/30"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
              boxShadow: "0 0 16px rgba(34,197,94,0.15)",
            }}
          >
            <Clock className="w-5 h-5 text-green-400" />
          </div>
          <h2
            className="text-2xl font-black"
            style={{
              background: "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Your Past Sessions
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

          {/* Loading */}
          {isLoading && (
            <div className="col-span-full flex items-center justify-center py-20">
              <Loader className="w-8 h-8 animate-spin text-green-400" />
            </div>
          )}

          {/* Session cards */}
          {!isLoading && sessions.length > 0 &&
            sessions.map((session) => (
              <div
                key={session._id}
                className={`group relative rounded-xl border overflow-hidden transition-all duration-200
                  ${session.status === "active"
                    ? "border-green-500/30 bg-green-950/30 hover:border-green-500/50"
                    : "border-green-500/15 bg-gray-950/50 hover:border-green-500/30"
                  }`}
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.07), transparent 70%)",
                  }}
                />

                {/* Active badge */}
                {session.status === "active" && (
                  <div className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    ACTIVE
                  </div>
                )}

                <div className="relative z-10 p-5">
                  {/* Top row */}
                  <div className="flex items-start gap-3 mb-4">
                    <div
                      className="w-11 h-11 rounded-xl flex items-center justify-center border border-green-500/30 flex-shrink-0"
                      style={{
                        background:
                          session.status === "active"
                            ? "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(22,163,74,0.1))"
                            : "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
                        boxShadow: "0 0 14px rgba(34,197,94,0.15)",
                      }}
                    >
                      <Code2 className="w-5 h-5 text-green-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-white text-sm mb-1.5 truncate">
                        {session.problem}
                      </h3>
                      <span className={`badge badge-sm ${getDifficultyBadgeClass(session.difficulty)}`}>
                        {session.difficulty}
                      </span>
                    </div>
                  </div>

                  {/* Meta */}
                  <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Clock className="w-3.5 h-3.5 text-green-500/50" />
                      <span>
                        {formatDistanceToNow(new Date(session.createdAt), {
                          addSuffix: true,
                        })}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-500">
                      <Users className="w-3.5 h-3.5 text-green-500/50" />
                      <span>
                        {session.participant ? "2" : "1"} participant
                        {session.participant ? "s" : ""}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div
                    className="flex items-center justify-between pt-3 border-t border-green-500/10"
                  >
                    <span className="text-xs font-semibold text-green-500/60 uppercase tracking-wide">
                      Completed
                    </span>
                    <span className="text-xs text-gray-600">
                      {new Date(session.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            ))}

          {/* Empty state */}
          {!isLoading && sessions.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-16 gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center border border-green-500/20"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,197,94,0.08), rgba(22,163,74,0.03))",
                }}
              >
                <Trophy className="w-8 h-8 text-green-500/30" />
              </div>
              <div className="text-center">
                <p className="text-white font-semibold mb-1">No sessions yet</p>
                <p className="text-sm text-gray-600">
                  Start your coding journey today!
                </p>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default RecentSessions;