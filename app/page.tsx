import { DashboardHeader } from "@/components/dashboard-header"
import { StatusPanel } from "@/components/status-panel"
import { MapContainer } from "@/components/map-container"
import { ThermalPanel } from "@/components/thermal-panel"
import { DroneControls } from "@/components/drone-controls"
import { DataVisualization } from "@/components/data-visualization"

export default function DroneThermalDashboard() {
  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />

      <main className="container mx-auto p-6 space-y-6">
        {/* Status Overview */}
        <StatusPanel />

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Map Section - Takes up 2 columns on large screens */}
          <div className="lg:col-span-2">
            <MapContainer />
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <ThermalPanel />
            <DroneControls />
          </div>
        </div>

        {/* Data Visualization */}
        <DataVisualization />
      </main>
    </div>
  )
}
