"use client"

import { createContext, useContext, useEffect, useState, type ReactNode } from "react"

interface RealtimeData {
  totalVotes: number
  activeVoters: number
  turnoutRate: number
  lastUpdate: Date
  connectionStatus: "connected" | "connecting" | "disconnected"
  notifications: RealtimeNotification[]
}

interface RealtimeNotification {
  id: string
  type: "vote" | "verification" | "system" | "security"
  title: string
  message: string
  timestamp: Date
  read: boolean
  priority: "low" | "medium" | "high"
}

interface RealtimeContextType {
  data: RealtimeData
  sendNotification: (notification: Omit<RealtimeNotification, "id" | "timestamp">) => void
  markNotificationRead: (notificationId: string) => void
  clearNotifications: () => void
  reconnect: () => void
}

const RealtimeContext = createContext<RealtimeContextType | undefined>(undefined)

export function RealtimeProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<RealtimeData>({
    totalVotes: 1247,
    activeVoters: 23,
    turnoutRate: 68.3,
    lastUpdate: new Date(),
    connectionStatus: "connected",
    notifications: [],
  })

  // Simulate WebSocket connection and real-time updates
  useEffect(() => {
    console.log("[v0] Establishing real-time connection...")

    setData((prev) => ({ ...prev, connectionStatus: "connecting" }))

    // Simulate connection establishment
    setTimeout(() => {
      setData((prev) => ({ ...prev, connectionStatus: "connected" }))
      console.log("[v0] Real-time connection established")
    }, 2000)

    // Simulate real-time data updates
    const dataInterval = setInterval(() => {
      setData((prev) => ({
        ...prev,
        totalVotes: prev.totalVotes + Math.floor(Math.random() * 3),
        activeVoters: Math.floor(Math.random() * 30) + 10,
        turnoutRate: Math.min(100, prev.turnoutRate + Math.random() * 0.1),
        lastUpdate: new Date(),
      }))
    }, 5000)

    // Simulate random notifications
    const notificationInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        const notifications = [
          {
            type: "vote" as const,
            title: "New Vote Recorded",
            message: "Vote successfully encrypted and stored",
            read: false,
            priority: "low" as const,
          },
          {
            type: "verification" as const,
            title: "QR Verification Complete",
            message: "User identity verified successfully",
            read: false,
            priority: "medium" as const,
          },
          {
            type: "system" as const,
            title: "System Status Update",
            message: "All systems operating normally",
            read: false,
            priority: "low" as const,
          },
        ]

        const randomNotification = notifications[Math.floor(Math.random() * notifications.length)]
        sendNotification(randomNotification)
      }
    }, 15000)

    return () => {
      clearInterval(dataInterval)
      clearInterval(notificationInterval)
    }
  }, [])

  const sendNotification = (notification: Omit<RealtimeNotification, "id" | "timestamp">) => {
    const newNotification: RealtimeNotification = {
      ...notification,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date(),
    }

    setData((prev) => ({
      ...prev,
      notifications: [newNotification, ...prev.notifications.slice(0, 19)], // Keep last 20 notifications
    }))

    console.log("[v0] Real-time notification:", newNotification.title)
  }

  const markNotificationRead = (notificationId: string) => {
    setData((prev) => ({
      ...prev,
      notifications: prev.notifications.map((notif) =>
        notif.id === notificationId ? { ...notif, read: true } : notif,
      ),
    }))
  }

  const clearNotifications = () => {
    setData((prev) => ({
      ...prev,
      notifications: [],
    }))
  }

  const reconnect = () => {
    setData((prev) => ({ ...prev, connectionStatus: "connecting" }))

    setTimeout(() => {
      setData((prev) => ({ ...prev, connectionStatus: "connected" }))
      console.log("[v0] Real-time connection re-established")
    }, 2000)
  }

  return (
    <RealtimeContext.Provider
      value={{
        data,
        sendNotification,
        markNotificationRead,
        clearNotifications,
        reconnect,
      }}
    >
      {children}
    </RealtimeContext.Provider>
  )
}

export function useRealtime() {
  const context = useContext(RealtimeContext)
  if (context === undefined) {
    throw new Error("useRealtime must be used within a RealtimeProvider")
  }
  return context
}
