import { Link } from "react-router";
import MainNav from "../components/MainNav";
import { PROBLEMS } from "../data/problems";
import { ChevronRightIcon, CodeIcon } from "lucide-react";
import { getDifficultyBadgeClass } from "../lib/utils";

const ProblemsPage = () => {
  const problems = Object.values(PROBLEMS);
  const easyProblemCount = problems.filter(
    (p) => p.difficulty === "Easy",
  ).length;
  const mediumProblemCount = problems.filter(
    (p) => p.difficulty === "Medium",
  ).length;
  const hardProblemCount = problems.filter(
    (p) => p.difficulty === "Hard",
  ).length;

  const stats = [
    {
      label: "Total Problems",
      value: problems.length,
      color: "text-green-400",
    },
    { label: "Easy", value: easyProblemCount, color: "text-green-400" },
    { label: "Medium", value: mediumProblemCount, color: "text-yellow-400" },
    { label: "Hard", value: hardProblemCount, color: "text-red-400" },
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Grid background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Orbs */}
      <div
        className="absolute top-[-5%] left-[-5%] w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
      />
      <div
        className="absolute bottom-[10%] right-[-5%] w-96 h-96 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #16a34a, transparent)" }}
      />
      <div
        className="absolute top-[50%] left-[45%] w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #4ade80, transparent)" }}
      />

      <div className="relative z-10">
        <MainNav />

        <div className="max-w-6xl mx-auto px-4 py-12">
          {/* Page header */}
          <div className="mb-10 space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/40 bg-green-500/10 backdrop-blur-sm text-green-400 text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              {problems.length} Problems Available
            </div>

            <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
              <span
                style={{
                  background:
                    "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Practice
              </span>{" "}
              <span className="text-white">Problems</span>
            </h1>

            <p className="text-gray-400 text-lg max-w-xl leading-relaxed">
              Sharpen your coding skills with our curated list of{" "}
              <span className="text-green-400 font-semibold">
                practice problems
              </span>
              .
            </p>
          </div>

          {/* Problem list */}
          <div className="space-y-4">
            {problems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problem/${problem.id}`}
                className="group relative flex items-center justify-between gap-4 rounded-2xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm px-6 py-5 hover:border-green-500/40 hover:scale-[1.01] transition-all duration-300 overflow-hidden"
                style={{ boxShadow: "0 0 30px rgba(0,0,0,0.3)" }}
              >
                {/* Hover inner glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                  style={{
                    background:
                      "radial-gradient(ellipse at 0% 50%, rgba(34,197,94,0.08), transparent 70%)",
                  }}
                />

                {/* Left side */}
                <div className="relative z-10 flex items-center gap-4 flex-1">
                  {/* Icon box */}
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center border border-green-500/30 flex-shrink-0"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
                      boxShadow: "0 0 16px rgba(34,197,94,0.15)",
                    }}
                  >
                    <CodeIcon className="size-5 text-green-400" />
                  </div>

                  {/* Title + meta */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 flex-wrap mb-1">
                      <h2 className="text-base sm:text-lg font-bold text-white group-hover:text-green-300 transition-colors duration-200 truncate">
                        {problem.title}
                      </h2>
                      <span
                        className={`badge badge-sm ${getDifficultyBadgeClass(problem.difficulty)}`}
                      >
                        {problem.difficulty}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{problem.category}</p>
                  </div>
                </div>

                {/* Right side — Solve CTA */}
                <div className="relative z-10 flex items-center gap-1.5 text-green-400 font-semibold text-sm flex-shrink-0">
                  <span className="hidden sm:inline">Solve</span>
                  <ChevronRightIcon className="size-5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>

                {/* Bottom accent line */}
                <div
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(34,197,94,0.7), transparent)",
                  }}
                />
              </Link>
            ))}
          </div>

          {/* Stats section */}
          <div
            className="mt-10 relative rounded-2xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm overflow-hidden"
            style={{ boxShadow: "0 0 40px rgba(0,0,0,0.3)" }}
          >
            {/* Inner top glow */}
            <div
              className="absolute top-0 left-0 right-0 h-px pointer-events-none"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(34,197,94,0.5), transparent)",
              }}
            />

            <div className="grid grid-cols-2 lg:grid-cols-4 divide-x divide-y lg:divide-y-0 divide-green-500/10">
              {stats.map(({ label, value, color }) => (
                <div
                  key={label}
                  className="group relative flex flex-col items-center justify-center px-6 py-8 hover:bg-green-500/5 transition-colors duration-200"
                >
                  <p className="text-sm text-gray-500 font-medium mb-2 tracking-wide uppercase">
                    {label}
                  </p>
                  <p
                    className={`text-4xl font-black ${color}`}
                    style={{ textShadow: "0 0 20px currentColor" }}
                  >
                    {value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsPage;
