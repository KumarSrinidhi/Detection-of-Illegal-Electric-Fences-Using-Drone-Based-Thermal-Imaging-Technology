"use client"

import { useJsApiLoader } from "@react-google-maps/api"
import type { ReactNode } from "react"

const libraries: ("places" | "drawing" | "geometry")[] = ["places", "drawing", "geometry"]

interface MapProviderProps {
  children: ReactNode
}

export function MapProvider({ children }: MapProviderProps) {
  const { isLoaded, loadError } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    libraries,
  })

  if (loadError) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-muted rounded-lg">
        <div className="text-center space-y-2">
          <p className="text-lg font-medium text-destructive">Failed to load Google Maps</p>
          <p className="text-sm text-muted-foreground">Please check your API key configuration</p>
        </div>
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center h-[500px] bg-muted rounded-lg">
        <div className="text-center space-y-2">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
          <p className="text-sm text-muted-foreground">Loading Google Maps...</p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
