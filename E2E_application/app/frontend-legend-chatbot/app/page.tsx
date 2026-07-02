"use client"

import { useState } from "react"
import Image from "next/image"
import { BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type FigureId = "czech_history" | "charles_iv" | "jan_hus" | "masaryk"

interface Figure {
  id: FigureId
  name: string
  title: string
  era: string
  image?: string
  accent: string
  accentLight: string
  accentText: string
  border: string
  ring: string
  intro: string
  greeting: string
  suggestions: string[]
}

interface ChatMessage {
  id: string
  text: string
  sender: "user" | "figure"
  timestamp: Date
}

const FIGURES: Figure[] = [
  {
    id: "czech_history",
    name: "Czech History",
    title: "Your guide through the sweep of Czech history",
    era: "Great Moravia — today",
    accent: "bg-emerald-800",
    accentLight: "bg-emerald-50",
    accentText: "text-emerald-800",
    border: "border-emerald-600",
    ring: "ring-emerald-400/40",
    intro:
      "Explore timelines, themes, and turning points across Czech history — from Great Moravia to the modern era.",
    greeting:
      "Welcome! Ask me about any era, event, or theme in Czech history. I'll help you connect the dots and dig deeper.",
    suggestions: [
      "What are the most important eras in Czech history?",
      "How did the Hussite movement change Bohemia?",
      "Why is 1918 such a key year for Czechs?",
    ],
  },
  {
    id: "charles_iv",
    name: "Charles IV",
    title: "Holy Roman Emperor & King of Bohemia",
    era: "1316–1378",
    image: "/images/CharlesIV.png",
    accent: "bg-amber-800",
    accentLight: "bg-amber-50",
    accentText: "text-amber-900",
    border: "border-amber-600",
    ring: "ring-amber-400/40",
    intro:
      "Step into Prague's Golden Age — Charles University, Charles Bridge, and life at the heart of a medieval empire.",
    greeting:
      "Greetings, young scholar. I am Charles — ask me about Prague, my empire, or the world I sought to build.",
    suggestions: [
      "Why did you found Charles University?",
      "What was Prague like in your time?",
      "Tell me about Charles Bridge.",
    ],
  },
  {
    id: "jan_hus",
    name: "Jan Hus",
    title: "Bohemian Reformer & Priest",
    era: "c. 1370–1415",
    image: "/images/JanHus.png",
    accent: "bg-stone-700",
    accentLight: "bg-stone-100",
    accentText: "text-stone-800",
    border: "border-stone-500",
    ring: "ring-stone-400/40",
    intro:
      "Hear about church reform, preaching in Czech, and standing firm for what you believe — even when the cost is high.",
    greeting:
      "Peace to you. I am Hus. Ask what you will about faith, reform, and the Bohemia I knew.",
    suggestions: [
      "Why did you criticize the Church?",
      "What did you want to change?",
      "What happened at the Council of Constance?",
    ],
  },
  {
    id: "masaryk",
    name: "Tomáš Garrigue Masaryk",
    title: "First President of Czechoslovakia",
    era: "1850–1937",
    image: "/images/TGMasaryk.png",
    accent: "bg-blue-900",
    accentLight: "bg-blue-50",
    accentText: "text-blue-900",
    border: "border-blue-700",
    ring: "ring-blue-400/40",
    intro:
      "Discuss Czechoslovak independence, democracy, nation-building, and the ideals that shaped a new republic.",
    greeting:
      "Good day. I am Masaryk. Ask me about independence, democracy, or the nation we set out to build together.",
    suggestions: [
      "How did Czechoslovakia become independent?",
      "What does democracy mean to you?",
      "Who was Charlotte Garrigue?",
    ],
  },
]

function FigurePortrait({
  figure,
  size = "md",
  className = "",
}: {
  figure: Figure
  size?: "sm" | "md" | "lg" | "xl"
  className?: string
}) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-24 h-24",
    xl: "w-full h-full",
  }

  const iconSizes = {
    sm: "w-4 h-4",
    md: "w-6 h-6",
    lg: "w-10 h-10",
    xl: "w-16 h-16",
  }

  if (figure.image) {
    return (
      <div className={`relative overflow-hidden rounded-xl ${sizeClasses[size]} ${className}`}>
        <Image
          src={figure.image}
          alt={figure.name}
          fill
          className="object-cover object-top"
          sizes={size === "xl" ? "200px" : size === "lg" ? "96px" : "48px"}
        />
      </div>
    )
  }

  return (
    <div
      className={`flex items-center justify-center rounded-xl ${figure.accent} text-white ${sizeClasses[size]} ${className}`}
    >
      <BookOpen className={iconSizes[size]} />
    </div>
  )
}

