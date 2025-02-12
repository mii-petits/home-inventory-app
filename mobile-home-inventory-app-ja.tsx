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

export default function MobileHomeInventoryAppJa() {
  const [isAddingItem, setIsAddingItem] = useState(false)

  const handleAddItem = (event: React.FormEvent) => {
    event.preventDefault()
    setIsAddingItem(false)
    toast({
      title: "アイテムを追加しました",
      description: "新しいアイテムが在庫リストに追加されました。",
    })
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
            <form onSubmit={handleAddItem} className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="item-name" className="text-sm">
                  アイテム名
                </Label>
                <Input id="item-name" placeholder="アイテム名を入力" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-category" className="text-sm">
                  カテゴリー
                </Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="カテゴリーを選択" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="living-room">リビング</SelectItem>
                    <SelectItem value="kitchen">キッチン</SelectItem>
                    <SelectItem value="bedroom">寝室</SelectItem>
                    <SelectItem value="garage">物置</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="item-location" className="text-sm">
                  保管場所
                </Label>
                <Input id="item-location" placeholder="保管場所を入力" />
              </div>
              <Button type="submit" className="w-full">
                追加する
              </Button>
            </form>
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
          {["すべて", "リビング", "キッチン", "寝室", "物置"].map((category) => (
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

