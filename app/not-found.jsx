"use client";
import React from "react";
import Link from "next/link";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[85vh] px-6 text-center bg-white">
      <div className="relative mb-8">
        <h1 className="text-[120px] md:text-[180px] font-black text-[#F8F9FA] leading-none select-none">
          404
        </h1>
        <div className="absolute inset-0 flex items-center justify-center">
          <FileQuestion
            size={60}
            className="text-[#0056B3] opacity-20"
            strokeWidth={1}
          />
        </div>
      </div>

      <div className="relative z-10 -mt-10">
        <h2 className="text-2xl md:text-3xl font-black text-[#343A40] tracking-tight">
          PAGE NOT FOUND
        </h2>
        <p className="mt-4 text-gray-500 max-w-sm mx-auto text-sm md:text-base leading-relaxed">
          The page you are looking for might have been removed, had its name
          changed, or is temporarily unavailable.
        </p>

        <div className="mt-10">
          <Link
            href="/"
            className="inline-flex items-center justify-center bg-[#0056B3] text-white px-8 py-4 rounded-full text-xs font-black tracking-[0.2em] hover:bg-[#343A40] transition-all duration-300 shadow-lg shadow-blue-100 uppercase"
          >
            Go To Homepage
          </Link>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-4 opacity-20 grayscale pointer-events-none">
        <span className="text-[10px] font-bold tracking-widest text-gray-400 italic">
          TECHNO.SUPPORT
        </span>
      </div>
    </div>
  );
}
