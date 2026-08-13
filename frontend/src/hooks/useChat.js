import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

export function useChat() {
  const [messages, setMessages] = useState([
    {
      role: 'model',
      content: "Hi! I am Sandeep's AI assistant. Ask me anything about his projects, skills, or experience.",
    },
  ])
  const [loading, setLoading] = useState(false)

  const sendMessage = async (userMessage) => {
    const userMsg = { role: 'user', content: userMessage }
    const updatedMessages = [...messages, userMsg]
    setMessages(updatedMessages)
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: updatedMessages.slice(-6),
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
        content: "Hi! I am Sandeep's AI assistant. Ask me anything about his projects, skills, or experience.",
      },
    ])
  }

  return { messages, loading, sendMessage, clearMessages }
}