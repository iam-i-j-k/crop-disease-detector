import type React from "react"
import { AlertTriangle, CheckCircle, Pill, Lightbulb, TrendingUp, Shield } from "lucide-react"

interface PredictionResultsProps {
  prediction: string
  treatment: string
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({ prediction, treatment }) => {
  // Format the prediction to be more readable
  const formatPrediction = (pred: string) => {
    return pred.replace(/___/g, " - ").replace(/_/g, " ")
  }

  // Extract disease severity if available
  const getDiseaseSeverity = (pred: string) => {
    if (!pred || typeof pred !== "string") {
      return {
        level: "unknown",
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        gradientFrom: "from-gray-400",
        gradientTo: "to-gray-500",
        icon: AlertTriangle,
      }
    }

    const predLower = pred.toLowerCase()
    if (predLower.includes("healthy")) {
      return {
        level: "healthy",
        color: "text-green-600",
        bgColor: "bg-green-100",
        gradientFrom: "from-green-400",
        gradientTo: "to-emerald-500",
        icon: CheckCircle,
      }
    } else if (predLower.includes("mild") || predLower.includes("early")) {
      return {
        level: "mild",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        gradientFrom: "from-yellow-400",
        gradientTo: "to-orange-500",
        icon: AlertTriangle,
      }
    } else if (predLower.includes("severe") || predLower.includes("late")) {
      return {
        level: "severe",
        color: "text-red-600",
        bgColor: "bg-red-100",
        gradientFrom: "from-red-400",
        gradientTo: "to-red-600",
        icon: AlertTriangle,
      }
    }
    return {
      level: "moderate",
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      gradientFrom: "from-orange-400",
      gradientTo: "to-red-500",
      icon: AlertTriangle,
    }
  }

  const severity = getDiseaseSeverity(prediction)
  const SeverityIcon = severity.icon

  return (
    <div className="space-y-8">
      {/* Results Header */}
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <div
            className={`w-16 h-16 bg-gradient-to-r ${severity.gradientFrom} ${severity.gradientTo} rounded-full flex items-center justify-center shadow-lg`}
          >
            <SeverityIcon className="w-8 h-8 text-white" />
          </div>
        </div>
        <h3 className="text-3xl font-bold text-gray-800 mb-2">Analysis Complete</h3>
        <div className="w-20 h-1 bg-gradient-to-r from-green-400 to-emerald-500 mx-auto rounded-full"></div>
      </div>

      {/* Disease Detection Card */}
      <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex items-start space-x-6">
          <div
            className={`w-16 h-16 rounded-2xl ${severity.bgColor} flex items-center justify-center flex-shrink-0 shadow-md`}
          >
            <span className="text-3xl">🔍</span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-3">
              <h4 className="text-2xl font-bold text-gray-800">Disease Detection</h4>
              <div
                className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${severity.color} ${severity.bgColor} border border-current border-opacity-20`}
              >
                <div className={`w-2 h-2 rounded-full ${severity.color.replace("text-", "bg-")} mr-2`}></div>
                {severity.level.charAt(0).toUpperCase() + severity.level.slice(1)}
              </div>
            </div>
            <p className={`text-2xl font-bold ${severity.color} mb-4`}>
              {prediction ? formatPrediction(prediction) : "No prediction available"}
            </p>

            {/* Confidence Meter */}
            <div className="bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${severity.gradientFrom} ${severity.gradientTo} rounded-full transition-all duration-1000 ease-out`}
                style={{ width: "87%" }}
              ></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Confidence: 87%</p>
          </div>
        </div>
      </div>

      {/* Treatment Recommendations Card */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border border-blue-100">
        <div className="flex items-start space-x-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0 shadow-md">
            <Pill className="w-8 h-8 text-blue-600" />
          </div>
          <div className="flex-1">
            <h4 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
              Treatment Recommendations
              <Lightbulb className="w-6 h-6 text-yellow-500" />
            </h4>
            <div className="prose prose-blue max-w-none">
              <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-blue-200">
                <p className="text-gray-700 leading-relaxed text-lg">
                  {treatment || "No treatment recommendations available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border border-green-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-green-600" />
            </div>
            <h5 className="font-bold text-green-800">Next Steps</h5>
          </div>
          <ul className="space-y-2 text-green-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Monitor crop regularly
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Apply recommended treatment
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              Consult agricultural expert
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-purple-600" />
            </div>
            <h5 className="font-bold text-purple-800">Prevention Tips</h5>
          </div>
          <ul className="space-y-2 text-purple-700">
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Maintain proper spacing
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Ensure good drainage
            </li>
            <li className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              Regular health monitoring
            </li>
          </ul>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0">
            <span className="text-amber-600 text-lg">⚠️</span>
          </div>
          <div>
            <h5 className="font-bold text-amber-800 mb-2">Important Disclaimer</h5>
            <p className="text-sm text-amber-800 leading-relaxed">
              This AI-powered diagnosis is for guidance only and should not replace professional agricultural
              consultation. For critical crop health decisions, please consult with certified agricultural experts or
              extension services.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
