import { Link } from "react-router";
import logo from "../assets/images/logo2.png";
import { SignInButton } from "@clerk/clerk-react";
import CustomSignInButton from "./CustomSignInButton";

const NavBar = () => {
  return (
    <nav className="sticky top-0 z-40 w-full overflow-hidden">
      {/* Background grid — matches Hero */}
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

      {/* Left orb — matches Hero left orb */}
      <div
        className="absolute -left-16 top-1/2 -translate-y-1/2 w-48 h-48 rounded-full opacity-15 blur-3xl pointer-events-none"
        style={{ background: "radial-gradient(circle, #22c55e, transparent)" }}
      />

      {/* Right orb — matches Hero right orb */}
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

          {/* Sign In */}
          <div className="flex items-center">
            <SignInButton mode="modal" asChild>
              <CustomSignInButton />
            </SignInButton>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
