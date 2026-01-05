import './Footer.css'

function Footer() {
  return (
    <footer className="app-footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Water Polo Recruiting Assistant</h3>
          <p>Your AI-powered helper for NCAA Division 1 water polo recruiting. Streamline communications, track progress, and land your dream program.</p>
        </div>
        
        <div className="footer-section">
          <h4>Features</h4>
          <ul>
            <li>AI Email Drafting</li>
            <li>Coach Reply Analysis</li>
            <li>University Tracking</li>
            <li>Video Reel Management</li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h4>Developer Contact</h4>
          <p className="contact-name"><strong>Olfa Chemli</strong></p>
          <p className="contact-title">Web Application Developer</p>
          <p className="contact-email">
            <a href="mailto:ochemli@gmail.com">ochemli@gmail.com</a>
          </p>
          <p className="contact-note">
            Need a custom recruiting platform or web application? Get in touch!
          </p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Water Polo Recruiting Assistant. All rights reserved.</p>
        <p className="footer-tagline">Built for athletes, by developers who care.</p>
      </div>
    </footer>
  )
}

export default Footer

