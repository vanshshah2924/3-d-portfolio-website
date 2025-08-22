"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BarChart3, BookOpen, BrainCircuit, FolderOpen, LogOut, Mail, Settings, Star, User } from "lucide-react"
import { adminSignOut } from "@/lib/admin-actions"
import ProjectsManager from "@/components/projects-manager"
import SkillsManager from "@/components/skills-manager"
import AboutManager from "@/components/about-manager"
import ContactManager from "@/components/contact-manager"

interface DashboardData {
  projects: any[]
  skills: any[]
  aboutInfo: any[]
  contactSubmissions: any[]
  user: any
}

export default function AdminDashboard({ data }: { data: DashboardData }) {
  const [activeTab, setActiveTab] = useState("overview")

  const stats = {
    totalProjects: data.projects.length,
    featuredProjects: data.projects.filter((p) => p.featured).length,
    totalSkills: data.skills.length,
    unreadMessages: data.contactSubmissions.filter((c) => c.status === "unread").length,
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <header className="bg-slate-800 border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-white">Portfolio Admin</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-slate-300">
                <User className="w-4 h-4" />
                <span className="text-sm">{data.user.email}</span>
              </div>
              <form action={adminSignOut}>
                <Button
                  type="submit"
                  variant="outline"
                  size="sm"
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </form>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-slate-800 border-slate-700">
            <TabsTrigger value="overview" className="data-[state=active]:bg-indigo-600">
              <BarChart3 className="w-4 h-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="projects" className="data-[state=active]:bg-indigo-600">
              <FolderOpen className="w-4 h-4 mr-2" />
              Projects
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-indigo-600">
              <BrainCircuit className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-indigo-600">
              <BookOpen className="w-4 h-4 mr-2" />
              About
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-indigo-600">
              <Mail className="w-4 h-4 mr-2" />
              Messages
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Total Projects</CardTitle>
                  <FolderOpen className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalProjects}</div>
                  <p className="text-xs text-slate-400">{stats.featuredProjects} featured</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Skills</CardTitle>
                  <BrainCircuit className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{stats.totalSkills}</div>
                  <p className="text-xs text-slate-400">Across all categories</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">Messages</CardTitle>
                  <Mail className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{data.contactSubmissions.length}</div>
                  <p className="text-xs text-slate-400">{stats.unreadMessages} unread</p>
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-slate-300">About Sections</CardTitle>
                  <BookOpen className="h-4 w-4 text-slate-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-white">{data.aboutInfo.length}</div>
                  <p className="text-xs text-slate-400">Content sections</p>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Projects</CardTitle>
                  <CardDescription className="text-slate-400">Latest portfolio projects</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.projects.slice(0, 5).map((project) => (
                    <div key={project.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-indigo-500 rounded-full" />
                        <span className="text-sm text-white">{project.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {project.featured && <Star className="w-3 h-3 text-amber-500" />}
                        <Badge variant={project.status === "completed" ? "default" : "secondary"} className="text-xs">
                          {project.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Top Skills</CardTitle>
                  <CardDescription className="text-slate-400">Highest proficiency skills</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  {data.skills.slice(0, 5).map((skill) => (
                    <div key={skill.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                        <span className="text-sm text-white">{skill.name}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                          {skill.category}
                        </Badge>
                        <span className="text-xs text-slate-400">{skill.proficiency}%</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <ProjectsManager projects={data.projects} />
          </TabsContent>

          <TabsContent value="skills">
            <SkillsManager skills={data.skills} />
          </TabsContent>

          <TabsContent value="about">
            <AboutManager aboutInfo={data.aboutInfo} />
          </TabsContent>

          <TabsContent value="contact">
            <ContactManager submissions={data.contactSubmissions} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
