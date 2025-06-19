"use client"

import type React from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import {
  HelpCircle,
  Camera,
  Microscope,
  Smartphone,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Info,
  BookOpen,
  Settings,
  Phone,
} from "lucide-react"

interface HelpDocumentationProps {
  isOpen: boolean
  onClose: () => void
}

export const HelpDocumentation: React.FC<HelpDocumentationProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] p-0">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold flex items-center gap-3">
            <HelpCircle className="w-6 h-6 text-blue-600" />
            Help & Documentation
          </DialogTitle>
        </DialogHeader>

        <div className="p-6 pt-4">
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
              <TabsTrigger value="photography">Photography</TabsTrigger>
              <TabsTrigger value="analysis">Analysis</TabsTrigger>
              <TabsTrigger value="troubleshooting">Support</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-96 mt-4">
              <TabsContent value="getting-started" className="space-y-4">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg p-4 border border-green-200">
                  <h3 className="font-semibold text-green-900 mb-2 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Welcome to AgriScan AI
                  </h3>
                  <p className="text-green-800 text-sm">
                    AgriScan AI is a professional crop disease detection system powered by advanced machine learning.
                    Follow this guide to get the most accurate results.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="step-1">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                          1
                        </div>
                        How to Upload Images
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-gray-700">
                        Upload high-quality images of individual leaves showing potential disease symptoms:
                      </p>
                      <ul className="list-disc list-inside space-y-1 text-sm text-gray-600 ml-4">
                        <li>Click the upload area or drag and drop your image</li>
                        <li>Supported formats: JPG, PNG, JPEG, WebP</li>
                        <li>Maximum file size: 10MB</li>
                        <li>Minimum resolution: 300x300 pixels recommended</li>
                      </ul>
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <p className="text-blue-800 text-sm">
                          <strong>Pro Tip:</strong> The system automatically verifies that your image contains a leaf
                          before analysis.
                        </p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-2">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                          2
                        </div>
                        Understanding Results
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-gray-700">Your analysis results include:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">Disease Detection</h4>
                          <p className="text-sm text-gray-600">Specific disease identification with confidence level</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">Treatment Plan</h4>
                          <p className="text-sm text-gray-600">Evidence-based treatment recommendations</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">Severity Assessment</h4>
                          <p className="text-sm text-gray-600">Disease progression and urgency level</p>
                        </div>
                        <div className="bg-gray-50 p-3 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">Prevention Tips</h4>
                          <p className="text-sm text-gray-600">Future prevention strategies</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="step-3">
                    <AccordionTrigger className="text-left">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold">
                          3
                        </div>
                        Supported Crops & Diseases
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-gray-700">AgriScan AI supports 50+ diseases across major crop categories:</p>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Supported Crops</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Tomato</li>
                            <li>• Potato</li>
                            <li>• Corn (Maize)</li>
                            <li>• Apple</li>
                            <li>• Grape</li>
                            <li>• Pepper</li>
                            <li>• And many more...</li>
                          </ul>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 mb-2">Disease Types</h4>
                          <ul className="text-sm text-gray-600 space-y-1">
                            <li>• Bacterial infections</li>
                            <li>• Fungal diseases</li>
                            <li>• Viral infections</li>
                            <li>• Nutrient deficiencies</li>
                            <li>• Pest damage</li>
                            <li>��� Environmental stress</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="photography" className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-4 border border-blue-200">
                  <h3 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Photography Best Practices
                  </h3>
                  <p className="text-blue-800 text-sm">
                    High-quality images are crucial for accurate disease detection. Follow these guidelines for optimal
                    results.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="bg-green-50 rounded-lg p-4 border border-green-200">
                      <h4 className="font-semibold text-green-900 mb-3 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        Do's
                      </h4>
                      <ul className="space-y-2 text-sm text-green-800">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Use natural daylight for photography</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Focus on individual leaves with symptoms</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Fill the frame with the leaf</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Capture both sides if symptoms vary</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Ensure sharp focus on disease areas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Use a plain background when possible</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                      <h4 className="font-semibold text-red-900 mb-3 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4" />
                        Don'ts
                      </h4>
                      <ul className="space-y-2 text-sm text-red-800">
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Avoid blurry or out-of-focus images</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Don't use flash or artificial lighting</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Avoid images with multiple leaves</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Don't photograph in low light conditions</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Avoid heavily shadowed areas</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>Don't include non-plant objects</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <h4 className="font-semibold text-yellow-900 mb-2 flex items-center gap-2">
                    <Smartphone className="w-4 h-4" />
                    Mobile Photography Tips
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-yellow-800">
                    <div>
                      <p className="font-medium mb-1">Camera Settings:</p>
                      <ul className="space-y-1">
                        <li>• Use the highest resolution available</li>
                        <li>• Enable HDR mode for better detail</li>
                        <li>• Tap to focus on the disease area</li>
                      </ul>
                    </div>
                    <div>
                      <p className="font-medium mb-1">Positioning:</p>
                      <ul className="space-y-1">
                        <li>• Hold the phone steady</li>
                        <li>• Get close but maintain focus</li>
                        <li>• Avoid camera shake</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-4 border border-purple-200">
                  <h3 className="font-semibold text-purple-900 mb-2 flex items-center gap-2">
                    <Microscope className="w-5 h-5" />
                    Understanding AI Analysis
                  </h3>
                  <p className="text-purple-800 text-sm">
                    Learn how our AI system works and how to interpret the results for maximum benefit.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="how-it-works">
                    <AccordionTrigger>How the AI Analysis Works</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-gray-700">Our AI system uses a multi-step process:</p>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold flex-shrink-0">
                            1
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Image Preprocessing</h4>
                            <p className="text-sm text-gray-600">
                              Enhances image quality and normalizes lighting conditions
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold flex-shrink-0">
                            2
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Feature Extraction</h4>
                            <p className="text-sm text-gray-600">Identifies key visual patterns and disease markers</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold flex-shrink-0">
                            3
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Disease Classification</h4>
                            <p className="text-sm text-gray-600">Compares patterns against trained disease database</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                          <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 text-sm font-bold flex-shrink-0">
                            4
                          </div>
                          <div>
                            <h4 className="font-medium text-gray-900">Treatment Recommendation</h4>
                            <p className="text-sm text-gray-600">Generates evidence-based treatment protocols</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="confidence-levels">
                    <AccordionTrigger>Understanding Confidence Levels</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <p className="text-gray-700">
                        Confidence levels indicate how certain the AI is about its diagnosis:
                      </p>
                      <div className="space-y-2">
                        <div className="flex items-center gap-3 p-2 bg-green-50 rounded border border-green-200">
                          <Badge className="bg-green-100 text-green-800">95-99%</Badge>
                          <span className="text-sm text-green-800">Very High - Extremely reliable diagnosis</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-blue-50 rounded border border-blue-200">
                          <Badge className="bg-blue-100 text-blue-800">90-94%</Badge>
                          <span className="text-sm text-blue-800">
                            High - Reliable diagnosis, proceed with confidence
                          </span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-yellow-50 rounded border border-yellow-200">
                          <Badge className="bg-yellow-100 text-yellow-800">85-89%</Badge>
                          <span className="text-sm text-yellow-800">Good - Consider additional verification</span>
                        </div>
                        <div className="flex items-center gap-3 p-2 bg-orange-50 rounded border border-orange-200">
                          <Badge className="bg-orange-100 text-orange-800">80-84%</Badge>
                          <span className="text-sm text-orange-800">Moderate - Seek expert consultation</span>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="severity-levels">
                    <AccordionTrigger>Severity Assessment Guide</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-900 mb-2">Healthy</h4>
                          <p className="text-sm text-green-800">No disease detected. Continue regular monitoring.</p>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                          <h4 className="font-medium text-yellow-900 mb-2">Mild</h4>
                          <p className="text-sm text-yellow-800">
                            Early stage infection. Immediate treatment recommended.
                          </p>
                        </div>
                        <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                          <h4 className="font-medium text-orange-900 mb-2">Moderate</h4>
                          <p className="text-sm text-orange-800">Established infection. Aggressive treatment needed.</p>
                        </div>
                        <div className="p-3 bg-red-50 rounded-lg border border-red-200">
                          <h4 className="font-medium text-red-900 mb-2">Severe</h4>
                          <p className="text-sm text-red-800">Advanced infection. Urgent intervention required.</p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </TabsContent>

              <TabsContent value="troubleshooting" className="space-y-4">
                <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 border border-orange-200">
                  <h3 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">
                    <Settings className="w-5 h-5" />
                    Troubleshooting & Support
                  </h3>
                  <p className="text-orange-800 text-sm">
                    Common issues and solutions to help you get the most out of AgriScan AI.
                  </p>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="upload-issues">
                    <AccordionTrigger>Image Upload Problems</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">File too large error</h4>
                          <p className="text-sm text-gray-600">
                            Compress your image or use a different format. Maximum size is 10MB.
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">Unsupported file format</h4>
                          <p className="text-sm text-gray-600">Use JPG, PNG, JPEG, or WebP formats only.</p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">Upload fails repeatedly</h4>
                          <p className="text-sm text-gray-600">
                            Check your internet connection and try refreshing the page.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="analysis-issues">
                    <AccordionTrigger>Analysis Problems</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="space-y-3">
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">"Not a leaf" error</h4>
                          <p className="text-sm text-gray-600">
                            Ensure your image clearly shows a single leaf. Avoid images with multiple objects or unclear
                            subjects.
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">Low confidence results</h4>
                          <p className="text-sm text-gray-600">
                            Try uploading a clearer image with better lighting and focus on the diseased area.
                          </p>
                        </div>
                        <div className="p-3 bg-gray-50 rounded-lg">
                          <h4 className="font-medium text-gray-900 mb-1">Analysis takes too long</h4>
                          <p className="text-sm text-gray-600">
                            Large images may take longer to process. Try using a smaller file size.
                          </p>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="accuracy-concerns">
                    <AccordionTrigger>Accuracy & Reliability</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                        <h4 className="font-medium text-blue-900 mb-2">System Accuracy</h4>
                        <ul className="text-sm text-blue-800 space-y-1">
                          <li>• Overall accuracy: 99.2% on test datasets</li>
                          <li>• Trained on 100,000+ verified images</li>
                          <li>• Continuously updated with new data</li>
                          <li>• Regular validation by agricultural experts</li>
                        </ul>
                      </div>
                      <div className="bg-yellow-50 p-3 rounded-lg border border-yellow-200">
                        <h4 className="font-medium text-yellow-900 mb-2">When to Seek Additional Help</h4>
                        <ul className="text-sm text-yellow-800 space-y-1">
                          <li>• Confidence level below 85%</li>
                          <li>• Unusual or rare disease symptoms</li>
                          <li>• Critical crop or high-value plants</li>
                          <li>• Treatment not showing expected results</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="contact-support">
                    <AccordionTrigger>Contact Support</AccordionTrigger>
                    <AccordionContent className="space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="font-medium text-green-900 mb-2 flex items-center gap-2">
                            <Phone className="w-4 h-4" />
                            Technical Support
                          </h4>
                          <p className="text-sm text-green-800 mb-2">For technical issues and system problems:</p>
                          <ul className="text-sm text-green-800 space-y-1">
                            <li>• Email: support@agriscan.ai</li>
                            <li>• Response time: 24-48 hours</li>
                            <li>• Include error screenshots</li>
                          </ul>
                        </div>
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                          <h4 className="font-medium text-blue-900 mb-2 flex items-center gap-2">
                            <Leaf className="w-4 h-4" />
                            Agricultural Experts
                          </h4>
                          <p className="text-sm text-blue-800 mb-2">For complex disease questions:</p>
                          <ul className="text-sm text-blue-800 space-y-1">
                            <li>• Email: experts@agriscan.ai</li>
                            <li>• Consultation fee may apply</li>
                            <li>• Include analysis results</li>
                          </ul>
                        </div>
                      </div>
                      <div className="bg-gray-50 p-3 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-2">Before Contacting Support</h4>
                        <ul className="text-sm text-gray-600 space-y-1">
                          <li>• Try refreshing the page and uploading again</li>
                          <li>• Check your internet connection</li>
                          <li>• Ensure your image meets quality requirements</li>
                          <li>• Review this documentation for solutions</li>
                        </ul>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    System Information
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm">
                    <div className="text-center">
                      <div className="font-medium text-gray-900">Version</div>
                      <div className="text-gray-600">v2.1.0</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">Model</div>
                      <div className="text-gray-600">CNN v2.1</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">Uptime</div>
                      <div className="text-gray-600">99.9%</div>
                    </div>
                    <div className="text-center">
                      <div className="font-medium text-gray-900">Status</div>
                      <div className="text-green-600">Online</div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  )
}
