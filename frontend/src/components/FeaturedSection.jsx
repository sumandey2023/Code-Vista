import { Code2Icon, UsersIcon, VideoIcon } from "lucide-react";

const features = [
  {
    icon: VideoIcon,
    title: "HD Video Call",
    description:
      "Crystal clear video and audio for seamless communication during interviews",
    glow: "rgba(34,197,94,0.25)",
  },
  {
    icon: Code2Icon,
    title: "Live Code Editor",
    description:
      "Collaborate in real-time with syntax highlighting and multiple language support",
    glow: "rgba(22,163,74,0.25)",
  },
  {
    icon: UsersIcon,
    title: "Easy Collaboration",
    description:
      "Share your screen, discuss solutions, and learn from each other in real-time",
    glow: "rgba(74,222,128,0.25)",
  },
];

const FeaturedSection = () => {
  return (
    <div className="relative overflow-hidden py-24">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />
      <div
        className="absolute top-0 left-[-5%] w-80 h-80 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
      />
      <div
        className="absolute bottom-0 right-[-5%] w-80 h-80 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #16a34a, transparent)" }}
      />
      <div
        className="absolute top-[50%] left-[50%] w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #4ade80, transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/40 bg-green-500/10 backdrop-blur-sm text-green-400 text-sm font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Built for Winners
          </div>

          <h2 className="text-4xl sm:text-5xl font-black tracking-tight">
            <span
              style={{
                background:
                  "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Everything You Need
            </span>
            <br />
            <span className="text-white">to Succeed</span>
          </h2>

          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Powerful features designed to make your coding interviews{" "}
            <span className="text-green-400 font-semibold">seamless</span> and
            productive
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {features.map(({ icon: Icon, title, description, glow }) => (
            <div
              key={title}
              className="group relative rounded-3xl border border-green-500/20 bg-gray-900/60 backdrop-blur-sm p-8 flex flex-col items-center text-center hover:border-green-500/40 hover:scale-[1.03] transition-all duration-300 overflow-hidden"
              style={{
                boxShadow: `0 0 40px rgba(0,0,0,0.4)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{
                  background: `radial-gradient(ellipse at 50% 0%, ${glow}, transparent 70%)`,
                }}
              />

              <div
                className="relative z-10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 border border-green-500/30"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(34,197,94,0.15), rgba(22,163,74,0.05))",
                  boxShadow: `0 0 20px ${glow}`,
                }}
              >
                <Icon className="size-7 text-green-400" />
              </div>

              <h3 className="relative z-10 text-xl font-bold text-white mb-3 tracking-tight">
                {title}
              </h3>
              <p className="relative z-10 text-gray-400 text-sm leading-relaxed">
                {description}
              </p>

              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 h-px w-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(90deg, transparent, rgba(34,197,94,0.7), transparent)",
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeaturedSection;
