"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
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
import { Slider } from "@/components/ui/slider"
import { Edit, Plus, Trash2 } from "lucide-react"

interface Skill {
  id: string
  name: string
  category: "frontend" | "backend" | "devops"
  proficiency: number
  icon?: string
}

export default function SkillsManager({ skills }: { skills: Skill[] }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null)
  const [proficiency, setProficiency] = useState([80])

  const skillsByCategory = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Skills Management</h2>
          <p className="text-slate-400">Manage your technical skills and proficiency levels</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white">
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription className="text-slate-400">Add a new skill to your portfolio</DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="skill-name">Skill Name</Label>
                <Input id="skill-name" className="bg-slate-700 border-slate-600" placeholder="e.g., React" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skill-category">Category</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="frontend">Frontend</SelectItem>
                    <SelectItem value="backend">Backend</SelectItem>
                    <SelectItem value="devops">DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Proficiency: {proficiency[0]}%</Label>
                <Slider value={proficiency} onValueChange={setProficiency} max={100} step={5} className="w-full" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="skill-icon">Icon (optional)</Label>
                <Input id="skill-icon" className="bg-slate-700 border-slate-600" placeholder="e.g., react" />
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setIsCreateOpen(false)} className="border-slate-600">
                  Cancel
                </Button>
                <Button className="bg-indigo-600 hover:bg-indigo-700">Add Skill</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="space-y-6">
        {Object.entries(skillsByCategory).map(([category, categorySkills]) => (
          <Card key={category} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white capitalize flex items-center justify-between">
                {category} Skills
                <Badge variant="outline" className="border-slate-600 text-slate-300">
                  {categorySkills.length} skills
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categorySkills.map((skill) => (
                  <div key={skill.id} className="bg-slate-700 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-white">{skill.name}</h4>
                      <div className="flex items-center space-x-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => setEditingSkill(skill)}
                          className="text-slate-400 hover:text-white h-8 w-8 p-0"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400 h-8 w-8 p-0">
                          <Trash2 className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-300">Proficiency</span>
                        <span className="text-slate-300">{skill.proficiency}%</span>
                      </div>
                      <div className="w-full bg-slate-600 rounded-full h-2">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${skill.proficiency}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
