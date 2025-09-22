"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts"
import { TrendingUp, Activity, Database, Download, RefreshCw, PieChartIcon, Target, CheckCircle } from "lucide-react"
import { useState, useEffect } from "react"

const generateTemperatureData = () => {
  const now = new Date()
  return Array.from({ length: 20 }, (_, i) => {
    const time = new Date(now.getTime() - (19 - i) * 60000)
    return {
      time: time.toLocaleTimeString("en-US", { hour12: false, hour: "2-digit", minute: "2-digit" }),
      temp: 25 + Math.sin(i * 0.3) * 8 + Math.random() * 4,
      humidity: 60 + Math.cos(i * 0.2) * 15 + Math.random() * 5,
      windSpeed: 2 + Math.random() * 6,
      pressure: 1013 + Math.sin(i * 0.1) * 10 + Math.random() * 3,
    }
  })
}

const hotspotData = [
  { area: "Industrial Zone", count: 18, avgTemp: 65.2, severity: "high", risk: 85 },
  { area: "Residential Area", count: 5, avgTemp: 28.7, severity: "low", risk: 15 },
  { area: "Commercial District", count: 12, avgTemp: 45.1, severity: "medium", risk: 55 },
  { area: "Forest Sector", count: 3, avgTemp: 22.4, severity: "low", risk: 10 },
  { area: "Power Plant", count: 25, avgTemp: 78.8, severity: "critical", risk: 95 },
  { area: "Warehouse Complex", count: 8, avgTemp: 38.9, severity: "medium", risk: 40 },
]

const thermalDistribution = [
  { name: "Normal (0-30°C)", value: 45, color: "#3b82f6" },
  { name: "Elevated (30-50°C)", value: 30, color: "#f59e0b" },
  { name: "High (50-70°C)", value: 20, color: "#ef4444" },
  { name: "Critical (>70°C)", value: 5, color: "#dc2626" },
]

const missionMetrics = [
  { metric: "Coverage", value: 95, max: 100 },
  { metric: "Accuracy", value: 88, max: 100 },
  { metric: "Detection", value: 92, max: 100 },
  { metric: "Efficiency", value: 85, max: 100 },
  { metric: "Safety", value: 98, max: 100 },
]

export function DataVisualization() {
  const [temperatureData, setTemperatureData] = useState(generateTemperatureData())
  const [timeRange, setTimeRange] = useState("1h")
  const [chartType, setChartType] = useState("line")
  const [isLiveUpdate, setIsLiveUpdate] = useState(true)
  const [missionStats, setMissionStats] = useState({
    areaCovered: 3.7,
    imagesCaptured: 2156,
    hotspotsDetected: 71,
    missionSuccess: 94.2,
    flightTime: 2847,
    dataProcessed: 1.2,
  })

  useEffect(() => {
    if (!isLiveUpdate) return

    const interval = setInterval(() => {
      setTemperatureData(generateTemperatureData())
      setMissionStats((prev) => ({
        ...prev,
        areaCovered: prev.areaCovered + Math.random() * 0.1,
        imagesCaptured: prev.imagesCaptured + Math.floor(Math.random() * 10),
        hotspotsDetected: prev.hotspotsDetected + Math.floor(Math.random() * 3),
        flightTime: prev.flightTime + 30,
        dataProcessed: prev.dataProcessed + Math.random() * 0.05,
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [isLiveUpdate])

  const handleExportData = () => {
    console.log("[v0] Exporting thermal mapping data...")
  }

  const handleRefreshData = () => {
    console.log("[v0] Refreshing data visualization...")
    setTemperatureData(generateTemperatureData())
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-red-500"
      case "high":
        return "bg-orange-500"
      case "medium":
        return "bg-yellow-500"
      case "low":
        return "bg-green-500"
      default:
        return "bg-gray-500"
    }
  }

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="15m">Last 15min</SelectItem>
              <SelectItem value="1h">Last Hour</SelectItem>
              <SelectItem value="6h">Last 6 Hours</SelectItem>
              <SelectItem value="24h">Last 24 Hours</SelectItem>
            </SelectContent>
          </Select>

          <Select value={chartType} onValueChange={setChartType}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="line">Line Chart</SelectItem>
              <SelectItem value="area">Area Chart</SelectItem>
              <SelectItem value="bar">Bar Chart</SelectItem>
            </SelectContent>
          </Select>

          <Badge
            variant={isLiveUpdate ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setIsLiveUpdate(!isLiveUpdate)}
          >
            {isLiveUpdate ? "Live" : "Paused"}
          </Badge>
        </div>

        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" onClick={handleRefreshData}>
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm" onClick={handleExportData}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Main Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Environmental Data Chart */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Environmental Data</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {chartType === "line" && (
                <LineChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="temp"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="Temperature (°C)"
                  />
                  <Line
                    type="monotone"
                    dataKey="humidity"
                    stroke="hsl(var(--chart-3))"
                    strokeWidth={2}
                    name="Humidity (%)"
                  />
                  <Line
                    type="monotone"
                    dataKey="windSpeed"
                    stroke="hsl(var(--chart-4))"
                    strokeWidth={2}
                    name="Wind Speed (m/s)"
                  />
                </LineChart>
              )}
              {chartType === "area" && (
                <AreaChart data={temperatureData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="temp"
                    stackId="1"
                    stroke="hsl(var(--chart-2))"
                    fill="hsl(var(--chart-2))"
                    fillOpacity={0.6}
                    name="Temperature (°C)"
                  />
                  <Area
                    type="monotone"
                    dataKey="humidity"
                    stackId="2"
                    stroke="hsl(var(--chart-3))"
                    fill="hsl(var(--chart-3))"
                    fillOpacity={0.6}
                    name="Humidity (%)"
                  />
                </AreaChart>
              )}
              {chartType === "bar" && (
                <BarChart data={temperatureData.slice(-6)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="temp" fill="hsl(var(--chart-2))" name="Temperature (°C)" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Thermal Hotspots Analysis */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Thermal Hotspots by Zone</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {hotspotData.map((zone, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(zone.severity)}`}></div>
                    <div>
                      <div className="font-medium text-sm">{zone.area}</div>
                      <div className="text-xs text-muted-foreground">{zone.count} hotspots detected</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">{zone.avgTemp.toFixed(1)}°C</div>
                    <Badge
                      variant={
                        zone.severity === "critical"
                          ? "destructive"
                          : zone.severity === "high"
                            ? "secondary"
                            : "outline"
                      }
                      className="text-xs"
                    >
                      {zone.severity}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Temperature Distribution */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5" />
              <span>Temperature Distribution</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={thermalDistribution}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                >
                  {thermalDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Mission Performance Radar */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="h-5 w-5" />
              <span>Mission Performance</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={missionMetrics}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis angle={90} domain={[0, 100]} />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Mission Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Database className="h-5 w-5" />
              <span>Mission Analytics Dashboard</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="flex items-center space-x-1">
                <CheckCircle className="h-3 w-3 text-green-500" />
                <span>Mission Active</span>
              </Badge>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center space-y-2 p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{missionStats.areaCovered.toFixed(1)} km²</div>
              <div className="text-sm text-muted-foreground">Area Covered</div>
              <Badge variant="outline" className="text-xs">
                +12% vs target
              </Badge>
            </div>
            <div className="text-center space-y-2 p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{missionStats.imagesCaptured.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Images Captured</div>
              <Badge variant="outline" className="text-xs">
                HD Quality
              </Badge>
            </div>
            <div className="text-center space-y-2 p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{missionStats.hotspotsDetected}</div>
              <div className="text-sm text-muted-foreground">Hotspots Detected</div>
              <Badge variant="secondary" className="text-xs">
                5 Critical
              </Badge>
            </div>
            <div className="text-center space-y-2 p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{missionStats.missionSuccess.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Mission Success</div>
              <Badge variant="outline" className="text-xs">
                Excellent
              </Badge>
            </div>
            <div className="text-center space-y-2 p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {Math.floor(missionStats.flightTime / 60)}:{(missionStats.flightTime % 60).toString().padStart(2, "0")}
              </div>
              <div className="text-sm text-muted-foreground">Flight Time</div>
              <Badge variant="outline" className="text-xs">
                Optimal
              </Badge>
            </div>
            <div className="text-center space-y-2 p-4 bg-muted rounded-lg">
              <div className="text-2xl font-bold text-primary">{missionStats.dataProcessed.toFixed(1)} GB</div>
              <div className="text-sm text-muted-foreground">Data Processed</div>
              <Badge variant="outline" className="text-xs">
                Real-time
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
