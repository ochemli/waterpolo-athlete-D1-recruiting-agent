import React, { useState } from 'react';
import './VideoReels.css';

const VideoReels = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('nov-dec');

  const videoReels = {
    'nov-dec': {
      videoId: "003b3E5rANA",
      startTime: 2,
      title: "November-December 2025",
      events: [
        "Dec 13-16: Rising Star National Team Selection Camp For 18u World Championships and 19u Pan America Games - Montreal",
        "Dec 12-13: National Championship League (NCL) 18U Eastern Conference - Montreal",
        "Dec 20-21: National Development Camp - Toronto",
        "Nov: National Development Camp - Kingston"
      ]
    },
    'sept': {
      videoId: "e8BC-aaHyaA",
      startTime: 0,
      title: "September 2025",
      events: [
        "National Development Camps: Toronto & Kingston, Fall '25"
      ]
    }
  };

  const currentReel = videoReels[selectedPeriod];

  return (
    <div className="video-reels-container">
      <h1 className="page-title">Video Reels & Analysis</h1>
      
      <div className="period-selector">
        <button
          className={`period-btn ${selectedPeriod === 'nov-dec' ? 'active' : ''}`}
          onClick={() => setSelectedPeriod('nov-dec')}
        >
          Nov-Dec 2025
        </button>
        <button
          className={`period-btn ${selectedPeriod === 'sept' ? 'active' : ''}`}
          onClick={() => setSelectedPeriod('sept')}
        >
          Sept 2025
        </button>
      </div>

      <div className="video-and-summary-container">
        <div className="video-wrapper-small">
          <h2>{currentReel.title}</h2>
          <div className="video-embed-small">
            <iframe
              width="100%"
              height="300"
              src={`https://www.youtube.com/embed/${currentReel.videoId}?start=${currentReel.startTime}`}
              title="Yasmine Water Polo Highlights"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
          <a 
            href={`https://www.youtube.com/watch?v=${currentReel.videoId}&start=${currentReel.startTime}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="watch-youtube"
          >
            Watch on YouTube →
          </a>
          
          <div className="events-list">
            <h3>Events Covered:</h3>
            <ul>
              {currentReel.events.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="quick-summary">
          <h2>Performance Summary</h2>
          <div className="summary-content">
            <p><strong>She has the "Hardware"</strong> (height, wingspan, legs).</p>
            <p><strong>She needs to upgrade the "Software"</strong> (efficiency of movement, independent hands, and offensive transition speed).</p>
            
            <h3>Key Strengths:</h3>
            <ul>
              <li>Exceptional physical tools (5'11.5" wingspan)</li>
              <li>Massive vertical lift without head bobbing</li>
              <li>Strong shot-stopping ability</li>
              <li>Q4 durability - maintains leg height when fatigued</li>
            </ul>
            
            <h3>Development Focus:</h3>
            <ul>
              <li>Flat-line lateral movement (eliminate micro-dip)</li>
              <li>Hand independence training (heavy ball drills)</li>
              <li>Active wrist control for rebound direction</li>
              <li>Outlet urgency (1.5 second transition)</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="video-section">
        <div className="analysis-section">
          <h2>Goalie Performance Analysis</h2>
          
          {/* Summary Table */}
          <div className="summary-table">
            <table>
              <thead>
                <tr>
                  <th>Category</th>
                  <th>Current Level</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Vertical Lift</td>
                  <td>Elite</td>
                  <td>Maintain</td>
                </tr>
                <tr>
                  <td>Shot Stopping</td>
                  <td>Strong</td>
                  <td>Maintain</td>
                </tr>
                <tr>
                  <td>Physical Tools (Height, Wingspan)</td>
                  <td>Elite</td>
                  <td>Maintain</td>
                </tr>
                <tr>
                  <td>Lateral Movement Efficiency</td>
                  <td>Good</td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>Hand Independence</td>
                  <td>Developing</td>
                  <td>High</td>
                </tr>
                <tr>
                  <td>Rebound Direction Control</td>
                  <td>Good</td>
                  <td>Medium</td>
                </tr>
                <tr>
                  <td>Outlet/Transition Speed</td>
                  <td>Developing</td>
                  <td>High</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Strengths Section */}
          <div className="strengths-section">
            <h3>What She Does Well</h3>
            <ul>
              <li><strong>Exceptional Physical Tools:</strong> Height, wingspan, and leg strength provide a natural advantage in the cage</li>
              <li><strong>Massive Vertical Lift:</strong> NDC drills demonstrate elite elevation ability for high corner shots</li>
              <li><strong>Strong Shot-Stopping:</strong> Excellent at blocking and preventing goals</li>
              <li><strong>Solid Foundation:</strong> Has all the physical "hardware" needed to compete at the D1 level</li>
            </ul>
          </div>

          <h3 className="development-header">Development Areas</h3>

          <div className="analysis-point">
            <h3>1. Lateral "Loading" (The Dip)</h3>
            
            <div className="analysis-subsection">
              <h4>Observation:</h4>
              <p>
                In the NDC drills, she generates massive vertical lift. However, before moving laterally 
                to the high corners, there is a micro-second "load" phase where her hips drop slightly to 
                generate the push.
              </p>
            </div>

            <div className="analysis-subsection">
              <h4>Risk:</h4>
              <p>
                NCAA shooters release in 0.4 seconds. That micro-dip is the difference between a block 
                off the crossbar and a goal.
              </p>
            </div>

            <div className="analysis-subsection">
              <h4>Fix:</h4>
              <p>
                <strong>"Flat-line" Lateral Drills.</strong> Focus on moving post-to-post without the head 
                level changing by even an inch. She needs to rely on hip rotation and independent leg 
                movement rather than a two-leg "jump."
              </p>
            </div>
          </div>

          <div className="analysis-point">
            <h3>2. Hand Independence (The "Heavy" Hands)</h3>
            
            <div className="analysis-subsection">
              <h4>Observation:</h4>
              <p>
                In the Q4 game footage, her hands sometimes track with her legs—meaning, when she kicks 
                hard to rise, her hands rise; when she resets, they drop slightly to the surface.
              </p>
            </div>

            <div className="analysis-subsection">
              <h4>Risk:</h4>
              <p>
                This "treading" with hands creates a visual cue for elite shooters. They will pump-fake 
                to get her hands to drop, then shoot over the block.
              </p>
            </div>

            <div className="analysis-subsection">
              <h4>Fix:</h4>
              <p>
                <strong>Heavy Ball Training.</strong> She needs to train holding a medicine ball or jug 
                overhead while moving laterally. This disconnects her arm height from her leg kick, allowing 
                her to keep hands in the "ready" position (ears or higher) regardless of what her legs are doing.
              </p>
            </div>
          </div>

          <div className="analysis-point">
            <h3>3. Rebound Control vs. Rebound Creation</h3>
            
            <div className="analysis-subsection">
              <h4>Observation:</h4>
              <p>
                She is an excellent shot-stopper. She stops the ball.
              </p>
            </div>

            <div className="analysis-subsection">
              <h4>Critique:</h4>
              <p>
                In D1, a "dead block" (ball drops in front of the cage) is dangerous because centers are 
                stronger and faster.
              </p>
            </div>

            <div className="analysis-subsection">
              <h4>Fix:</h4>
              <p>
                <strong>Active Wrists.</strong> She needs to transition from "blocking" (stopping momentum) 
                to "directing" (tipping to the corner or controlling the catch). The goal is to turn a save 
                immediately into a counter-attack possession, not a 2-meter scramble.
              </p>
            </div>
          </div>

          <div className="analysis-point">
            <h3>4. Outlet Urgency</h3>
            
            <div className="analysis-subsection">
              <h4>Observation:</h4>
              <p>
                In the game footage, she makes the save, stabilizes, then looks.
              </p>
            </div>

            <div className="analysis-subsection">
              <h4>Standard:</h4>
              <p>
                Top 10 NCAA programs run a "transition first" offense. The goalie is the Quarterback.
              </p>
            </div>

            <div className="analysis-subsection">
              <h4>Fix:</h4>
              <p>
                <strong>The ball must be in the air within 1.5 seconds of the save.</strong> She needs to 
                identify her outlet (usually the winger on the side of the save) before she even blocks the ball.
              </p>
            </div>
          </div>

          <div className="analysis-summary">
            <h3>Summary</h3>
            <p>
              She has the <strong>"Hardware"</strong> (height, wingspan, legs). She needs to upgrade the 
              <strong>"Software"</strong> (efficiency of movement, independent hands, and offensive transition speed).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoReels;

