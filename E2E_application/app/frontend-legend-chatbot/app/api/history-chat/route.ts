import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, figure, history } = body

    if (!message) {
      return NextResponse.json({ error: "Message is required" }, { status: 400 })
    }

    if (!figure) {
      return NextResponse.json({ error: "Historical figure is required" }, { status: 400 })
    }

    const backendBaseUrl = (process.env.NEXT_PUBLIC_BACKEND_URL || "http://127.0.0.1:8000").replace(/\/$/, "")
    const backendUrl = `${backendBaseUrl}/api/chat`

    const response = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message, figure, history: history ?? [] }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`Backend returned ${response.status}: ${errorText}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error in history-chat API route:", error)
    return NextResponse.json(
      {
        error: "Failed to reach Legend Chatbot",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
