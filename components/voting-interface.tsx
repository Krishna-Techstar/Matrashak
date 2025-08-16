"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Vote, Shield, Lock, User, ArrowRight, CheckCircle, Smartphone, Info } from "lucide-react"
import { VoteConfirmation } from "./vote-confirmation"

interface Candidate {
  id: string
  name: string
  party: string
  symbol: string
  description: string
}

interface VotingInterfaceProps {
  election: {
    title: string
    description: string
    candidates: Candidate[]
  }
  onVoteComplete: () => void
}

export function VotingInterface({ election, onVoteComplete }: VotingInterfaceProps) {
  const [selectedCandidate, setSelectedCandidate] = useState<string>("")
  const [currentStep, setCurrentStep] = useState<"voting" | "confirmation">("voting")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleVoteSubmission = () => {
    if (!selectedCandidate) return

    setIsSubmitting(true)
    console.log("[v0] Vote submitted for candidate:", selectedCandidate)

    // Simulate vote processing
    setTimeout(() => {
      setIsSubmitting(false)
      setCurrentStep("confirmation")
    }, 1500)
  }

  const selectedCandidateData = election.candidates.find((c) => c.id === selectedCandidate)

  if (currentStep === "confirmation" && selectedCandidateData) {
    return (
      <VoteConfirmation
        candidate={selectedCandidateData}
        election={election}
        onComplete={onVoteComplete}
        onBack={() => setCurrentStep("voting")}
      />
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Alert className="border-blue-200 bg-blue-50">
        <Info className="h-4 w-4 text-blue-600" />
        <AlertDescription className="text-blue-800">
          <div className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            <span>
              <strong>Mobile App Preview:</strong> This demonstrates the core voting flow. The production mobile app
              will include kernel-level device lockdown, advanced biometric verification, and real-time blockchain
              integration.
            </span>
          </div>
        </AlertDescription>
      </Alert>

      {/* Security Header */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                <span className="font-medium text-primary">Secure Voting Mode</span>
              </div>
              <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                <Lock className="h-3 w-3 mr-1" />
                Device Locked
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">End-to-end encrypted</div>
          </div>
        </CardContent>
      </Card>

      {/* Election Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Vote className="h-5 w-5 text-primary" />
            {election.title}
          </CardTitle>
          <CardDescription>{election.description}</CardDescription>
        </CardHeader>
      </Card>

      {/* Candidate Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Select Your Candidate</CardTitle>
          <CardDescription>Choose one candidate to cast your vote</CardDescription>
        </CardHeader>
        <CardContent>
          <RadioGroup value={selectedCandidate} onValueChange={setSelectedCandidate} className="space-y-4">
            {election.candidates.map((candidate) => (
              <div key={candidate.id} className="relative">
                <Label
                  htmlFor={candidate.id}
                  className="flex items-center space-x-4 p-4 rounded-lg border cursor-pointer hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={candidate.id} id={candidate.id} />
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-primary" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">{candidate.name}</h3>
                        <Badge variant="secondary" className="text-xs">
                          {candidate.party}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{candidate.description}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-xs font-medium">Symbol:</span>
                        <span className="text-lg">{candidate.symbol}</span>
                      </div>
                    </div>
                  </div>
                  {selectedCandidate === candidate.id && <CheckCircle className="h-5 w-5 text-primary" />}
                </Label>
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      {/* Vote Submission */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            {selectedCandidate && (
              <div className="p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Your Selection:</h4>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{selectedCandidateData?.name}</p>
                    <p className="text-sm text-muted-foreground">{selectedCandidateData?.party}</p>
                  </div>
                </div>
              </div>
            )}

            <Button
              onClick={handleVoteSubmission}
              disabled={!selectedCandidate || isSubmitting}
              className="w-full"
              size="lg"
            >
              {isSubmitting ? (
                "Processing Vote..."
              ) : (
                <>
                  Cast Your Vote
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>

            <div className="text-xs text-center text-muted-foreground">
              <p className="mb-1">🔒 Your vote will be encrypted and anonymized</p>
              <p>Once submitted, you cannot change your selection</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
