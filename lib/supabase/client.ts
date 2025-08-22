import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

// Check if Supabase environment variables are available
export const isSupabaseConfigured =
  typeof process.env.NEXT_PUBLIC_SUPABASE_URL === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_URL.length > 0 &&
  typeof process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY === "string" &&
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 0

// Create a singleton instance of the Supabase client for Client Components
export const supabase = createClientComponentClient()

// Database types
export interface Project {
  id: string
  title: string
  description: string
  tech_stack: string[]
  github_url?: string
  live_url?: string
  image_url?: string
  status: string
  featured: boolean
  created_at: string
  updated_at: string
}

export interface Skill {
  id: string
  name: string
  category: "frontend" | "backend" | "devops"
  proficiency: number
  icon?: string
  created_at: string
  updated_at: string
}

export interface AboutInfo {
  id: string
  section: "personal" | "education" | "experience"
  title: string
  content: string
  order_index: number
  created_at: string
  updated_at: string
}

export interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  status: "unread" | "read" | "replied"
  created_at: string
}
