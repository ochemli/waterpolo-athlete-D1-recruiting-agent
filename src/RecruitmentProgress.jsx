import { useState, useEffect } from 'react'
import Login from './Login'
import './RecruitmentProgress.css'

function RecruitmentProgress() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [currentUser, setCurrentUser] = useState(null)

  useEffect(() => {
    // Check if user is already logged in (session storage)
    const savedUser = sessionStorage.getItem('progressUser')
    if (savedUser) {
      setCurrentUser(savedUser)
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (username) => {
    setCurrentUser(username)
    setIsAuthenticated(true)
    sessionStorage.setItem('progressUser', username)
  }

  const handleLogout = () => {
    setCurrentUser(null)
    setIsAuthenticated(false)
    sessionStorage.removeItem('progressUser')
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <div className="progress-page">
      <div className="progress-container">
        <div className="progress-header">
          <h1>🎯 Recruitment Progress Dashboard</h1>
          <div className="header-actions">
            <span className="user-welcome">Welcome, {currentUser}!</span>
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          </div>
        </div>

        <div className="progress-stats">
          <div className="stat-card">
            <h3>Total Universities</h3>
            <p className="stat-number">18</p>
            <p className="stat-label">Contacted</p>
          </div>
          <div className="stat-card">
            <h3>Active Conversations</h3>
            <p className="stat-number">12</p>
            <p className="stat-label">In Progress</p>
          </div>
          <div className="stat-card">
            <h3>Positive Responses</h3>
            <p className="stat-number">8</p>
            <p className="stat-label">Interest Level A-B</p>
          </div>
          <div className="stat-card">
            <h3>Campus Visits</h3>
            <p className="stat-number">3</p>
            <p className="stat-label">Scheduled</p>
          </div>
        </div>

        <div className="timeline-section">
          <h2>Recruitment Timeline</h2>
          <div className="timeline">
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Initial Outreach</h4>
                <p className="timeline-date">October 2025</p>
                <p>Contacted 18 D1 programs with highlight reel and athletic profile</p>
              </div>
            </div>
            
            <div className="timeline-item completed">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Follow-up Communications</h4>
                <p className="timeline-date">November 2025</p>
                <p>Sent tournament results and updated statistics to all coaches</p>
              </div>
            </div>
            
            <div className="timeline-item active">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Rising Star Camp Selection</h4>
                <p className="timeline-date">January 2026 (Current)</p>
                <p>Final selection camp for 18u World Championships and 19u Pan Am Games</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Campus Visits</h4>
                <p className="timeline-date">Spring 2026</p>
                <p>Scheduled visits to top 5 interested programs</p>
              </div>
            </div>
            
            <div className="timeline-item">
              <div className="timeline-marker"></div>
              <div className="timeline-content">
                <h4>Decision & Commitment</h4>
                <p className="timeline-date">Summer 2026</p>
                <p>Verbal commitment and signing</p>
              </div>
            </div>
          </div>
        </div>

        <div className="top-programs">
          <h2>Top 5 Programs - Current Status</h2>
          <div className="programs-grid">
            <div className="program-card high-interest">
              <h3>UC Berkeley</h3>
              <span className="interest-badge">Interest: A</span>
              <p className="program-status">Coach requested game footage and camp invitation sent</p>
              <p className="last-contact">Last Contact: 2 days ago</p>
            </div>
            
            <div className="program-card high-interest">
              <h3>UCLA</h3>
              <span className="interest-badge">Interest: A</span>
              <p className="program-status">Assistant coach following tournament schedule</p>
              <p className="last-contact">Last Contact: 1 week ago</p>
            </div>
            
            <div className="program-card medium-interest">
              <h3>Stanford</h3>
              <span className="interest-badge interest-b">Interest: B</span>
              <p className="program-status">Requested additional academic information</p>
              <p className="last-contact">Last Contact: 3 weeks ago</p>
            </div>
            
            <div className="program-card medium-interest">
              <h3>Harvard</h3>
              <span className="interest-badge interest-b">Interest: B</span>
              <p className="program-status">Positive reply, monitoring progress</p>
              <p className="last-contact">Last Contact: 2 weeks ago</p>
            </div>
            
            <div className="program-card medium-interest">
              <h3>Princeton</h3>
              <span className="interest-badge interest-b">Interest: B</span>
              <p className="program-status">Campus visit offer for spring</p>
              <p className="last-contact">Last Contact: 1 week ago</p>
            </div>
          </div>
        </div>

        <div className="next-steps">
          <h2>Next Steps</h2>
          <ul className="action-items">
            <li className="action-item">
              <input type="checkbox" />
              <span>Send Rising Star Camp selection update to all coaches (Week of Jan 13)</span>
            </li>
            <li className="action-item">
              <input type="checkbox" />
              <span>Follow up with Berkeley coach after NCL Montreal tournament</span>
            </li>
            <li className="action-item">
              <input type="checkbox" />
              <span>Schedule campus visit calls with Harvard and Princeton</span>
            </li>
            <li className="action-item">
              <input type="checkbox" />
              <span>Update highlight reel with December camp footage</span>
            </li>
            <li className="action-item">
              <input type="checkbox" />
              <span>Send Q1 academic transcript to interested programs</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

export default RecruitmentProgress

