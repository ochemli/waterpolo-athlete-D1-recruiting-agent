import { useState, useEffect } from 'react'
import './ProfilePage.css'

function ProfilePage() {
  const [profile, setProfile] = useState({
    athleteName: 'Yasmine Sowka',
    profileUrl: 'https://sites.google.com/view/yasmine-sowka-water-polo',
    achievements: '',
    writingStyle: '',
    recentHighlights: '',
    coachReplies: '',
    upcomingEvents: '',
    videoLinks: ''
  })
  
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
  }, [])

  const handleChange = (e) => {
    const updated = { ...profile, [e.target.name]: e.target.value }
    setProfile(updated)
    localStorage.setItem('athleteProfile', JSON.stringify(updated))
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
      <div className="profile-header">
        <h1>Athlete Profile & Updates</h1>
        <p className="subtitle">Build your personalized knowledge base</p>
      </div>

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
            <button 
              onClick={scanProfile} 
              disabled={scanning}
              className="scan-btn"
            >
              {scanning ? '🔄 Scanning...' : '🔍 Scan for Updates'}
            </button>
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

        <div className="save-notice">
          ✅ All changes are saved automatically to your browser
        </div>
      </div>
    </div>
  )
}

export default ProfilePage

