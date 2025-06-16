import React from 'react';

interface PredictionResultsProps {
  prediction: string;
  treatment: string;
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({
  prediction,
  treatment,
}) => {
  // Format the prediction to be more readable
  const formatPrediction = (pred: string) => {
    return pred.replace(/___/g, ' - ').replace(/_/g, ' ');
  };

  // Extract disease severity if available
  const getDiseaseSeverity = (pred: string) => {
    if (!pred || typeof pred !== 'string') {
      return { level: 'unknown', color: 'text-gray-600', bgColor: 'bg-gray-100' };
    }
    
    const predLower = pred.toLowerCase();
    if (predLower.includes('healthy')) {
      return { level: 'healthy', color: 'text-green-600', bgColor: 'bg-green-100' };
    } else if (predLower.includes('mild') || predLower.includes('early')) {
      return { level: 'mild', color: 'text-yellow-600', bgColor: 'bg-yellow-100' };
    } else if (predLower.includes('severe') || predLower.includes('late')) {
      return { level: 'severe', color: 'text-red-600', bgColor: 'bg-red-100' };
    }
    return { level: 'moderate', color: 'text-orange-600', bgColor: 'bg-orange-100' };
  };

  const severity = getDiseaseSeverity(prediction);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          Analysis Results
        </h3>
        <div className="w-16 h-1 bg-green-500 mx-auto rounded"></div>
      </div>

      {/* Disease Detection */}
      <div className="bg-gray-50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className={`w-12 h-12 rounded-full ${severity.bgColor} flex items-center justify-center flex-shrink-0`}>
            <span className="text-2xl">🔍</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-1">
              Disease Detected
            </h4>
            <p className={`text-xl font-bold ${severity.color} mb-2`}>
              {prediction ? formatPrediction(prediction) : 'No prediction available'}
            </p>
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${severity.color} ${severity.bgColor}`}>
              Status: {severity.level.charAt(0).toUpperCase() + severity.level.slice(1)}
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Recommendations */}
      <div className="bg-blue-50 rounded-xl p-6">
        <div className="flex items-start space-x-4">
          <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
            <span className="text-2xl">💊</span>
          </div>
          <div className="flex-1">
            <h4 className="text-lg font-semibold text-gray-800 mb-3">
              Treatment Recommendations
            </h4>
            <div className="prose prose-blue max-w-none">
              <p className="text-gray-700 leading-relaxed">
                {treatment || 'No treatment recommendations available'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
        <div className="flex items-center space-x-2">
          <span className="text-amber-600 text-lg">⚠️</span>
          <p className="text-sm text-amber-800">
            <strong>Disclaimer:</strong> This AI-powered diagnosis is for guidance only. 
            Consult with agricultural experts or extension services for professional advice.
          </p>
        </div>
      </div>
    </div>
  );
};
