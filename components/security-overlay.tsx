"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, X } from "lucide-react"
import { useSecurity } from "@/lib/security-context"

export function SecurityOverlay() {
  const { securityState, resolveAlert } = useSecurity()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (securityState.isSecureMode) {
      setIsVisible(true)
    }
  }, [securityState.isSecureMode])

  if (!isVisible || !securityState.isSecureMode) {
    return null
  }

  const unresolvedAlerts = securityState.securityAlerts.filter((alert) => !alert.resolved)

  return (
    <div className="fixed inset-0 z-50 pointer-events-none">
      {/* Secure Mode Indicator */}
      <div className="absolute top-4 right-4 pointer-events-auto">
        <Card className="border-primary/20 bg-primary/95 text-primary-foreground shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Secure Voting Mode</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                <Badge variant="secondary" className="bg-primary-foreground/20 text-primary-foreground">
                  <Lock className="h-3 w-3 mr-1" />
                  Device Locked
                </Badge>
              </div>
            </div>
            <div className="mt-2 text-sm opacity-90">
              <div className="flex items-center gap-4">
                <span>Compliance: {securityState.deviceCompliance.toFixed(1)}%</span>
                <span>Network: {securityState.networkStatus}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      {unresolvedAlerts.length > 0 && (
        <div className="absolute top-4 left-4 space-y-2 pointer-events-auto max-w-md">
          {unresolvedAlerts.slice(0, 3).map((alert) => (
            <Alert
              key={alert.id}
              className={`${
                alert.type === "critical"
                  ? "border-red-500 bg-red-50 text-red-900"
                  : alert.type === "warning"
                    ? "border-yellow-500 bg-yellow-50 text-yellow-900"
                    : "border-blue-500 bg-blue-50 text-blue-900"
              } shadow-lg`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  {alert.type === "critical" ? (
                    <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
                  ) : alert.type === "warning" ? (
                    <AlertTriangle className="h-4 w-4 text-yellow-600 mt-0.5" />
                  ) : (
                    <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5" />
                  )}
                  <div className="flex-1">
                    <AlertDescription className="text-sm font-medium">{alert.message}</AlertDescription>
                    <p className="text-xs opacity-75 mt-1">{alert.timestamp.toLocaleTimeString()}</p>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => resolveAlert(alert.id)}
                  className="h-6 w-6 p-0 hover:bg-transparent"
                >
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </Alert>
          ))}
        </div>
      )}

      {/* Kernel Lockdown Indicator */}
      {securityState.kernelLockdown && (
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <Card className="border-yellow-500/20 bg-yellow-500/95 text-yellow-50 shadow-lg">
            <CardContent className="p-3">
              <div className="flex items-center gap-2 text-sm">
                <Lock className="h-4 w-4" />
                <span className="font-medium">Kernel-Level Security Active</span>
                <div className="w-2 h-2 bg-yellow-200 rounded-full animate-pulse"></div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Privacy Protection Notice */}
      <div className="absolute bottom-4 right-4 pointer-events-auto">
        <Card className="border-green-500/20 bg-green-500/95 text-green-50 shadow-lg">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4" />
              <span className="font-medium">End-to-End Encryption Active</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
