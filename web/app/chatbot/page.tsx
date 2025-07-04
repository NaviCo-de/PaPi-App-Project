"use client"

import { useState, useRef, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Menu, Send, Home, MessageSquare, User } from "lucide-react"
import Image from "next/image"

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

interface ChatHistory {
  id: string
  title: string
  lastMessage: string
  timestamp: Date
}

export default function ChatbotPage() {
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputText, setInputText] = useState("")
  const [showHistory, setShowHistory] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const chatHistory: ChatHistory[] = [
    {
      id: "1",
      title: "Riwayat",
      lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: new Date(),
    },
    {
      id: "2",
      title: "Chat Sebelumnya",
      lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: new Date(),
    },
    {
      id: "3",
      title: "Pertanyaan Tanaman",
      lastMessage: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      timestamp: new Date(),
    },
  ]

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (inputText.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])
      setInputText("")

      // Simulate bot response
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.",
          isUser: false,
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1000)
    }
  }

  const handleBack = () => {
    router.back()
  }

  return (
    <div className="min-h-screen max-w-md mx-auto bg-white relative overflow-hidden">
      {/* Header */}
      <div className="bg-[#658100] px-6 py-4 flex items-center justify-between relative z-20">
        <div className="flex items-center">
          <button onClick={handleBack} className="mr-4">
            <ArrowLeft className="w-6 h-6 text-white" />
          </button>
          <div className="flex items-center space-x-3">
            <Image src="/Logo Chatbot.svg" alt="Chatbot" width={24} height={24} className="w-6 h-6" />
            <h1 className="text-lg font-semibold text-white">Chatbot</h1>
          </div>
        </div>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="p-2 hover:bg-[#689F38] rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6 text-white" />
        </button>
      </div>

      {/* Chat History Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-30 ${
          showHistory ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="bg-[#658100] px-6 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold text-white">Riwayat</h2>
            <button
              onClick={() => setShowHistory(false)}
              className="p-2 hover:bg-[#689F38] rounded-lg transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>

        <div className="p-4 space-y-3 h-full overflow-y-auto pb-24">
          {chatHistory.map((chat) => (
            <div
              key={chat.id}
              className="p-4 bg-gray-50 rounded-xl border border-gray-200 cursor-pointer hover:bg-gray-100 transition-colors"
            >
              <h3 className="font-semibold text-gray-800 mb-2">{chat.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{chat.lastMessage}</p>
              <p className="text-xs text-gray-500 mt-2">{chat.timestamp.toLocaleDateString("id-ID")}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Overlay */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20" onClick={() => setShowHistory(false)} />
      )}

      {/* Messages Area */}
      <div className="flex-1 p-6 pb-32 space-y-4 min-h-[calc(100vh-140px)] overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-[80%] p-4 rounded-2xl ${
                message.isUser ? "bg-[#658100] text-white rounded-br-md" : "bg-gray-100 text-gray-800 rounded-bl-md"
              }`}
            >
              <p className="text-sm leading-relaxed">{message.text}</p>
              <p className={`text-xs mt-2 ${message.isUser ? "text-green-100" : "text-gray-500"}`}>
                {message.timestamp.toLocaleTimeString("id-ID", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 w-full max-w-md px-6 py-4 bg-white border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Tulis di sini..."
            className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#658100] focus:border-transparent"
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-3 bg-[#658100] hover:bg-[#689F38] disabled:bg-gray-300 text-white rounded-xl transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t-2 border-gray-200 px-6 py-4">
        <div className="flex justify-around">
          <button onClick={() => router.push("/home")} className="flex flex-col items-center space-y-1">
            <Home className="w-7 h-7 text-gray-400" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <Image src="/Logo Chatbot.svg" alt="Chatbot" width={28} height={28} className="w-7 h-7" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <MessageSquare className="w-7 h-7 text-gray-400" />
          </button>
          <button className="flex flex-col items-center space-y-1">
            <User className="w-7 h-7 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  )
}
