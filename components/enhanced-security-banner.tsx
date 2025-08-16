"use client"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Shield, Lock, Eye, Wifi, RefreshCw } from "lucide-react"
import { useSecurity } from "@/lib/security-context"
import { useRealtime } from "@/lib/realtime-context"
import { RealtimeNotifications } from "./realtime-notifications"

export function EnhancedSecurityBanner() {
  const { securityState, refreshSecurityStatus } = useSecurity()
  const { data, reconnect } = useRealtime()

  return (
    <div className="bg-primary text-primary-foreground py-3">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Left: Security Status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              <span className="font-medium">Matrakṣhak Security</span>
            </div>

            <div className="flex items-center gap-3">
              {securityState.isSecureMode && (
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  <Lock className="h-3 w-3 mr-1" />
                  Secure Mode
                </Badge>
              )}

              <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                <Eye className="h-3 w-3 mr-1" />
                Encrypted
              </Badge>

              <Badge
                variant="secondary"
                className={`${
                  data.connectionStatus === "connected"
                    ? "bg-green-500/20 text-green-100"
                    : data.connectionStatus === "connecting"
                      ? "bg-yellow-500/20 text-yellow-100"
                      : "bg-red-500/20 text-red-100"
                }`}
              >
                <Wifi className="h-3 w-3 mr-1" />
                {data.connectionStatus}
              </Badge>
            </div>
          </div>

          {/* Center: Live Stats */}
          <div className="hidden md:flex items-center gap-6 text-sm">
            <div className="text-center">
              <div className="font-medium">{data.totalVotes}</div>
              <div className="text-xs opacity-75">Total Votes</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{data.turnoutRate.toFixed(1)}%</div>
              <div className="text-xs opacity-75">Turnout</div>
            </div>
            <div className="text-center">
              <div className="font-medium">{securityState.deviceCompliance.toFixed(1)}%</div>
              <div className="text-xs opacity-75">Compliance</div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-3">
            <Button
              size="sm"
              variant="secondary"
              onClick={refreshSecurityStatus}
              className="bg-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/30"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Refresh
            </Button>

            <RealtimeNotifications />

            <div className="flex items-center gap-2 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live</span>
            </div>
          </div>
        </div>

        {/* Security Alerts Bar */}
        {securityState.securityAlerts.filter((alert) => !alert.resolved).length > 0 && (
          <div className="mt-2 pt-2 border-t border-primary-foreground/20">
            <div className="flex items-center gap-2 text-sm">
              <Shield className="h-4 w-4 text-yellow-300" />
              <span>
                {securityState.securityAlerts.filter((alert) => !alert.resolved).length} active security alert(s)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
