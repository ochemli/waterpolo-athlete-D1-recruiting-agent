import { useState, useRef, useEffect } from 'react'
import universitiesData from './universities-data.json'
import './ChatAssistant.css'

function ChatAssistant() {
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [additionalInfo, setAdditionalInfo] = useState({
    universities: '',
    academics: '',
    tournaments: '',
    stats: '',
    events: '',
    other: ''
  })
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Load saved additional info
    const saved = localStorage.getItem('additionalAthleteInfo')
    if (saved) {
      setAdditionalInfo(JSON.parse(saved))
    }
  }, [])

  const handleInfoChange = (field, value) => {
    setAdditionalInfo(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const saveAdditionalInfo = () => {
    localStorage.setItem('additionalAthleteInfo', JSON.stringify(additionalInfo))
    alert('Information saved! This will help me provide more personalized assistance.')
  }

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
      const additionalInfoData = localStorage.getItem('additionalAthleteInfo')
      const additionalAthleteInfo = additionalInfoData ? JSON.parse(additionalInfoData) : null

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

ADDITIONAL ATHLETE INFORMATION:
${additionalAthleteInfo ? `
Universities Contacted: ${additionalAthleteInfo.universities || 'Not provided'}
Academic Info: ${additionalAthleteInfo.academics || 'Not provided'}
Recent Tournaments: ${additionalAthleteInfo.tournaments || 'Not provided'}
Stats & Achievements: ${additionalAthleteInfo.stats || 'Not provided'}
Upcoming Events: ${additionalAthleteInfo.events || 'Not provided'}
Other Notes: ${additionalAthleteInfo.other || 'Not provided'}
` : 'No additional information provided yet'}

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
      <div className="chat-container">
        <div className="chat-header-section">
          <h2>Ask Me Anything</h2>
          <p className="chat-description">
            Ask about your profile, universities, recruiting steps, how to contact coaches, and more.
          </p>
          
          <form onSubmit={handleSubmit} className="chat-input-form-top">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything... e.g., 'I just emailed UCLA coach, how do I log it?'"
              disabled={loading}
              className="chat-input-top"
            />
            <button type="submit" disabled={loading || !input.trim()} className="chat-send-btn-top">
              Send
            </button>
          </form>

          <div className="chat-suggestions-top">
            <p className="suggestions-title-top">Try asking:</p>
            <div className="suggestions-list-top">
              <button onClick={() => setInput("UCLA program & STEM")}>UCLA program & STEM</button>
              <button onClick={() => setInput("Follow-up advice")}>Follow-up advice</button>
              <button onClick={() => setInput("Email content help")}>Email content help</button>
              <button onClick={() => setInput("Compare programs")}>Compare programs</button>
              <button onClick={() => setInput("My strengths")}>My strengths</button>
            </div>
          </div>
        </div>

        <div className="chat-messages">
          {messages.length === 0 && (
            <div className="empty-state">
              <p>No messages yet. Ask a question above to get started!</p>
            </div>
          )}
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

        <div className="tell-me-more-section">
          <h3>Tell Me More About You</h3>
          <p className="section-subtitle">
            Share information about yourself to help me get to know you better. This allows me to tailor my responses 
            specifically to your situation, provide more relevant advice, and be most helpful in your recruiting journey.
          </p>
          
          <div className="info-form">
            <div className="info-field">
              <label>Universities You've Contacted</label>
              <textarea
                value={additionalInfo.universities}
                onChange={(e) => handleInfoChange('universities', e.target.value)}
                placeholder="List universities you've reached out to and any responses you've received..."
                rows="3"
              />
              <span className="field-hint">Example: Emailed UCLA coach on Dec 1st, got positive response. Waiting to hear back from Harvard.</span>
            </div>

            <div className="info-field">
              <label>Test Scores & Academic Info</label>
              <textarea
                value={additionalInfo.academics}
                onChange={(e) => handleInfoChange('academics', e.target.value)}
                placeholder="Share your GPA, SAT/ACT scores, class rank, academic interests..."
                rows="3"
              />
              <span className="field-hint">Example: GPA 3.8, SAT 1450, interested in STEM programs, especially bioengineering.</span>
            </div>

            <div className="info-field">
              <label>Recent Tournaments & Results</label>
              <textarea
                value={additionalInfo.tournaments}
                onChange={(e) => handleInfoChange('tournaments', e.target.value)}
                placeholder="Paste tournament results, stats, achievements, team placements..."
                rows="3"
              />
              <span className="field-hint">Example: JOs Silver Medal, 15 saves in championship game, named tournament MVP.</span>
            </div>

            <div className="info-field">
              <label>Athletic Stats & Achievements</label>
              <textarea
                value={additionalInfo.stats}
                onChange={(e) => handleInfoChange('stats', e.target.value)}
                placeholder="Share your key stats, awards, records, special achievements..."
                rows="3"
              />
              <span className="field-hint">Example: Team captain, 70% save rate, Youth National Team member, Leadership Award winner.</span>
            </div>

            <div className="info-field">
              <label>Upcoming Events & Schedule</label>
              <textarea
                value={additionalInfo.events}
                onChange={(e) => handleInfoChange('events', e.target.value)}
                placeholder="List upcoming tournaments, showcases, camps you're attending..."
                rows="3"
              />
              <span className="field-hint">Example: National Development Camp Jan 11-14, NCL Montreal Jan 16-18, Spring JOs in April.</span>
            </div>

            <div className="info-field">
              <label>Anything Else Important</label>
              <textarea
                value={additionalInfo.other}
                onChange={(e) => handleInfoChange('other', e.target.value)}
                placeholder="Share anything else that helps me understand you better - goals, challenges, preferences..."
                rows="3"
              />
              <span className="field-hint">Example: Looking for schools with strong environmental science programs on the East Coast.</span>
            </div>

            <button onClick={saveAdditionalInfo} className="save-info-btn">Save Information</button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatAssistant

