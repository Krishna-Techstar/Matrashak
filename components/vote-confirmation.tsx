"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { QrCode, CheckCircle, Shield, RefreshCw, Download, User, ArrowLeft } from "lucide-react"

interface Candidate {
  id: string
  name: string
  party: string
  symbol: string
  description: string
}

interface VoteConfirmationProps {
  candidate: Candidate
  election: {
    title: string
    description: string
  }
  onComplete: () => void
  onBack: () => void
}

export function VoteConfirmation({ candidate, election, onComplete, onBack }: VoteConfirmationProps) {
  const [voteQR, setVoteQR] = useState<string>("")
  const [isGenerating, setIsGenerating] = useState(true)
  const [isVerified, setIsVerified] = useState(false)
  const [voteId, setVoteId] = useState<string>("")

  useEffect(() => {
    generateVoteQR()
  }, [])

  const generateVoteQR = async () => {
    setIsGenerating(true)

    // Simulate encrypted vote QR generation
    setTimeout(() => {
      const voteData = `MATRAKSHAK_VOTE:${candidate.id}:${Date.now()}`
      const generatedVoteId = `VT-${Math.random().toString(36).substr(2, 9).toUpperCase()}`
      const qrUrl = `/placeholder.svg?height=200&width=200&query=Encrypted vote QR code with security patterns`

      setVoteQR(qrUrl)
      setVoteId(generatedVoteId)
      setIsGenerating(false)

      console.log("[v0] Generated encrypted vote QR:", voteData)
      console.log("[v0] Vote ID:", generatedVoteId)
    }, 2000)
  }

  const handleVerification = () => {
    setIsVerified(true)
    setTimeout(() => {
      onComplete()
    }, 2000)
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Vote Confirmation Header */}
      <Card className="border-green-200 bg-green-50">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-700">
            <CheckCircle className="h-5 w-5" />
            Vote Recorded
          </CardTitle>
          <CardDescription className="text-green-600">Your vote has been securely encrypted</CardDescription>
        </CardHeader>
      </Card>

      {/* Vote Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Vote Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-3 p-3 bg-muted rounded-lg">
            <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="font-medium">{candidate.name}</p>
              <p className="text-sm text-muted-foreground">{candidate.party}</p>
            </div>
            <div className="ml-auto text-2xl">{candidate.symbol}</div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Election</p>
              <p className="font-medium">{election.title}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Vote ID</p>
              <p className="font-mono font-medium">{voteId}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Encrypted QR Code */}
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2">
            <QrCode className="h-5 w-5 text-primary" />
            Vote Verification QR
          </CardTitle>
          <CardDescription>Scan to verify your encrypted vote was recorded correctly</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              {isGenerating ? (
                <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <RefreshCw className="h-8 w-8 text-primary animate-spin mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Encrypting vote...</p>
                  </div>
                </div>
              ) : (
                <div className="relative">
                  <img
                    src={voteQR || "/placeholder.svg"}
                    alt="Encrypted Vote QR Code"
                    className="w-48 h-48 rounded-lg border-2 border-primary/20"
                  />
                  {isVerified && (
                    <div className="absolute inset-0 bg-green-500/90 rounded-lg flex items-center justify-center">
                      <CheckCircle className="h-12 w-12 text-white" />
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-green-600" />
              <Badge variant="outline" className="text-green-600 border-green-200">
                {isVerified ? "Verified" : "Encrypted & Secure"}
              </Badge>
            </div>
          </div>

          <div className="bg-muted p-4 rounded-lg">
            <h4 className="font-medium mb-2 text-sm">Verification Instructions:</h4>
            <ol className="text-xs text-muted-foreground space-y-1">
              <li>1. Use your authorized device to scan this QR</li>
              <li>2. Verify the vote details match your selection</li>
              <li>3. Confirm the encryption signature</li>
              <li>4. Your vote is now permanently recorded</li>
            </ol>
          </div>

          <div className="space-y-3">
            {isVerified ? (
              <Button onClick={onComplete} className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="h-4 w-4 mr-2" />
                Complete Voting Process
              </Button>
            ) : (
              <>
                <Button onClick={handleVerification} className="w-full">
                  <QrCode className="h-4 w-4 mr-2" />
                  Verify Vote (Simulate)
                </Button>
                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" size="sm" className="bg-transparent">
                    <Download className="h-4 w-4 mr-1" />
                    Save QR
                  </Button>
                  <Button onClick={onBack} variant="outline" size="sm" className="bg-transparent">
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back
                  </Button>
                </div>
              </>
            )}
          </div>

          <div className="text-xs text-center text-muted-foreground p-3 bg-primary/5 rounded-lg">
            <p className="font-medium mb-1">🔐 End-to-End Encryption Active</p>
            <p>Your vote is anonymized and cannot be traced back to your identity</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
