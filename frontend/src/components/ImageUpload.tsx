"use client"

import type React from "react"
import { useRef, useState, useCallback } from "react"
import { Upload, ImageIcon, Camera, Sparkles, AlertCircle, CheckCircle2, FileImage } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface ImageUploadProps {
  onImageSelect: (file: File) => void
}

export const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect }) => {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [validationError, setValidationError] = useState<string | null>(null)
  const [isValidating, setIsValidating] = useState(false)

  const validateFile = useCallback((file: File): string | null => {
    // File type validation
    if (!file.type.startsWith("image/")) {
      return "Please select a valid image file (JPG, PNG, JPEG, WebP)"
    }

    // File size validation (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return "File size must be less than 10MB"
    }

    // File size minimum (to ensure quality)
    if (file.size < 10 * 1024) {
      return "File size too small. Please select a higher quality image"
    }

    return null
  }, [])

  const processFile = useCallback(
    async (file: File) => {
      setIsValidating(true)
      setValidationError(null)
      setUploadProgress(0)

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval)
            return 90
          }
          return prev + 10
        })
      }, 100)

      // Validate file
      const error = validateFile(file)
      if (error) {
        setValidationError(error)
        setIsValidating(false)
        clearInterval(progressInterval)
        setUploadProgress(0)
        return
      }

      // Simulate processing time
      await new Promise((resolve) => setTimeout(resolve, 800))

      setUploadProgress(100)
      setTimeout(() => {
        setIsValidating(false)
        onImageSelect(file)
      }, 200)
    },
    [validateFile, onImageSelect],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragOver(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragOver(false)

      const files = e.dataTransfer.files
      if (files.length > 0) {
        processFile(files[0])
      }
    },
    [processFile],
  )

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = e.target.files
      if (files && files.length > 0) {
        processFile(files[0])
      }
    },
    [processFile],
  )

  const handleClick = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  return (
    <div className="w-full space-y-6">
      {/* Upload Area */}
      <div
        onClick={!isValidating ? handleClick : undefined}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-3xl p-12 text-center transition-all duration-300 min-h-[400px] flex flex-col items-center justify-center group ${
          isDragOver
            ? "border-green-400 bg-green-50 scale-[1.02] shadow-lg"
            : isValidating
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 hover:border-green-400 hover:bg-green-50/50 cursor-pointer"
        } ${isValidating ? "cursor-not-allowed" : ""}`}
      >
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-8 left-8 w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
          <div
            className="absolute top-16 right-12 w-2 h-2 bg-emerald-400 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-12 left-16 w-4 h-4 bg-teal-400 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute bottom-8 right-8 w-2 h-2 bg-green-500 rounded-full animate-pulse"
            style={{ animationDelay: "3s" }}
          ></div>
        </div>

        <div className="space-y-6 relative z-10 w-full max-w-md">
          {/* Icon */}
          <div className="relative mx-auto w-fit">
            <div
              className={`w-20 h-20 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 ${
                isDragOver
                  ? "bg-gradient-to-br from-green-400 to-emerald-500 scale-110 rotate-12"
                  : isValidating
                    ? "bg-gradient-to-br from-blue-400 to-blue-500 animate-pulse"
                    : "bg-gradient-to-br from-gray-400 to-gray-500 group-hover:from-green-400 group-hover:to-emerald-500 group-hover:scale-110"
              }`}
            >
              {isValidating ? (
                <FileImage className="w-10 h-10 text-white" />
              ) : (
                <Upload className="w-10 h-10 text-white" />
              )}
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
          </div>

          {/* Content */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-gray-900">
              {isDragOver ? "Drop your image here!" : isValidating ? "Processing image..." : "Upload Crop Image"}
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              {isDragOver
                ? "Release to start analysis"
                : isValidating
                  ? "Validating and preparing your image"
                  : "Drag and drop an image here, or click to browse"}
            </p>
          </div>

          {/* Progress Bar */}
          {isValidating && (
            <div className="w-full space-y-2">
              <Progress value={uploadProgress} className="h-2" />
              <p className="text-sm text-gray-500">{uploadProgress}% complete</p>
            </div>
          )}

          {/* File Requirements */}
          {!isValidating && (
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-gray-100">
                <ImageIcon className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">JPG, PNG, JPEG, WebP</span>
              </div>
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-gray-100">
                <Camera className="w-4 h-4 text-green-600 flex-shrink-0" />
                <span className="text-gray-700">Max 10MB</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Error Display */}
      {validationError && (
        <Alert variant="destructive" className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription className="font-medium">{validationError}</AlertDescription>
        </Alert>
      )}

      {/* Professional Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
            <CheckCircle2 className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-blue-900 mb-3">📸 Professional Photography Tips</h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm text-blue-800">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Use natural daylight when possible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Focus on affected plant areas</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Avoid shadows and reflections</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Capture multiple symptoms if visible</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Ensure image is sharp and clear</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  <span>Include healthy parts for comparison</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Alternative Upload Button */}
      {!isValidating && (
        <div className="text-center">
          <Button
            onClick={handleClick}
            variant="outline"
            className="border-2 border-gray-200 hover:border-green-400 hover:bg-green-50 px-8 py-3 rounded-xl font-medium transition-all duration-300"
          >
            <Upload className="w-4 h-4 mr-2" />
            Browse Files
          </Button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
        disabled={isValidating}
      />
    </div>
  )
}
