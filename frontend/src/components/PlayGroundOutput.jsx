import { CheckCircleIcon, TerminalIcon, XCircleIcon } from "lucide-react";

function PlayGroundOutput({ output, isRunning, testPassed }) {
  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      {/* Top glow line */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
        }}
      />

      {/* Header */}
      <div
        className="flex-shrink-0 flex items-center gap-2.5 px-4 py-3 border-b border-green-500/20"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,197,94,0.07), rgba(22,163,74,0.03))",
          backdropFilter: "blur(8px)",
        }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center border border-green-500/30 flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
          }}
        >
          <TerminalIcon className="size-3.5 text-green-400" />
        </div>

        <span
          className="text-sm font-bold uppercase tracking-widest"
          style={{
            background: "linear-gradient(135deg, #4ade80, #22c55e)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          Output
        </span>

        {/* Running badge */}
        {isRunning && (
          <div className="ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-green-500/40 bg-green-500/10 text-green-400 text-xs font-semibold">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Running...
          </div>
        )}

        {/* Test result badge */}
        {!isRunning && testPassed !== null && (
          <div
            className={`ml-auto inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-semibold ${
              testPassed
                ? "border-green-500/40 bg-green-500/10 text-green-400"
                : "border-red-500/40 bg-red-500/10 text-red-400"
            }`}
          >
            {testPassed ? (
              <>
                <CheckCircleIcon className="size-3" />
                Passed
              </>
            ) : (
              <>
                <XCircleIcon className="size-3" />
                Failed
              </>
            )}
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex-1 overflow-auto p-4 space-y-3">
        {/* Empty state */}
        {output === null && !isRunning && (
          <div className="h-full flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center border border-green-500/20">
              <TerminalIcon className="size-5 text-green-500/40" />
            </div>
            <p className="text-sm text-gray-600">
              Click{" "}
              <span className="text-green-500 font-semibold">Run Code</span> to
              see output
            </p>
          </div>
        )}

        {/* Running animation */}
        {isRunning && (
          <div className="h-full flex flex-col items-center justify-center gap-3">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full bg-green-400"
                  style={{
                    animation: `bounce 0.8s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-gray-500">Executing your code...</p>
          </div>
        )}

        {/* Successful output */}
        {output !== null && !isRunning && output.success && (
          <div className="rounded-xl border border-green-500/20 bg-gray-950/60 p-4">
            <pre className="text-sm font-mono text-green-300 whitespace-pre-wrap">
              {output.output}
            </pre>
          </div>
        )}

        {/* Error output */}
        {output !== null && !isRunning && !output.success && (
          <div className="rounded-xl border border-red-500/25 bg-red-950/20 p-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircleIcon className="size-3.5 text-red-400" />
              <span className="text-xs font-bold text-red-400 uppercase">
                Error
              </span>
            </div>

            <pre className="text-sm font-mono text-red-300 whitespace-pre-wrap">
              {output.error}
            </pre>
          </div>
        )}
      </div>

      <style>{`
        @keyframes bounce {
          0%,100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default PlayGroundOutput;
