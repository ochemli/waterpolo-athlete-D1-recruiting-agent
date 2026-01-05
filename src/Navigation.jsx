import './Navigation.css'

function Navigation({ currentPage, onPageChange }) {
  return (
    <div className="app-header">
      <div className="header-content">
        <div className="brand">
          <h1>Recruiting Communications Platform</h1>
          <p className="subtitle">NCAA D1 Water Polo Recruiting Management</p>
        </div>
        
        <nav className="nav-tabs">
          <button 
            className={currentPage === 'chat' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('chat')}
          >
            Chat
          </button>
          <button 
            className={currentPage === 'video' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('video')}
          >
            Video Analysis
          </button>
          <button 
            className={currentPage === 'main' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('main')}
          >
            Generate
          </button>
          <button 
            className={currentPage === 'tracker' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('tracker')}
          >
            Universities
          </button>
          <button 
            className={currentPage === 'profile' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('profile')}
          >
            Profile
          </button>
          <button 
            className={currentPage === 'knowledge' ? 'tab active' : 'tab'}
            onClick={() => onPageChange('knowledge')}
          >
            Knowledge
          </button>
        </nav>
      </div>
    </div>
  )
}

export default Navigation