export default function LegendChatbotApp() {
  const [selectedFigure, setSelectedFigure] = useState<FigureId>("charles_iv")
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState("")
  const [isChatLoading, setIsChatLoading] = useState(false)

  const activeFigure = FIGURES.find((f) => f.id === selectedFigure)!

  const switchFigure = (figureId: FigureId) => {
    setSelectedFigure(figureId)
    setChatMessages([])
    setChatInput("")
  }

  const sendChatMessage = async (text?: string) => {
    const messageText = (text ?? chatInput).trim()
    if (!messageText || isChatLoading) return

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: messageText,
      sender: "user",
      timestamp: new Date(),
    }

    setChatMessages((prev) => [...prev, userMessage])
    setChatInput("")
    setIsChatLoading(true)

    const history = chatMessages.map((msg) => ({
      role: msg.sender === "user" ? "user" : "assistant",
      content: msg.text,
    }))

    try {
      const response = await fetch("/api/history-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          figure: selectedFigure,
          history,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to get a response")
      }

      const data = await response.json()

      const figureMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: data.reply,
        sender: "figure",
        timestamp: new Date(),
      }

      setChatMessages((prev) => [...prev, figureMessage])
    } catch (error) {
      console.error("Error chatting with historical figure:", error)
      const errorMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: "I cannot reach you clearly right now. Please try again in a moment.",
        sender: "figure",
        timestamp: new Date(),
      }
      setChatMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsChatLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-32 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-80 h-80 bg-amber-500/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-slate-700/50 to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-4 py-6 md:py-10">
        <header className="text-center mb-8 md:mb-10">
          <p className="text-emerald-400 text-xs font-semibold uppercase tracking-[0.2em] mb-2">
            Storytelling meets education
          </p>
          <h1 className="text-4xl md:text-5xl font-bold font-serif text-white tracking-tight">
            Legend Chatbot
          </h1>
          <p className="mt-3 text-slate-400 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Click a character to start a conversation. Each voice answers from their own knowledge
            and worldview — history as a dialogue, not a lecture.
          </p>
        </header>

        <section className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 mb-4 text-center">
            Choose your conversation partner
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {FIGURES.map((figure) => {
              const isActive = selectedFigure === figure.id
              return (
                <button
                  key={figure.id}
                  onClick={() => switchFigure(figure.id)}
                  className={`group relative rounded-2xl overflow-hidden border-2 transition-all duration-200 text-left ${
                    isActive
                      ? `${figure.border} ring-2 ${figure.ring} shadow-xl scale-[1.02]`
                      : "border-slate-800 hover:border-slate-600 opacity-80 hover:opacity-100"
                  }`}
                >
                  <div className="aspect-[3/4] relative bg-slate-900">
                    {figure.image ? (
                      <Image
                        src={figure.image}
                        alt={figure.name}
                        fill
                        className="object-cover object-top transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 25vw"
                        priority={figure.id === "charles_iv"}
                      />
                    ) : (
                      <div
                        className={`absolute inset-0 flex flex-col items-center justify-center gap-3 ${figure.accent}`}
                      >
                        <BookOpen className="w-12 h-12 text-white/90" />
                        <span className="text-white/80 text-xs font-medium px-3 text-center">
                          History Guide
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-3">
                      <h2 className="font-bold font-serif text-white text-sm md:text-base leading-tight">
                        {figure.name}
                      </h2>
                      <p className="text-white/70 text-xs mt-0.5">{figure.era}</p>
                    </div>
                    {isActive && (
                      <div className="absolute top-2 right-2 w-3 h-3 rounded-full bg-white shadow-lg" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        <main>
          <div className="rounded-2xl border border-slate-800 bg-white shadow-2xl overflow-hidden">
            <div className={`${activeFigure.accent} text-white px-5 py-4 flex items-center gap-4`}>
              <FigurePortrait figure={activeFigure} size="lg" className="ring-2 ring-white/30 flex-shrink-0" />
              <div>
                <h2 className="text-xl font-bold font-serif">{activeFigure.name}</h2>
                <p className="text-white/75 text-sm">
                  {activeFigure.title} · {activeFigure.era}
                </p>
              </div>
            </div>

            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200">
              <p className="text-slate-600 text-sm leading-relaxed">{activeFigure.intro}</p>
              <div className="flex flex-wrap gap-2 mt-3">
                {activeFigure.suggestions.map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => sendChatMessage(suggestion)}
                    disabled={isChatLoading}
                    className="text-xs px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-600 hover:border-slate-400 hover:bg-slate-100 transition-colors disabled:opacity-50"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="hidden md:flex flex-col items-center justify-start w-44 flex-shrink-0 bg-slate-50 border-r border-slate-200 p-4">
                <div className="w-32 h-40 relative rounded-xl overflow-hidden shadow-md ring-2 ring-slate-200">
                  <FigurePortrait figure={activeFigure} size="xl" className="rounded-xl" />
                </div>
                <p className={`mt-3 text-center text-sm font-semibold ${activeFigure.accentText}`}>
                  {activeFigure.name}
                </p>
                <p className="text-slate-400 text-xs text-center mt-1">{activeFigure.era}</p>
              </div>

              <div className="flex-1 min-w-0">
                <div className="h-[380px] md:h-[420px] overflow-y-auto p-5 space-y-4 bg-white">
                  {chatMessages.length === 0 && (
                    <div className="text-center py-12 px-4">
                      <div className="md:hidden mx-auto w-28 h-36 relative rounded-xl overflow-hidden shadow-md mb-4">
                        <FigurePortrait figure={activeFigure} size="xl" className="rounded-xl" />
                      </div>
                      <p className="text-slate-700 text-base leading-relaxed max-w-md mx-auto">
                        {activeFigure.greeting}
                      </p>
                      <p className="text-slate-400 text-sm mt-3">
                        Pick a suggested question above, or type your own below.
                      </p>
                    </div>
                  )}

                  {chatMessages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-2 ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      {message.sender === "figure" && (
                        <FigurePortrait figure={activeFigure} size="sm" className="flex-shrink-0 mt-1" />
                      )}
                      <div
                        className={`max-w-[85%] px-4 py-3 rounded-2xl ${
                          message.sender === "user"
                            ? "bg-slate-800 text-white rounded-br-sm"
                            : `${activeFigure.accentLight} text-slate-800 rounded-bl-sm border border-slate-200`
                        }`}
                      >
                        {message.sender === "figure" && (
                          <span className={`font-semibold text-xs block mb-1.5 ${activeFigure.accentText}`}>
                            {activeFigure.name}
                          </span>
                        )}
                        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.text}</p>
                      </div>
                    </div>
                  ))}

                  {isChatLoading && (
                    <div className="flex justify-start gap-2">
                      <FigurePortrait figure={activeFigure} size="sm" className="flex-shrink-0 mt-1" />
                      <div
                        className={`${activeFigure.accentLight} px-4 py-3 rounded-2xl rounded-bl-sm border border-slate-200`}
                      >
                        <div className="flex gap-1 text-slate-500">
                          <span className="animate-bounce">·</span>
                          <span className="animate-bounce" style={{ animationDelay: "0.2s" }}>
                            ·
                          </span>
                          <span className="animate-bounce" style={{ animationDelay: "0.4s" }}>
                            ·
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="border-t border-slate-200 p-4 bg-slate-50">
                  <div className="flex gap-2">
                    <Input
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && !isChatLoading && sendChatMessage()}
                      placeholder={`Ask ${activeFigure.name} anything...`}
                      className="flex-1 border-slate-200 bg-white text-slate-900 placeholder:text-slate-400 h-11 text-sm rounded-lg"
                      disabled={isChatLoading}
                    />
                    <Button
                      onClick={() => sendChatMessage()}
                      disabled={isChatLoading || !chatInput.trim()}
                      className={`h-11 px-5 ${activeFigure.accent} hover:opacity-90 text-white rounded-lg shadow-sm disabled:opacity-50 font-semibold`}
                    >
                      Send
                    </Button>
                  </div>
                  <p className="text-slate-400 text-xs mt-2 text-center">
                    AI-generated responses in each voice. Verify important facts with your teacher or
                    textbook.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center mt-10 text-slate-600 text-xs">
          <p>Legend Chatbot · Czech History · Charles IV · Jan Hus · Tomáš Garrigue Masaryk</p>
        </footer>
      </div>
    </div>
  )
}
