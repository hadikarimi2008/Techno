"use client";
import React from "react";
import { RotateCcw, AlertCircle } from "lucide-react";

export default function Error({ error, reset }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center bg-white">
      <div className="bg-red-50 p-4 rounded-full mb-6">
        <AlertCircle size={40} className="text-red-500" strokeWidth={1.5} />
      </div>

      <h1 className="text-2xl font-black text-[#343A40] tracking-tight">
        SOMETHING WENT WRONG
      </h1>

      <p className="mt-2 text-gray-500 max-w-xs mx-auto text-sm leading-relaxed">
        We couldn't load the content. This might be a temporary connection
        issue.
      </p>

      <button
        onClick={() => reset()}
        className="mt-8 flex items-center gap-2 bg-[#343A40] text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-[#0056B3] transition-all active:scale-95"
      >
        <RotateCcw size={16} />
        TRY AGAIN
      </button>

      <a
        href="/"
        className="mt-4 text-xs font-bold text-gray-400 underline decoration-gray-200 uppercase tracking-widest"
      >
        Back to Home
      </a>
    </div>
  );
}
