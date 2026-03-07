import React from "react";
import Lottie from "lottie-react";
import loaderAnimation from "../assets/loader2.json";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm z-50 pointer-events-auto">
      <div className="w-56">
        <Lottie animationData={loaderAnimation} loop={true} />
      </div>
    </div>
  );
};

export default Loader;
