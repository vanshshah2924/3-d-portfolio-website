import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"

export default async function AdminPage() {
  // If Supabase is not configured, show setup message
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
          <p className="text-slate-400">Admin panel requires Supabase integration</p>
        </div>
      </div>
    )
  }

  // Check authentication
  const supabase = createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin/login")
  }

  // Fetch dashboard data
  const [projectsResult, skillsResult, aboutResult, contactResult] = await Promise.all([
    supabase
      .from("projects")
      .select("id, title, status, featured, created_at")
      .order("created_at", { ascending: false }),
    supabase.from("skills").select("id, name, category, proficiency").order("proficiency", { ascending: false }),
    supabase.from("about_info").select("id, section, title").order("section"),
    supabase
      .from("contact_submissions")
      .select("id, name, email, status, created_at")
      .order("created_at", { ascending: false }),
  ])

  const dashboardData = {
    projects: projectsResult.data || [],
    skills: skillsResult.data || [],
    aboutInfo: aboutResult.data || [],
    contactSubmissions: contactResult.data || [],
    user,
  }

  return <AdminDashboard data={dashboardData} />
}
