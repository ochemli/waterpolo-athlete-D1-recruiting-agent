import { useState, useEffect } from 'react'
import universitiesData from './universities-data.json'
import './UniversityTracker.css'

function UniversityTracker() {
  const [selectedUniversity, setSelectedUniversity] = useState(null)
  const [expandedCard, setExpandedCard] = useState(null)
  const [communications, setCommunications] = useState({})
  const [regionFilter, setRegionFilter] = useState('all')
  const [academicFilter, setAcademicFilter] = useState('all')
  const [newComm, setNewComm] = useState({
    date: new Date().toISOString().split('T')[0],
    type: 'email_sent',
    coach: '',
    subject: '',
    notes: '',
    interestLevel: ''
  })

  useEffect(() => {
    // Load communications from localStorage
    const saved = localStorage.getItem('universityCommunications')
    if (saved) {
      setCommunications(JSON.parse(saved))
    }
  }, [])

  const saveComm = () => {
    if (!selectedUniversity || !newComm.subject) return

    const uniId = selectedUniversity.id
    const updated = {
      ...communications,
      [uniId]: [
        ...(communications[uniId] || []),
        { ...newComm, id: Date.now() }
      ]
    }
    
    setCommunications(updated)
    localStorage.setItem('universityCommunications', JSON.stringify(updated))
    
    // Reset form
    setNewComm({
      date: new Date().toISOString().split('T')[0],
      type: 'email_sent',
      coach: '',
      subject: '',
      notes: '',
      interestLevel: ''
    })
  }

  const deleteComm = (commId) => {
    if (!selectedUniversity) return
    const uniId = selectedUniversity.id
    const updated = {
      ...communications,
      [uniId]: communications[uniId].filter(c => c.id !== commId)
    }
    setCommunications(updated)
    localStorage.setItem('universityCommunications', JSON.stringify(updated))
  }

  const toggleCard = (uniId) => {
    setExpandedCard(expandedCard === uniId ? null : uniId)
  }

  const uniComms = selectedUniversity ? (communications[selectedUniversity.id] || []) : []
  const sortedComms = [...uniComms].sort((a, b) => new Date(b.date) - new Date(a.date))

  // Region definitions
  const eastStates = ['MA', 'NY', 'NJ', 'PA', 'RI', 'DC', 'MD', 'CT']
  const californiaStates = ['California']

  // Filter universities
  const filterUniversities = (universities) => {
    return universities.filter(uni => {
      // Region filter
      const matchesRegion = regionFilter === 'all' || 
        (regionFilter === 'east' && eastStates.includes(uni.state)) ||
        (regionFilter === 'california' && californiaStates.includes(uni.state))

      // Academic filter
      const matchesAcademic = academicFilter === 'all' ||
        (uni.academicStrengths && uni.academicStrengths.some(strength => 
          strength.toLowerCase().includes(academicFilter.toLowerCase())
        ))

      return matchesRegion && matchesAcademic
    })
  }

  const contactedUniversities = filterUniversities(universitiesData.filter(u => u.contacted !== false))
  const nonContactedUniversities = filterUniversities(universitiesData.filter(u => u.contacted === false))

  return (
    <div className="tracker-page">
      <div className="tracker-container">
        
        <div className="filters-section">
          <div className="filter-group">
            <h3>Region</h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${regionFilter === 'all' ? 'active' : ''}`}
                onClick={() => setRegionFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${regionFilter === 'east' ? 'active' : ''}`}
                onClick={() => setRegionFilter('east')}
              >
                East Coast
              </button>
              <button
                className={`filter-btn ${regionFilter === 'california' ? 'active' : ''}`}
                onClick={() => setRegionFilter('california')}
              >
                California
              </button>
            </div>
          </div>

          <div className="filter-group">
            <h3>Academic Focus</h3>
            <div className="filter-buttons">
              <button
                className={`filter-btn ${academicFilter === 'all' ? 'active' : ''}`}
                onClick={() => setAcademicFilter('all')}
              >
                All
              </button>
              <button
                className={`filter-btn ${academicFilter === 'stem' ? 'active' : ''}`}
                onClick={() => setAcademicFilter('stem')}
              >
                STEM
              </button>
              <button
                className={`filter-btn ${academicFilter === 'engineering' ? 'active' : ''}`}
                onClick={() => setAcademicFilter('engineering')}
              >
                Engineering
              </button>
              <button
                className={`filter-btn ${academicFilter === 'biotech' ? 'active' : ''}`}
                onClick={() => setAcademicFilter('biotech')}
              >
                Biotech
              </button>
              <button
                className={`filter-btn ${academicFilter === 'environmental' ? 'active' : ''}`}
                onClick={() => setAcademicFilter('environmental')}
              >
                Environmental
              </button>
            </div>
          </div>
        </div>

        <div className="university-selector">
          <h2>Target Universities ({contactedUniversities.length})</h2>
          <div className="uni-grid">
            {contactedUniversities.map(uni => {
              const commCount = (communications[uni.id] || []).length
              const isActive = selectedUniversity?.id === uni.id
              const isExpanded = expandedCard === uni.id
              
              return (
                <div
                  key={uni.id}
                  className={`uni-card ${isActive ? 'active' : ''} ${isExpanded ? 'expanded' : ''}`}
                >
                  <div className="card-header" onClick={() => setSelectedUniversity(uni)}>
                    <h3>{uni.name}</h3>
                    <p className="uni-meta">
                      {uni.coaches && uni.coaches.length > 0 && (
                        <span>{uni.coaches.length} coach{uni.coaches.length !== 1 ? 'es' : ''}</span>
                      )}
                      {uni.coaches && uni.coaches.length > 0 && uni.state && <span> | </span>}
                      {uni.state && <span>{uni.state}</span>}
                    </p>
                    {uni.notes && (
                      <p className="uni-notes">{uni.notes}</p>
                    )}
                    {uni.conference && <span className="uni-conference">{uni.conference}</span>}
                    {uni.academicStrengths && uni.academicStrengths.length > 0 && (
                      <div className="academic-tags">
                        {uni.academicStrengths.map(strength => (
                          <span key={strength} className="academic-tag">{strength}</span>
                        ))}
                      </div>
                    )}
                    {commCount > 0 && (
                      <span className="comm-badge">{commCount} interactions</span>
                    )}
                  </div>
                  <button 
                    className="expand-btn" 
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleCard(uni.id)
                    }}
                  >
                    {isExpanded ? '▲ Hide Details' : '▼ Show Details'}
                  </button>
                  {isExpanded && (
                    <div className="card-details">
                      {uni.address && <p className="uni-address">📍 {uni.address}</p>}
                      {uni.coaches && uni.coaches.length > 0 && (
                        <div className="coaches-list">
                          <h4>Coaches:</h4>
                          {uni.coaches.map((coach, idx) => (
                            <div key={idx} className="coach-info">
                              <strong>{coach.name}</strong> - {coach.position}
                              {coach.email && <div>✉️ {coach.email}</div>}
                              {coach.phone && <div>📞 {coach.phone}</div>}
                              {coach.notes && <div className="coach-notes">{coach.notes}</div>}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="university-selector">
          <h2>Other D1 Programs ({nonContactedUniversities.length})</h2>
          <div className="uni-grid">
            {nonContactedUniversities.map(uni => {
              const isExpanded = expandedCard === uni.id
              
              return (
                <div
                  key={uni.id}
                  className={`uni-card non-contacted ${isExpanded ? 'expanded' : ''}`}
                >
                  <div className="card-header">
                    <h3>{uni.name}</h3>
                    <p className="uni-meta">
                      {uni.coaches && uni.coaches.length > 0 && (
                        <span>{uni.coaches.length} coach{uni.coaches.length !== 1 ? 'es' : ''}</span>
                      )}
                      {uni.coaches && uni.coaches.length > 0 && uni.state && <span> | </span>}
                      {uni.state && <span>{uni.state}</span>}
                    </p>
                    {uni.notes && (
                      <p className="uni-notes">{uni.notes}</p>
                    )}
                    {uni.academicStrengths && uni.academicStrengths.length > 0 && (
                      <div className="academic-tags">
                        {uni.academicStrengths.map(strength => (
                          <span key={strength} className="academic-tag">{strength}</span>
                        ))}
                      </div>
                    )}
                  </div>
                  <button 
                    className="expand-btn" 
                    onClick={() => toggleCard(uni.id)}
                  >
                    {isExpanded ? '▲ Hide Details' : '▼ Show Details'}
                  </button>
                  {isExpanded && uni.address && (
                    <div className="card-details">
                      <p className="uni-address">📍 {uni.address}</p>
                      {uni.notes && <p>{uni.notes}</p>}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {selectedUniversity && (
          <div className="uni-details">
            <div className="uni-header">
              <h2>{selectedUniversity.name}</h2>
              <a href={selectedUniversity.website} target="_blank" rel="noopener noreferrer" className="uni-website">
                Visit Website →
              </a>
            </div>

            <div className="uni-info">
              <p><strong>Address:</strong> {selectedUniversity.address}</p>
              {selectedUniversity.phone && <p><strong>Phone:</strong> {selectedUniversity.phone}</p>}
              {selectedUniversity.notes && (
                <p className="uni-notes"><strong>Notes:</strong> {selectedUniversity.notes}</p>
              )}
            </div>

            <div className="coaches-section">
              <h3>Coaching Staff</h3>
              <div className="coaches-list">
                {selectedUniversity.coaches.map((coach, idx) => (
                  <div key={idx} className="coach-card">
                    <h4>{coach.name}</h4>
                    <p className="coach-position">{coach.position}</p>
                    {coach.email && (
                      <a href={`mailto:${coach.email}`} className="coach-email">
                        {coach.email}
                      </a>
                    )}
                    {coach.phone && <p className="coach-phone">{coach.phone}</p>}
                    {coach.notes && <p className="coach-notes">💡 {coach.notes}</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="communications-section">
              <h3>Communication Log</h3>
              
              <div className="add-comm">
                <h4>Add New Interaction</h4>
                <div className="comm-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Date</label>
                      <input
                        type="date"
                        value={newComm.date}
                        onChange={(e) => setNewComm({...newComm, date: e.target.value})}
                      />
                    </div>
                    <div className="form-group">
                      <label>Type</label>
                      <select
                        value={newComm.type}
                        onChange={(e) => setNewComm({...newComm, type: e.target.value})}
                      >
                        <option value="email_sent">Email Sent</option>
                        <option value="email_received">Email Received</option>
                        <option value="phone_call">Phone Call</option>
                        <option value="campus_visit">Campus Visit</option>
                        <option value="zoom_meeting">Zoom Meeting</option>
                        <option value="questionnaire">Questionnaire</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label>Coach</label>
                      <select
                        value={newComm.coach}
                        onChange={(e) => setNewComm({...newComm, coach: e.target.value})}
                      >
                        <option value="">Select coach...</option>
                        {selectedUniversity.coaches.map((coach, idx) => (
                          <option key={idx} value={coach.name}>{coach.name}</option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Interest Level</label>
                      <select
                        value={newComm.interestLevel}
                        onChange={(e) => setNewComm({...newComm, interestLevel: e.target.value})}
                      >
                        <option value="">Not assessed</option>
                        <option value="A">A - Strong Interest</option>
                        <option value="B">B - Warm Interest</option>
                        <option value="C">C - Neutral</option>
                        <option value="D">D - Soft No</option>
                        <option value="E">E - Unclear</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Subject / Summary</label>
                    <input
                      value={newComm.subject}
                      onChange={(e) => setNewComm({...newComm, subject: e.target.value})}
                      placeholder="e.g., Initial introduction, Follow-up on JO results..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Notes / Details</label>
                    <textarea
                      value={newComm.notes}
                      onChange={(e) => setNewComm({...newComm, notes: e.target.value})}
                      placeholder="Key points, action items, next steps..."
                      rows="3"
                    />
                  </div>

                  <button onClick={saveComm} className="save-comm-btn">
                    Add to Log
                  </button>
                </div>
              </div>

              <div className="comm-timeline">
                <h4>Timeline ({sortedComms.length} interactions)</h4>
                {sortedComms.length === 0 ? (
                  <p className="no-comms">No communications logged yet</p>
                ) : (
                  sortedComms.map(comm => (
                    <div key={comm.id} className="comm-entry">
                      <div className="comm-header">
                        <span className="comm-date">{new Date(comm.date).toLocaleDateString()}</span>
                        <span className={`comm-type ${comm.type}`}>
                          {comm.type.replace('_', ' ')}
                        </span>
                        {comm.interestLevel && (
                          <span className={`interest-badge level-${comm.interestLevel}`}>
                            {comm.interestLevel}
                          </span>
                        )}
                        <button onClick={() => deleteComm(comm.id)} className="delete-comm">✕</button>
                      </div>
                      {comm.coach && <p className="comm-coach">With: {comm.coach}</p>}
                      <p className="comm-subject">{comm.subject}</p>
                      {comm.notes && <p className="comm-notes">{comm.notes}</p>}
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {!selectedUniversity && (
          <div className="no-selection">
            <p>👈 Select a university to view details and track communications</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default UniversityTracker

