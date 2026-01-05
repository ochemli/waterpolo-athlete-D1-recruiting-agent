import { useState, useEffect } from 'react'
import universitiesData from './universities-data.json'
import './KnowledgeBase.css'

function KnowledgeBase() {
  const [profile, setProfile] = useState(null)
  const [customInstructions, setCustomInstructions] = useState('')

  useEffect(() => {
    const saved = localStorage.getItem('athleteProfile')
    if (saved) {
      setProfile(JSON.parse(saved))
    }
    const instructions = localStorage.getItem('customInstructions')
    if (instructions) {
      setCustomInstructions(instructions)
    }
  }, [])

  const saveInstructions = () => {
    localStorage.setItem('customInstructions', customInstructions)
    alert('Instructions saved!')
  }

  return (
    <div className="kb-page">
      <div className="kb-header">
        <h1>📚 Knowledge Base</h1>
        <p className="subtitle">Everything the AI agent knows about you</p>
      </div>

      <div className="kb-container">
        <div className="kb-section">
          <h2>🤽‍♀️ Athlete Profile</h2>
          {profile ? (
            <div className="kb-content">
              <div className="kb-item">
                <strong>Name:</strong> {profile.athleteName}
              </div>
              {profile.achievements && (
                <div className="kb-item">
                  <strong>Achievements:</strong>
                  <pre>{profile.achievements}</pre>
                </div>
              )}
              {profile.recentHighlights && (
                <div className="kb-item">
                  <strong>Recent Highlights:</strong>
                  <pre>{profile.recentHighlights}</pre>
                </div>
              )}
              {profile.upcomingEvents && (
                <div className="kb-item">
                  <strong>Upcoming Events:</strong>
                  <pre>{profile.upcomingEvents}</pre>
                </div>
              )}
              {profile.videoLinks && (
                <div className="kb-item">
                  <strong>Video Links:</strong>
                  <pre>{profile.videoLinks}</pre>
                </div>
              )}
              {profile.writingStyle && (
                <div className="kb-item">
                  <strong>Writing Style Sample:</strong>
                  <pre>{profile.writingStyle.substring(0, 200)}...</pre>
                </div>
              )}
            </div>
          ) : (
            <p className="no-data">No profile data yet. Go to "Profile & Updates" to add your information.</p>
          )}
        </div>

        <div className="kb-section">
          <h2>🎓 Target Universities ({universitiesData.length})</h2>
          <div className="uni-list">
            {universitiesData.map(uni => (
              <div key={uni.id} className="uni-item">
                <h4>{uni.name}</h4>
                <p>{uni.coaches.length} coaches | {uni.state}</p>
                {uni.notes && <p className="uni-note">{uni.notes}</p>}
              </div>
            ))}
          </div>
        </div>

        <div className="kb-section">
          <h2>⚙️ Custom Instructions for AI</h2>
          <p className="section-desc">
            Add specific instructions for how the AI should communicate on your behalf.
            These will be used for ALL generated emails and analyses.
          </p>
          <textarea
            value={customInstructions}
            onChange={(e) => setCustomInstructions(e.target.value)}
            placeholder="e.g., Always mention my Canadian National Team experience. Emphasize STEM interests. Keep emails under 150 words. Never use exclamation marks..."
            rows="8"
            className="instructions-input"
          />
          <button onClick={saveInstructions} className="save-btn">
            Save Instructions
          </button>
          {customInstructions && (
            <p className="saved-note">✅ These instructions are active and will be used in all AI responses</p>
          )}
        </div>

        <div className="kb-section">
          <h2>📊 What the AI Knows</h2>
          <div className="data-summary">
            <div className="summary-item">
              <span className="summary-number">{universitiesData.length}</span>
              <span className="summary-label">Universities</span>
            </div>
            <div className="summary-item">
              <span className="summary-number">{universitiesData.reduce((sum, uni) => sum + uni.coaches.length, 0)}</span>
              <span className="summary-label">Coach Contacts</span>
            </div>
            <div className="summary-item">
              <span className="summary-number">{profile?.achievements ? '✓' : '○'}</span>
              <span className="summary-label">Achievements</span>
            </div>
            <div className="summary-item">
              <span className="summary-number">{profile?.writingStyle ? '✓' : '○'}</span>
              <span className="summary-label">Writing Style</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default KnowledgeBase

