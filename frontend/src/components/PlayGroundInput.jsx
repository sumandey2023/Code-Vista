import { TerminalIcon } from "lucide-react";

function PlayGroundInput({ userInput, onInputChange }) {
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
          Input
        </span>

        <span className="ml-auto text-xs text-gray-500">
          (one line per input)
        </span>
      </div>

      {/* Input textarea */}
      <div className="flex-1 overflow-hidden p-4">
        <textarea
          value={userInput}
          onChange={(e) => onInputChange(e.target.value)}
          placeholder="Enter your input here...&#10;(separate multiple inputs with new lines)&#10;&#10;Example:&#10;John&#10;25&#10;hello"
          className="w-full h-full p-3 rounded-lg bg-gray-900/80 border border-green-500/25 text-sm font-mono text-green-300 placeholder-gray-600 focus:outline-none focus:border-green-500/60 resize-none transition-colors duration-200"
          style={{
            boxShadow: "0 0 12px rgba(34,197,94,0.08)",
          }}
        />
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.3), transparent)",
        }}
      />
    </div>
  );
}

export default PlayGroundInput;
