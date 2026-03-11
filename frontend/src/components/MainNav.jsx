import { Link } from "react-router";
import logo from "../assets/images/logo2.png";
import { SignInButton } from "@clerk/clerk-react";
import CustomSignInButton from "./CustomSignInButton";
import { useLocation } from "react-router";
import { UserButton } from "@clerk/clerk-react";
import { BookOpenIcon, LayoutDashboardIcon } from "lucide-react";

const MainNav = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="sticky top-0 z-40 w-full overflow-hidden">
      {/* Grid background — matches Hero */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(34,197,94,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(34,197,94,0.4) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Dark base */}
      <div className="absolute inset-0 bg-gray-950/85 backdrop-blur-md" />

      {/* Bottom border glow */}
      <div
        className="absolute bottom-0 left-0 right-0 h-px pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(34,197,94,0.6), transparent)",
        }}
      />

      {/* Left orb */}
      <div
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
      />

      {/* Right orb */}
      <div
        className="absolute -right-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-10 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #16a34a, transparent)" }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center hover:scale-105 transition-transform duration-200"
          >
            <img
              src={logo}
              alt="CodeVista Logo"
              className="w-24 sm:w-28 lg:w-32 object-contain drop-shadow-[0_0_8px_rgba(34,197,94,0.4)] group-hover:drop-shadow-[0_0_16px_rgba(34,197,94,0.65)] transition-all duration-300"
            />
          </Link>

          {/* Right side nav items */}
          <div className="flex items-center gap-1">
            {/* Problems link */}
            <Link
              to="/problems"
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                ${
                  isActive("/problems")
                    ? "bg-green-500/15 text-green-400 border border-green-500/40"
                    : "text-gray-400 hover:text-green-400 border border-transparent hover:border-green-500/20 hover:bg-green-500/10"
                }
              `}
            >
              <BookOpenIcon className="size-4 flex-shrink-0" />
              <span className="hidden sm:inline">Problems</span>
              {isActive("/problems") && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(34,197,94,0.8), transparent)",
                  }}
                />
              )}
            </Link>

            {/* Dashboard link */}
            <Link
              to="/dashboard"
              className={`group relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all duration-200
                ${
                  isActive("/dashboard")
                    ? "bg-green-500/15 text-green-400 border border-green-500/40"
                    : "text-gray-400 hover:text-green-400 border border-transparent hover:border-green-500/20 hover:bg-green-500/10"
                }
              `}
            >
              <LayoutDashboardIcon className="size-4 flex-shrink-0" />
              <span className="hidden sm:inline">Dashboard</span>
              {isActive("/dashboard") && (
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-px"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(34,197,94,0.8), transparent)",
                  }}
                />
              )}
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-green-500/20 mx-2" />

            {/* User button */}
            <div
              className="flex items-center justify-center w-9 h-9 rounded-full border border-green-500/30 bg-green-500/10"
              style={{ boxShadow: "0 0 12px rgba(34,197,94,0.15)" }}
            >
              <UserButton />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default MainNav;
