import { useState } from 'react'
import './Login.css'

function Login({ onLogin }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Simple authentication - in production, this would be server-side
    const users = {
      'yasmine': 'Recruit2027!',
      'admin': 'Admin2026!'
    }

    if (users[username] && users[username] === password) {
      onLogin(username)
      setError('')
    } else {
      setError('Invalid username or password')
    }
  }

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="login-header">
          <h1>🏊‍♀️ Water Polo Recruiting Assistant</h1>
          <p>Your AI-Powered Helper for NCAA D1 College Recruiting</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <h2>Login</h2>
          
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-field">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              autoFocus
            />
          </div>

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>

          <div className="login-hint">
            Demo Account: yasmine / Recruit2027!
          </div>
        </form>

        <footer className="login-footer">
          <p>Need help or want a custom recruiting platform?</p>
          <p className="contact-info">
            <strong>Contact Developer:</strong> Olfa Chemli
            <br />
            <a href="mailto:ochemli@gmail.com">ochemli@gmail.com</a>
          </p>
        </footer>
      </div>
    </div>
  )
}

export default Login

