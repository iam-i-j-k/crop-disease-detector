
import React, { useState } from 'react';
import { ImageUpload } from '@/components/ImageUpload';
import { PredictionResults } from '@/components/PredictionResults';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { predictDisease } from '@/utils/api';
import { useToast } from '@/hooks/use-toast';

interface PredictionData {
  prediction: string;
  treatment: string;
}

const Index = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState<PredictionData | null>(null);
  const { toast } = useToast();

  const handleImageSelect = (file: File) => {
    setSelectedImage(file);
    setPredictionResult(null);
    
    // Create preview URL
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handlePredict = async () => {
    if (!selectedImage) return;

    setIsLoading(true);
    try {
      const result = await predictDisease(selectedImage);
      setPredictionResult(result);
      toast({
        title: "Analysis Complete",
        description: "Disease prediction has been generated successfully.",
      });
    } catch (error) {
      console.error('Prediction error:', error);
      toast({
        title: "Prediction Failed",
        description: "Unable to analyze the image. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setPredictionResult(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-green-800 mb-4">
            🌱 Crop Disease Detector
          </h1>
          <p className="text-lg text-green-700 max-w-2xl mx-auto">
            Upload an image of your crop to detect diseases and get treatment recommendations
          </p>
        </div>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {!selectedImage ? (
            /* Upload Section */
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <ImageUpload onImageSelect={handleImageSelect} />
            </div>
          ) : (
            /* Analysis Section */
            <div className="space-y-6">
              {/* Image Preview */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">
                      Selected Image
                    </h3>
                    <div className="relative">
                      <img
                        src={imagePreview!}
                        alt="Selected crop"
                        className="w-full h-64 md:h-80 object-cover rounded-lg border-2 border-gray-200"
                      />
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col justify-center space-y-4 md:w-64">
                    <button
                      onClick={handlePredict}
                      disabled={isLoading}
                      className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
                    >
                      {isLoading ? 'Analyzing...' : 'Analyze Image'}
                    </button>
                    
                    <button
                      onClick={handleReset}
                      className="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-md"
                    >
                      Select New Image
                    </button>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {isLoading && (
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <LoadingSpinner />
                </div>
              )}

              {/* Results */}
              {predictionResult && !isLoading && (
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <PredictionResults
                    prediction={predictionResult.prediction}
                    treatment={predictionResult.treatment}
                  />
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 text-green-700">
          <p className="text-sm">
            Powered by AI • For agricultural research and farming assistance
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;
