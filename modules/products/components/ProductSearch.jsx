"use client";

import React from "react";
import { Search } from "lucide-react";

export default function ProductSearch({ searchQuery, onSearchChange }) {
  return (
    <div className="relative mb-8">
      <div className="absolute left-4 top-1/2 -translate-y-1/2">
        <Search size={20} className="text-slate-400" />
      </div>
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-[#343A40] focus:outline-none transition-all text-slate-900 placeholder:text-slate-400"
      />
    </div>
  );
}

