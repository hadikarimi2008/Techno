"use client";

import React from "react";

export default function ProductFilter({ categories, selectedCategory, onCategoryChange }) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
      <button
        onClick={() => onCategoryChange("all")}
        className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
          selectedCategory === "all"
            ? "bg-[#343A40] text-white"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200"
        }`}
      >
        All Products
      </button>
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${
            selectedCategory === category
              ? "bg-[#343A40] text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

