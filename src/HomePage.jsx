import './HomePage.css'

function HomePage() {
  return (
    <div className="home-page">
      <div className="home-container">
        <div className="profile-header">
          <h1>Yasmine Sowka</h1>
          <p className="profile-subtitle">Goalkeeper | Class of 2027</p>
          <p className="profile-club">Capital Wave Water Polo | Ottawa, Canada</p>
        </div>

        <div className="profile-summary">
          <div className="summary-section">
            <h2>About</h2>
            <div className="summary-content">
              <p><strong>Height:</strong> 5'9" | <strong>Wingspan:</strong> 5'11½"</p>
              <p><strong>Position:</strong> Goalkeeper (18U Team Captain)</p>
              <p><strong>Club:</strong> Capital Wave (Ottawa) & Asphalt Green (New York)</p>
              <p><strong>Email:</strong> <a href="mailto:yasia.sowka@gmail.com">yasia.sowka@gmail.com</a></p>
              <p><strong>Academic Interest:</strong> STEM (Biological & Environmental Engineering)</p>
            </div>
          </div>

          <div className="summary-section">
            <h2>2025 Achievements</h2>
            <ul className="achievements-list">
              <li>Silver Medal - 17U Pan American Games (Youth Canadian National Team)</li>
              <li>MVG Award - 18U NCL Eastern Conference (Silver)</li>
              <li>MVG Award - 16U NCL Eastern Conference (Gold)</li>
              <li>Leadership Excellence Award (Presented by Olympic Waneek Horn-Miller)</li>
              <li>Female Athlete of the Year - Capital Wave</li>
              <li>Silver Medal - 19U Team Ontario National Championships</li>
            </ul>
          </div>

          <div className="summary-section">
            <h2>Upcoming 2026 Events</h2>
            <ul className="events-list">
              <li>Jan 11-14: Rising Star National Team Selection Camp (18U World Championships & 19U Pan Am Games)</li>
              <li>Jan 16-18: 18U NCL Montreal</li>
              <li>March-June: National Development Camps</li>
              <li>April: National Championship Finals</li>
              <li>July: Junior Olympics</li>
            </ul>
          </div>
        </div>

        <div className="photo-gallery">
          <h2>Photo Gallery</h2>
          <div className="gallery-grid">
            <div className="gallery-item">
              <img 
                src="/images/Screenshot 2026-01-05 at 12.20.37 PM.png" 
                alt="Yasmine Sowka making a save in goal during water polo game"
                className="gallery-image"
              />
              <p className="image-caption">In Action: Defending the Goal</p>
            </div>
            <div className="gallery-item">
              <img 
                src="/images/Screenshot 2026-01-05 at 12.19.45 PM.png" 
                alt="Yasmine Sowka professional recruiting portrait"
                className="gallery-image"
              />
              <p className="image-caption">Official Recruiting Photo</p>
            </div>
          </div>
        </div>

        <div className="profile-link-section">
          <h2>Complete Recruiting Profile</h2>
          <p>View the full profile including personal statement, photo highlights, game footage, training regimen, and coach references.</p>
          <a 
            href="https://sites.google.com/view/yasmine-sowka-water-polo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="view-profile-link"
          >
            View Full Recruiting Profile
          </a>
        </div>
      </div>
    </div>
  )
}

export default HomePage

