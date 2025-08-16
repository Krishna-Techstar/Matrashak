import { Shield, Lock } from "lucide-react"

export function SecurityBanner() {
  return (
    <div className="bg-primary text-primary-foreground py-2">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center gap-2 text-sm">
          <Lock className="h-4 w-4" />
          <span className="font-medium">Secure Voting Mode Active</span>
          <Shield className="h-4 w-4" />
        </div>
      </div>
    </div>
  )
}
