import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Bone as Drone, MapPin, Settings } from "lucide-react"

export function DashboardHeader() {
  return (
    <header className="border-b bg-card">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-primary rounded-lg">
                <Drone className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">ThermalMap Pro</h1>
                <p className="text-sm text-muted-foreground">Drone Thermal Imaging Platform</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>System Online</span>
            </Badge>

            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4 mr-2" />
              Settings
            </Button>

            <Button className="bg-primary hover:bg-primary/90">
              <MapPin className="h-4 w-4 mr-2" />
              Start Mission
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
