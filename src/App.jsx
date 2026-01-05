import { useState } from 'react'
import './App.css'

function App() {
  const [formData, setFormData] = useState({
    athleteName: '',
    gradYear: '',
    position: 'Goalie',
    school: '',
    mode: 'draft_email',
    highlights: '',
    videoLink: '',
    coachReply: '',
    ask: '',
    length: 'standard',
    tone: 'direct'
  })
  
  const [output, setOutput] = useState('Fill the form and hit Generate to get started.')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setOutput('Generating your personalized response...')

    try {
      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()
      if (!res.ok) {
        setOutput(`Error ${res.status}:\n${JSON.stringify(data, null, 2)}`)
        return
      }
      setOutput(data.text)
    } catch (err) {
      setOutput('Request failed: ' + err.message)
    } finally {
      setLoading(false)
    }
  }

  const isDraftEmail = formData.mode === 'draft_email'
  const isAnalyzeReply = formData.mode === 'analyze_reply'
  const isUpdateEmail = formData.mode === 'update_email'

  return (
    <div className="app">
      <div className="container">
        <div className="header">
          <div className="header-icon">🤽‍♀️</div>
          <h1>Recruiting Coach AI</h1>
          <p className="subtitle">Draft emails + analyze coach replies. Blunt, clean, D1-focused.</p>
        </div>

        <form onSubmit={handleSubmit} className="form">
          <div className="grid">
            <div className="form-group">
              <label>Athlete Name</label>
              <input
                name="athleteName"
                value={formData.athleteName}
                onChange={handleChange}
                placeholder="e.g., Yasmine Sowka"
                required
              />
            </div>
            <div className="form-group">
              <label>Grad Year</label>
              <input
                name="gradYear"
                value={formData.gradYear}
                onChange={handleChange}
                placeholder="e.g., 2028"
                required
              />
            </div>
          </div>

          <div className="grid">
            <div className="form-group">
              <label>Position</label>
              <select name="position" value={formData.position} onChange={handleChange} required>
                <option value="Goalie">Goalie</option>
                <option value="Field player">Field player</option>
                <option value="Utility">Utility</option>
              </select>
            </div>
            <div className="form-group">
              <label>School / Program</label>
              <input
                name="school"
                value={formData.school}
                onChange={handleChange}
                placeholder="e.g., UCLA"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>What do you need?</label>
            <select name="mode" value={formData.mode} onChange={handleChange} required className="mode-select">
              <option value="draft_email">Draft a coach email</option>
              <option value="analyze_reply">Analyze a coach reply</option>
              <option value="update_email">Draft an update email</option>
            </select>
          </div>

          {(isDraftEmail || isUpdateEmail) && (
            <>
              <div className="form-group">
                <label>Highlights / Update (1–3 bullets)</label>
                <textarea
                  name="highlights"
                  value={formData.highlights}
                  onChange={handleChange}
                  placeholder="e.g., U17 national team selection; tournament results; new video link"
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>YouTube / Highlight Link (optional)</label>
                <input
                  name="videoLink"
                  value={formData.videoLink}
                  onChange={handleChange}
                  placeholder="https://..."
                  type="url"
                />
              </div>

              <div className="form-group">
                <label>Ask (what you want from the coach)</label>
                <input
                  name="ask"
                  value={formData.ask}
                  onChange={handleChange}
                  placeholder="e.g., Quick call? Feedback? Visit timing? Roster need?"
                />
              </div>

              <div className="grid">
                <div className="form-group">
                  <label>Word Count Target</label>
                  <select name="length" value={formData.length} onChange={handleChange}>
                    <option value="short">Short (90–120)</option>
                    <option value="standard">Standard (120–180)</option>
                    <option value="long">Long (180–240)</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Tone</label>
                  <select name="tone" value={formData.tone} onChange={handleChange}>
                    <option value="confident">Confident</option>
                    <option value="ivy">Ivy / Academic</option>
                    <option value="direct">Direct / No Fluff</option>
                  </select>
                </div>
              </div>
            </>
          )}

          {isAnalyzeReply && (
            <div className="form-group analyze-section">
              <label>Coach Reply Text</label>
              <textarea
                name="coachReply"
                value={formData.coachReply}
                onChange={handleChange}
                placeholder="Paste the coach's email reply here..."
                rows="6"
                required
              />
            </div>
          )}

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner"></span>
                Generating...
              </>
            ) : (
              <>
                <span>✨</span>
                Generate
              </>
            )}
          </button>
        </form>

        <div className="output-section">
          <h2>Output</h2>
          <div className={`output ${loading ? 'loading' : ''}`}>
            {output}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App

