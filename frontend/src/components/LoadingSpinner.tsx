import type React from "react"
import { Microscope, Leaf, Brain, Zap, CheckCircle2 } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface LoadingSpinnerProps {
  currentStep: number
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ currentStep }) => {
  const analysisSteps = [
    {
      icon: Microscope,
      text: "Initializing AI models",
      description: "Loading neural networks and preprocessing algorithms",
      duration: 800,
    },
    {
      icon: Leaf,
      text: "Analyzing image quality",
      description: "Checking resolution, lighting, and focus parameters",
      duration: 1000,
    },
    {
      icon: Brain,
      text: "Detecting plant features",
      description: "Identifying leaves, stems, and potential disease markers",
      duration: 1200,
    },
    {
      icon: Zap,
      text: "Pattern recognition",
      description: "Comparing against disease database and symptom patterns",
      duration: 1000,
    },
    {
      icon: CheckCircle2,
      text: "Generating diagnosis",
      description: "Finalizing results and treatment recommendations",
      duration: 600,
    },
  ]

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < currentStep) return "completed"
    if (stepIndex === currentStep) return "active"
    return "pending"
  }

  const overallProgress = Math.min((currentStep / (analysisSteps.length - 1)) * 100, 100)

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Main Spinner */}
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 border-4 border-gray-200 border-t-blue-600 rounded-full animate-spin"></div>

        {/* Middle ring */}
        <div
          className="absolute inset-2 w-16 h-16 border-4 border-gray-100 border-b-purple-600 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "2s" }}
        ></div>

        {/* Inner core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
            {currentStep < analysisSteps.length && (() => {
              const Icon = analysisSteps[currentStep].icon
              return <Icon className="w-4 h-4 text-white" />
            })()}
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div
          className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
        <div
          className="absolute top-1/2 -left-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce"
          style={{ animationDelay: "1s" }}
        ></div>
      </div>

      <div className="text-center max-w-2xl w-full">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">AI Analysis in Progress</h3>
        <p className="text-gray-600 text-lg mb-8">
          Our advanced machine learning models are examining your crop image
        </p>

        {/* Overall Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-700">Analysis Progress</span>
            <span className="text-sm font-medium text-gray-700">{Math.round(overallProgress)}%</span>
          </div>
          <Progress value={overallProgress} className="h-3" />
        </div>

        {/* Analysis Steps */}
        <div className="space-y-4">
          {analysisSteps.map((step, index) => {
            const Icon = step.icon
            const status = getStepStatus(index)
            
            return (
              <div
                key={index}
                className={`flex items-start gap-4 p-4 rounded-xl border transition-all duration-500 ${
                  status === "completed"
                    ? "bg-green-50 border-green-200"
                    : status === "active"
                    ? "bg-blue-50 border-blue-200 shadow-md"
                    : "bg-gray-50 border-gray-200"
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    status === "completed"
                      ? "bg-green-500 text-white"
                      : status === "active"
                      ? "bg-blue-500 text-white animate-pulse"
                      : "bg-gray-300 text-gray-500"
                  }`}
                >
                  {status === "completed" ? (
                    <CheckCircle2 className="w-6 h-6" />
                  ) : (
                    <Icon className="w-6 h-6" />
                  )}
                </div>
                
                <div className="flex-1 text-left">
                  <h4
                    className={`font-semibold mb-1 ${
                      status === "completed"
                        ? "text-green-800"
                        : status === "active"
                        ? "text-blue-800"
                        : "text-gray-600"
                    }`}
                  >
                    {step.text}
                  </h4>
                  <p
                    className={`text-sm ${
                      status === "completed"
                        ? "text-green-600"
                        : status === "active"
                        ? "text-blue-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.description}
                  </p>
                </div>

                {/* Status indicator */}
                <div className="flex items-center">
                  {status === "active" && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                      <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                    </div>
                  )}
                  {status === "completed" && (
                    <CheckCircle2 className="w-5 h-5 text-green-500" />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* Technical Details */}
        <div className="mt-8 bg-gray-50 rounded-xl p-4 border border-gray-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="font-semibold text-gray-900">Model</div>
              <div className="text-gray-600">CNN v2.1</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Accuracy</div>
              <div className="text-gray-600">99.2%</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Classes</div>
              <div className="text-gray-600">50+ diseases</div>
            </div>
            <div className="text-center">
              <div className="font-semibold text-gray-900">Processing</div>
              <div className="text-gray-600">Real-time</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
