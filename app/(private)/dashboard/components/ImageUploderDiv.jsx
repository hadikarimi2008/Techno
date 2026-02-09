"use client";

import React, { useState, useEffect } from "react";
import ImageUploader from "@/components/custom/ImageUploader/ImageUploader";

export default function ImageUploaderDiv({ defaultValue }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(defaultValue);

  useEffect(() => {
    if (selectedFile) {
      const objectUrl = URL.createObjectURL(selectedFile);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [selectedFile]);

  return (
    <div className="space-y-4 w-full">
      <div className="flex flex-col md:flex-row gap-6 items-center bg-slate-50/50 p-6 rounded-[2.5rem] border border-slate-100">
        <div className="w-32 h-32 rounded-3xl bg-white border-2 border-white shadow-xl overflow-hidden flex-shrink-0 relative group">
          <img
            src={preview}
            alt="Product preview"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {selectedFile && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-[10px] text-white font-black uppercase">
                New
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 w-full">
          <ImageUploader
            onFileSelect={(file) => setSelectedFile(file)}
            defaultValue={defaultValue}
          />
        </div>
      </div>

      <input
        type="file"
        name="imageFile"
        className="hidden"
        ref={(el) => {
          if (el && selectedFile) {
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(selectedFile);
            el.files = dataTransfer.files;
          }
        }}
      />
    </div>
  );
}
