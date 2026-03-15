import React from 'react';
import { Link } from 'react-router-dom';

const Voice = () => {
  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <style>{`
        .voice-container {
            max-width: 1000px;
            margin: 3rem auto;
            background: var(--surface-color);
            padding: 2rem;
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .record-section {
            text-align: center;
            padding: 3rem;
            border: 2px dashed var(--border-color);
            border-radius: 8px;
            margin-bottom: 2rem;
            background: var(--bg-color);
        }

        .mic-button {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            background: #ef4444;
            color: white;
            border: none;
            font-size: 2rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            transition: transform 0.2s, box-shadow 0.2s;
        }

        .mic-button:hover {
            transform: scale(1.05);
            box-shadow: 0 0 15px rgba(239, 68, 68, 0.4);
        }

        .transcript-grid {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.5rem;
        }

        .transcript-box {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1.5rem;
            min-height: 300px;
        }

        .ai-features {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1.5rem;
        }

        .pulse {
            animation: pulse-ring 2s infinite;
        }

        @keyframes pulse-ring {
            0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
            70% { box-shadow: 0 0 0 15px rgba(239, 68, 68, 0); }
            100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
        }

        .feature-item {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 1rem;
            font-size: 0.9rem;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
        }
      `}</style>
      
      <nav className="top-nav">
          <div className="logo"><Link to="/workspace" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Workspace</Link> | Real-time Dictation</div>
      </nav>

      <div className="voice-container">
          <div className="record-section">
              <button className="mic-button pulse">
                  🎙️
              </button>
              <h2>Recording in Progress...</h2>
              <p style={{ color: 'var(--text-secondary)' }}>00:03:45</p>
          </div>

          <div className="transcript-grid">
              <div className="transcript-box">
                  <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Live Transcript</h3>
                  <div style={{ lineHeight: '1.8', color: 'var(--text-primary)' }}>
                      "Therefore, your honor, pursuant to the recent amendments in the Bharatiya Nyaya Sanhita, specifically Section 316, the elements of cheating as originally defined under IPC Section 420 must now be contextualized with..."
                      <span style={{ borderRight: '2px solid var(--primary-color)', animation: 'blink 1s infinite' }}></span>
                  </div>
              </div>

              <div className="ai-features">
                  <h3 style={{ marginBottom: '1rem' }}>AI Assistant</h3>
                  <div className="feature-item">
                      <span>✨</span>
                      <div>
                          <strong>Auto-Citation</strong>
                          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Detected: IPC 420 → Suggesting BNS 316</p>
                      </div>
                  </div>
                  <div className="feature-item">
                      <span>📝</span>
                      <div>
                          <strong>Format Enforcement</strong>
                          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Applying Supreme Court affidavit style</p>
                      </div>
                  </div>
                   <div className="feature-item" style={{ borderBottom: 'none' }}>
                      <span>🔍</span>
                      <div>
                          <strong>Fact Check</strong>
                          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Cross-referencing stated dates...</p>
                      </div>
                  </div>
                  
                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Generate Document</button>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Voice;