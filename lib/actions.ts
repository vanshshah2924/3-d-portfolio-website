"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Contact form submission action
export async function submitContactForm(prevState: any, formData: FormData) {
  try {
    const name = formData.get("name")?.toString()
    const email = formData.get("email")?.toString()
    const subject = formData.get("subject")?.toString()
    const message = formData.get("message")?.toString()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return { error: "All fields are required" }
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return { error: "Please enter a valid email address" }
    }

    const supabase = createClient()

    const { error } = await supabase.from("contact_submissions").insert([{ name, email, subject, message }])

    if (error) {
      return { error: "Failed to submit contact form. Please try again." }
    }

    return { success: "Thank you for your message! I'll get back to you soon." }
  } catch (error) {
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Admin actions for managing content
export async function createProject(prevState: any, formData: FormData) {
  try {
    const title = formData.get("title")?.toString()
    const description = formData.get("description")?.toString()
    const techStack = formData.get("tech_stack")?.toString()
    const githubUrl = formData.get("github_url")?.toString()
    const liveUrl = formData.get("live_url")?.toString()
    const status = formData.get("status")?.toString() || "completed"
    const featured = formData.get("featured") === "on"

    if (!title || !description || !techStack) {
      return { error: "Title, description, and tech stack are required" }
    }

    const supabase = createClient()

    const { error } = await supabase.from("projects").insert([
      {
        title,
        description,
        tech_stack: techStack.split(",").map((tech) => tech.trim()),
        github_url: githubUrl || null,
        live_url: liveUrl || null,
        status,
        featured,
      },
    ])

    if (error) {
      return { error: "Failed to create project" }
    }

    revalidatePath("/admin")
    return { success: "Project created successfully" }
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

export async function updateProject(id: string, prevState: any, formData: FormData) {
  try {
    const title = formData.get("title")?.toString()
    const description = formData.get("description")?.toString()
    const techStack = formData.get("tech_stack")?.toString()
    const githubUrl = formData.get("github_url")?.toString()
    const liveUrl = formData.get("live_url")?.toString()
    const status = formData.get("status")?.toString() || "completed"
    const featured = formData.get("featured") === "on"

    if (!title || !description || !techStack) {
      return { error: "Title, description, and tech stack are required" }
    }

    const supabase = createClient()

    const { error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        tech_stack: techStack.split(",").map((tech) => tech.trim()),
        github_url: githubUrl || null,
        live_url: liveUrl || null,
        status,
        featured,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      return { error: "Failed to update project" }
    }

    revalidatePath("/admin")
    return { success: "Project updated successfully" }
  } catch (error) {
    return { error: "An unexpected error occurred" }
  }
}

export async function deleteProject(id: string) {
  try {
    const supabase = createClient()

    const { error } = await supabase.from("projects").delete().eq("id", id)

    if (error) {
      throw new Error("Failed to delete project")
    }

    revalidatePath("/admin")
    return { success: "Project deleted successfully" }
  } catch (error) {
    throw new Error("An unexpected error occurred")
  }
}
