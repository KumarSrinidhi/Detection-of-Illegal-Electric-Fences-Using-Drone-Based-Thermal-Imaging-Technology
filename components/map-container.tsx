"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapIcon, Layers, ZoomIn, ZoomOut, RotateCcw, MapPin } from "lucide-react"
import { useState } from "react"
import { MapProvider } from "./map-provider"
import { GoogleMapComponent } from "./google-map"
import type { google } from "google-maps"

export function MapContainer() {
  const [mapType, setMapType] = useState<"satellite" | "thermal" | "hybrid">("satellite")
  const [dronePosition, setDronePosition] = useState({ lat: 37.7749, lng: -122.4194 })

  const handleMapClick = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat()
      const lng = event.latLng.lng()
      console.log("[v0] Map clicked at:", { lat, lng })
      // You could set waypoints or update drone target position here
    }
  }

  const handleZoomIn = () => {
    console.log("[v0] Zoom in requested")
    // Map zoom will be handled by the map component
  }

  const handleZoomOut = () => {
    console.log("[v0] Zoom out requested")
    // Map zoom will be handled by the map component
  }

  const handleResetView = () => {
    console.log("[v0] Reset view requested")
    setDronePosition({ lat: 37.7749, lng: -122.4194 })
  }

  return (
    <Card className="h-[600px]">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center space-x-2">
            <MapIcon className="h-5 w-5" />
            <span>Mission Map</span>
          </CardTitle>

          <div className="flex items-center space-x-2">
            <Badge variant={mapType === "satellite" ? "default" : "outline"}>
              <Button variant="ghost" size="sm" className="h-auto p-1" onClick={() => setMapType("satellite")}>
                Satellite
              </Button>
            </Badge>
            <Badge variant={mapType === "thermal" ? "default" : "outline"}>
              <Button variant="ghost" size="sm" className="h-auto p-1" onClick={() => setMapType("thermal")}>
                Thermal
              </Button>
            </Badge>
            <Badge variant={mapType === "hybrid" ? "default" : "outline"}>
              <Button variant="ghost" size="sm" className="h-auto p-1" onClick={() => setMapType("hybrid")}>
                Hybrid
              </Button>
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-0 relative">
        <div className="h-[500px] rounded-b-lg relative overflow-hidden">
          <MapProvider>
            <GoogleMapComponent mapType={mapType} dronePosition={dronePosition} onMapClick={handleMapClick} />
          </MapProvider>

          {/* Map Controls */}
          <div className="absolute top-4 right-4 flex flex-col space-y-2">
            <Button size="sm" variant="secondary" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary" onClick={handleResetView}>
              <RotateCcw className="h-4 w-4" />
            </Button>
            <Button size="sm" variant="secondary">
              <Layers className="h-4 w-4" />
            </Button>
          </div>

          {/* Coordinates Display */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur-sm rounded-lg p-2 text-xs">
            <div className="flex items-center space-x-2">
              <MapPin className="h-3 w-3" />
              <span>
                {dronePosition.lat.toFixed(6)}, {dronePosition.lng.toFixed(6)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
