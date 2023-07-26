import React from "react";
import SpinnerLoader from "./SpinnerLoader";

const OverlayLoading = () => {
  return (
    <div className="fixed inset-0 z-[99999999] bg-white/80 flex items-center justify-center backdrop-blur-[5px]">
      <SpinnerLoader />
    </div>
  );
};

export default OverlayLoading;
