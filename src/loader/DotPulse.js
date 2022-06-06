import React from "react";

const DotPulse = () => {
  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <span className="h-3 w-3 bg-white rounded-full mx-1 animate-dot-pulse"></span>
      <span className="h-3 w-3 bg-white rounded-full mx-1 animate-dot-pulse animation-delay-200"></span>
      <span className="h-3 w-3 bg-white rounded-full mx-1 animate-dot-pulse animation-delay-400"></span>
    </div>
  );
};

export default DotPulse;
