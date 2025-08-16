import { VoterLogin } from "@/components/voter-login"
import { EnhancedSecurityBanner } from "@/components/enhanced-security-banner"
import { Shield, Vote, Lock, Smartphone, AlertCircle, Zap, Globe, Database } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedSecurityBanner />

      <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b">
        <div className="container mx-auto px-4 py-4">
          <Alert className="border-blue-200 bg-blue-50/50">
            <AlertCircle className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              <strong>Development Prototype:</strong> This is a sample demonstration of the Matrakṣhak system. The final
              version will be a comprehensive mobile application with full blockchain integration, AI fraud detection,
              and advanced security features as shown in our system architecture.
            </AlertDescription>
          </Alert>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <div className="flex justify-center items-center gap-3 mb-6">
            <Shield className="h-12 w-12 text-primary" />
            <h1 className="text-4xl font-bold text-foreground">Matrakṣhak</h1>
          </div>
          <p className="text-xl text-muted-foreground mb-2">🚀 Revolutionizing Voting with Double QR Security</p>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Next-generation voting system with double QR encryption, kernel-level security, and instant verification for
            tamper-proof elections from college-level to national polls.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 rounded-lg bg-card border">
            <Shield className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">🔐 Dual QR Encryption</h3>
            <p className="text-sm text-muted-foreground">
              QR-in-QR technology - identity verification + vote encryption for complete privacy
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card border">
            <Zap className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">⚡ Real-Time Verification</h3>
            <p className="text-sm text-muted-foreground">
              Instantly validates votes, blocks duplicates, and flags suspicious activity
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card border">
            <Lock className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">🛡 Tamper-Proof Architecture</h3>
            <p className="text-sm text-muted-foreground">
              End-to-end encryption + blockchain-style logs ensure full transparency
            </p>
          </div>
          <div className="text-center p-6 rounded-lg bg-card border">
            <Globe className="h-8 w-8 text-primary mx-auto mb-4" />
            <h3 className="font-semibold mb-2">🌐 Universal Scalability</h3>
            <p className="text-sm text-muted-foreground">Hybrid access - secure booths or verified remote devices</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-primary/5 to-cyan-500/5 rounded-xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-center mb-8">🚀 Revolutionary Innovation Features</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Smartphone className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Mobile-First Architecture</h3>
                  <p className="text-sm text-muted-foreground">
                    Full mobile application with kernel-level lockdown during voting
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Database className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Blockchain Integration</h3>
                  <p className="text-sm text-muted-foreground">
                    Immutable ledger with AI fraud detection and real-time monitoring
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Multi-Layer Security</h3>
                  <p className="text-sm text-muted-foreground">
                    3-5 layer cryptographic framework with zero data leakage
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <Lock className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Kernel-Level Lockdown</h3>
                  <p className="text-sm text-muted-foreground">
                    Device security mode blocks screenshots, app switching, and background activity
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Zap className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Instant Verification</h3>
                  <p className="text-sm text-muted-foreground">
                    Immediate vote confirmation without exposing voter identity
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Vote className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="font-semibold">Faster & Safer Process</h3>
                  <p className="text-sm text-muted-foreground">
                    No paper ballots, instant counting, and higher public trust
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Login Section */}
        <div className="max-w-md mx-auto">
          <VoterLogin />
        </div>
      </div>
    </div>
  )
}
