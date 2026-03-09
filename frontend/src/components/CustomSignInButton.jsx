import { useState } from "react";

const ArrowRight = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

const SparkleIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2l2.4 7.6H22l-6.4 4.7 2.4 7.7L12 17.3l-6 4.7 2.4-7.7L2 9.6h7.6z" />
  </svg>
);

const CustomSignInButton = (props) => {
  const [hovered, setHovered] = useState(false);

  return (
    <button
      {...props}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        padding: "12px 28px 12px 14px",

        borderRadius: "999px",
        color: "#fff",
        fontSize: "15px",
        fontWeight: "600",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: "12px",

        transition: "all 0.3s ease",
        transform: hovered ? "scale(1.05)" : "scale(1)",
      }}
    >
      {/* Badge */}
      <span
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          // background: "linear-gradient(135deg, #10b981, #34d399)",
          borderRadius: "999px",
          padding: "4px 10px",
          fontSize: "12px",
          fontWeight: "700",
          color: "black",
        }}
        className="badge badge-success"
      >
        <SparkleIcon /> NEW
      </span>

      {/* Text */}
      <span style={{ color: "#d1fae5" }}>Sign In</span>

      {/* Arrow */}
      <span
        style={{
          display: "flex",
          color: "#6ee7b7",
          transform: hovered ? "translateX(4px)" : "translateX(0)",
          transition: "transform 0.3s",
        }}
      >
        <ArrowRight />
      </span>
    </button>
  );
};

export default CustomSignInButton;
