"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { QrCode, Mail, Phone, BadgeIcon as IdCard, ArrowRight } from "lucide-react"
import { QRVerification } from "./qr-verification"

type AuthStep = "login" | "qr-verification" | "voting"

export function VoterLogin() {
  const [currentStep, setCurrentStep] = useState<AuthStep>("login")
  const [voterId, setVoterId] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [userInfo, setUserInfo] = useState<{ id: string; type: "voter-id" | "email" | "phone" } | null>(null)

  const handleVoterIdLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("[v0] Voter ID login attempted:", voterId)
      setUserInfo({ id: voterId, type: "voter-id" })
      setIsLoading(false)
      setCurrentStep("qr-verification")
    }, 1500)
  }

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("[v0] Email login attempted:", email)
      setUserInfo({ id: email, type: "email" })
      setIsLoading(false)
      setCurrentStep("qr-verification")
    }, 1500)
  }

  const handlePhoneLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      console.log("[v0] Phone login attempted:", phone)
      setUserInfo({ id: phone, type: "phone" })
      setIsLoading(false)
      setCurrentStep("qr-verification")
    }, 1500)
  }

  const handleVerificationComplete = () => {
    console.log("[v0] Verification completed for user:", userInfo)
    window.location.href = "/vote"
  }

  const handleBackToLogin = () => {
    setCurrentStep("login")
    setUserInfo(null)
  }

  if (currentStep === "qr-verification" && userInfo) {
    return (
      <QRVerification
        userInfo={userInfo}
        onVerificationComplete={handleVerificationComplete}
        onBack={handleBackToLogin}
      />
    )
  }

  if (currentStep === "voting") {
    return (
      <Card className="w-full max-w-md mx-auto">
        <CardHeader className="text-center">
          <CardTitle className="text-green-600">Authentication Complete!</CardTitle>
          <CardDescription>Redirecting to secure voting interface...</CardDescription>
        </CardHeader>
        <CardContent className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2">
          <QrCode className="h-5 w-5 text-primary" />
          Voter Authentication
        </CardTitle>
        <CardDescription>Choose your preferred method to verify your identity</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="voter-id" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="voter-id" className="text-xs">
              <IdCard className="h-4 w-4 mr-1" />
              Voter ID
            </TabsTrigger>
            <TabsTrigger value="email" className="text-xs">
              <Mail className="h-4 w-4 mr-1" />
              Email
            </TabsTrigger>
            <TabsTrigger value="phone" className="text-xs">
              <Phone className="h-4 w-4 mr-1" />
              Phone
            </TabsTrigger>
          </TabsList>

          <TabsContent value="voter-id" className="space-y-4">
            <form onSubmit={handleVoterIdLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="voter-id">Voter ID Number</Label>
                <Input
                  id="voter-id"
                  type="text"
                  placeholder="Enter your voter ID"
                  value={voterId}
                  onChange={(e) => setVoterId(e.target.value)}
                  required
                  className="text-center font-mono"
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !voterId.trim()}>
                {isLoading ? (
                  "Verifying..."
                ) : (
                  <>
                    Generate QR Code
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !email.trim()}>
                {isLoading ? (
                  "Verifying..."
                ) : (
                  <>
                    Generate QR Code
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="phone" className="space-y-4">
            <form onSubmit={handlePhoneLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter your phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading || !phone.trim()}>
                {isLoading ? (
                  "Verifying..."
                ) : (
                  <>
                    Generate QR Code
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </>
                )}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <div className="flex items-start gap-3">
            <QrCode className="h-5 w-5 text-primary mt-0.5" />
            <div className="text-sm">
              <p className="font-medium mb-1">Next Step: QR Verification</p>
              <p className="text-muted-foreground">
                After submitting your details, you'll receive a QR code for identity verification before proceeding to
                the secure voting interface.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
