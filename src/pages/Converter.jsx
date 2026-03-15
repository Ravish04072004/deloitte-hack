import React from 'react';
import { Link } from 'react-router-dom';

const Converter = () => {
  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <style>{`
        .converter-container {
            max-width: 900px;
            margin: 3rem auto;
            background: var(--surface-color);
            padding: 2rem;
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .search-area {
            text-align: center;
            margin-bottom: 3rem;
        }

        .search-input-large {
            width: 80%;
            padding: 1rem;
            font-size: 1.2rem;
            border: 2px solid var(--primary-color);
            background: var(--bg-color);
            color: var(--text-primary);
            border-radius: 8px;
            outline: none;
        }

        .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .law-card {
            border: 1px solid var(--border-color);
            border-radius: 8px;
            overflow: hidden;
            background: var(--bg-color);
        }

        .law-header {
            padding: 1rem;
            font-weight: bold;
            font-size: 1.1rem;
            text-align: center;
            border-bottom: 1px solid var(--border-color);
        }

        .law-old { background: rgba(239, 68, 68, 0.15); color: #ef4444; }
        .law-new { background: rgba(16, 185, 129, 0.15); color: #10b981; }

        .law-body {
            padding: 1.5rem;
        }

        .law-section {
            font-size: 1.5rem;
            color: var(--primary-color);
            margin-bottom: 1rem;
            font-weight: bold;
        }

        .action-bar {
            margin-top: 1.5rem;
            display: flex;
            gap: 1rem;
        }
      `}</style>
      
      <nav className="top-nav">
          <div className="logo"><Link to="/workspace" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Workspace</Link> | IPC to BNS Converter</div>
      </nav>

      <div className="converter-container">
          <div className="search-area">
              <h1>Legal Code Converter</h1>
              <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Quickly transition between Old Laws and New Codes</p>
              <input type="text" className="search-input-large" defaultValue="Section 420" placeholder="Enter IPC Section or Description..." />
          </div>

          <div className="comparison-grid">
              {/* Old Law */}
              <div className="law-card">
                  <div className="law-header law-old">IPC (Indian Penal Code)</div>
                  <div className="law-body">
                      <div className="law-section">Section 420</div>
                      <p><strong>Description:</strong> Cheating and dishonestly inducing delivery of property.</p>
                      <br />
                      <p><strong>Punishment:</strong> Imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.</p>
                      
                      <div className="action-bar">
                          <button className="btn" style={{ border: '1px solid var(--border-color)', flexGrow: 1, background: 'var(--surface-color)' }}>View Full Text</button>
                      </div>
                  </div>
              </div>

              {/* New Law */}
              <div className="law-card">
                  <div className="law-header law-new">BNS (Bharatiya Nyaya Sanhita)</div>
                  <div className="law-body">
                      <div className="law-section">Section 316</div>
                      <p><strong>Description:</strong> Cheating and dishonestly inducing delivery of property.</p>
                      <br />
                      <p><strong>Punishment:</strong> Imprisonment of either description for a term which may extend to seven years, and shall also be liable to fine.</p>
                      
                      <div className="action-bar">
                          <button className="btn btn-primary" style={{ flexGrow: 1 }}>Copy BNS Reference</button>
                          <button className="btn" style={{ border: '1px solid var(--border-color)', flexGrow: 1, background: 'var(--surface-color)' }}>Find Cases</button>
                      </div>
                  </div>
              </div>
          </div>

          <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>Have a full document with old sections?</p>
              <button className="btn" style={{ background: 'var(--surface-color)', color: 'var(--text-primary)', border: '1px solid var(--border-color)', padding: '0.75rem 2rem' }}>📤 Bulk Convert Document</button>
          </div>
      </div>
    </div>
  );
};

export default Converter;