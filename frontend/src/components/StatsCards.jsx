import { TrophyIcon, UsersIcon } from "lucide-react";

const StatsCards = ({ activeSessionsCount, recentSessionsCount }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      {/* Active Sessions */}
      <div
        className="group relative rounded-xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm p-4 overflow-hidden hover:border-green-500/40 transition-all duration-300"
        style={{ boxShadow: "0 0 18px rgba(0,0,0,0.25)" }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
          }}
        />

        {/* Hover inner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08), transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-green-500/30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
                boxShadow: "0 0 12px rgba(34,197,94,0.15)",
              }}
            >
              <UsersIcon className="w-4 h-4 text-green-400" />
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-[10px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Live
            </div>
          </div>

          <div
            className="text-3xl font-black mb-0.5"
            style={{
              background: "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {activeSessionsCount}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Active Sessions
          </div>
        </div>
      </div>

      {/* Total Sessions */}
      <div
        className="group relative rounded-xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm p-4 overflow-hidden hover:border-green-500/40 transition-all duration-300"
        style={{ boxShadow: "0 0 18px rgba(0,0,0,0.25)" }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
          }}
        />

        {/* Hover inner glow */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
          style={{
            background:
              "radial-gradient(ellipse at 50% 0%, rgba(34,197,94,0.08), transparent 70%)",
          }}
        />

        <div className="relative z-10">
          <div className="flex items-center justify-between mb-3">
            <div
              className="w-9 h-9 rounded-lg flex items-center justify-center border border-green-500/30"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
                boxShadow: "0 0 12px rgba(34,197,94,0.15)",
              }}
            >
              <TrophyIcon className="w-4 h-4 text-green-400" />
            </div>
          </div>

          <div
            className="text-3xl font-black mb-0.5"
            style={{
              background: "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {recentSessionsCount}
          </div>
          <div className="text-xs text-gray-500 font-medium">
            Total Sessions
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsCards;
