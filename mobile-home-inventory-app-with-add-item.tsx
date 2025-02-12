"use client"

import type React from "react"
import { useState } from "react"
import { Search, Plus, Home, List, Settings, ChevronRight } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"

export default function MobileHomeInventoryApp() {
  const [isAddingItem, setIsAddingItem] = useState(false)

  const handleAddItem = (event: React.FormEvent) => {
    event.preventDefault()
    // Here you would typically handle the form submission
    // For this example, we'll just close the sheet and show a toast
    setIsAddingItem(false)
    toast({
      title: "Item added",
      description: "Your new item has been added to the inventory.",
    })
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* Header */}
      <header className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
        <h1 className="text-xl font-bold">My Stuff</h1>
        <Sheet open={isAddingItem} onOpenChange={setIsAddingItem}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Plus className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle>Add New Item</SheetTitle>
            </SheetHeader>
            <form onSubmit={handleAddItem} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="item-name">Item Name</Label>
                <Input id="item-name" placeholder="Enter item name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-category">Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="living-room">Living Room</SelectItem>
                    <SelectItem value="kitchen">Kitchen</SelectItem>
                    <SelectItem value="bedroom">Bedroom</SelectItem>
                    <SelectItem value="garage">Garage</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-location">Location</Label>
                <Input id="item-location" placeholder="Enter item location" />
              </div>
              <Button type="submit" className="w-full">
                Add Item
              </Button>
            </form>
          </SheetContent>
        </Sheet>
      </header>

      {/* Search */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="Search items..." className="pl-10 pr-4 py-2 w-full rounded-full" />
        </div>
      </div>

      {/* Categories */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">Categories</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["All", "Living Room", "Kitchen", "Bedroom", "Garage"].map((category) => (
            <Button key={category} variant="outline" className="rounded-full whitespace-nowrap">
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Item List */}
      <div className="flex-grow overflow-auto px-4">
        {["Living Room", "Kitchen", "Bedroom"].map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{category}</h2>
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-card rounded-lg mb-2 shadow-sm">
                <div>
                  <h3 className="font-medium">Item {item}</h3>
                  <p className="text-sm text-muted-foreground">Shelf {item}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="flex justify-around p-2 bg-card border-t">
        <Button variant="ghost" size="icon" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">Home</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col items-center">
          <List className="h-6 w-6" />
          <span className="text-xs mt-1">Items</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col items-center">
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">Settings</span>
        </Button>
      </nav>
    </div>
  )
}

