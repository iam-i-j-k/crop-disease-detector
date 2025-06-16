
import { useState } from "react"
import { ImageUpload } from "@/components/ImageUpload"
import { PredictionResults } from "@/components/PredictionResults"
import { LoadingSpinner } from "@/components/LoadingSpinner"
import { predictDisease } from "@/utils/api"
import { useToast } from "@/hooks/use-toast"
import { Leaf, Microscope, Shield, TrendingUp } from "lucide-react"

interface PredictionData {
  prediction: string
  treatment: string
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [predictionResult, setPredictionResult] = useState<PredictionData | null>(null)
  const { toast } = useToast()

  const handleImageSelect = (file: File) => {
    setSelectedImage(file)
    setPredictionResult(null)

    // Create preview URL
    const reader = new FileReader()
    reader.onloadend = () => {
      setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handlePredict = async () => {
    if (!selectedImage) return

    setIsLoading(true)
    try {
      const result = await predictDisease(selectedImage)
      setPredictionResult(result)
      toast({
        title: "Analysis Complete",
        description: "Disease prediction has been generated successfully.",
      })
    } catch (error) {
      console.error("Prediction error:", error)
      toast({
        title: "Prediction Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setSelectedImage(null)
    setImagePreview(null)
    setPredictionResult(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-emerald-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-teal-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg transform hover:scale-110 transition-transform duration-300">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
            </div>
          </div>

          <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
            AgriScan AI
          </h1>
          <p className="text-xl text-green-700 max-w-3xl mx-auto leading-relaxed">
            Advanced crop disease detection powered by artificial intelligence
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Microscope className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">AI-Powered Analysis</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <Shield className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Instant Detection</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full shadow-md">
              <TrendingUp className="w-4 h-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">Treatment Recommendations</span>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-5xl mx-auto">
          {!selectedImage ? (
            /* Enhanced Upload Section */
            <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20 hover:shadow-3xl transition-all duration-500">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-2">Upload Your Crop Image</h2>
                <p className="text-gray-600 text-center">Get instant disease analysis and treatment recommendations</p>
              </div>
              <ImageUpload onImageSelect={handleImageSelect} />
            </div>
          ) : (
            /* Enhanced Analysis Section */
            <div className="space-y-8">
              {/* Image Preview with Glass Effect */}
              <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                <div className="flex flex-col lg:flex-row gap-8">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">1</span>
                      </div>
                      <h3 className="text-2xl font-bold text-gray-800">Image Analysis</h3>
                    </div>
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-emerald-400 rounded-2xl blur opacity-25 group-hover:opacity-40 transition-opacity duration-300"></div>
                      <img
                        src={imagePreview! || "/placeholder.svg"}
                        alt="Selected crop"
                        className="relative w-full h-64 lg:h-80 object-cover rounded-2xl border-4 border-white shadow-lg"
                      />
                      <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-medium text-green-800">
                        Ready for Analysis
                      </div>
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col justify-center space-y-6 lg:w-80">
                    <div className="text-center lg:text-left">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2">Next Steps</h4>
                      <p className="text-gray-600 text-sm">
                        Click analyze to detect diseases and get treatment recommendations
                      </p>
                    </div>

                    <button
                      onClick={handlePredict}
                      disabled={isLoading}
                      className="group relative bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-green-400 disabled:to-emerald-400 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:transform-none"
                    >
                      <div className="flex items-center justify-center gap-3">
                        <Microscope className="w-5 h-5" />
                        <span>{isLoading ? "Analyzing..." : "Analyze Image"}</span>
                      </div>
                      {!isLoading && (
                        <div className="absolute inset-0 bg-white/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      )}
                    </button>

                    <button
                      onClick={handleReset}
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-4 px-8 rounded-2xl transition-all duration-300 shadow-md hover:shadow-lg border border-gray-200"
                    >
                      Select New Image
                    </button>
                  </div>
                </div>
              </div>

              {/* Enhanced Loading State */}
              {isLoading && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">2</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">AI Analysis in Progress</h3>
                  </div>
                  <LoadingSpinner />
                </div>
              )}

              {/* Enhanced Results */}
              {predictionResult && !isLoading && (
                <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-8 border border-white/20">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                      <span className="text-white font-bold text-sm">3</span>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800">Analysis Results</h3>
                  </div>
                  <PredictionResults prediction={predictionResult.prediction} treatment={predictionResult.treatment} />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Enhanced Footer */}
        <div className="text-center mt-16">
          <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-6 max-w-md mx-auto border border-white/30">
            <p className="text-green-700 font-medium mb-2">Powered by Advanced AI Technology</p>
            <p className="text-sm text-green-600">
              Supporting farmers worldwide with intelligent crop health monitoring
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Index
