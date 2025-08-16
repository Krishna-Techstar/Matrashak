"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { TrendingUp, Users, Vote, Clock } from "lucide-react"

const candidateData = [
  { name: "Sarah Johnson", votes: 387, percentage: 31.0, color: "#0891b2" },
  { name: "Michael Chen", votes: 324, percentage: 26.0, color: "#f59e0b" },
  { name: "Emily Rodriguez", votes: 298, percentage: 23.9, color: "#10b981" },
  { name: "David Thompson", votes: 238, percentage: 19.1, color: "#8b5cf6" },
]

const hourlyData = [
  { hour: "08:00", votes: 45 },
  { hour: "09:00", votes: 78 },
  { hour: "10:00", votes: 123 },
  { hour: "11:00", votes: 156 },
  { hour: "12:00", votes: 189 },
  { hour: "13:00", votes: 234 },
  { hour: "14:00", votes: 267 },
  { hour: "15:00", votes: 298 },
]

const demographicData = [
  { category: "18-25", votes: 312, color: "#0891b2" },
  { category: "26-35", votes: 445, color: "#f59e0b" },
  { category: "36-50", votes: 298, color: "#10b981" },
  { category: "50+", votes: 192, color: "#8b5cf6" },
]

export function LiveAnalytics() {
  const [liveData, setLiveData] = useState({
    totalVotes: 1247,
    turnoutRate: 68.3,
    activeVoters: 23,
    lastUpdate: new Date(),
  })

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData((prev) => ({
        ...prev,
        totalVotes: prev.totalVotes + Math.floor(Math.random() * 3),
        turnoutRate: Math.min(100, prev.turnoutRate + Math.random() * 0.1),
        activeVoters: Math.floor(Math.random() * 30) + 10,
        lastUpdate: new Date(),
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      {/* Real-time Status */}
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <div>
                <h3 className="font-semibold">Live Election Monitoring</h3>
                <p className="text-sm text-muted-foreground">
                  Last updated: {liveData.lastUpdate.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                <Users className="h-3 w-3 mr-1" />
                {liveData.activeVoters} Active Voters
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Candidate Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Vote className="h-5 w-5 text-primary" />
              Candidate Performance
            </CardTitle>
            <CardDescription>Real-time vote distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {candidateData.map((candidate, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{candidate.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{candidate.votes} votes</span>
                      <Badge variant="outline" style={{ color: candidate.color, borderColor: candidate.color }}>
                        {candidate.percentage}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={candidate.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Voting Trends */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Voting Trends
            </CardTitle>
            <CardDescription>Hourly voting activity</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="votes" stroke="#0891b2" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Demographics Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Voter Demographics</CardTitle>
            <CardDescription>Age group distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={demographicData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="votes"
                  label={({ category, votes }) => `${category}: ${votes}`}
                >
                  {demographicData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Turnout Progress */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Turnout Progress
            </CardTitle>
            <CardDescription>Voter participation tracking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary">{liveData.turnoutRate.toFixed(1)}%</div>
              <p className="text-sm text-muted-foreground">Current Turnout</p>
            </div>

            <Progress value={liveData.turnoutRate} className="h-3" />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <p className="font-medium">{liveData.totalVotes}</p>
                <p className="text-muted-foreground">Votes Cast</p>
              </div>
              <div className="text-center">
                <p className="font-medium">1,825</p>
                <p className="text-muted-foreground">Total Eligible</p>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Target: 75%</span>
                <span>Remaining: {(75 - liveData.turnoutRate).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Feed */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Live election events and notifications</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { time: "2 min ago", event: "Batch verification completed", type: "success", count: "45 votes" },
              { time: "5 min ago", event: "High voting activity detected", type: "info", count: "Peak: 23 concurrent" },
              { time: "8 min ago", event: "QR verification timeout", type: "warning", count: "User: VT-ABC123" },
              { time: "12 min ago", event: "New voter registered", type: "success", count: "Total: 1,826" },
              { time: "15 min ago", event: "System backup completed", type: "success", count: "All data secured" },
            ].map((activity, index) => (
              <div key={index} className="flex items-center gap-4 p-3 rounded-lg bg-muted/50">
                <div
                  className={`w-2 h-2 rounded-full ${
                    activity.type === "success"
                      ? "bg-green-500"
                      : activity.type === "warning"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }`}
                ></div>
                <div className="flex-1">
                  <p className="text-sm font-medium">{activity.event}</p>
                  <p className="text-xs text-muted-foreground">{activity.count}</p>
                </div>
                <span className="text-xs text-muted-foreground">{activity.time}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
