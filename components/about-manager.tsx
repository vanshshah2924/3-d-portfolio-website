"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Edit, Plus, Trash2 } from "lucide-react"

interface AboutInfo {
  id: string
  section: "personal" | "education" | "experience"
  title: string
  content: string
  order_index: number
}

export default function AboutManager({ aboutInfo }: { aboutInfo: AboutInfo[] }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingInfo, setEditingInfo] = useState<AboutInfo | null>(null)

  const infoBySection = aboutInfo.reduce(
    (acc, info) => {
      if (!acc[info.section]) acc[info.section] = []
      acc[info.section].push(info)
      return acc
    },
    {} as Record<string, AboutInfo[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">About Information</h2>
          <p className="text-slate-400">Manage your personal information and background</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Section
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add About Section</DialogTitle>
              <DialogDescription className="text-slate-400">
                Add new information to your about section
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="section">Section</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue placeholder="Select section" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="personal">Personal</SelectItem>
                      <SelectItem value="education">Education</SelectItem>
                      <SelectItem value="experience">Experience</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="order">Order</Label>
                  <Input id="order" type="number" defaultValue={1} className="bg-slate-700 border-slate-600" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" className="bg-slate-700 border-slate-600" placeholder="Section title" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="content">Content</Label>
                <Textarea
                  id="content"
                  className="bg-slate-700 border-slate-600"
                  rows={4}
                  placeholder="Section content"
                />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="border-slate-600">
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Add Section</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {Object.entries(infoBySection).map(([section, sectionInfo]) => (
          <Card key={section} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white capitalize flex items-center justify-between">
                {section} Information
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  {sectionInfo.length} items
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {sectionInfo
                .sort((a, b) => a.order_index - b.order_index)
                .map((info) => (
                  <div key={info.id} className="bg-slate-700 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-medium text-white">{info.title}</h4>
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingInfo(info)}
                          className="text-slate-400 hover:text-white h-8 w-8 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400 h-8 w-8 p-0">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-slate-300 text-sm leading-relaxed">{info.content}</p>
                  </div>
                ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
