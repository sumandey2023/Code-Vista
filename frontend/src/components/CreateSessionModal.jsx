import { Code2Icon, LoaderIcon, PlusIcon, XIcon } from "lucide-react";
import { PROBLEMS } from "../data/problems";

const CreateSessionModal = ({
  isOpen,
  onClose,
  roomConfig,
  setRoomConfig,
  onCreateRoom,
  isCreating,
}) => {
  const problems = Object.values(PROBLEMS);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-gray-950/80 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-2xl border border-green-500/25 bg-gray-900/95 backdrop-blur-md overflow-hidden"
        style={{ boxShadow: "0 0 60px rgba(0,0,0,0.6), 0 0 40px rgba(34,197,94,0.08)" }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)",
          }}
        />

        {/* Background grid */}
        <div
          className="absolute inset-0 opacity-5 pointer-events-none"
          style={{
            backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Corner orb */}
        <div
          className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10 blur-2xl pointer-events-none"
          style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
        />

        <div className="relative z-10 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center border border-green-500/30"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(22,163,74,0.05))",
                  boxShadow: "0 0 16px rgba(34,197,94,0.2)",
                }}
              >
                <PlusIcon className="w-5 h-5 text-green-400" />
              </div>
              <h3
                className="text-2xl font-black"
                style={{
                  background:
                    "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Create New Session
              </h3>
            </div>

            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full flex items-center justify-center border border-green-500/20 bg-gray-800/60 text-gray-400 hover:text-green-400 hover:border-green-500/40 transition-all duration-200"
            >
              <XIcon className="w-4 h-4" />
            </button>
          </div>

          {/* Problem selection */}
          <div className="space-y-2 mb-6">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold text-gray-300 tracking-wide">
                Select Problem
              </label>
              <span className="text-xs text-red-400 font-medium">Required</span>
            </div>

            <select
              className="w-full px-4 py-3 rounded-xl text-sm font-medium text-green-300 border border-green-500/25 bg-gray-950/70 backdrop-blur-sm focus:outline-none focus:border-green-500/50 transition-colors duration-200 cursor-pointer"
              style={{ boxShadow: "0 0 12px rgba(34,197,94,0.05)" }}
              value={roomConfig.problem}
              onChange={(e) => {
                const selectedProblem = problems.find(
                  (p) => p.title === e.target.value,
                );
                setRoomConfig({
                  difficulty: selectedProblem.difficulty,
                  problem: e.target.value,
                });
              }}
            >
              <option value="" disabled className="bg-gray-900 text-gray-500">
                Choose a coding problem...
              </option>
              {problems.map((problem) => (
                <option key={problem.id} value={problem.title} className="bg-gray-900 text-white">
                  {problem.title} ({problem.difficulty})
                </option>
              ))}
            </select>
          </div>

          {/* Room summary */}
          {roomConfig.problem && (
            <div
              className="relative rounded-xl border border-green-500/25 bg-green-950/20 p-4 mb-6 overflow-hidden"
            >
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)",
                }}
              />
              <div className="flex items-start gap-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center border border-green-500/30 flex-shrink-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(22,163,74,0.05))",
                  }}
                >
                  <Code2Icon className="size-4 text-green-400" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-green-300">Room Summary</p>
                  <p className="text-xs text-gray-400">
                    Problem:{" "}
                    <span className="text-white font-medium">{roomConfig.problem}</span>
                  </p>
                  <p className="text-xs text-gray-400">
                    Max Participants:{" "}
                    <span className="text-white font-medium">2 (1-on-1 session)</span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-semibold text-gray-400 border border-green-500/20 bg-gray-800/50 hover:text-green-400 hover:border-green-500/35 transition-all duration-200"
            >
              Cancel
            </button>

            <button
              onClick={onCreateRoom}
              disabled={isCreating || !roomConfig.problem}
              className="group relative inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-bold text-sm text-black overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              style={{
                background: "linear-gradient(135deg, #4ade80, #16a34a)",
                boxShadow: isCreating || !roomConfig.problem
                  ? "none"
                  : "0 0 20px rgba(34,197,94,0.35)",
              }}
            >
              {isCreating ? (
                <LoaderIcon className="size-4 animate-spin" />
              ) : (
                <PlusIcon className="size-4" />
              )}
              <span>{isCreating ? "Creating..." : "Create Session"}</span>
              {/* Shimmer */}
              {!isCreating && roomConfig.problem && (
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSessionModal;