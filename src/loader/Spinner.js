import React from "react";

const Spinner = () => {
  return (
    <div className="h-7 w-full flex items-center justify-center bg-transparent">
      <div className="h-7 w-7 rounded-full border-4 border-white border-t-gray-500 animate-spin relative"></div>
    </div>
  );
};

export default Spinner;
