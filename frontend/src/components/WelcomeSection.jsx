import { useUser } from "@clerk/clerk-react";
import { ArrowRightIcon, SparklesIcon, ZapIcon } from "lucide-react";

const WelcomeSection = ({ onCreateSession }) => {
  const { user } = useUser();

  return (
    <div className="relative overflow-hidden">
      {/* Bottom glow line */}
     

      <div className="relative max-w-7xl mx-auto px-6 py-14">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
          {/* Left — greeting */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/40 bg-green-500/10 backdrop-blur-sm text-green-400 text-sm font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Dashboard
            </div>

            <div className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-2xl flex items-center justify-center border border-green-500/30 flex-shrink-0"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,197,94,0.2), rgba(22,163,74,0.05))",
                  boxShadow: "0 0 20px rgba(34,197,94,0.2)",
                }}
              >
                <SparklesIcon className="w-6 h-6 text-green-400" />
              </div>

              <h1 className="text-4xl sm:text-5xl font-black tracking-tight">
                <span className="text-white">Welcome, </span>
                <span
                  style={{
                    background:
                      "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {user?.firstName || "there"}!
                </span>
              </h1>
            </div>

            <p className="text-gray-400 text-lg ml-16 leading-relaxed">
              Ready to{" "}
              <span className="text-green-400 font-semibold">level up</span>{" "}
              your coding skills?
            </p>
          </div>

          {/* Right — CTA */}
          <button
            onClick={onCreateSession}
            className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-bold text-base text-black overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 flex-shrink-0"
            style={{
              background: "linear-gradient(135deg, #4ade80, #16a34a)",
              boxShadow: "0 0 30px rgba(34,197,94,0.4)",
            }}
          >
            <ZapIcon className="w-5 h-5 group-hover:scale-110 transition-transform" />
            <span>Create Session</span>
            <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            {/* Shimmer */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;
