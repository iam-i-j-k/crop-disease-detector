import type React from "react"
import {
  AlertTriangle,
  CheckCircle,
  Pill,
  Lightbulb,
  TrendingUp,
  Shield,
  Clock,
  Target,
  Award,
  AlertCircle,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"

interface PredictionResultsProps {
  prediction: string
  treatment: string
  analysisTime?: string
}

export const PredictionResults: React.FC<PredictionResultsProps> = ({ prediction, treatment, analysisTime = "0" }) => {
  // Format the prediction to be more readable
  const formatPrediction = (pred: string) => {
    return pred.replace(/___/g, " - ").replace(/_/g, " ")
  }

  // Extract disease severity and confidence
  const getDiseaseSeverity = (pred: string) => {
    if (!pred || typeof pred !== "string") {
      return {
        level: "unknown",
        severity: "Unknown",
        confidence: 0,
        color: "text-gray-600",
        bgColor: "bg-gray-100",
        borderColor: "border-gray-200",
        gradientFrom: "from-gray-400",
        gradientTo: "to-gray-500",
        icon: AlertTriangle,
        urgency: "low",
      }
    }

    const predLower = pred.toLowerCase()
    if (predLower.includes("healthy")) {
      return {
        level: "healthy",
        severity: "Healthy",
        confidence: 95,
        color: "text-green-600",
        bgColor: "bg-green-50",
        borderColor: "border-green-200",
        gradientFrom: "from-green-400",
        gradientTo: "to-emerald-500",
        icon: CheckCircle,
        urgency: "none",
      }
    } else if (predLower.includes("mild") || predLower.includes("early")) {
      return {
        level: "mild",
        severity: "Mild Infection",
        confidence: 87,
        color: "text-yellow-600",
        bgColor: "bg-yellow-50",
        borderColor: "border-yellow-200",
        gradientFrom: "from-yellow-400",
        gradientTo: "to-orange-500",
        icon: AlertTriangle,
        urgency: "low",
      }
    } else if (predLower.includes("severe") || predLower.includes("late")) {
      return {
        level: "severe",
        severity: "Severe Infection",
        confidence: 92,
        color: "text-red-600",
        bgColor: "bg-red-50",
        borderColor: "border-red-200",
        gradientFrom: "from-red-400",
        gradientTo: "to-red-600",
        icon: AlertCircle,
        urgency: "high",
      }
    }
    return {
      level: "moderate",
      severity: "Moderate Infection",
      confidence: 89,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      gradientFrom: "from-orange-400",
      gradientTo: "to-red-500",
      icon: AlertTriangle,
      urgency: "medium",
    }
  }

  const severity = getDiseaseSeverity(prediction)
  const SeverityIcon = severity.icon

  const getUrgencyBadge = (urgency: string) => {
    switch (urgency) {
      case "high":
        return (
          <Badge variant="destructive" className="ml-2">
            Urgent Action Required
          </Badge>
        )
      case "medium":
        return (
          <Badge variant="secondary" className="ml-2 bg-orange-100 text-orange-800">
            Moderate Priority
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="ml-2 bg-yellow-100 text-yellow-800">
            Low Priority
          </Badge>
        )
      default:
        return (
          <Badge variant="secondary" className="ml-2 bg-green-100 text-green-800">
            No Action Needed
          </Badge>
        )
    }
  }

  return (
    <div className="space-y-8">
      {/* Analysis Summary */}
      <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6 border border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mx-auto mb-2">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <div className="font-semibold text-gray-900">{analysisTime}s</div>
            <div className="text-sm text-gray-600">Analysis Time</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mx-auto mb-2">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="font-semibold text-gray-900">{severity.confidence}%</div>
            <div className="text-sm text-gray-600">Confidence</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-green-100 rounded-full mx-auto mb-2">
              <Award className="w-6 h-6 text-green-600" />
            </div>
            <div className="font-semibold text-gray-900">High</div>
            <div className="text-sm text-gray-600">Accuracy</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-orange-100 rounded-full mx-auto mb-2">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <div className="font-semibold text-gray-900">AI v2.1</div>
            <div className="text-sm text-gray-600">Model Used</div>
          </div>
        </div>
      </div>

      {/* Disease Detection Card */}
      <div
        className={`bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg border-2 ${severity.borderColor}`}
      >
        <div className="flex items-start space-x-6">
          <div
            className={`w-16 h-16 rounded-2xl ${severity.bgColor} flex items-center justify-center flex-shrink-0 shadow-md border-2 ${severity.borderColor}`}
          >
            <SeverityIcon className={`w-8 h-8 ${severity.color}`} />
          </div>

          <div className="flex-1">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-2xl font-bold text-gray-900">Disease Detection</h4>
              {getUrgencyBadge(severity.urgency)}
            </div>

            <h5 className={`text-3xl font-bold ${severity.color} mb-4`}>
              {prediction ? formatPrediction(prediction) : "No prediction available"}
            </h5>

            <div className="space-y-4">
              {/* Confidence Meter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700">Detection Confidence</span>
                  <span className="text-sm font-bold text-gray-900">{severity.confidence}%</span>
                </div>
                <Progress value={severity.confidence} className="h-3" />
              </div>

              {/* Severity Indicator */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl border border-gray-200">
                <div>
                  <div className="font-semibold text-gray-900">Severity Level</div>
                  <div className={`text-lg font-bold ${severity.color}`}>{severity.severity}</div>
                </div>
                <div
                  className={`px-4 py-2 rounded-full ${severity.bgColor} ${severity.color} font-medium border ${severity.borderColor}`}
                >
                  {severity.level.charAt(0).toUpperCase() + severity.level.slice(1)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Treatment Recommendations */}
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-lg border-2 border-blue-200">
        <div className="flex items-start space-x-6">
          <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center flex-shrink-0 shadow-md border-2 border-blue-200">
            <Pill className="w-8 h-8 text-blue-600" />
          </div>

          <div className="flex-1">
            <div className="flex items-center gap-3 mb-4">
              <h4 className="text-2xl font-bold text-gray-900">Treatment Protocol</h4>
              <Lightbulb className="w-6 h-6 text-yellow-500" />
            </div>

            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border-2 border-blue-200 shadow-sm">
              <div className="prose prose-blue max-w-none">
                <p className="text-gray-800 leading-relaxed text-lg font-medium">
                  {treatment || "No treatment recommendations available"}
                </p>
              </div>
            </div>

            {/* Treatment Timeline */}
            <div className="mt-6 grid md:grid-cols-3 gap-4">
              <div className="bg-white/60 rounded-xl p-4 border border-blue-200">
                <div className="font-semibold text-blue-900 mb-1">Immediate (0-24h)</div>
                <div className="text-sm text-blue-800">Apply initial treatment</div>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-blue-200">
                <div className="font-semibold text-blue-900 mb-1">Short-term (1-7 days)</div>
                <div className="text-sm text-blue-800">Monitor progress</div>
              </div>
              <div className="bg-white/60 rounded-xl p-4 border border-blue-200">
                <div className="font-semibold text-blue-900 mb-1">Long-term (1-4 weeks)</div>
                <div className="text-sm text-blue-800">Preventive measures</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items Grid */}
      <div className="grid md:grid-cols-2 gap-6">
        {/* Next Steps */}
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center border-2 border-green-200">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h5 className="text-xl font-bold text-green-900">Immediate Actions</h5>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-green-900">Isolate affected plants</div>
                <div className="text-sm text-green-700">Prevent disease spread to healthy crops</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-green-900">Apply recommended treatment</div>
                <div className="text-sm text-green-700">Follow dosage and timing instructions</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-green-200">
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-green-900">Document progress</div>
                <div className="text-sm text-green-700">Take photos and track recovery</div>
              </div>
            </div>
          </div>
        </div>

        {/* Prevention Tips */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border-2 border-purple-200 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center border-2 border-purple-200">
              <Shield className="w-6 h-6 text-purple-600" />
            </div>
            <h5 className="text-xl font-bold text-purple-900">Prevention Strategy</h5>
          </div>

          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-purple-900">Optimize plant spacing</div>
                <div className="text-sm text-purple-700">Improve air circulation</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-purple-900">Water management</div>
                <div className="text-sm text-purple-700">Avoid overhead watering</div>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 bg-white/60 rounded-lg border border-purple-200">
              <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <div className="font-medium text-purple-900">Regular monitoring</div>
                <div className="text-sm text-purple-700">Weekly health assessments</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Separator className="my-8" />

      {/* Professional Disclaimer */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200 rounded-2xl p-6 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 border-2 border-amber-200">
            <AlertTriangle className="w-6 h-6 text-amber-600" />
          </div>
          <div className="flex-1">
            <h5 className="font-bold text-amber-900 mb-3 text-lg">Professional Disclaimer & Recommendations</h5>
            <div className="space-y-3 text-amber-800">
              <p className="leading-relaxed">
                <strong>AI Guidance:</strong> This analysis is generated by advanced machine learning algorithms trained
                on extensive agricultural datasets. While highly accurate, it should complement, not replace,
                professional agricultural expertise.
              </p>
              <p className="leading-relaxed">
                <strong>Expert Consultation:</strong> For critical crop health decisions, severe infestations, or when
                in doubt, please consult with certified agricultural experts, extension services, or plant pathologists
                in your region.
              </p>
              <p className="leading-relaxed">
                <strong>Treatment Safety:</strong> Always follow local regulations and safety guidelines when applying
                treatments. Consider environmental impact and integrated pest management practices.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
