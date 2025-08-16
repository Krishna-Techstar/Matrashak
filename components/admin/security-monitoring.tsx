"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, XCircle, Lock, Eye, RefreshCw, Zap } from "lucide-react"

const securityMetrics = [
  { name: "Device Compliance", value: 98.5, status: "excellent", icon: Shield },
  { name: "QR Verification Rate", value: 99.2, status: "excellent", icon: CheckCircle },
  { name: "Encryption Integrity", value: 100, status: "excellent", icon: Lock },
  { name: "Network Security", value: 96.8, status: "good", icon: Shield },
]

const securityAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Multiple Failed QR Scans",
    description: "User VT-ABC123 has 3 consecutive failed QR verification attempts",
    timestamp: "2 minutes ago",
    severity: "medium",
    resolved: false,
  },
  {
    id: 2,
    type: "info",
    title: "High Concurrent Voting Activity",
    description: "23 simultaneous voting sessions detected - within normal parameters",
    timestamp: "5 minutes ago",
    severity: "low",
    resolved: true,
  },
  {
    id: 3,
    type: "success",
    title: "Security Scan Completed",
    description: "Automated security scan completed successfully - no threats detected",
    timestamp: "15 minutes ago",
    severity: "low",
    resolved: true,
  },
]

const deviceCompliance = [
  { device: "Voting Booth #001", status: "secure", lastCheck: "1 min ago", compliance: 100 },
  { device: "Voting Booth #002", status: "secure", lastCheck: "1 min ago", compliance: 100 },
  { device: "Mobile Device #A1B2", status: "secure", lastCheck: "2 min ago", compliance: 98 },
  { device: "Mobile Device #C3D4", status: "warning", lastCheck: "3 min ago", compliance: 85 },
  { device: "Voting Booth #003", status: "secure", lastCheck: "1 min ago", compliance: 100 },
]

export function SecurityMonitoring() {
  const [realTimeData, setRealTimeData] = useState({
    activeConnections: 156,
    encryptedTransactions: 1247,
    securityScore: 98.5,
    lastScan: new Date(),
  })

  // Simulate real-time security updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData((prev) => ({
        ...prev,
        activeConnections: Math.floor(Math.random() * 50) + 120,
        encryptedTransactions: prev.encryptedTransactions + Math.floor(Math.random() * 3),
        securityScore: Math.max(95, Math.min(100, prev.securityScore + (Math.random() - 0.5) * 0.5)),
        lastScan: new Date(),
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-600"
      case "good":
        return "text-blue-600"
      case "warning":
        return "text-yellow-600"
      case "critical":
        return "text-red-600"
      default:
        return "text-gray-600"
    }
  }

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-600" />
      case "error":
        return <XCircle className="h-4 w-4 text-red-600" />
      case "success":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Eye className="h-4 w-4 text-blue-600" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-green-800">System Security Status</h3>
                <p className="text-sm text-green-600">
                  Overall Score: {realTimeData.securityScore.toFixed(1)}% • Last Scan:{" "}
                  {realTimeData.lastScan.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-green-100 text-green-800 border-green-200">
                <Lock className="h-3 w-3 mr-1" />
                All Systems Secure
              </Badge>
              <Button size="sm" variant="outline" className="bg-transparent">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {securityMetrics.map((metric, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <metric.icon className={`h-8 w-8 ${getStatusColor(metric.status)}`} />
                <Badge variant="outline" className={getStatusColor(metric.status)}>
                  {metric.status}
                </Badge>
              </div>
              <div className="space-y-2">
                <h3 className="font-medium text-sm">{metric.name}</h3>
                <div className="text-2xl font-bold">{metric.value}%</div>
                <Progress value={metric.value} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Monitoring */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-primary" />
              Active Connections
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{realTimeData.activeConnections}</div>
              <p className="text-sm text-muted-foreground">Secure connections</p>
              <div className="mt-4 flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-muted-foreground">Live monitoring</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-primary" />
              Encrypted Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{realTimeData.encryptedTransactions}</div>
              <p className="text-sm text-muted-foreground">Total encrypted</p>
              <div className="mt-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  100% Encryption Rate
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-primary" />
              Threat Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600">0</div>
              <p className="text-sm text-muted-foreground">Active threats</p>
              <div className="mt-4">
                <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  All Clear
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Security Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Security Alerts</CardTitle>
          <CardDescription>Recent security events and notifications</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {securityAlerts.map((alert) => (
            <Alert
              key={alert.id}
              className={`${
                alert.type === "warning"
                  ? "border-yellow-200 bg-yellow-50"
                  : alert.type === "error"
                    ? "border-red-200 bg-red-50"
                    : "border-green-200 bg-green-50"
              }`}
            >
              <div className="flex items-start gap-3">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">{alert.title}</h4>
                    <div className="flex items-center gap-2">
                      <Badge
                        variant="outline"
                        className={`text-xs ${
                          alert.severity === "high"
                            ? "border-red-200 text-red-700"
                            : alert.severity === "medium"
                              ? "border-yellow-200 text-yellow-700"
                              : "border-blue-200 text-blue-700"
                        }`}
                      >
                        {alert.severity}
                      </Badge>
                      {alert.resolved && (
                        <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 text-xs">
                          Resolved
                        </Badge>
                      )}
                    </div>
                  </div>
                  <AlertDescription className="mt-1">{alert.description}</AlertDescription>
                  <p className="text-xs text-muted-foreground mt-2">{alert.timestamp}</p>
                </div>
              </div>
            </Alert>
          ))}
        </CardContent>
      </Card>

      {/* Device Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>Device Compliance Monitor</CardTitle>
          <CardDescription>Real-time device security status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deviceCompliance.map((device, index) => (
              <div key={index} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      device.status === "secure"
                        ? "bg-green-500"
                        : device.status === "warning"
                          ? "bg-yellow-500"
                          : "bg-red-500"
                    }`}
                  ></div>
                  <div>
                    <p className="font-medium">{device.device}</p>
                    <p className="text-sm text-muted-foreground">Last check: {device.lastCheck}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-medium">{device.compliance}%</p>
                    <p className="text-xs text-muted-foreground">Compliance</p>
                  </div>
                  <Badge
                    variant="outline"
                    className={
                      device.status === "secure"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : device.status === "warning"
                          ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                          : "bg-red-50 text-red-700 border-red-200"
                    }
                  >
                    {device.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
