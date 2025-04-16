/* eslint-disable @next/next/no-img-element */
"use client";

import { Upload } from "lucide-react";
import { ChangeEvent } from "react";

// Define the props for ImageUploader component
type ImageUploaderProps = {
  imageData: string | null;
  setImageData: React.Dispatch<React.SetStateAction<string | null>>;
};

export default function ImageUploader({ imageData, setImageData }: ImageUploaderProps) {
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setImageData(reader.result as string); // base64 string
      };

      reader.readAsDataURL(file); // convert to base64
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-48 h-48 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-[#a95dfd] transition-colors duration-200">
      <label className="cursor-pointer w-full h-full text-white rounded">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
        {imageData ? (
          <div className="w-full h-full rounded-2xl overflow-hidden">
            <img
              src={imageData}
              alt="Uploaded Preview"
              className="w-full h-full object-cover"
              draggable={false}
            />
          </div>
        ) : (
          <Upload />
        )}
      </label>
    </div>
  );
}
