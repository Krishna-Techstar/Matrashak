"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { FileText, Download, CalendarIcon, BarChart3, Users, Shield, Clock } from "lucide-react"
import { format } from "date-fns"

const reportTypes = [
  {
    id: "election-results",
    name: "Election Results Report",
    description: "Complete voting results with candidate performance",
    icon: BarChart3,
    formats: ["PDF", "CSV", "Excel"],
    estimatedTime: "2-3 minutes",
  },
  {
    id: "voter-turnout",
    name: "Voter Turnout Analysis",
    description: "Detailed turnout statistics and demographics",
    icon: Users,
    formats: ["PDF", "CSV"],
    estimatedTime: "1-2 minutes",
  },
  {
    id: "security-audit",
    name: "Security Audit Report",
    description: "Comprehensive security events and compliance",
    icon: Shield,
    formats: ["PDF"],
    estimatedTime: "3-5 minutes",
  },
  {
    id: "activity-log",
    name: "System Activity Log",
    description: "Detailed log of all system activities",
    icon: Clock,
    formats: ["CSV", "JSON"],
    estimatedTime: "1 minute",
  },
]

const recentReports = [
  {
    id: "RPT-001",
    name: "Election Results - Final",
    type: "election-results",
    format: "PDF",
    size: "2.4 MB",
    generated: "2024-01-15 15:30",
    status: "completed",
  },
  {
    id: "RPT-002",
    name: "Hourly Turnout Analysis",
    type: "voter-turnout",
    format: "CSV",
    size: "156 KB",
    generated: "2024-01-15 15:00",
    status: "completed",
  },
  {
    id: "RPT-003",
    name: "Security Audit - Daily",
    type: "security-audit",
    format: "PDF",
    size: "1.8 MB",
    generated: "2024-01-15 14:00",
    status: "completed",
  },
]

export function ReportsGeneration() {
  const [selectedReport, setSelectedReport] = useState("")
  const [selectedFormat, setSelectedFormat] = useState("")
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [includeEncryption, setIncludeEncryption] = useState(true)
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)

  const handleGenerateReport = () => {
    if (!selectedReport || !selectedFormat) return

    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate report generation
    const interval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsGenerating(false)
          console.log("[v0] Report generated:", { selectedReport, selectedFormat, dateRange })
          return 100
        }
        return prev + 10
      })
    }, 300)
  }

  const downloadReport = (reportId: string) => {
    console.log("[v0] Downloading report:", reportId)
    // TODO: Implement actual download
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
      case "generating":
        return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Generating</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800 border-red-200">Failed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="space-y-6">
      {/* Report Generation */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-primary" />
            Generate New Report
          </CardTitle>
          <CardDescription>Create custom reports with encrypted data protection</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Report Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTypes.map((report) => (
              <div
                key={report.id}
                className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                  selectedReport === report.id ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                }`}
                onClick={() => setSelectedReport(report.id)}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <report.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{report.name}</h3>
                    <p className="text-sm text-muted-foreground mb-2">{report.description}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {report.estimatedTime}
                      </Badge>
                      <div className="flex gap-1">
                        {report.formats.map((format) => (
                          <Badge key={format} variant="secondary" className="text-xs">
                            {format}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Configuration Options */}
          {selectedReport && (
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-medium">Report Configuration</h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Output Format</label>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select format" />
                    </SelectTrigger>
                    <SelectContent>
                      {reportTypes
                        .find((r) => r.id === selectedReport)
                        ?.formats.map((format) => (
                          <SelectItem key={format} value={format.toLowerCase()}>
                            {format}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Date Range</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {dateRange.from ? (
                          dateRange.to ? (
                            <>
                              {format(dateRange.from, "LLL dd, y")} - {format(dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={dateRange.from}
                        selected={dateRange}
                        onSelect={setDateRange}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="encryption" checked={includeEncryption} onCheckedChange={setIncludeEncryption} />
                <label htmlFor="encryption" className="text-sm font-medium">
                  Apply additional encryption to sensitive data
                </label>
              </div>

              {isGenerating && (
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Generating report...</span>
                    <span className="text-sm text-muted-foreground">{generationProgress}%</span>
                  </div>
                  <Progress value={generationProgress} className="h-2" />
                </div>
              )}

              <Button onClick={handleGenerateReport} disabled={!selectedFormat || isGenerating} className="w-full">
                {isGenerating ? "Generating..." : "Generate Report"}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Reports */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Reports</CardTitle>
          <CardDescription>Previously generated reports available for download</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentReports.map((report) => (
              <div key={report.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <FileText className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{report.name}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {report.format}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{report.size}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{report.generated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusBadge(report.status)}
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => downloadReport(report.id)}
                    className="bg-transparent"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Report Templates */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Report Templates</CardTitle>
          <CardDescription>Pre-configured reports for common use cases</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <BarChart3 className="h-6 w-6 text-primary mb-2" />
              <div className="text-left">
                <p className="font-medium">Real-time Results</p>
                <p className="text-xs text-muted-foreground">Current election status</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <Users className="h-6 w-6 text-primary mb-2" />
              <div className="text-left">
                <p className="font-medium">Turnout Summary</p>
                <p className="text-xs text-muted-foreground">Participation overview</p>
              </div>
            </Button>
            <Button variant="outline" className="h-auto p-4 flex flex-col items-start bg-transparent">
              <Shield className="h-6 w-6 text-primary mb-2" />
              <div className="text-left">
                <p className="font-medium">Security Status</p>
                <p className="text-xs text-muted-foreground">System integrity report</p>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
