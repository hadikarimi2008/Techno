import React from "react";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] bg-white">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-gray-100 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-[#0056B3] rounded-full border-t-transparent animate-spin"></div>
      </div>
      <h2 className="mt-6 text-sm font-bold tracking-[0.3em] text-[#343A40] animate-pulse">
        LOADING TECHNO
      </h2>
    </div>
  );
}
