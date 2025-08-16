import { AdminDashboard } from "@/components/admin-dashboard"
import { EnhancedSecurityBanner } from "@/components/enhanced-security-banner"

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-background">
      <EnhancedSecurityBanner />
      <AdminDashboard />
    </div>
  )
}
