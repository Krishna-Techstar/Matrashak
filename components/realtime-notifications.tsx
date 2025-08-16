"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bell, BellRing, CheckCircle, Vote, Shield, Settings, X } from "lucide-react"
import { useRealtime } from "@/lib/realtime-context"

export function RealtimeNotifications() {
  const { data, markNotificationRead, clearNotifications } = useRealtime()
  const [isOpen, setIsOpen] = useState(false)

  const unreadCount = data.notifications.filter((n) => !n.read).length

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "vote":
        return <Vote className="h-4 w-4 text-blue-600" />
      case "verification":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "security":
        return <Shield className="h-4 w-4 text-red-600" />
      case "system":
        return <Settings className="h-4 w-4 text-gray-600" />
      default:
        return <Bell className="h-4 w-4 text-gray-600" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-200 bg-red-50"
      case "medium":
        return "border-yellow-200 bg-yellow-50"
      default:
        return "border-blue-200 bg-blue-50"
    }
  }

  return (
    <div className="relative">
      <Button variant="outline" size="sm" onClick={() => setIsOpen(!isOpen)} className="relative bg-transparent">
        {unreadCount > 0 ? <BellRing className="h-4 w-4" /> : <Bell className="h-4 w-4" />}
        {unreadCount > 0 && (
          <Badge className="absolute -top-2 -right-2 h-5 w-5 p-0 flex items-center justify-center text-xs bg-red-500">
            {unreadCount > 9 ? "9+" : unreadCount}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute right-0 top-12 w-80 z-50 shadow-lg border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Notifications</CardTitle>
              <div className="flex items-center gap-2">
                {data.notifications.length > 0 && (
                  <Button size="sm" variant="ghost" onClick={clearNotifications} className="h-6 text-xs">
                    Clear All
                  </Button>
                )}
                <Button size="sm" variant="ghost" onClick={() => setIsOpen(false)} className="h-6 w-6 p-0">
                  <X className="h-3 w-3" />
                </Button>
              </div>
            </div>
            <CardDescription>
              Real-time updates • {unreadCount} unread
              <div className="flex items-center gap-2 mt-1">
                <div
                  className={`w-2 h-2 rounded-full ${
                    data.connectionStatus === "connected"
                      ? "bg-green-500"
                      : data.connectionStatus === "connecting"
                        ? "bg-yellow-500 animate-pulse"
                        : "bg-red-500"
                  }`}
                ></div>
                <span className="text-xs capitalize">{data.connectionStatus}</span>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-80">
              {data.notifications.length === 0 ? (
                <div className="p-6 text-center text-muted-foreground">
                  <Bell className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">No notifications yet</p>
                </div>
              ) : (
                <div className="space-y-1 p-2">
                  {data.notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg cursor-pointer transition-colors ${
                        notification.read ? "bg-muted/50" : getPriorityColor(notification.priority)
                      }`}
                      onClick={() => markNotificationRead(notification.id)}
                    >
                      <div className="flex items-start gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className={`text-sm font-medium ${notification.read ? "text-muted-foreground" : ""}`}>
                              {notification.title}
                            </p>
                            {!notification.read && <div className="w-2 h-2 bg-primary rounded-full"></div>}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">{notification.message}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.timestamp.toLocaleTimeString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
