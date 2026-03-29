import {
  BotIcon,
  Code2Icon,
  Loader2Icon,
  RefreshCwIcon,
  SparklesIcon,
  XIcon,
} from "lucide-react";

function AIExplainPanel({
  isExplaining,
  isGeneratingCode,
  explanation,
  onClose,
  onRegenerate,
  onGenerateFullCode,
}) {
  return (
    <div className="h-full flex flex-col overflow-hidden relative">
      <div
        className="absolute top-0 left-0 right-0 h-px pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(59,130,246,0.6), transparent)",
        }}
      />

      <div
        className="shrink-0 flex items-center justify-between px-4 py-3 border-b border-blue-500/20"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,0.1), rgba(37,99,235,0.04))",
          backdropFilter: "blur(8px)",
        }}
      >
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="w-8 h-8 rounded-lg border border-blue-400/40 bg-blue-500/10 flex items-center justify-center shrink-0">
            <BotIcon className="size-4 text-blue-300" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-blue-200 truncate">
              AI Explain
            </p>
            <p className="text-xs text-blue-300/70 truncate">
              Understand your current code
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Close panel"
          className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-blue-400/30 text-blue-200 hover:bg-blue-500/10 transition-colors"
        >
          <XIcon className="size-4" />
        </button>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div>
          <button
            type="button"
            onClick={onRegenerate}
            disabled={isExplaining}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold border border-blue-400/35 text-blue-200 bg-blue-500/10 hover:bg-blue-500/20 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <RefreshCwIcon
              className={`size-3.5 ${isExplaining ? "animate-spin" : ""}`}
            />
            Regenerate Explanation
          </button>
        </div>

        {isExplaining && (
          <div className="h-full min-h-40 flex flex-col items-center justify-center gap-3 text-center">
            <div className="flex gap-1.5">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-2.5 h-2.5 rounded-full bg-blue-400"
                  style={{
                    animation: `pulseShift 0.9s ease-in-out ${i * 0.15}s infinite`,
                  }}
                />
              ))}
            </div>
            <p className="text-sm text-blue-200/80">
              AI is analyzing your code...
            </p>
          </div>
        )}

        {!isExplaining && !explanation && (
          <div className="h-full min-h-40 flex flex-col items-center justify-center gap-3 text-center">
            <div className="w-12 h-12 rounded-2xl border border-blue-500/30 bg-blue-500/10 flex items-center justify-center">
              <SparklesIcon className="size-5 text-blue-300" />
            </div>
            <p className="text-sm text-blue-100/75">
              Click AI Explain to generate a detailed explanation for your code.
            </p>
          </div>
        )}

        {!isExplaining && explanation && (
          <>
            <section className="rounded-xl border border-blue-500/20 bg-slate-950/70 p-4">
              <h3 className="text-xs uppercase tracking-wider text-blue-300 mb-2">
                Summary
              </h3>
              <p className="text-sm text-slate-100/90 leading-relaxed">
                {explanation.summary || "No summary generated."}
              </p>
            </section>

            <section className="rounded-xl border border-blue-500/20 bg-slate-950/70 p-4">
              <h3 className="text-xs uppercase tracking-wider text-blue-300 mb-2">
                What The Code Is Doing
              </h3>
              <ul className="space-y-2">
                {(explanation.what_the_code_is_doing || []).map((item, idx) => (
                  <li
                    key={`${item}-${idx}`}
                    className="text-sm text-slate-100/90"
                  >
                    {idx + 1}. {item}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-xl border border-blue-500/20 bg-slate-950/70 p-4">
              <h3 className="text-xs uppercase tracking-wider text-blue-300 mb-2">
                Complexity
              </h3>
              <p className="text-sm text-slate-100/90">
                Time: {explanation.time_complexity || "Not available"}
              </p>
              <p className="text-sm text-slate-100/90">
                Space: {explanation.space_complexity || "Not available"}
              </p>
            </section>

            {!!(explanation.improvements || []).length && (
              <section className="rounded-xl border border-blue-500/20 bg-slate-950/70 p-4">
                <h3 className="text-xs uppercase tracking-wider text-blue-300 mb-2">
                  Improvements
                </h3>
                <ul className="space-y-2">
                  {explanation.improvements.map((item, idx) => (
                    <li
                      key={`${item}-${idx}`}
                      className="text-sm text-slate-100/90"
                    >
                      {idx + 1}. {item}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {explanation.next_step_for_user && (
              <section className="rounded-xl border border-emerald-500/25 bg-emerald-950/20 p-4">
                <h3 className="text-xs uppercase tracking-wider text-emerald-300 mb-2">
                  Next Step
                </h3>
                <p className="text-sm text-emerald-100/90">
                  {explanation.next_step_for_user}
                </p>
              </section>
            )}
          </>
        )}
      </div>

      <div className="shrink-0 border-t border-blue-500/20 p-3">
        <button
          type="button"
          disabled={isGeneratingCode}
          onClick={onGenerateFullCode}
          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border border-blue-400/35 text-blue-200 bg-blue-500/10 transition-colors hover:bg-blue-500/20 disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isGeneratingCode ? (
            <>
              <Loader2Icon className="size-4 animate-spin" />
              Generating Full Code...
            </>
          ) : (
            <>
              <Code2Icon className="size-4" />
              Generate Full Code
            </>
          )}
        </button>
      </div>

      <style>{`
        @keyframes pulseShift {
          0%, 100% { transform: translateY(0); opacity: 0.35; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

export default AIExplainPanel;
