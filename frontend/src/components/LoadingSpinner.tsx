import type React from "react"
import { Microscope, Leaf, Brain, Zap } from "lucide-react"

export const LoadingSpinner: React.FC = () => {
  const analysisSteps = [
    { icon: Microscope, text: "Scanning image quality", delay: "0s" },
    { icon: Leaf, text: "Identifying plant features", delay: "1s" },
    { icon: Brain, text: "AI pattern recognition", delay: "2s" },
    { icon: Zap, text: "Generating diagnosis", delay: "3s" },
  ]

  return (
    <div className="flex flex-col items-center justify-center py-12">
      {/* Main Spinner */}
      <div className="relative mb-8">
        {/* Outer rotating ring */}
        <div className="w-24 h-24 border-4 border-green-200 border-t-green-600 rounded-full animate-spin"></div>

        {/* Middle ring */}
        <div
          className="absolute inset-2 w-16 h-16 border-4 border-emerald-200 border-b-emerald-600 rounded-full animate-spin"
          style={{ animationDirection: "reverse", animationDuration: "1.5s" }}
        ></div>

        {/* Inner pulsing core */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse flex items-center justify-center">
            <Microscope className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* Floating particles */}
        <div className="absolute -top-2 -right-2 w-3 h-3 bg-yellow-400 rounded-full animate-bounce"></div>
        <div
          className="absolute -bottom-2 -left-2 w-2 h-2 bg-green-400 rounded-full animate-bounce"
          style={{ animationDelay: "0.5s" }}
        ></div>
      </div>

      <div className="text-center max-w-md">
        <h3 className="text-2xl font-bold text-gray-800 mb-3">AI Analysis in Progress</h3>
        <p className="text-gray-600 text-lg mb-8">Our advanced AI is examining your crop for disease detection</p>

        {/* Analysis Steps */}
        <div className="space-y-4">
          {analysisSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="flex items-center gap-4 p-3 bg-white/60 backdrop-blur-sm rounded-xl border border-white/30 animate-pulse"
                style={{ animationDelay: step.delay }}
              >
                <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                  <Icon className="w-5 h-5 text-white" />
                </div>
                <span className="text-gray-700 font-medium">{step.text}</span>
                <div className="ml-auto flex space-x-1">
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${index * 0.2}s` }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${index * 0.2 + 0.1}s` }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-green-500 rounded-full animate-bounce"
                    style={{ animationDelay: `${index * 0.2 + 0.2}s` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress Bar */}
        <div className="mt-8">
          <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"
              style={{ width: "75%" }}
            ></div>
          </div>
          <p className="text-sm text-gray-500 mt-2">Processing... Please wait</p>
        </div>
      </div>
    </div>
  )
}
