"use client"

import type React from "react"
import { useRef, useState } from "react"
import { Upload, ImageIcon, Camera, Sparkles } from "lucide-react"

interface ImageUploadProps {
  onImageSelect: (file: File) => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      const file = files[0]
      if (file.type.startsWith("image/")) {
        onImageSelect(file)
      }
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      onImageSelect(files[0])
    }
  }

  const handleClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="w-full">
      <div
        onClick={handleClick}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-3 border-dashed rounded-3xl p-12 text-center cursor-pointer transition-all duration-300 min-h-[350px] flex flex-col items-center justify-center group ${
          isDragOver
            ? "border-green-400 bg-green-50 scale-105"
            : "border-green-300 hover:border-green-400 hover:bg-green-50"
        }`}
      >
        {/* Animated Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-8 left-8 w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
          <div className="absolute top-16 right-12 w-2 h-2 bg-emerald-400 rounded-full animate-pulse animation-delay-1000"></div>
          <div className="absolute bottom-12 left-16 w-3 h-3 bg-teal-400 rounded-full animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-8 right-8 w-2 h-2 bg-green-500 rounded-full animate-pulse animation-delay-3000"></div>
        </div>

        <div className="space-y-6 relative z-10">
          {/* Enhanced Icon */}
          <div className="relative mx-auto">
            <div
              className={`w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isDragOver ? "scale-110 rotate-12" : "group-hover:scale-110"
              }`}
            >
              <Upload className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-800">
              {isDragOver ? "Drop your image here!" : "Upload Crop Image"}
            </h3>
            <p className="text-gray-600 text-lg">
              {isDragOver ? "Release to analyze your crop" : "Drag and drop an image here, or click to select"}
            </p>
          </div>

          {/* Enhanced File Type Info */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full shadow-sm">
              <ImageIcon className="w-4 h-4 text-green-600" />
              <span>JPG, PNG, JPEG</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 px-3 py-2 rounded-full shadow-sm">
              <Camera className="w-4 h-4 text-green-600" />
              <span>Max 10MB</span>
            </div>
          </div>

          {/* Upload Tips */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-4 border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">📸 Tips for best results:</h4>
            <ul className="text-sm text-green-700 space-y-1 text-left">
              <li>• Ensure good lighting and clear focus</li>
              <li>• Capture affected leaves or plant parts</li>
              <li>• Avoid blurry or dark images</li>
              <li>• Include multiple symptoms if visible</li>
            </ul>
          </div>
        </div>
      </div>

      <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileSelect} className="hidden" />

      <style>{`
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-3000 {
          animation-delay: 3s;
        }
      `}</style>
    </div>
  )
}
