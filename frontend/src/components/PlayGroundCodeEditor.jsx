import Editor from "@monaco-editor/react";
import { Loader2Icon, PlayIcon } from "lucide-react";
import { LANGUAGE_CONFIG } from "../data/problems";

function PlayGroundCodeEditor({
  selectedLanguage,
  code,
  isRunning,
  onLanguageChange,
  onCodeChange,
  onRunCode,
}) {
  const handleLanguageChange = (e) => {
    onLanguageChange(e.target.value);
  };

  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      {/* Subtle top glow */}
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
        }}
      />

      {/* Toolbar */}
      <div
        className="flex-shrink-0 flex items-center justify-between px-4 py-3 border-b border-green-500/20 relative z-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(34,197,94,0.07), rgba(22,163,74,0.03))",
          backdropFilter: "blur(8px)",
        }}
      >
        {/* Language selector */}
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center border border-green-500/30 flex-shrink-0"
            style={{
              background:
                "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
              boxShadow: "0 0 10px rgba(34,197,94,0.1)",
            }}
          >
            <img
              src={LANGUAGE_CONFIG[selectedLanguage].icon}
              alt={LANGUAGE_CONFIG[selectedLanguage].name}
              className="size-4"
            />
          </div>

          <select
            className="px-3 py-1.5 rounded-xl text-sm font-semibold text-green-300 border border-green-500/30 bg-gray-900/80 backdrop-blur-sm focus:outline-none focus:border-green-500/60 transition-colors duration-200 cursor-pointer"
            style={{ boxShadow: "0 0 12px rgba(34,197,94,0.08)" }}
            value={selectedLanguage}
            onChange={handleLanguageChange}
          >
            {Object.entries(LANGUAGE_CONFIG).map(([key, lang]) => (
              <option key={key} value={key} className="bg-gray-900 text-white">
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Run button */}
        <button
          disabled={isRunning}
          onClick={onRunCode}
          className="group relative inline-flex items-center gap-2 px-5 py-2 rounded-full font-bold text-sm text-black overflow-hidden transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          style={{
            background: isRunning
              ? "linear-gradient(135deg, #16a34a, #15803d)"
              : "linear-gradient(135deg, #4ade80, #16a34a)",
            boxShadow: isRunning ? "none" : "0 0 20px rgba(34,197,94,0.35)",
          }}
        >
          {isRunning ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              <span>Running...</span>
            </>
          ) : (
            <>
              <PlayIcon className="size-4 group-hover:scale-110 transition-transform" />
              <span>Run Code</span>
              {/* shimmer */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
            </>
          )}
        </button>
      </div>

      {/* Editor */}
      <div className="flex-1 overflow-hidden">
        <Editor
          height="100%"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLang}
          value={code}
          onChange={onCodeChange}
          theme="vs-dark"
          options={{
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            minimap: { enabled: false },
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontLigatures: true,
            cursorBlinking: "smooth",
            cursorSmoothCaretAnimation: "on",
            smoothScrolling: true,
            padding: { top: 16, bottom: 16 },
            lineHeight: 1.7,
            renderLineHighlight: "all",
            bracketPairColorization: { enabled: true },
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

export default PlayGroundCodeEditor;
