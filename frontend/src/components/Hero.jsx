import { ArrowRightIcon, CheckIcon, VideoIcon, ZapIcon } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";
import toast from "react-hot-toast";
import heroImage from "../assets/images/Hero.png";

const Hero = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div
        className="absolute top-[-10%] left-[-5%] w-96 h-96 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
      />
      <div
        className="absolute bottom-[-10%] right-[-5%] w-96 h-96 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #16a34a, transparent)" }}
      />
      <div
        className="absolute top-[40%] left-[40%] w-64 h-64 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #4ade80, transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-green-500/40 bg-green-500/10 backdrop-blur-sm text-green-400 text-sm font-semibold tracking-wide">
              <ZapIcon className="size-4 text-green-400 animate-pulse" />
              <span>Introducing CodeVista</span>
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping inline-block" />
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight">
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Ace Your Coding
              </span>
              <span
                className="block"
                style={{
                  background:
                    "linear-gradient(135deg, #4ade80, #22c55e, #16a34a)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Interviews
              </span>
              <span className="block text-white mt-1">with Live AI</span>
            </h1>

            <p className="text-base sm:text-lg text-gray-400 max-w-md mx-auto lg:mx-0 leading-relaxed">
              Experience real-time coding interviews with AI-powered feedback
              and problem solving to help you{" "}
              <span className="text-green-400 font-semibold">
                improve faster
              </span>
              .
            </p>

            <div className="flex flex-wrap justify-center lg:justify-start gap-3">
              {[
                "Live AI Interviews",
                "Real-time Feedback",
                "Live Video Call",
              ].map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold text-green-300 border border-green-500/30 bg-green-950/40 backdrop-blur-sm"
                >
                  <span className="w-4 h-4 flex items-center justify-center rounded-full bg-green-500/20">
                    <CheckIcon className="size-3 text-green-400" />
                  </span>
                  {feature}
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center lg:justify-start gap-4 pt-2">
              <SignInButton mode="modal">
                <button
                  className="group relative inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-black overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg"
                  style={{
                    background: "linear-gradient(135deg, #4ade80, #16a34a)",
                    boxShadow: "0 0 30px rgba(34,197,94,0.4)",
                  }}
                >
                  <span>Start Your Journey</span>
                  <ArrowRightIcon className="size-5 group-hover:translate-x-1 transition-transform" />

                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
                </button>
              </SignInButton>

              <button
                className="group inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-base text-green-400 border border-green-500/50 bg-green-950/30 backdrop-blur-sm hover:bg-green-500/10 hover:border-green-400 hover:scale-105 active:scale-95 transition-all duration-300"
                onClick={() => toast("Video will be uploaded soon")}
              >
                <VideoIcon className="size-5 group-hover:scale-110 transition-transform" />
                <span>Watch Demo</span>
              </button>
            </div>

            <div className="flex items-center justify-center lg:justify-start gap-3 pt-2">
              <div className="flex -space-x-2">
                {[
                  "bg-green-400",
                  "bg-emerald-500",
                  "bg-teal-400",
                  "bg-lime-400",
                ].map((color, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-full ${color} border-2 border-gray-900 flex items-center justify-center text-xs font-bold text-gray-900`}
                  >
                    {String.fromCharCode(65 + i)}
                  </div>
                ))}
              </div>
              <p className="text-sm text-gray-400">
                Trusted by{" "}
                <span className="text-green-400 font-semibold">2,000+</span>{" "}
                developers
              </p>
            </div>
          </div>

          <div className="flex justify-center lg:justify-end relative">
            <div
              className="absolute inset-[-24px] rounded-3xl opacity-30 blur-sm pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(34,197,94,0.3), transparent 60%)",
              }}
            />

            <div className="absolute -top-4 -left-4 z-10 px-3 py-2 rounded-xl border border-green-500/30 bg-gray-900/90 backdrop-blur-md text-xs font-semibold text-green-400 shadow-xl flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              AI Feedback Live
            </div>

            <div className="absolute -bottom-4 -right-4 z-10 px-3 py-2 rounded-xl border border-green-500/30 bg-gray-900/90 backdrop-blur-md text-xs font-semibold text-white shadow-xl">
              ⚡ 98% <span className="text-green-400">success rate</span>
            </div>

            <div
              className="relative rounded-3xl overflow-hidden shadow-2xl border border-green-500/20 hover:scale-[1.02] transition-transform duration-500"
              style={{
                boxShadow:
                  "0 0 60px rgba(34,197,94,0.15), 0 30px 60px rgba(0,0,0,0.5)",
              }}
            >
              <img
                src={heroImage}
                alt="hero"
                className="w-full max-w-md lg:max-w-full h-auto"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/20 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
