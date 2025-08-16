"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface SecurityState {
  isSecureMode: boolean
  kernelLockdown: boolean
  deviceCompliance: number
  encryptionActive: boolean
  lastSecurityCheck: Date
  securityAlerts: SecurityAlert[]
  networkStatus: "secure" | "warning" | "compromised"
}

interface SecurityAlert {
  id: string
  type: "info" | "warning" | "critical"
  message: string
  timestamp: Date
  resolved: boolean
}

interface SecurityContextType {
  securityState: SecurityState
  enableSecureMode: () => void
  disableSecureMode: () => void
  addSecurityAlert: (alert: Omit<SecurityAlert, "id" | "timestamp">) => void
  resolveAlert: (alertId: string) => void
  refreshSecurityStatus: () => void
}

const SecurityContext = createContext<SecurityContextType | undefined>(undefined)

export function SecurityProvider({ children }: { children: ReactNode }) {
  const [securityState, setSecurityState] = useState<SecurityState>({
    isSecureMode: false,
    kernelLockdown: false,
    deviceCompliance: 98.5,
    encryptionActive: true,
    lastSecurityCheck: new Date(),
    securityAlerts: [],
    networkStatus: "secure",
  })

  // Simulate real-time security monitoring
  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityState((prev) => ({
        ...prev,
        deviceCompliance: Math.max(95, Math.min(100, prev.deviceCompliance + (Math.random() - 0.5) * 2)),
        lastSecurityCheck: new Date(),
        networkStatus: Math.random() > 0.95 ? "warning" : "secure",
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const enableSecureMode = () => {
    setSecurityState((prev) => ({
      ...prev,
      isSecureMode: true,
      kernelLockdown: true,
    }))

    // Simulate kernel-level lockdown
    console.log("[v0] Secure mode enabled - kernel lockdown active")

    // Add security alert
    addSecurityAlert({
      type: "info",
      message: "Secure voting mode activated - device locked down",
      resolved: false,
    })
  }

  const disableSecureMode = () => {
    setSecurityState((prev) => ({
      ...prev,
      isSecureMode: false,
      kernelLockdown: false,
    }))

    console.log("[v0] Secure mode disabled - normal operation resumed")
  }

  const addSecurityAlert = (alert: Omit<SecurityAlert, "id" | "timestamp">) => {
    const newAlert: SecurityAlert = {
      ...alert,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }

    setSecurityState((prev) => ({
      ...prev,
      securityAlerts: [newAlert, ...prev.securityAlerts.slice(0, 9)], // Keep last 10 alerts
    }))
  }

  const resolveAlert = (alertId: string) => {
    setSecurityState((prev) => ({
      ...prev,
      securityAlerts: prev.securityAlerts.map((alert) => (alert.id === alertId ? { ...alert, resolved: true } : alert)),
    }))
  }

  const refreshSecurityStatus = () => {
    setSecurityState((prev) => ({
      ...prev,
      lastSecurityCheck: new Date(),
      deviceCompliance: Math.min(100, prev.deviceCompliance + Math.random() * 2),
    }))

    console.log("[v0] Security status refreshed")
  }

  return (
    <SecurityContext.Provider
      value={{
        securityState,
        enableSecureMode,
        disableSecureMode,
        addSecurityAlert,
        resolveAlert,
        refreshSecurityStatus,
      }}
    >
      {children}
    </SecurityContext.Provider>
  )
}

export function useSecurity() {
  const context = useContext(SecurityContext)
  if (context === undefined) {
    throw new Error("useSecurity must be used within a SecurityProvider")
  }
  return context
}
