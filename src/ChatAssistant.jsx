import { useState, useRef, useEffect } from 'react'
import universitiesData from './universities-data.json'
import './ChatAssistant.css'

function ChatAssistant() {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: "Hi! I'm your recruiting assistant. I can help you:\n\n• Add or update profile information\n• Log communications with universities\n• Get advice on recruiting strategy\n• Draft email content\n• Answer questions about your target schools\n\nWhat would you like to do?"
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!input.trim() || loading) return

    const userMessage = input.trim()
    setInput('')
    
    // Add user message
    setMessages(prev => [...prev, { role: 'user', content: userMessage }])
    setLoading(true)

    try {
      // Get profile and custom instructions
      const profileData = localStorage.getItem('athleteProfile')
      const profile = profileData ? JSON.parse(profileData) : null
      const customInstructions = localStorage.getItem('customInstructions') || ''
      const communications = localStorage.getItem('universityCommunications') || '{}'

      // Build context for the AI
      const systemContext = `You are a helpful recruiting assistant for NCAA D1 water polo athlete Yasmine Sowka.

AVAILABLE ACTIONS:
- Answer questions about recruiting strategy
- Provide information about the ${universitiesData.length} target universities
- Help draft email content
- Give advice on next steps
- Explain interest levels and communication timing

ATHLETE PROFILE:
${profile ? JSON.stringify(profile, null, 2) : 'No profile data yet'}

TARGET UNIVERSITIES: ${universitiesData.map(u => u.name).join(', ')}

When the user wants to ADD data (like logging a communication), respond with:
1. Confirm you understand what they want to add
2. Ask for any missing details
3. Provide a structured summary they can copy/paste into the appropriate form

Be conversational, helpful, and concise. If they ask to draft an email, use the profile data and be specific.`

      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'chat',
          chatHistory: messages,
          userMessage,
          profile,
          customInstructions,
          systemContext
        })
      })

      const data = await res.json()
      
      if (res.ok) {
        setMessages(prev => [...prev, { role: 'assistant', content: data.text }])
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `Error: ${data.error?.message || 'Failed to get response'}` 
        }])
      }
    } catch (err) {
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: `Error: ${err.message}` 
      }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="chat-page">
      <div className="chat-header">
        <h1>Chat Assistant</h1>
        <p className="subtitle">Ask questions, get advice, or manage your recruiting data</p>
      </div>

      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`message ${msg.role}`}>
              <div className="message-label">
                {msg.role === 'user' ? 'You' : 'Assistant'}
              </div>
              <div className="message-content">
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="message assistant">
              <div className="message-label">Assistant</div>
              <div className="message-content typing">
                <span></span><span></span><span></span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className="chat-input-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything... e.g., 'I just emailed UCLA coach, how do I log it?'"
            disabled={loading}
            className="chat-input"
          />
          <button type="submit" disabled={loading || !input.trim()} className="chat-send-btn">
            Send
          </button>
        </form>

        <div className="chat-suggestions">
          <p className="suggestions-title">Try asking:</p>
          <div className="suggestions-list">
            <button onClick={() => setInput("How should I follow up with Harvard?")}>
              Follow-up advice
            </button>
            <button onClick={() => setInput("What should I include in my next email to UCLA?")}>
              Email content help
            </button>
            <button onClick={() => setInput("Tell me about UC Berkeley's program")}>
              School information
            </button>
            <button onClick={() => setInput("I got a reply from Stanford, what does interest level B mean?")}>
              Interest level info
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatAssistant

