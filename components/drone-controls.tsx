"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Progress } from "@/components/ui/progress"
import {
  Bone as Drone,
  ArrowUp,
  ArrowDown,
  RotateCw,
  Home,
  AlertTriangle,
  Wifi,
  WifiOff,
  Battery,
  Navigation,
  Wind,
  Compass,
  Gauge,
} from "lucide-react"
import { useState, useEffect } from "react"

export function DroneControls() {
  const [altitude, setAltitude] = useState([50])
  const [speed, setSpeed] = useState([15])
  const [isConnected, setIsConnected] = useState(true)
  const [connectionType, setConnectionType] = useState("wifi")
  const [flightMode, setFlightMode] = useState("manual")
  const [autoHover, setAutoHover] = useState(true)
  const [telemetry, setTelemetry] = useState({
    battery: 87,
    signal: 85,
    gps: 12,
    heading: 245,
    windSpeed: 3.2,
    temperature: 22,
    flightTime: 1247,
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setTelemetry((prev) => ({
        ...prev,
        battery: Math.max(0, prev.battery - 0.1),
        signal: 80 + Math.random() * 20,
        heading: (prev.heading + Math.random() * 10 - 5) % 360,
        windSpeed: Math.max(0, 3.2 + (Math.random() - 0.5) * 2),
        flightTime: prev.flightTime + 1,
      }))
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const handleConnect = () => {
    console.log("[v0] Connecting to drone...")
    setIsConnected(!isConnected)
  }

  const handleTakeoff = () => {
    console.log("[v0] Initiating takeoff sequence")
  }

  const handleLand = () => {
    console.log("[v0] Initiating landing sequence")
  }

  const handleEmergencyStop = () => {
    console.log("[v0] EMERGENCY STOP ACTIVATED")
  }

  const formatFlightTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Drone className="h-5 w-5" />
            <span>Drone Connection</span>
          </div>
          <Badge variant={isConnected ? "secondary" : "destructive"} className="text-xs">
            {isConnected ? (
              <div className="flex items-center space-x-1">
                <Wifi className="h-3 w-3" />
                <span>Connected</span>
              </div>
            ) : (
              <div className="flex items-center space-x-1">
                <WifiOff className="h-3 w-3" />
                <span>Disconnected</span>
              </div>
            )}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Connection Settings */}
        <div className="space-y-2">
          <label className="text-sm font-medium">Connection Type</label>
          <Select value={connectionType} onValueChange={setConnectionType}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="wifi">WiFi Direct</SelectItem>
              <SelectItem value="radio">Radio Control</SelectItem>
              <SelectItem value="cellular">Cellular (4G/5G)</SelectItem>
              <SelectItem value="satellite">Satellite Link</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Connection Button */}
        <Button onClick={handleConnect} variant={isConnected ? "outline" : "default"} className="w-full">
          {isConnected ? "Disconnect" : "Connect to Drone"}
        </Button>

        {isConnected && (
          <>
            {/* Telemetry Data */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t">
              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Battery className="h-3 w-3" />
                  <span className="text-xs font-medium">Battery</span>
                </div>
                <Progress value={telemetry.battery} className="h-2" />
                <span className="text-xs text-muted-foreground">{telemetry.battery.toFixed(1)}%</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Wifi className="h-3 w-3" />
                  <span className="text-xs font-medium">Signal</span>
                </div>
                <Progress value={telemetry.signal} className="h-2" />
                <span className="text-xs text-muted-foreground">{telemetry.signal.toFixed(0)}%</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Navigation className="h-3 w-3" />
                  <span className="text-xs font-medium">GPS Sats</span>
                </div>
                <Badge variant="outline" className="text-xs w-full justify-center">
                  {telemetry.gps}
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Compass className="h-3 w-3" />
                  <span className="text-xs font-medium">Heading</span>
                </div>
                <Badge variant="outline" className="text-xs w-full justify-center">
                  {telemetry.heading.toFixed(0)}°
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Wind className="h-3 w-3" />
                  <span className="text-xs font-medium">Wind</span>
                </div>
                <Badge variant="outline" className="text-xs w-full justify-center">
                  {telemetry.windSpeed.toFixed(1)} m/s
                </Badge>
              </div>

              <div className="space-y-1">
                <div className="flex items-center space-x-1">
                  <Gauge className="h-3 w-3" />
                  <span className="text-xs font-medium">Flight Time</span>
                </div>
                <Badge variant="outline" className="text-xs w-full justify-center">
                  {formatFlightTime(telemetry.flightTime)}
                </Badge>
              </div>
            </div>

            {/* Flight Mode */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Flight Mode</label>
              <Select value={flightMode} onValueChange={setFlightMode}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="manual">Manual Control</SelectItem>
                  <SelectItem value="stabilize">Stabilize</SelectItem>
                  <SelectItem value="altitude">Altitude Hold</SelectItem>
                  <SelectItem value="position">Position Hold</SelectItem>
                  <SelectItem value="auto">Auto Mission</SelectItem>
                  <SelectItem value="rtl">Return to Launch</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Auto Hover Toggle */}
            <div className="flex items-center justify-between">
              <label htmlFor="auto-hover" className="text-sm font-medium">
                Auto Hover
              </label>
              <Switch id="auto-hover" checked={autoHover} onCheckedChange={setAutoHover} />
            </div>

            {/* Altitude Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Target Altitude</label>
                <span className="text-sm text-muted-foreground">{altitude[0]}m</span>
              </div>
              <Slider value={altitude} onValueChange={setAltitude} max={120} min={5} step={5} className="w-full" />
            </div>

            {/* Speed Control */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Max Speed</label>
                <span className="text-sm text-muted-foreground">{speed[0]} m/s</span>
              </div>
              <Slider value={speed} onValueChange={setSpeed} max={25} min={1} step={1} className="w-full" />
            </div>

            {/* Flight Controls */}
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <Button variant="default" size="sm" onClick={handleTakeoff}>
                  <ArrowUp className="h-4 w-4 mr-2" />
                  Takeoff
                </Button>
                <Button variant="outline" size="sm" onClick={handleLand}>
                  <ArrowDown className="h-4 w-4 mr-2" />
                  Land
                </Button>
                <Button variant="outline" size="sm">
                  <RotateCw className="h-4 w-4 mr-2" />
                  Rotate
                </Button>
                <Button variant="outline" size="sm">
                  <Home className="h-4 w-4 mr-2" />
                  Return
                </Button>
              </div>
            </div>

            {/* Emergency Controls */}
            <div className="pt-2 border-t">
              <Button variant="destructive" size="sm" className="w-full" onClick={handleEmergencyStop}>
                <AlertTriangle className="h-4 w-4 mr-2" />
                Emergency Stop
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
