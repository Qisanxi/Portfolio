import { useState } from 'react'

const API_URL = import.meta.env.VITE_API_URL

const welcomeMessages = {
  recruiter: "Hi! I am Sandeep's AI assistant. I see you are a recruiter — feel free to ask me about his skills, projects, experience, or how to get in touch. He is actively seeking entry-level roles in backend development and AI engineering.",
  student: "Hi! Great to connect with a fellow developer! Ask me anything about Sandeep's projects like DueAlert or AutoPost, his tech stack, or his hackathon experience.",
  friend: "Hey! Sandeep says hi! Feel free to ask me anything about what he has been building lately.",
}

export function useChat() {
  const [identity, setIdentity] = useState('')
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(false)

  const initializeChat = (selectedIdentity) => {
    setIdentity(selectedIdentity)
    setMessages([{ role: 'model', content: welcomeMessages[selectedIdentity] }])
  }

  const sendMessage = async (userMessage) => {
    const previousMessages = [...messages]
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/api/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage,
          history: previousMessages.slice(-6),
          identity,               // sent every request — backend bakes it into system prompt
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
    setMessages([{
      role: 'model',
      content: welcomeMessages[identity] || "Hi! I am Sandeep's AI assistant. Ask me anything about his projects, skills, or experience.",
    }])
  }

  return { messages, loading, sendMessage, clearMessages, initializeChat, identity }
}
