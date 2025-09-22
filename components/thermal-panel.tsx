"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Thermometer, Camera, Download, Play, Square, Settings, Target, Palette } from "lucide-react"
import { useState, useEffect } from "react"

export function ThermalPanel() {
  const [isRecording, setIsRecording] = useState(false)
  const [tempRange, setTempRange] = useState([20, 80])
  const [colorPalette, setColorPalette] = useState("ironbow")
  const [isConnected, setIsConnected] = useState(true)
  const [autoRange, setAutoRange] = useState(false)
  const [currentTemp, setCurrentTemp] = useState({ max: 45.2, min: 18.7, avg: 32.1 })
  const [recordingTime, setRecordingTime] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } else {
      setRecordingTime(0)
    }
    return () => clearInterval(interval)
  }, [isRecording])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTemp({
        max: 45.2 + (Math.random() - 0.5) * 5,
        min: 18.7 + (Math.random() - 0.5) * 3,
        avg: 32.1 + (Math.random() - 0.5) * 4,
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleCalibrate = () => {
    console.log("[v0] Calibrating thermal camera")
    // Simulate calibration process
  }

  const handleSnapshot = () => {
    console.log("[v0] Taking thermal snapshot")
    // Capture current thermal frame
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Thermometer className="h-5 w-5" />
            <span>Thermal Camera</span>
          </div>
          <Badge variant={isConnected ? "secondary" : "destructive"} className="text-xs">
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="aspect-video bg-gradient-to-br from-blue-900 via-purple-900 to-red-900 rounded-lg relative overflow-hidden">
          {/* Simulated thermal imagery */}
          <div className="absolute inset-0 opacity-70">
            <div className="w-full h-full relative">
              {/* Hot spots */}
              <div className="absolute top-1/4 left-1/3 w-8 h-8 bg-red-500 rounded-full blur-sm opacity-80"></div>
              <div className="absolute top-2/3 right-1/4 w-6 h-6 bg-yellow-400 rounded-full blur-sm opacity-70"></div>
              <div className="absolute bottom-1/4 left-1/2 w-10 h-10 bg-orange-500 rounded-full blur-md opacity-60"></div>

              {/* Cool areas */}
              <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-blue-400 rounded-full blur-lg opacity-50"></div>
              <div className="absolute bottom-1/3 right-1/3 w-8 h-8 bg-cyan-400 rounded-full blur-sm opacity-60"></div>
            </div>
          </div>

          {/* Temperature Overlay */}
          <div className="absolute top-2 left-2 space-y-1">
            <Badge variant="secondary" className="text-xs bg-black/50 text-white">
              Max: {currentTemp.max.toFixed(1)}°C
            </Badge>
            <Badge variant="secondary" className="text-xs bg-black/50 text-white">
              Min: {currentTemp.min.toFixed(1)}°C
            </Badge>
            <Badge variant="secondary" className="text-xs bg-black/50 text-white">
              Avg: {currentTemp.avg.toFixed(1)}°C
            </Badge>
          </div>

          {/* Recording Indicator */}
          {isRecording && (
            <div className="absolute top-2 right-2 space-y-1">
              <Badge variant="destructive" className="text-xs animate-pulse">
                ● REC {formatTime(recordingTime)}
              </Badge>
            </div>
          )}

          {/* Crosshair for targeting */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <Target className="h-6 w-6 text-white opacity-70" />
          </div>

          {/* Temperature scale */}
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-32 bg-gradient-to-t from-blue-500 via-green-500 via-yellow-500 to-red-500 rounded-full"></div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium flex items-center space-x-2">
            <Palette className="h-4 w-4" />
            <span>Color Palette</span>
          </label>
          <Select value={colorPalette} onValueChange={setColorPalette}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ironbow">Ironbow</SelectItem>
              <SelectItem value="rainbow">Rainbow</SelectItem>
              <SelectItem value="grayscale">Grayscale</SelectItem>
              <SelectItem value="hot">Hot</SelectItem>
              <SelectItem value="cool">Cool</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Temperature Range</label>
            <div className="flex items-center space-x-2">
              <Switch checked={autoRange} onCheckedChange={setAutoRange} id="auto-range" />
              <label htmlFor="auto-range" className="text-xs text-muted-foreground">
                Auto
              </label>
            </div>
          </div>
          <Slider
            value={tempRange}
            onValueChange={setTempRange}
            max={150}
            min={-20}
            step={1}
            className="w-full"
            disabled={autoRange}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{tempRange[0]}°C</span>
            <span>{tempRange[1]}°C</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant={isRecording ? "destructive" : "default"}
            size="sm"
            onClick={() => setIsRecording(!isRecording)}
          >
            {isRecording ? (
              <>
                <Square className="h-4 w-4 mr-2" />
                Stop
              </>
            ) : (
              <>
                <Play className="h-4 w-4 mr-2" />
                Record
              </>
            )}
          </Button>

          <Button variant="outline" size="sm" onClick={handleSnapshot}>
            <Camera className="h-4 w-4 mr-2" />
            Snapshot
          </Button>

          <Button variant="outline" size="sm" onClick={handleCalibrate}>
            <Settings className="h-4 w-4 mr-2" />
            Calibrate
          </Button>

          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>

        <div className="pt-2 border-t space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span>Resolution:</span>
            <Badge variant="outline" className="text-xs">
              640x480
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Frame Rate:</span>
            <Badge variant="outline" className="text-xs">
              30 FPS
            </Badge>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span>Accuracy:</span>
            <Badge variant="outline" className="text-xs">
              ±2°C
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
