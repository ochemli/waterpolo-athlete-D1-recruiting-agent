import { useState, useEffect } from 'react'
import profileDataSample from '../yasmine-profile-data.json'
import './ProfilePage.css'

function ProfilePage() {
  const [profile, setProfile] = useState({
    athleteName: 'Yasmine Sowka',
    profileUrl: 'https://sites.google.com/view/yasmine-sowka-water-polo',
    achievements: '',
    strengths: '',
    writingStyle: '',
    recentHighlights: '',
    coachReplies: '',
    upcomingEvents: '',
    videoLinks: ''
  })
  
  const [customInstructions, setCustomInstructions] = useState('')
  const [scanning, setScanning] = useState(false)
  const [lastScanned, setLastScanned] = useState(null)

  useEffect(() => {
    // Load saved profile from localStorage
    const saved = localStorage.getItem('athleteProfile')
    if (saved) {
      setProfile(JSON.parse(saved))
    }
    const lastScan = localStorage.getItem('lastScanned')
    if (lastScan) {
      setLastScanned(new Date(lastScan))
    }
    // Load custom instructions
    const savedInstructions = localStorage.getItem('customInstructions')
    if (savedInstructions) {
      setCustomInstructions(savedInstructions)
    }
  }, [])

  const handleChange = (e) => {
    const updated = { ...profile, [e.target.name]: e.target.value }
    setProfile(updated)
    localStorage.setItem('athleteProfile', JSON.stringify(updated))
  }

  const loadSampleData = () => {
    const updated = { ...profile, ...profileDataSample }
    setProfile(updated)
    localStorage.setItem('athleteProfile', JSON.stringify(updated))
    alert('Sample data loaded successfully!')
  }

  const saveCustomInstructions = () => {
    localStorage.setItem('customInstructions', customInstructions)
    alert('Instructions saved! The AI will use these when generating emails.')
  }

  const scanProfile = async () => {
    setScanning(true)
    try {
      const res = await fetch('/api/scan-profile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: profile.profileUrl })
      })
      const data = await res.json()
      if (res.ok) {
        const updated = {
          ...profile,
          achievements: data.achievements || profile.achievements,
          recentHighlights: data.highlights || profile.recentHighlights,
          upcomingEvents: data.events || profile.upcomingEvents
        }
        setProfile(updated)
        localStorage.setItem('athleteProfile', JSON.stringify(updated))
        setLastScanned(new Date())
        localStorage.setItem('lastScanned', new Date().toISOString())
        alert('Profile scanned successfully!')
      } else {
        alert('Scan feature coming soon! For now, paste info manually.')
      }
    } catch (err) {
      alert('Scan feature coming soon! For now, paste info manually.')
    } finally {
      setScanning(false)
    }
  }

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="scan-section">
          <h2>Profile Scanner</h2>
          <div className="scan-box">
            <label>Profile URL</label>
            <input
              name="profileUrl"
              value={profile.profileUrl}
              onChange={handleChange}
              placeholder="https://sites.google.com/view/..."
            />
            <div className="button-group">
              <button 
                onClick={scanProfile} 
                disabled={scanning}
                className="scan-btn"
              >
                {scanning ? '🔄 Scanning...' : '🔍 Scan for Updates'}
              </button>
              <button 
                onClick={loadSampleData} 
                className="load-sample-btn"
              >
                📋 Load Sample Data
              </button>
            </div>
            {lastScanned && (
              <p className="last-scanned">
                Last scanned: {lastScanned.toLocaleDateString()} at {lastScanned.toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>

        <div className="profile-section">
          <h2>📝 Athlete Information</h2>
          
          <div className="form-group">
            <label>Athlete Name</label>
            <input
              name="athleteName"
              value={profile.athleteName}
              onChange={handleChange}
              placeholder="e.g., Yasmine Sowka"
            />
          </div>

          <div className="form-group">
            <label>Key Achievements & Stats</label>
            <textarea
              name="achievements"
              value={profile.achievements}
              onChange={handleChange}
              placeholder="e.g., 2025 Youth National Team, MVG at 16U & 18U NCL, Starting GK for Capital Wave..."
              rows="4"
            />
            <span className="hint">Awards, records, tournament results, statistics</span>
          </div>

          <div className="form-group">
            <label>Strengths & Elite Competencies</label>
            <textarea
              name="strengths"
              value={profile.strengths}
              onChange={handleChange}
              placeholder="Technical skills, physical advantages, behavioral traits..."
              rows="8"
            />
            <span className="hint">Detailed analysis of what makes you stand out as a recruit</span>
          </div>

          <div className="form-group">
            <label>Recent Highlights (1-3 bullets)</label>
            <textarea
              name="recentHighlights"
              value={profile.recentHighlights}
              onChange={handleChange}
              placeholder="e.g., Selected for 18u World Championships camp; Led team to NCL Silver; New highlight video..."
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Video Links</label>
            <textarea
              name="videoLinks"
              value={profile.videoLinks}
              onChange={handleChange}
              placeholder="Paste YouTube/Hudl links (one per line)"
              rows="3"
            />
          </div>

          <div className="form-group">
            <label>Upcoming Events</label>
            <textarea
              name="upcomingEvents"
              value={profile.upcomingEvents}
              onChange={handleChange}
              placeholder="e.g., Jan 11-14: Final Selection Camp; April: National Championship Finals..."
              rows="3"
            />
          </div>
        </div>

        <div className="profile-section">
          <h2>✍️ Writing Style & Voice</h2>
          
          <div className="form-group">
            <label>Your Writing Style Examples</label>
            <textarea
              name="writingStyle"
              value={profile.writingStyle}
              onChange={handleChange}
              placeholder="Paste 2-3 sample emails or paragraphs you've written to coaches. This helps the AI match your tone."
              rows="6"
            />
            <span className="hint">The AI will learn your tone, word choice, and personality from these examples</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>📬 Coach Communications Log</h2>
          
          <div className="form-group">
            <label>Recent Coach Replies</label>
            <textarea
              name="coachReplies"
              value={profile.coachReplies}
              onChange={handleChange}
              placeholder="Paste recent coach email replies here to track interest levels and follow-up needs..."
              rows="6"
            />
            <span className="hint">Keep a log of coach responses for context and tracking</span>
          </div>
        </div>

        <div className="profile-section">
          <h2>🤖 Teach the AI About You</h2>
          <p className="section-description">
            Add specific guidance to help the AI understand your unique situation, interests, and communication preferences. 
            This helps personalize all generated emails and responses.
          </p>
          
          <div className="form-group">
            <label>Custom Instructions for AI</label>
            <textarea
              value={customInstructions}
              onChange={(e) => setCustomInstructions(e.target.value)}
              placeholder="Example: Focus on my interest in biotech and environmental engineering. Mention my Canadian national team experience. Keep emails under 150 words. I prefer a direct, professional tone."
              rows="5"
              className="custom-instructions-input"
            />
          </div>
          <button onClick={saveCustomInstructions} className="save-instructions-btn">
            Save Instructions
          </button>
        </div>

        <div className="profile-section knowledge-section">
          <h2>🧠 What the AI Knows About You</h2>
          <p className="section-description">
            This is all the information the AI uses when helping with recruiting communications:
          </p>
          
          <div className="knowledge-display">
            <div className="knowledge-item">
              <h4>Basic Info</h4>
              <p><strong>Name:</strong> {profile.athleteName || 'Not set'}</p>
              <p><strong>Profile URL:</strong> {profile.profileUrl || 'Not set'}</p>
            </div>

            {profile.achievements && (
              <div className="knowledge-item">
                <h4>Achievements</h4>
                <p>{profile.achievements}</p>
              </div>
            )}

            {profile.strengths && (
              <div className="knowledge-item">
                <h4>Strengths</h4>
                <p>{profile.strengths.substring(0, 300)}...</p>
              </div>
            )}

            {profile.recentHighlights && (
              <div className="knowledge-item">
                <h4>Recent Highlights</h4>
                <p>{profile.recentHighlights}</p>
              </div>
            )}

            {profile.upcomingEvents && (
              <div className="knowledge-item">
                <h4>Upcoming Events</h4>
                <p>{profile.upcomingEvents}</p>
              </div>
            )}

            {customInstructions && (
              <div className="knowledge-item">
                <h4>Custom Instructions</h4>
                <p>{customInstructions}</p>
              </div>
            )}

            {!profile.achievements && !profile.strengths && !profile.recentHighlights && (
              <p className="no-data">No data yet. Fill out the sections above or click "Load Sample Data" to get started.</p>
            )}
          </div>
        </div>

        <div className="save-notice">
          ✅ All changes are saved automatically to your browser
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

