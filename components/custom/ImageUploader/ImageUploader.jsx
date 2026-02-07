"use client";

import React, { useState, useRef } from "react";
import { UploadCloud, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ImageUploader({ onFileSelect }) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFileName, setSelectedFileName] = useState("");
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (file && file.type.startsWith("image/")) {
      setSelectedFileName(file.name); // نمایش نام فایل انتخاب شده به جای پیش‌نمایش عکس
      onFileSelect(file);
    }
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  const onDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  return (
    <div className="w-full space-y-4">
      <div
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => fileInputRef.current?.click()}
        className={cn(
          "relative group cursor-pointer transition-all duration-300",
          "border-2 border-dashed rounded-[2.5rem] min-h-[220px]",
          "flex flex-col items-center justify-center bg-slate-50/50",
          isDragging
            ? "border-blue-500 bg-blue-50/50 scale-[1.01]"
            : "border-slate-200 hover:border-slate-400",
        )}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={(e) => handleFile(e.target.files[0])}
          accept="image/*"
          className="hidden"
        />

        <div className="flex flex-col items-center text-center space-y-4 p-10">
          {/* آیکون متغیر بر اساس وضعیت انتخاب فایل */}
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-300">
            {selectedFileName ? (
              <UploadCloud className="text-blue-600" size={32} />
            ) : (
              <ImageIcon className="text-slate-400" size={32} />
            )}
          </div>

          <div className="space-y-1">
            <p className="text-slate-900 font-black text-sm uppercase tracking-tighter">
              {selectedFileName ? "File Selected" : "Click or Drag & Drop"}
            </p>
            <p className="text-slate-500 text-[11px] font-medium truncate max-w-[200px]">
              {selectedFileName
                ? selectedFileName
                : "Max Size: 5MB (PNG, JPG, WEBP)"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
