"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { BarChart3, Users, Shield, FileText, AlertTriangle, Database, Cpu, Info } from "lucide-react"
import { LiveAnalytics } from "./admin/live-analytics"
import { UserManagement } from "./admin/user-management"
import { SecurityMonitoring } from "./admin/security-monitoring"
import { ReportsGeneration } from "./admin/reports-generation"

export function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("analytics")

  return (
    <div className="container mx-auto px-4 py-8">
      <Alert className="mb-6 border-green-200 bg-green-50">
        <Info className="h-4 w-4 text-green-600" />
        <AlertDescription className="text-green-800">
          <div className="flex items-center gap-2">
            <Database className="h-4 w-4" />
            <span>
              <strong>System Architecture Demo:</strong> This dashboard showcases the comprehensive backend
              infrastructure including AWS hosting, blockchain ledger, AI fraud detection, and real-time analytics as
              detailed in our system architecture diagrams.
            </span>
          </div>
        </AlertDescription>
      </Alert>

      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
            <p className="text-muted-foreground">Matrakṣhak Election Management System - Full Architecture Preview</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
              <Shield className="h-3 w-3 mr-1" />
              System Secure
            </Badge>
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
              Election Active
            </Badge>
            <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-200">
              <Cpu className="h-3 w-3 mr-1" />
              AI Monitoring
            </Badge>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Votes</p>
                <p className="text-2xl font-bold">1,247</p>
              </div>
              <BarChart3 className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">+12% from last hour</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Voter Turnout</p>
                <p className="text-2xl font-bold">68.3%</p>
              </div>
              <Users className="h-8 w-8 text-primary" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">1,247 of 1,825 voters</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Security Alerts</p>
                <p className="text-2xl font-bold">3</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">2 resolved, 1 pending</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">System Status</p>
                <p className="text-2xl font-bold text-green-600">Online</p>
              </div>
              <Shield className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-muted-foreground mt-2">All systems operational</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="users" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Users
          </TabsTrigger>
          <TabsTrigger value="security" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Security
          </TabsTrigger>
          <TabsTrigger value="reports" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Reports
          </TabsTrigger>
        </TabsList>

        <TabsContent value="analytics">
          <LiveAnalytics />
        </TabsContent>

        <TabsContent value="users">
          <UserManagement />
        </TabsContent>

        <TabsContent value="security">
          <SecurityMonitoring />
        </TabsContent>

        <TabsContent value="reports">
          <ReportsGeneration />
        </TabsContent>
      </Tabs>
    </div>
  )
}
