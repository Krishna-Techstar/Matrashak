"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Camera, Scan, CheckCircle, XCircle, RefreshCw } from "lucide-react"
import { simulateQRScan, validateQRData, type QRData } from "@/lib/qr-utils"

interface QRScannerProps {
  expectedType?: "AUTH" | "VOTE"
  onScanSuccess: (data: QRData) => void
  onScanError: (error: string) => void
  title?: string
  description?: string
}

export function QRScanner({
  expectedType,
  onScanSuccess,
  onScanError,
  title = "QR Code Scanner",
  description = "Position the QR code within the frame to scan",
}: QRScannerProps) {
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState<"success" | "error" | null>(null)
  const [lastError, setLastError] = useState<string>("")

  const handleScan = async () => {
    setIsScanning(true)
    setScanResult(null)
    setLastError("")

    try {
      // Simulate scanning a QR code
      const mockQRUrl =
        expectedType === "AUTH"
          ? `/placeholder.svg?height=200&width=200&query=QR code with encrypted data: AUTH - mock_auth_sig`
          : `/placeholder.svg?height=200&width=200&query=QR code with encrypted data: VOTE - mock_vote_sig`

      const scannedData = await simulateQRScan(mockQRUrl)

      if (!scannedData) {
        throw new Error("Invalid QR code format")
      }

      if (expectedType && scannedData.type !== expectedType) {
        throw new Error(`Expected ${expectedType} QR code, but got ${scannedData.type}`)
      }

      if (!validateQRData(scannedData)) {
        throw new Error("QR code has expired or is invalid")
      }

      setScanResult("success")
      setTimeout(() => {
        onScanSuccess(scannedData)
      }, 1000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Failed to scan QR code"
      setLastError(errorMessage)
      setScanResult("error")
      onScanError(errorMessage)
    } finally {
      setIsScanning(false)
    }
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <Camera className="h-5 w-5 text-primary" />
          {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Scanner Viewport */}
        <div className="relative">
          <div className="w-full h-64 bg-muted rounded-lg border-2 border-dashed border-muted-foreground/30 flex items-center justify-center">
            {isScanning ? (
              <div className="text-center">
                <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Scanning QR code...</p>
              </div>
            ) : scanResult === "success" ? (
              <div className="text-center text-green-600">
                <CheckCircle className="h-12 w-12 mx-auto mb-2" />
                <p className="font-medium">Scan Successful!</p>
              </div>
            ) : scanResult === "error" ? (
              <div className="text-center text-red-600">
                <XCircle className="h-12 w-12 mx-auto mb-2" />
                <p className="font-medium">Scan Failed</p>
                <p className="text-xs mt-1">{lastError}</p>
              </div>
            ) : (
              <div className="text-center">
                <Scan className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Ready to scan</p>
              </div>
            )}
          </div>

          {/* Scanner Frame Overlay */}
          <div className="absolute inset-4 border-2 border-primary rounded-lg pointer-events-none">
            <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary rounded-tl-lg"></div>
            <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary rounded-tr-lg"></div>
            <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary rounded-bl-lg"></div>
            <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary rounded-br-lg"></div>
          </div>
        </div>

        {/* Expected Type Badge */}
        {expectedType && (
          <div className="flex justify-center">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
              Expecting {expectedType} QR Code
            </Badge>
          </div>
        )}

        {/* Scan Button */}
        <Button onClick={handleScan} disabled={isScanning} className="w-full" size="lg">
          {isScanning ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Scanning...
            </>
          ) : (
            <>
              <Scan className="h-4 w-4 mr-2" />
              Start Scan
            </>
          )}
        </Button>

        {/* Instructions */}
        <div className="text-xs text-center text-muted-foreground space-y-1">
          <p>• Ensure good lighting for optimal scanning</p>
          <p>• Hold device steady and position QR code in frame</p>
          <p>• QR codes expire after 5 minutes for security</p>
        </div>
      </CardContent>
    </Card>
  )
}
