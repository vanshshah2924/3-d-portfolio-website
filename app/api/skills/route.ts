import { createClient } from "@/lib/supabase/server"
import { type NextRequest, NextResponse } from "next/server"

export async function GET() {
  try {
    const supabase = createClient()

    const { data: skills, error } = await supabase
      .from("skills")
      .select("*")
      .order("category", { ascending: true })
      .order("proficiency", { ascending: false })

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ skills })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createClient()
    const body = await request.json()

    // Validate required fields
    const { name, category, proficiency } = body
    if (!name || !category || proficiency === undefined) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate proficiency range
    if (proficiency < 0 || proficiency > 100) {
      return NextResponse.json({ error: "Proficiency must be between 0 and 100" }, { status: 400 })
    }

    const { data: skill, error } = await supabase.from("skills").insert([body]).select().single()

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ skill }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
