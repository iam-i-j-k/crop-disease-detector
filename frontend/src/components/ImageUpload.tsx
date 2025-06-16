
import React, { useRef } from 'react';
import { Upload, Image } from 'lucide-react';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        onImageSelect(file);
      }
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onImageSelect(files[0]);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        className="border-3 border-dashed border-green-300 rounded-2xl p-12 text-center cursor-pointer hover:border-green-400 hover:bg-green-50 transition-all duration-300 min-h-[300px] flex flex-col items-center justify-center"
      >
        <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
            <Upload className="w-8 h-8 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-gray-800">
              Upload Crop Image
            </h3>
            <p className="text-gray-600">
              Drag and drop an image here, or click to select
            </p>
          </div>
          
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500">
            <Image className="w-4 h-4" />
            <span>Supports: JPG, PNG, JPEG</span>
          </div>
        </div>
      </div>
      
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
      
      <div className="mt-4 text-center text-sm text-gray-600">
        <p>For best results, upload clear images of plant leaves showing any visible symptoms</p>
      </div>
    </div>
  );
};
