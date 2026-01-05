import { useState } from 'react'
import './VideoAnalysis.css'

function VideoAnalysis() {
  const [videoInfo, setVideoInfo] = useState({
    title: '',
    duration: '',
    opponent: '',
    date: '',
    notes: ''
  })
  const [analysisType, setAnalysisType] = useState('full')
  const [analysis, setAnalysis] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setVideoInfo({ ...videoInfo, [e.target.name]: e.target.value })
  }

  const handleAnalyze = async () => {
    if (!videoInfo.title) {
      alert('Please provide a video title or description')
      return
    }

    setLoading(true)
    setAnalysis('Analyzing goalie performance...')

    try {
      const profileData = localStorage.getItem('athleteProfile')
      const profile = profileData ? JSON.parse(profileData) : null

      const res = await fetch('/api/coach', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          mode: 'video_analysis',
          videoInfo,
          analysisType,
          profile
        })
      })

      const data = await res.json()
      if (res.ok) {
        setAnalysis(data.text)
      } else {
        setAnalysis(`Error: ${data.error?.message || 'Analysis failed'}`)
      }
    } catch (err) {
      setAnalysis(`Error: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="video-page">
      <div className="video-content">
        <div className="video-form-section">
          <h2>Goalie Performance Analysis</h2>
          <p className="section-desc">
            Provide details about your game footage for AI-powered analysis of your goalie performance, 
            strengths, and areas for improvement.
          </p>

          <div className="upload-info-box">
            <div className="info-icon">ℹ️</div>
            <div>
              <strong>Note:</strong> Currently analyzes based on your description. 
              Direct video upload coming soon. Provide detailed notes about your performance 
              for the most accurate analysis.
            </div>
          </div>

          <div className="form-group">
            <label>Video Title / Game Description *</label>
            <input
              name="title"
              value={videoInfo.title}
              onChange={handleChange}
              placeholder="e.g., NCL Tournament Finals vs Capital Wave"
              required
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Duration</label>
              <input
                name="duration"
                value={videoInfo.duration}
                onChange={handleChange}
                placeholder="e.g., 3:45"
              />
            </div>
            <div className="form-group">
              <label>Opponent</label>
              <input
                name="opponent"
                value={videoInfo.opponent}
                onChange={handleChange}
                placeholder="e.g., UCLA, Stanford"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Game Date</label>
            <input
              type="date"
              name="date"
              value={videoInfo.date}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Performance Notes & Context *</label>
            <textarea
              name="notes"
              value={videoInfo.notes}
              onChange={handleChange}
              placeholder="Describe your performance in detail:
- Key saves made
- Shots that got past you
- Communication with defense
- Positioning decisions
- Sprint outs
- Transition play
- Areas where you felt strong/weak
              
The more detail you provide, the better the analysis."
              rows="12"
            />
          </div>

          <div className="form-group">
            <label>Analysis Type</label>
            <select value={analysisType} onChange={(e) => setAnalysisType(e.target.value)}>
              <option value="full">Full Analysis (Strengths + Areas to Improve)</option>
              <option value="strengths">Strengths Only</option>
              <option value="improvement">Areas to Improve Only</option>
              <option value="recruiting">Recruiting Highlight Reel Advice</option>
            </select>
          </div>

          <button 
            onClick={handleAnalyze} 
            disabled={loading || !videoInfo.title}
            className="analyze-btn"
          >
            {loading ? 'Analyzing...' : 'Analyze Performance'}
          </button>
        </div>

        <div className="analysis-section">
          <h2>Analysis Results</h2>
          {analysis ? (
            <div className="analysis-output">
              {analysis}
            </div>
          ) : (
            <div className="no-analysis">
              <p>Fill in the form and click "Analyze Performance" to get AI-powered feedback on your goalie play.</p>
              <div className="analysis-examples">
                <h4>What you'll get:</h4>
                <ul>
                  <li><strong>Technical Analysis:</strong> Positioning, reflexes, decision-making</li>
                  <li><strong>Tactical Insights:</strong> Communication, defense organization</li>
                  <li><strong>Strengths:</strong> What you're doing well</li>
                  <li><strong>Areas to Improve:</strong> Specific drills and focus areas</li>
                  <li><strong>Recruiting Value:</strong> Which clips to include in highlight reels</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoAnalysis

