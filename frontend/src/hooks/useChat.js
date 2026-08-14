import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

const welcomeMessages = {
  recruiter: "Hi! I am Sandeep's AI assistant. I see you are a recruiter — feel free to ask me about his skills, projects, experience, or how to get in touch with him.",
  student: "Hi! Great to meet a fellow student! Ask me anything about Sandeep's projects, tech stack, or his experience with hackathons and internships.",
  friend: "Hey! Sandeep says hi! Feel free to ask me anything about what he has been building lately.",
}

export function useChat() {
  const [identity, setIdentity] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const initializeChat = (selectedIdentity) => {
    setIdentity(selectedIdentity)
    setMessages([
      {
        role: 'model',
        content: welcomeMessages[selectedIdentity],
      },
    ])
  }

  const sendMessage = async (userMessage) => {
    const previousMessages = [...messages]
    const userMsg = { role: 'user', content: userMessage }
    setMessages((prev) => [...prev, userMsg])
    setLoading(true)

    const isFirstUserMessage = previousMessages.filter((m) => m.role === 'user').length === 0
    const contextualMessage = isFirstUserMessage && identity
      ? `[Visitor type: ${identity}] ${userMessage}`
      : userMessage

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: contextualMessage,
          history: previousMessages.slice(-6),
        }),
      })

      if (!res.ok) throw new Error('Failed')

      const data = await res.json()
      setMessages((prev) => [...prev, { role: 'model', content: data.response }])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'model', content: 'Something went wrong. Please try again.' },
      ])
    } finally {
      setLoading(false)
    }
  }

  const clearMessages = () => {
    setMessages([
      {
        role: 'model',
        content: welcomeMessages[identity] || "Hi! I am Sandeep's AI assistant. Ask me anything about his projects, skills, or experience.",
      },
    ])
  }

  return { messages, loading, sendMessage, clearMessages, initializeChat, identity }
}