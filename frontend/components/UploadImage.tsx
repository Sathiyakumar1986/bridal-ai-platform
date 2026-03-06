"use client";

import { useState, useCallback } from "react";

interface UploadImageProps {
  onImageUpload: (file: File, previewUrl: string) => void;
  uploadedImage: string | null;
}

export default function UploadImage({ onImageUpload, uploadedImage }: UploadImageProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFile = useCallback(
    (file: File) => {
      if (file.type.startsWith("image/")) {
        const url = URL.createObjectURL(file);
        onImageUpload(file, url);
      }
    },
    [onImageUpload]
  );

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) handleFile(file);
    },
    [handleFile]
  );

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  return (
    <div id="upload" className="w-full">
      <h2 className="text-xl font-serif font-semibold text-rose-800 mb-4">
        Upload Your Photo
      </h2>
      {uploadedImage ? (
        <div className="relative rounded-2xl overflow-hidden border-2 border-rose-200 bg-white shadow-md">
          <img
            src={uploadedImage}
            alt="Uploaded face"
            className="w-full h-64 sm:h-80 object-contain bg-rose-50"
          />
          <button
            onClick={() => onImageUpload(null as unknown as File, "")}
            className="absolute top-3 right-3 bg-white/90 hover:bg-white text-rose-600 rounded-full p-2 shadow transition-colors"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`relative flex flex-col items-center justify-center h-64 sm:h-80 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
            isDragging
              ? "border-rose-500 bg-rose-50 scale-[1.02]"
              : "border-rose-300 bg-white hover:border-rose-400 hover:bg-rose-50/50"
          }`}
        >
          <input
            type="file"
            accept="image/*"
            onChange={handleInputChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-5xl mb-3">📸</div>
          <p className="text-rose-700 font-medium text-lg">
            Drag & drop your photo here
          </p>
          <p className="text-rose-400 text-sm mt-1">or click to browse</p>
          <p className="text-rose-300 text-xs mt-3">
            Supports JPG, PNG, WebP
          </p>
        </div>
      )}
    </div>
  );
}
