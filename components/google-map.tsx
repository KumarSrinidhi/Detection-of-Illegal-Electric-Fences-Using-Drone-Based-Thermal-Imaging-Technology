"use client"

import { GoogleMap, Marker, Polygon, HeatmapLayer } from "@react-google-maps/api"
import { useState, useCallback } from "react"
import * as google from "google.maps"

const mapContainerStyle = {
  width: "100%",
  height: "500px",
}

// Default center (San Francisco for demo)
const center = {
  lat: 37.7749,
  lng: -122.4194,
}

// Sample thermal data points for heatmap
const heatmapData = [
  new google.maps.LatLng(37.7749, -122.4194),
  new google.maps.LatLng(37.7849, -122.4094),
  new google.maps.LatLng(37.7649, -122.4294),
  new google.maps.LatLng(37.7549, -122.4394),
  new google.maps.LatLng(37.7949, -122.3994),
]

// Sample flight path
const flightPath = [
  { lat: 37.7749, lng: -122.4194 },
  { lat: 37.7849, lng: -122.4094 },
  { lat: 37.7949, lng: -122.3994 },
  { lat: 37.7849, lng: -122.3894 },
  { lat: 37.7749, lng: -122.3794 },
]

interface GoogleMapComponentProps {
  mapType: "satellite" | "thermal" | "hybrid"
  dronePosition: { lat: number; lng: number }
  onMapClick?: (event: google.maps.MapMouseEvent) => void
}

export function GoogleMapComponent({ mapType, dronePosition, onMapClick }: GoogleMapComponentProps) {
  const [map, setMap] = useState<google.maps.Map | null>(null)

  const onLoad = useCallback((map: google.maps.Map) => {
    setMap(map)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  const getMapTypeId = () => {
    switch (mapType) {
      case "satellite":
        return "satellite"
      case "hybrid":
        return "hybrid"
      default:
        return "roadmap"
    }
  }

  const mapOptions: google.maps.MapOptions = {
    zoom: 15,
    center: dronePosition,
    mapTypeId: getMapTypeId(),
    disableDefaultUI: true,
    zoomControl: false,
    mapTypeControl: false,
    scaleControl: true,
    streetViewControl: false,
    rotateControl: false,
    fullscreenControl: false,
  }

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      options={mapOptions}
      onLoad={onLoad}
      onUnmount={onUnmount}
      onClick={onMapClick}
    >
      {/* Drone Position Marker */}
      <Marker
        position={dronePosition}
        icon={{
          path: google.maps.SymbolPath.CIRCLE,
          scale: 8,
          fillColor: "hsl(var(--primary))",
          fillOpacity: 1,
          strokeColor: "white",
          strokeWeight: 2,
        }}
        title="Drone Position"
      />

      {/* Flight Path */}
      <Polygon
        paths={flightPath}
        options={{
          fillColor: "hsl(var(--primary))",
          fillOpacity: 0.1,
          strokeColor: "hsl(var(--primary))",
          strokeOpacity: 0.8,
          strokeWeight: 2,
        }}
      />

      {/* Thermal Heatmap - only show in thermal or hybrid mode */}
      {(mapType === "thermal" || mapType === "hybrid") && (
        <HeatmapLayer
          data={heatmapData}
          options={{
            radius: 50,
            opacity: 0.6,
            gradient: [
              "rgba(0, 255, 255, 0)",
              "rgba(0, 255, 255, 1)",
              "rgba(0, 191, 255, 1)",
              "rgba(0, 127, 255, 1)",
              "rgba(0, 63, 255, 1)",
              "rgba(0, 0, 255, 1)",
              "rgba(0, 0, 223, 1)",
              "rgba(0, 0, 191, 1)",
              "rgba(0, 0, 159, 1)",
              "rgba(0, 0, 127, 1)",
              "rgba(63, 0, 91, 1)",
              "rgba(127, 0, 63, 1)",
              "rgba(191, 0, 31, 1)",
              "rgba(255, 0, 0, 1)",
            ],
          }}
        />
      )}

      {/* Sample Hotspot Markers */}
      {flightPath.map((position, index) => (
        <Marker
          key={index}
          position={position}
          icon={{
            path: google.maps.SymbolPath.CIRCLE,
            scale: 4,
            fillColor: "#ff4444",
            fillOpacity: 0.8,
            strokeColor: "white",
            strokeWeight: 1,
          }}
          title={`Hotspot ${index + 1}`}
        />
      ))}
    </GoogleMap>
  )
}
