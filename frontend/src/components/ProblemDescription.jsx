import { getDifficultyBadgeClass } from "../lib/utils";
const ProblemDescription = ({
  problem,
  currentProblemId,
  onProblemChange,
  allProblems,
}) => {
  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* HEADER — fixed inside panel */}
      <div
        className="flex-shrink-0 px-6 py-5 border-b border-green-500/20 relative"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,197,94,0.07), rgba(22,163,74,0.03))",
        }}
      >
        {/* Top glow line */}
        <div
          className="absolute top-0 left-0 right-0 h-px pointer-events-none"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
          }}
        />

        <div className="flex items-start justify-between gap-3 mb-1">
          <h1 className="text-2xl font-black text-white leading-tight">
            {problem.title}
          </h1>
          <span
            className={`badge badge-sm flex-shrink-0 mt-1 ${getDifficultyBadgeClass(problem.difficulty)}`}
          >
            {problem.difficulty}
          </span>
        </div>

        <p className="text-sm text-gray-500 mb-4">{problem.category}</p>

        {/* Problem selector */}
        <select
          className="w-full px-3 py-2 rounded-xl text-sm font-medium text-green-300 border border-green-500/30 bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:border-green-500/60 transition-colors duration-200 cursor-pointer"
          value={currentProblemId}
          onChange={(e) => onProblemChange(e.target.value)}
          style={{ boxShadow: "0 0 12px rgba(34,197,94,0.08)" }}
        >
          {allProblems.map((p) => (
            <option key={p.id} value={p.id} className="bg-gray-900 text-white">
              {p.title} — {p.difficulty}
            </option>
          ))}
        </select>
      </div>

      {/* SCROLLABLE BODY */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-green-500/20">
        {/* Description */}
        <div
          className="rounded-2xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm p-5 relative overflow-hidden"
          style={{ boxShadow: "0 0 24px rgba(0,0,0,0.3)" }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)",
            }}
          />
          <h2
            className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{
              background: "linear-gradient(135deg, #4ade80, #22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Description
          </h2>
          <div className="space-y-2 text-sm text-gray-300 leading-relaxed">
            <p>{problem.description.text}</p>
            {problem.description.notes.map((note, idx) => (
              <p key={idx} className="text-gray-400">
                {note}
              </p>
            ))}
          </div>
        </div>

        {/* Examples */}
        <div
          className="rounded-2xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm p-5 relative overflow-hidden"
          style={{ boxShadow: "0 0 24px rgba(0,0,0,0.3)" }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)",
            }}
          />
          <h2
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{
              background: "linear-gradient(135deg, #4ade80, #22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Examples
          </h2>

          <div className="space-y-4">
            {problem.examples.map((example, idx) => (
              <div key={idx}>
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-black flex-shrink-0"
                    style={{
                      background: "linear-gradient(135deg, #4ade80, #16a34a)",
                    }}
                  >
                    {idx + 1}
                  </div>
                  <p className="text-sm font-semibold text-green-300">
                    Example {idx + 1}
                  </p>
                </div>

                <div className="rounded-xl border border-green-500/15 bg-gray-950/60 p-4 font-mono text-xs space-y-2">
                  <div className="flex gap-3">
                    <span className="text-green-400 font-bold min-w-[65px]">
                      Input:
                    </span>
                    <span className="text-gray-300">{example.input}</span>
                  </div>
                  <div className="flex gap-3">
                    <span className="text-yellow-400 font-bold min-w-[65px]">
                      Output:
                    </span>
                    <span className="text-gray-300">{example.output}</span>
                  </div>
                  {example.explanation && (
                    <div className="pt-2 border-t border-green-500/10 mt-1">
                      <span className="text-gray-500 font-sans text-xs">
                        <span className="text-gray-400 font-semibold">
                          Explanation:
                        </span>{" "}
                        {example.explanation}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Constraints */}
        <div
          className="rounded-2xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm p-5 relative overflow-hidden"
          style={{ boxShadow: "0 0 24px rgba(0,0,0,0.3)" }}
        >
          <div
            className="absolute top-0 left-0 right-0 h-px pointer-events-none"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(34,197,94,0.4), transparent)",
            }}
          />
          <h2
            className="text-sm font-bold uppercase tracking-widest mb-4"
            style={{
              background: "linear-gradient(135deg, #4ade80, #22c55e)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Constraints
          </h2>
          <ul className="space-y-2">
            {problem.constraints.map((constraint, idx) => (
              <li key={idx} className="flex gap-3 items-start">
                <span
                  className="mt-1.5 w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0"
                  style={{ boxShadow: "0 0 6px rgba(34,197,94,0.6)" }}
                />
                <code className="text-xs text-gray-300 font-mono leading-relaxed">
                  {constraint}
                </code>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom padding */}
        <div className="h-2" />
      </div>
    </div>
  );
};

export default ProblemDescription;
