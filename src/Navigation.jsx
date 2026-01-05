import './Navigation.css'

function Navigation({ currentPage, onPageChange }) {
  return (
    <div className="app-header">
      <div className="header-content">
        <div className="brand">
          <h1>Water Polo Recruiting Assistant</h1>
          <p className="subtitle">Your AI-Powered Helper for D1 College Recruiting</p>
        </div>
        
        <nav className="nav-tabs">
          <button 
            className={currentPage === 'home' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('home')}
          >
            Home
          </button>
          <button 
            className={currentPage === 'chat' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('chat')}
          >
            Chat Assistant
          </button>
          <button 
            className={currentPage === 'main' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('main')}
          >
            Email Coaches
          </button>
          <button 
            className={currentPage === 'tracker' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('tracker')}
          >
            Universities
          </button>
          <button 
            className={currentPage === 'reels' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('reels')}
          >
            Video Analysis
          </button>
          <button 
            className={currentPage === 'progress' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('progress')}
          >
            🔒 Recruitment Progress
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Navigation

