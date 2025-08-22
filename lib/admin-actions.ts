"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

// Admin sign in action
export async function adminSignIn(prevState: any, formData: FormData) {
  // Check if formData is valid
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")

  // Validate required fields
  if (!email || !password) {
    return { error: "Email and password are required" }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString(),
      password: password.toString(),
    })

    if (error) {
      return { error: error.message }
    }

    // Return success instead of redirecting directly
    return { success: true }
  } catch (error) {
    console.error("Admin login error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Admin sign up action (for creating new admin accounts)
export async function adminSignUp(prevState: any, formData: FormData) {
  // Check if formData is valid
  if (!formData) {
    return { error: "Form data is missing" }
  }

  const email = formData.get("email")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  // Validate required fields
  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required" }
  }

  // Validate password match
  if (password !== confirmPassword) {
    return { error: "Passwords do not match" }
  }

  // Validate password strength
  if (password.toString().length < 8) {
    return { error: "Password must be at least 8 characters long" }
  }

  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  try {
    const { error } = await supabase.auth.signUp({
      email: email.toString(),
      password: password.toString(),
      options: {
        emailRedirectTo:
          process.env.NEXT_PUBLIC_DEV_SUPABASE_REDIRECT_URL ||
          `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/admin`,
      },
    })

    if (error) {
      return { error: error.message }
    }

    return { success: "Admin account created successfully. Check your email to confirm your account." }
  } catch (error) {
    console.error("Admin sign up error:", error)
    return { error: "An unexpected error occurred. Please try again." }
  }
}

// Admin sign out action
export async function adminSignOut() {
  const cookieStore = cookies()
  const supabase = createServerActionClient({ cookies: () => cookieStore })

  await supabase.auth.signOut()
  redirect("/admin/login")
}
