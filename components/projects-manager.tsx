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
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Edit, ExternalLink, Github, Plus, Star, Trash2 } from "lucide-react"
import { useActionState } from "react"
import { createProject, updateProject, deleteProject } from "@/lib/actions"

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_url?: string
  live_url?: string
  status: string
  featured: boolean
  created_at: string
}

export default function ProjectsManager({ projects }: { projects: Project[] }) {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [createState, createAction] = useActionState(createProject, null)
  const [updateState, updateAction] = useActionState(updateProject.bind(null, editingProject?.id || ""), null)

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        await deleteProject(id)
      } catch (error) {
        alert("Failed to delete project")
      }
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Projects Management</h2>
          <p className="text-slate-400">Manage your portfolio projects</p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-indigo-600 hover:bg-indigo-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Project
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Project</DialogTitle>
              <DialogDescription className="text-slate-400">Add a new project to your portfolio</DialogDescription>
            </DialogHeader>
            <form action={createAction} className="space-y-4">
              {createState?.error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {createState.error}
                </div>
              )}
              {createState?.success && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                  {createState.success}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input id="title" name="title" required className="bg-slate-700 border-slate-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select name="status" defaultValue="completed">
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  name="description"
                  required
                  className="bg-slate-700 border-slate-600"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tech_stack">Tech Stack (comma-separated)</Label>
                <Input
                  id="tech_stack"
                  name="tech_stack"
                  required
                  className="bg-slate-700 border-slate-600"
                  placeholder="React, Next.js, TypeScript"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="github_url">GitHub URL</Label>
                  <Input id="github_url" name="github_url" type="url" className="bg-slate-700 border-slate-600" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="live_url">Live URL</Label>
                  <Input id="live_url" name="live_url" type="url" className="bg-slate-700 border-slate-600" />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="featured" name="featured" />
                <Label htmlFor="featured">Featured Project</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                  className="border-slate-600"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Create Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="bg-slate-800 border-slate-700">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <CardTitle className="text-white flex items-center gap-2">
                    {project.title}
                    {project.featured && <Star className="w-4 h-4 text-amber-500" />}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant={project.status === "completed" ? "default" : "secondary"} className="text-xs">
                      {project.status}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setEditingProject(project)}
                    className="text-slate-400 hover:text-white"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(project.id)}
                    className="text-slate-400 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-slate-300 line-clamp-3">{project.description}</p>
              <div className="flex flex-wrap gap-1">
                {project.tech_stack.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="outline" className="text-xs border-slate-600 text-slate-300">
                    {tech}
                  </Badge>
                ))}
                {project.tech_stack.length > 3 && (
                  <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                    +{project.tech_stack.length - 3}
                  </Badge>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {project.github_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="border-slate-600 text-slate-300 bg-transparent"
                  >
                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                      <Github className="w-3 h-3 mr-1" />
                      Code
                    </a>
                  </Button>
                )}
                {project.live_url && (
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="border-slate-600 text-slate-300 bg-transparent"
                  >
                    <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-3 h-3 mr-1" />
                      Live
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Edit Dialog */}
      {editingProject && (
        <Dialog open={!!editingProject} onOpenChange={() => setEditingProject(null)}>
          <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Project</DialogTitle>
              <DialogDescription className="text-slate-400">Update project information</DialogDescription>
            </DialogHeader>
            <form action={updateAction} className="space-y-4">
              {updateState?.error && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                  {updateState.error}
                </div>
              )}
              {updateState?.success && (
                <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                  {updateState.success}
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-title">Project Title</Label>
                  <Input
                    id="edit-title"
                    name="title"
                    defaultValue={editingProject.title}
                    required
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-status">Status</Label>
                  <Select name="status" defaultValue={editingProject.status}>
                    <SelectTrigger className="bg-slate-700 border-slate-600">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="planned">Planned</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  name="description"
                  defaultValue={editingProject.description}
                  required
                  className="bg-slate-700 border-slate-600"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-tech_stack">Tech Stack (comma-separated)</Label>
                <Input
                  id="edit-tech_stack"
                  name="tech_stack"
                  defaultValue={editingProject.tech_stack.join(", ")}
                  required
                  className="bg-slate-700 border-slate-600"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-github_url">GitHub URL</Label>
                  <Input
                    id="edit-github_url"
                    name="github_url"
                    type="url"
                    defaultValue={editingProject.github_url || ""}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-live_url">Live URL</Label>
                  <Input
                    id="edit-live_url"
                    name="live_url"
                    type="url"
                    defaultValue={editingProject.live_url || ""}
                    className="bg-slate-700 border-slate-600"
                  />
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="edit-featured" name="featured" defaultChecked={editingProject.featured} />
                <Label htmlFor="edit-featured">Featured Project</Label>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingProject(null)}
                  className="border-slate-600"
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-indigo-600 hover:bg-indigo-700">
                  Update Project
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
