import { Plus, Home, List, Settings } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function HomeInventoryApp() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
        <h1 className="text-xl font-bold">My Inventory</h1>
        <Button size="icon" variant="ghost">
          <Plus className="h-6 w-6" />
        </Button>
      </header>

      {/* Search and Filter */}
      <div className="p-4 flex gap-2">
        <Input type="search" placeholder="Search items..." className="flex-grow" />
        <Button variant="outline">Filter</Button>
      </div>

      {/* Item List */}
      <div className="flex-grow overflow-auto p-4">
        {["Living Room", "Kitchen", "Bedroom"].map((category) => (
          <div key={category} className="mb-4">
            <h2 className="text-lg font-semibold mb-2">{category}</h2>
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-2 bg-card rounded-lg mb-2">
                <div>
                  <h3 className="font-medium">Item {item}</h3>
                  <p className="text-sm text-muted-foreground">Location: Shelf {item}</p>
                </div>
                <Button variant="ghost" size="sm">
                  Edit
                </Button>
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="flex justify-around p-4 bg-card">
        <Button variant="ghost" size="icon">
          <Home className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <List className="h-6 w-6" />
        </Button>
        <Button variant="ghost" size="icon">
          <Settings className="h-6 w-6" />
        </Button>
      </nav>
    </div>
  )
}

