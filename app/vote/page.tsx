"use client"

import { useEffect } from "react"
import { VotingInterface } from "@/components/voting-interface"
import { EnhancedSecurityBanner } from "@/components/enhanced-security-banner"
import { useSecurity } from "@/lib/security-context"

// Sample election data
const sampleElection = {
  title: "Student Council President Election 2024",
  description: "Choose your representative for the upcoming academic year",
  candidates: [
    {
      id: "candidate-1",
      name: "Sarah Johnson",
      party: "Progressive Student Alliance",
      symbol: "🌟",
      description: "Advocating for better campus facilities and student welfare programs",
    },
    {
      id: "candidate-2",
      name: "Michael Chen",
      party: "Academic Excellence Party",
      symbol: "📚",
      description: "Focused on improving academic resources and library services",
    },
    {
      id: "candidate-3",
      name: "Emily Rodriguez",
      party: "Environmental Action Group",
      symbol: "🌱",
      description: "Promoting sustainability initiatives and green campus policies",
    },
    {
      id: "candidate-4",
      name: "David Thompson",
      party: "Sports & Recreation Coalition",
      symbol: "⚽",
      description: "Enhancing sports facilities and recreational activities for all students",
    },
  ],
}

export default function VotePage() {
  const { enableSecureMode, disableSecureMode } = useSecurity()

  // Enable secure mode when entering voting page
  useEffect(() => {
    enableSecureMode()

    // Disable secure mode when leaving the page
    return () => {
      disableSecureMode()
    }
  }, [enableSecureMode, disableSecureMode])

  const handleVoteComplete = () => {
    console.log("[v0] Voting process completed successfully")
    disableSecureMode()
    // TODO: Redirect to completion page or dashboard
  }

  return (
    <div className="min-h-screen bg-background">
      <EnhancedSecurityBanner />

      <div className="container mx-auto px-4 py-8">
        <VotingInterface election={sampleElection} onVoteComplete={handleVoteComplete} />
      </div>
    </div>
  )
}
