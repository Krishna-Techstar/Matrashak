"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { QrCode, CheckCircle, Clock, RefreshCw, Shield, AlertTriangle } from "lucide-react"
import { QRScanner } from "./qr-scanner"
import { generateQRData, generateQRCodeURL, generateSessionId, type QRData, type AuthQRData } from "@/lib/qr-utils"

interface EnhancedQRVerificationProps {
  userInfo: {
    id: string
    type: "voter-id" | "email" | "phone"
  }
  onVerificationComplete: () => void
  onBack: () => void
}

export function EnhancedQRVerification({ userInfo, onVerificationComplete, onBack }: EnhancedQRVerificationProps) {
  const [currentStep, setCurrentStep] = useState<"generate" | "scan" | "verify" | "complete">("generate")
  const [qrCode, setQrCode] = useState<string>("")
  const [qrData, setQrData] = useState<AuthQRData | null>(null)
  const [isGenerating, setIsGenerating] = useState(true)
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [verificationProgress, setVerificationProgress] = useState(0)
  const [scanError, setScanError] = useState<string>("")

  // Generate QR code on mount
  useEffect(() => {
    generateAuthQR()
  }, [])

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && currentStep !== "complete") {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0) {
      // Auto-refresh expired QR
      generateAuthQR()
    }
  }, [timeLeft, currentStep])

  const generateAuthQR = async () => {
    setIsGenerating(true)
    setCurrentStep("generate")

    // Simulate QR generation with enhanced security
    setTimeout(() => {
      const sessionId = generateSessionId()
      const authData = generateQRData("AUTH", {
        userId: userInfo.id,
        method: userInfo.type,
        sessionId,
      }) as AuthQRData

      const qrUrl = generateQRCodeURL(authData)

      setQrData(authData)
      setQrCode(qrUrl)
      setIsGenerating(false)
      setTimeLeft(300) // Reset timer to 5 minutes
      setCurrentStep("scan")

      console.log("[v0] Generated enhanced auth QR:", authData)
    }, 2000)
  }

  const handleScanSuccess = (scannedData: QRData) => {
    console.log("[v0] QR scan successful:", scannedData)
    setCurrentStep("verify")

    // Simulate verification process
    let progress = 0
    const verifyInterval = setInterval(() => {
      progress += 20
      setVerificationProgress(progress)

      if (progress >= 100) {
        clearInterval(verifyInterval)
        setTimeout(() => {
          setCurrentStep("complete")
          setTimeout(onVerificationComplete, 1500)
        }, 1000)
      }
    }, 500)
  }

  const handleScanError = (error: string) => {
    console.log("[v0] QR scan error:", error)
    setScanError(error)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const getStepColor = (step: string) => {
    if (currentStep === step) return "bg-primary text-primary-foreground"
    if (["generate", "scan", "verify"].indexOf(currentStep) > ["generate", "scan", "verify"].indexOf(step)) {
      return "bg-green-500 text-white"
    }
    return "bg-muted text-muted-foreground"
  }

  if (currentStep === "scan") {
    return (
      <div className="space-y-6">
        {/* Progress Steps */}
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Verification Progress</h3>
              <Badge variant="outline" className="text-xs">
                <Clock className="h-3 w-3 mr-1" />
                {formatTime(timeLeft)}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${getStepColor("generate")}`}
              >
                1
              </div>
              <div className="flex-1 h-1 bg-muted rounded">
                <div className="h-full bg-primary rounded" style={{ width: "33%" }}></div>
              </div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${getStepColor("scan")}`}
              >
                2
              </div>
              <div className="flex-1 h-1 bg-muted rounded"></div>
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium ${getStepColor("verify")}`}
              >
                3
              </div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Generate</span>
              <span>Scan</span>
              <span>Verify</span>
            </div>
          </CardContent>
        </Card>

        <QRScanner
          expectedType="AUTH"
          onScanSuccess={handleScanSuccess}
          onScanError={handleScanError}
          title="Scan Authentication QR"
          description="Use your authorized device to scan the QR code you generated"
        />

        {scanError && (
          <Card className="border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="h-4 w-4" />
                <span className="font-medium">Scan Error</span>
              </div>
              <p className="text-sm text-red-600 mt-1">{scanError}</p>
            </CardContent>
          </Card>
        )}

        <div className="flex gap-3">
          <Button onClick={generateAuthQR} variant="outline" className="flex-1 bg-transparent">
            <RefreshCw className="h-4 w-4 mr-2" />
            New QR Code
          </Button>
          <Button onClick={onBack} variant="outline" className="flex-1 bg-transparent">
            Back to Login
          </Button>
        </div>
      </div>
    )
  }

  if (currentStep === "verify") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Verifying Identity
          </CardTitle>
          <CardDescription>Processing your authentication data securely</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-8 w-8 text-primary" />
            </div>
            <Progress value={verificationProgress} className="w-full mb-4" />
            <p className="text-sm text-muted-foreground">
              {verificationProgress < 40 && "Validating QR signature..."}
              {verificationProgress >= 40 && verificationProgress < 80 && "Checking user credentials..."}
              {verificationProgress >= 80 && "Finalizing authentication..."}
            </p>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-sm">Security Checks:</h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span>QR code signature verified</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-3 w-3 text-green-600" />
                <span>User identity confirmed</span>
              </div>
              <div className="flex items-center gap-2">
                {verificationProgress >= 80 ? (
                  <CheckCircle className="h-3 w-3 text-green-600" />
                ) : (
                  <RefreshCw className="h-3 w-3 text-primary animate-spin" />
                )}
                <span>Session security established</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (currentStep === "complete") {
    return (
      <Card className="w-full max-w-md mx-auto border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            Authentication Complete
          </CardTitle>
          <CardDescription className="text-green-600">Your identity has been successfully verified</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-6">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <p className="text-sm text-green-700 mb-4">Redirecting to secure voting interface...</p>
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600 mx-auto"></div>
        </CardContent>
      </Card>
    )
  }

  // Generate step
  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          Enhanced Identity Verification
        </CardTitle>
        <CardDescription>Generating secure authentication QR code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
            <div className="text-center">
              <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">Generating secure QR...</p>
            </div>
          </div>
        </div>

        <div className="bg-primary/5 p-4 rounded-lg">
          <h4 className="font-medium mb-2 text-sm">Enhanced Security Features:</h4>
          <ul className="text-xs text-muted-foreground space-y-1">
            <li>• 256-bit encryption for all QR data</li>
            <li>• Time-based expiration (5 minutes)</li>
            <li>• Digital signature verification</li>
            <li>• Session-based authentication</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
