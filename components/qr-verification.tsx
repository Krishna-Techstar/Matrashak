"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, CheckCircle, Clock, RefreshCw, ArrowRight } from "lucide-react"

interface QRVerificationProps {
  userInfo: {
    id: string
    type: "voter-id" | "email" | "phone"
  }
  onVerificationComplete: () => void
  onBack: () => void
}

export function QRVerification({ userInfo, onVerificationComplete, onBack }: QRVerificationProps) {
  const [qrCode, setQrCode] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(true)
  const [timeLeft, setTimeLeft] = useState(60)
  const [isVerified, setIsVerified] = useState(false)

  // Generate QR code on mount
  useEffect(() => {
    generateQRCode()
  }, [])

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0 && !isVerified) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft, isVerified])

  const generateQRCode = async () => {
    setIsGenerating(true)

    // Simulate QR generation with user data
    setTimeout(() => {
      const qrData = `MATRAKSHAK_AUTH:${userInfo.type}:${userInfo.id}:${Date.now()}`
      const qrUrl = `/placeholder.svg?height=200&width=200&query=QR code for voter authentication with secure encryption`
      setQrCode(qrUrl)
      setIsGenerating(false)
      setTimeLeft(60) // Reset timer
      console.log("[v0] Generated QR code for:", qrData)
    }, 2000)
  }

  const handleVerification = () => {
    setIsVerified(true)
    setTimeout(() => {
      onVerificationComplete()
    }, 1500)
  }

  const refreshQR = () => {
    generateQRCode()
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          Identity Verification
        </CardTitle>
        <CardDescription>Scan the QR code with your authorized device to verify your identity</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code Display */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            {isGenerating ? (
              <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Generating secure QR...</p>
                </div>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={qrCode || "/placeholder.svg"}
                  alt="Authentication QR Code"
                  className="w-48 h-48 rounded-lg border-2 border-primary/20"
                />
                {isVerified && (
                  <div className="absolute inset-0 bg-primary/90 rounded-lg flex items-center justify-center">
                    <CheckCircle className="h-12 w-12 text-primary-foreground" />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Timer and Status */}
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {isVerified ? "Verified!" : `Expires in ${timeLeft}s`}
            </span>
            {timeLeft > 0 && !isVerified && (
              <Badge variant="outline" className="text-xs">
                Active
              </Badge>
            )}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-muted p-4 rounded-lg">
          <h4 className="font-medium mb-2">Verification Steps:</h4>
          <ol className="text-sm text-muted-foreground space-y-1">
            <li>1. Open your authorized scanning device</li>
            <li>2. Scan the QR code above</li>
            <li>3. Confirm your identity on the device</li>
            <li>4. Wait for verification confirmation</li>
          </ol>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          {isVerified ? (
            <Button onClick={onVerificationComplete} className="w-full">
              <CheckCircle className="h-4 w-4 mr-2" />
              Proceed to Voting
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          ) : (
            <>
              {timeLeft === 0 ? (
                <Button onClick={refreshQR} variant="outline" className="w-full bg-transparent">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Generate New QR Code
                </Button>
              ) : (
                <Button onClick={handleVerification} className="w-full">
                  Simulate Verification
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Button>
              )}
              <Button onClick={onBack} variant="outline" className="w-full bg-transparent">
                Back to Login
              </Button>
            </>
          )}
        </div>

        {/* Security Notice */}
        <div className="text-xs text-muted-foreground text-center p-3 bg-primary/5 rounded-lg">
          <p className="font-medium mb-1">🔒 Secure Connection Active</p>
          <p>Your identity verification is protected by end-to-end encryption</p>
        </div>
      </CardContent>
    </Card>
  )
}
