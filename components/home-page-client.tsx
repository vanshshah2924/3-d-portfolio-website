"use client"

import type React from "react"
import { useEffect, useRef, useState, useActionState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import AnimatedHeader from "@/components/animated-header"
import { submitContactForm } from "@/lib/actions"

interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_url?: string
  live_url?: string
  status: string
  featured: boolean
}

interface Skill {
  id: string
  name: string
  category: "frontend" | "backend" | "devops"
  proficiency: number
  icon?: string
}

interface AboutInfo {
  id: string
  section: "personal" | "education" | "experience"
  title: string
  content: string
  order_index: number
}

interface PortfolioData {
  projects: Project[]
  skills: Skill[]
  aboutInfo: AboutInfo[]
}

export default function HomePageClient({ data }: { data: PortfolioData }) {
  const [isLoaded, setIsLoaded] = useState(false)
  const [typedText, setTypedText] = useState("")
  const heroRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [contactState, contactAction] = useActionState(submitContactForm, null)

  const fullText = "Vansh Shah"

  const skillsByCategory = data.skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) acc[skill.category] = []
      acc[skill.category].push(skill)
      return acc
    },
    {} as Record<string, Skill[]>,
  )

  const aboutBySection = data.aboutInfo.reduce(
    (acc, info) => {
      if (!acc[info.section]) acc[info.section] = []
      acc[info.section].push(info)
      return acc
    },
    {} as Record<string, AboutInfo[]>,
  )

  useEffect(() => {
    setIsLoaded(true)

    let i = 0
    const typeInterval = setInterval(() => {
      if (i < fullText.length) {
        setTypedText(fullText.slice(0, i + 1))
        i++
      } else {
        clearInterval(typeInterval)
      }
    }, 200)

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      clearInterval(typeInterval)
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900/20 to-slate-900 overflow-hidden relative">
      <AnimatedHeader />

      <div className="absolute inset-0 overflow-hidden z-0">
        {/* Background particles */}
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-indigo-400/20 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-6xl mx-auto">
          {/* VS Logo with orbiting tech icons */}
          <div className="relative mb-16">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-indigo-600 to-purple-600 rounded-3xl flex items-center justify-center text-6xl font-heading font-bold text-white shadow-2xl shadow-indigo-500/30 animate-glow">
              VS
            </div>

            {/* Orbiting tech icons */}
            <div className="absolute inset-0 flex items-center justify-center">
              {[
                { name: "React", icon: "⚛️", angle: 0 },
                { name: "Node.js", icon: "🟢", angle: 60 },
                { name: "TypeScript", icon: "🔷", angle: 120 },
                { name: "Next.js", icon: "▲", angle: 180 },
                { name: "MongoDB", icon: "🍃", angle: 240 },
                { name: "Docker", icon: "🐳", angle: 300 },
              ].map((tech, index) => (
                <div
                  key={tech.name}
                  className="absolute w-12 h-12 bg-slate-800/80 backdrop-blur-sm border border-slate-600/50 rounded-xl flex items-center justify-center text-xl hover:scale-125 hover:bg-slate-700/80 transition-all duration-300 group animate-orbit"
                  style={
                    {
                      "--orbit-radius": "130px",
                      "--orbit-angle": `${tech.angle}deg`,
                      animationDelay: `${index * 0.5}s`,
                    } as React.CSSProperties
                  }
                >
                  {tech.icon}
                  <div className="absolute top-14 left-1/2 transform -translate-x-1/2 bg-black/90 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap border border-indigo-400/30">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-heading font-bold mb-6 relative">
            <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-amber-400 bg-clip-text text-transparent animate-gradient-x">
              {typedText}
            </span>
            <span className="inline-block w-1 h-16 md:h-20 bg-amber-400 ml-2 animate-blink" />
          </h1>

          <p className="text-xl md:text-2xl text-indigo-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Building Interactive, AI-Powered Web Experiences in the
            <span className="text-amber-400 font-semibold"> Digital Universe</span>
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-10 py-6 rounded-xl transform hover:scale-105 transition-all duration-300 animate-glow border border-indigo-400/30 backdrop-blur-sm"
            >
              🌌 Explore My Universe
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400/10 px-10 py-6 rounded-xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm hover:shadow-lg hover:shadow-amber-400/20"
            >
              📡 Contact Mission Control
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-center mb-20 bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
            About Vansh Shah
          </h2>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {Object.entries(aboutBySection).map(([section, sectionInfo], sectionIndex) => (
              <div key={section}>
                {sectionInfo
                  .sort((a, b) => a.order_index - b.order_index)
                  .map((info, index) => (
                    <div
                      key={info.id}
                      className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm border border-slate-600/40 rounded-2xl p-6 transform hover:scale-[1.02] hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-500 animate-fade-in-up mb-6"
                      style={{ animationDelay: `${(sectionIndex * 2 + index) * 0.1}s` }}
                    >
                      <h3 className="text-2xl font-heading font-bold text-indigo-300 mb-4 flex items-center gap-3">
                        <span className="text-2xl">
                          {section === "personal" && "👋"}
                          {section === "education" && "🎓"}
                          {section === "experience" && "💼"}
                        </span>
                        {info.title}
                      </h3>
                      <p className="text-slate-300 leading-relaxed">{info.content}</p>
                    </div>
                  ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-center mb-20 bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
            Technical Arsenal
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {Object.entries(skillsByCategory).map(([category, categorySkills], categoryIndex) => {
              const categoryConfig = {
                frontend: {
                  icon: "🎨",
                  color: "from-blue-500 to-cyan-500",
                  borderColor: "border-blue-400/40",
                  bgGlow: "shadow-blue-500/20",
                  title: "Frontend",
                },
                backend: {
                  icon: "⚙️",
                  color: "from-green-500 to-emerald-500",
                  borderColor: "border-green-400/40",
                  bgGlow: "shadow-green-500/20",
                  title: "Backend",
                },
                devops: {
                  icon: "🚀",
                  color: "from-purple-500 to-pink-500",
                  borderColor: "border-purple-400/40",
                  bgGlow: "shadow-purple-500/20",
                  title: "DevOps & Tools",
                },
              }[category] || {
                icon: "💻",
                color: "from-gray-500 to-slate-500",
                borderColor: "border-gray-400/40",
                bgGlow: "shadow-gray-500/20",
                title: category,
              }

              return (
                <div key={category} className="relative group cursor-pointer">
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${categoryConfig.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700 ${categoryConfig.bgGlow}`}
                  />

                  <div
                    className={`relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 ${categoryConfig.borderColor} rounded-3xl p-8 hover:scale-[1.05] hover:-translate-y-2 transition-all duration-700 group overflow-hidden shadow-2xl hover:shadow-3xl`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />

                    <div className="relative z-10">
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-r ${categoryConfig.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-125 transition-all duration-700 shadow-lg`}
                          >
                            <span className="group-hover:animate-bounce">{categoryConfig.icon}</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-heading font-bold text-white">{categoryConfig.title}</h3>
                            <p className="text-slate-400 text-sm mt-1">
                              Proficiency:{" "}
                              {Math.round(
                                categorySkills.reduce((acc, skill) => acc + skill.proficiency, 0) /
                                  categorySkills.length,
                              )}
                              %
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <h4 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                          Skills & Proficiency
                        </h4>
                        <div className="space-y-3">
                          {categorySkills.map((skill, skillIndex) => (
                            <div key={skill.id} className="group/skill">
                              <div className="flex justify-between items-center mb-2">
                                <span className="text-slate-200 font-medium text-sm">{skill.name}</span>
                                <span className="text-slate-400 text-xs">{skill.proficiency}%</span>
                              </div>
                              <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                                <div
                                  className={`h-full bg-gradient-to-r ${categoryConfig.color} rounded-full transition-all duration-1000 ease-out group-hover/skill:animate-pulse`}
                                  style={{
                                    width: `${skill.proficiency}%`,
                                    animationDelay: `${skillIndex * 200}ms`,
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-center mb-20 bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>

          <div className="grid md:grid-cols-2 gap-8">
            {data.projects.map((project, i) => {
              const projectColors = [
                {
                  color: "from-blue-500 to-cyan-500",
                  borderColor: "border-blue-400/40",
                  bgGlow: "shadow-blue-500/20",
                  icon: "🚀",
                },
                {
                  color: "from-green-500 to-emerald-500",
                  borderColor: "border-green-400/40",
                  bgGlow: "shadow-green-500/20",
                  icon: "📋",
                },
                {
                  color: "from-amber-500 to-orange-500",
                  borderColor: "border-amber-400/40",
                  bgGlow: "shadow-amber-500/20",
                  icon: "📊",
                },
                {
                  color: "from-purple-500 to-pink-500",
                  borderColor: "border-purple-400/40",
                  bgGlow: "shadow-purple-500/20",
                  icon: "💎",
                },
              ]
              const projectStyle = projectColors[i % projectColors.length]

              return (
                <div key={project.id} className="group relative perspective-1000">
                  <div
                    className={`absolute -inset-1 bg-gradient-to-r ${projectStyle.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700 ${projectStyle.bgGlow}`}
                  />

                  <div
                    className={`relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 ${projectStyle.borderColor} rounded-3xl p-8 transition-all duration-700 shadow-2xl overflow-hidden transform-gpu
                      hover:scale-[1.05] hover:-translate-y-4 hover:rotate-x-2 hover:rotate-y-1 
                      hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] hover:shadow-current/20`}
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />

                    <div className="relative z-10">
                      {/* Project Header */}
                      <div className="flex items-start justify-between mb-6">
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-16 h-16 bg-gradient-to-r ${projectStyle.color} rounded-2xl flex items-center justify-center text-3xl group-hover:scale-125 transition-all duration-700 shadow-lg`}
                          >
                            <span className="group-hover:animate-bounce">{projectStyle.icon}</span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-heading font-bold text-white">{project.title}</h3>
                            <p className="text-slate-400 text-sm mt-1">Full Stack Development</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-xs border border-green-400/30">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                          {project.status}
                        </div>
                      </div>

                      <p className="text-slate-300 leading-relaxed mb-6 text-lg">{project.description}</p>

                      <div className="mb-8">
                        <h4 className="text-white font-semibold mb-3 text-sm uppercase tracking-wide">Tech Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.tech_stack.map((tech, techIndex) => (
                            <span
                              key={techIndex}
                              className={`px-3 py-1 bg-gradient-to-r ${projectStyle.color} bg-opacity-20 text-white text-xs rounded-full border border-current/30 hover:scale-110 transition-all duration-300`}
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-4">
                        {project.github_url && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="border-slate-600 text-slate-300 hover:bg-slate-700 bg-transparent flex-1"
                          >
                            <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                              🐙 Code
                            </a>
                          </Button>
                        )}
                        {project.live_url && (
                          <Button
                            size="sm"
                            asChild
                            className={`bg-gradient-to-r ${projectStyle.color} hover:opacity-90 text-white flex-1`}
                          >
                            <a href={project.live_url} target="_blank" rel="noopener noreferrer">
                              🚀 Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-4 relative z-10">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl md:text-6xl font-heading font-bold text-center mb-20 bg-gradient-to-r from-indigo-400 to-amber-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
            {/* Left side - Contact Info */}
            <div className="space-y-8">
              <div className="space-y-6">
                {[
                  {
                    icon: "📧",
                    title: "Email",
                    value: "vanshkshah2924@gmail.com",
                    color: "from-blue-500 to-indigo-500",
                    borderColor: "border-blue-400/40",
                    bgGlow: "shadow-blue-500/20",
                  },
                  {
                    icon: "📱",
                    title: "Phone",
                    value: "+91 8320402086",
                    color: "from-green-500 to-emerald-500",
                    borderColor: "border-green-400/40",
                    bgGlow: "shadow-green-500/20",
                  },
                  {
                    icon: "📍",
                    title: "Location",
                    value: "Gujarat, India",
                    color: "from-purple-500 to-pink-500",
                    borderColor: "border-purple-400/40",
                    bgGlow: "shadow-purple-500/20",
                  },
                ].map((contact, i) => (
                  <div key={i} className="group relative perspective-1000">
                    <div
                      className={`absolute -inset-1 bg-gradient-to-r ${contact.color} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-all duration-700 ${contact.bgGlow}`}
                    />

                    <div
                      className={`relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 ${contact.borderColor} rounded-2xl p-6 transition-all duration-700 shadow-xl overflow-hidden transform-gpu
                        hover:scale-[1.05] hover:-translate-y-2 hover:rotate-x-1 hover:rotate-y-1 
                        hover:shadow-[0_20px_40px_-12px_rgba(0,0,0,0.4)] hover:shadow-current/20`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />

                      <div className="relative z-10 flex items-center gap-4">
                        <div
                          className={`w-14 h-14 bg-gradient-to-r ${contact.color} rounded-xl flex items-center justify-center text-2xl group-hover:scale-125 transition-all duration-700 shadow-lg`}
                        >
                          <span className="group-hover:animate-bounce">{contact.icon}</span>
                        </div>
                        <div>
                          <h4 className="text-lg font-heading font-bold text-white">{contact.title}</h4>
                          <p className="text-slate-300 group-hover:text-white transition-colors duration-300">
                            {contact.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className="mt-12">
                <h4 className="text-xl font-heading font-bold text-white mb-6">Connect With Me</h4>
                <div className="flex gap-4">
                  {[
                    { icon: "💼", name: "LinkedIn", color: "from-blue-600 to-blue-500" },
                    { icon: "🐙", name: "GitHub", color: "from-gray-700 to-gray-600" },
                    { icon: "🐦", name: "Twitter", color: "from-sky-500 to-blue-500" },
                    { icon: "📸", name: "Instagram", color: "from-pink-500 to-purple-500" },
                  ].map((social, i) => (
                    <button
                      key={i}
                      className={`w-14 h-14 bg-gradient-to-r ${social.color} rounded-xl flex items-center justify-center text-2xl text-white
                        hover:scale-125 hover:-translate-y-2 hover:rotate-12 hover:shadow-2xl hover:shadow-current/40
                        transition-all duration-500 transform-gpu group relative overflow-hidden`}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      <span className="relative z-10 group-hover:animate-bounce">{social.icon}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Right side - Contact Form */}
            <div className="relative group perspective-1000">
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700" />

              <div className="relative bg-gradient-to-br from-slate-800/95 to-slate-900/95 backdrop-blur-xl border-2 border-indigo-400/40 rounded-3xl p-8 transition-all duration-700 shadow-2xl overflow-hidden transform-gpu hover:scale-[1.02] hover:-translate-y-4">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1500" />

                <div className="relative z-10">
                  <h3 className="text-2xl font-heading font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-2xl">💬</span>
                    Send Message
                  </h3>

                  <form action={contactAction} className="space-y-6">
                    {contactState?.error && (
                      <div className="bg-red-500/10 border border-red-500/50 text-red-400 px-4 py-3 rounded-lg text-sm">
                        {contactState.error}
                      </div>
                    )}

                    {contactState?.success && (
                      <div className="bg-green-500/10 border border-green-500/50 text-green-400 px-4 py-3 rounded-lg text-sm">
                        {contactState.success}
                      </div>
                    )}

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="name" className="text-slate-300">
                          Name
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          required
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20"
                          placeholder="Your name"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-slate-300">
                          Email
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          required
                          className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20"
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="subject" className="text-slate-300">
                        Subject
                      </Label>
                      <Input
                        id="subject"
                        name="subject"
                        required
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20"
                        placeholder="Project inquiry"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message" className="text-slate-300">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        name="message"
                        required
                        rows={5}
                        className="bg-slate-700/50 border-slate-600/50 text-white placeholder:text-slate-400 focus:border-indigo-400 focus:ring-indigo-400/20 resize-none"
                        placeholder="Tell me about your project..."
                      />
                    </div>

                    <Button
                      type="submit"
                      size="lg"
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold py-6 rounded-xl transform hover:scale-105 transition-all duration-300 animate-glow border border-indigo-400/30"
                    >
                      🚀 Send Message
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-20">
            <div className="bg-gradient-to-br from-indigo-500/10 to-purple-500/10 backdrop-blur-xl border border-indigo-400/30 rounded-3xl p-12 hover:scale-105 transition-all duration-500">
              <h3 className="text-3xl font-heading font-bold text-white mb-4">Ready to Start Your Project?</h3>
              <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
                Let's discuss your ideas and turn them into reality. I'm available for freelance projects and full-time
                opportunities.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-semibold px-10 py-6 rounded-xl transform hover:scale-105 transition-all duration-300 animate-glow border border-indigo-400/30 backdrop-blur-sm"
                >
                  💼 Hire Me
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-2 border-amber-400 text-amber-400 hover:bg-amber-400/10 px-10 py-6 rounded-xl transform hover:scale-105 transition-all duration-300 bg-transparent backdrop-blur-sm hover:shadow-lg hover:shadow-amber-400/20"
                >
                  📄 View Resume
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <footer className="relative z-10 bg-gradient-to-br from-slate-900 via-indigo-900/10 to-slate-900 border-t border-slate-700/50">
        <div className="container mx-auto max-w-6xl px-4 py-16">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand Section */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-2xl font-heading font-bold text-white">
                  VS
                </div>
                <div>
                  <h3 className="text-2xl font-heading font-bold text-white">Vansh Shah</h3>
                  <p className="text-slate-400">Full Stack Developer</p>
                </div>
              </div>
              <p className="text-slate-300 leading-relaxed mb-6 max-w-md">
                Building innovative web experiences with modern technologies. Passionate about creating scalable
                solutions that make a difference.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: "💼", name: "LinkedIn", color: "hover:text-blue-400" },
                  { icon: "🐙", name: "GitHub", color: "hover:text-gray-300" },
                  { icon: "🐦", name: "Twitter", color: "hover:text-sky-400" },
                  { icon: "📧", name: "Email", color: "hover:text-amber-400" },
                ].map((social, i) => (
                  <button
                    key={i}
                    className={`w-10 h-10 bg-slate-800/50 rounded-lg flex items-center justify-center text-slate-400 ${social.color} hover:scale-110 hover:-translate-y-1 transition-all duration-300 border border-slate-700/50 hover:border-current/30`}
                  >
                    {social.icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-heading font-bold text-white mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {[
                  { name: "Home", href: "#home" },
                  { name: "About", href: "#about" },
                  { name: "Skills", href: "#skills" },
                  { name: "Projects", href: "#projects" },
                  { name: "Contact", href: "#contact" },
                ].map((link, i) => (
                  <li key={i}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-indigo-400 hover:translate-x-1 transition-all duration-300 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-heading font-bold text-white mb-6">Get In Touch</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-indigo-400">📧</span>
                  <span className="text-sm">vanshkshah2924@gmail.com</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-green-400">📱</span>
                  <span className="text-sm">+91 8320402086</span>
                </div>
                <div className="flex items-center gap-3 text-slate-300">
                  <span className="text-purple-400">📍</span>
                  <span className="text-sm">Gujarat, India</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700/50 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-slate-400 text-sm">© 2024 Vansh Shah. All rights reserved.</div>
              <div className="flex items-center gap-6 text-sm text-slate-400">
                <span className="hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                  Privacy Policy
                </span>
                <span className="hover:text-indigo-400 transition-colors duration-300 cursor-pointer">
                  Terms of Service
                </span>
                <div className="flex items-center gap-2">
                  <span>Made with</span>
                  <span className="text-red-400 animate-pulse">❤️</span>
                  <span>in India</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-indigo-400/10 rounded-full animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${8 + Math.random() * 6}s`,
              }}
            />
          ))}
        </div>
      </footer>
    </div>
  )
}
