import { createClient } from "@/lib/supabase/server"
import HomePageClient from "@/components/home-page-client"

export default async function HomePage() {
  const supabase = createClient()

  // Fetch all portfolio data
  const [projectsResult, skillsResult, aboutResult] = await Promise.all([
    supabase.from("projects").select("*").eq("featured", true).order("created_at", { ascending: false }).limit(4),
    supabase.from("skills").select("*").order("proficiency", { ascending: false }),
    supabase.from("about_info").select("*").order("section").order("order_index"),
  ])

  const portfolioData = {
    projects: projectsResult.data || [],
    skills: skillsResult.data || [],
    aboutInfo: aboutResult.data || [],
  }

  return <HomePageClient data={portfolioData} />
}
