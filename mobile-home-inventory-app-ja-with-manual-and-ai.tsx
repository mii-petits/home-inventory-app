"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Search, Plus, Home, List, Settings, ChevronRight, Camera, Edit2, PenTool } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// AIによる画像認識を模擬する関数
const simulateAIRecognition = () => {
  const items = ["本", "椅子", "ノートパソコン", "花絶", "カメラ"]
  const categories = ["リビング", "キッチン", "寝室", "書斎", "物置"]
  return {
    name: items[Math.floor(Math.random() * items.length)],
    category: categories[Math.floor(Math.random() * categories.length)],
  }
}

export default function MobileHomeInventoryAppJa() {
  const [isAddingItem, setIsAddingItem] = useState(false)
  const [image, setImage] = useState<string | null>(null)
  const [itemName, setItemName] = useState("")
  const [itemCategory, setItemCategory] = useState("")
  const [itemLocation, setItemLocation] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [activeTab, setActiveTab] = useState("manual")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleAddItem = (event: React.FormEvent) => {
    event.preventDefault()
    setIsAddingItem(false)
    resetForm()
    toast({
      title: "アイテムを追加しました",
      description: "新しいアイテムが在庫リストに追加されました。",
    })
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setImage(reader.result as string)
        // AI認識の模擬
        const { name, category } = simulateAIRecognition()
        setItemName(name)
        setItemCategory(category)
        setIsEditing(false)
      }
      reader.readAsDataURL(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const resetForm = () => {
    setImage(null)
    setItemName("")
    setItemCategory("")
    setItemLocation("")
    setIsEditing(false)
    setActiveTab("manual")
  }

  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      {/* ヘッダー */}
      <header className="flex justify-between items-center p-4 bg-primary text-primary-foreground">
        <h1 className="text-xl font-bold">マイ収納</h1>
        <Sheet open={isAddingItem} onOpenChange={setIsAddingItem}>
          <SheetTrigger asChild>
            <Button size="icon" variant="ghost" className="rounded-full">
              <Plus className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="bottom" className="h-[80vh]">
            <SheetHeader>
              <SheetTitle className="text-lg">新規アイテム追加</SheetTitle>
            </SheetHeader>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full mt-4">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="manual">
                  <PenTool className="w-4 h-4 mr-2" />
                  手動入力
                </TabsTrigger>
                <TabsTrigger value="photo">
                  <Camera className="w-4 h-4 mr-2" />
                  写真から追加
                </TabsTrigger>
              </TabsList>
              <TabsContent value="manual">
                <form onSubmit={handleAddItem} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="manual-item-name" className="text-sm">
                      アイテム名
                    </Label>
                    <Input
                      id="manual-item-name"
                      value={itemName}
                      onChange={(e) => setItemName(e.target.value)}
                      placeholder="アイテム名を入力"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manual-item-category" className="text-sm">
                      カテゴリー
                    </Label>
                    <Select value={itemCategory} onValueChange={setItemCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="カテゴリーを選択" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="living-room">リビング</SelectItem>
                        <SelectItem value="kitchen">キッチン</SelectItem>
                        <SelectItem value="bedroom">寝室</SelectItem>
                        <SelectItem value="study">書斎</SelectItem>
                        <SelectItem value="garage">物置</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="manual-item-location" className="text-sm">
                      保管場所
                    </Label>
                    <Input
                      id="manual-item-location"
                      value={itemLocation}
                      onChange={(e) => setItemLocation(e.target.value)}
                      placeholder="保管場所を入力"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    追加する
                  </Button>
                </form>
              </TabsContent>
              <TabsContent value="photo">
                <form onSubmit={handleAddItem} className="space-y-4 mt-4">
                  <div className="space-y-2">
                    <Label className="text-sm">写真</Label>
                    <div className="flex justify-center items-center">
                      <Button type="button" onClick={triggerFileInput} className="w-full">
                        <Camera className="mr-2 h-4 w-4" />
                        写真を選択
                      </Button>
                      <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageUpload}
                        accept="image/*"
                        className="hidden"
                      />
                    </div>
                    {image && (
                      <div className="mt-2">
                        <img
                          src={image || "/placeholder.svg"}
                          alt="選択された画像"
                          className="w-full h-40 object-cover rounded-md"
                        />
                      </div>
                    )}
                  </div>
                  {image && (
                    <>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <Label htmlFor="item-name" className="text-sm">
                            アイテム名
                          </Label>
                          <Button type="button" variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                            <Edit2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Input
                          id="item-name"
                          value={itemName}
                          onChange={(e) => setItemName(e.target.value)}
                          placeholder="アイテム名を入力"
                          readOnly={!isEditing}
                          className={isEditing ? "" : "bg-muted"}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-category" className="text-sm">
                          カテゴリー
                        </Label>
                        <Select value={itemCategory} onValueChange={setItemCategory} disabled={!isEditing}>
                          <SelectTrigger className={isEditing ? "" : "bg-muted"}>
                            <SelectValue placeholder="カテゴリーを選択" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="living-room">リビング</SelectItem>
                            <SelectItem value="kitchen">キッチン</SelectItem>
                            <SelectItem value="bedroom">寝室</SelectItem>
                            <SelectItem value="study">書斎</SelectItem>
                            <SelectItem value="garage">物置</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="item-location" className="text-sm">
                          保管場所
                        </Label>
                        <Input
                          id="item-location"
                          value={itemLocation}
                          onChange={(e) => setItemLocation(e.target.value)}
                          placeholder="保管場所を入力"
                        />
                      </div>
                    </>
                  )}
                  <Button type="submit" className="w-full" disabled={!image}>
                    追加する
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </SheetContent>
        </Sheet>
      </header>

      {/* 検索 */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input type="search" placeholder="アイテムを検索..." className="pl-10 pr-4 py-2 w-full rounded-full" />
        </div>
      </div>

      {/* カテゴリー */}
      <div className="px-4 mb-4">
        <h2 className="text-lg font-semibold mb-2">カテゴリー</h2>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {["すべて", "リビング", "キッチン", "寝室", "書斎", "物置"].map((category) => (
            <Button key={category} variant="outline" className="rounded-full whitespace-nowrap">
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* アイテムリスト */}
      <div className="flex-grow overflow-auto px-4">
        {["リビング", "キッチン", "寝室"].map((category) => (
          <div key={category} className="mb-6">
            <h2 className="text-lg font-semibold mb-2">{category}</h2>
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex items-center justify-between p-3 bg-card rounded-lg mb-2 shadow-sm">
                <div>
                  <h3 className="font-medium">アイテム {item}</h3>
                  <p className="text-sm text-muted-foreground">棚 {item}</p>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* ナビゲーション */}
      <nav className="flex justify-around p-2 bg-card border-t">
        <Button variant="ghost" size="icon" className="flex flex-col items-center">
          <Home className="h-6 w-6" />
          <span className="text-xs mt-1">ホーム</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col items-center">
          <List className="h-6 w-6" />
          <span className="text-xs mt-1">一覧</span>
        </Button>
        <Button variant="ghost" size="icon" className="flex flex-col items-center">
          <Settings className="h-6 w-6" />
          <span className="text-xs mt-1">設定</span>
        </Button>
      </nav>
    </div>
  )
}

