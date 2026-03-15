import React from 'react';
import { Link } from 'react-router-dom';

const Extensions = () => {
  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <style>{`
        .ext-container {
            max-width: 1000px;
            margin: 3rem auto;
            background: var(--surface-color);
            padding: 2rem;
            border-radius: 8px;
            border: 1px solid var(--border-color);
        }

        .ext-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .ext-card {
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1.5rem;
            background: var(--bg-color);
            transition: transform 0.2s, border-color 0.2s;
        }

        .ext-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary-color);
        }

        .ext-icon {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: var(--primary-color);
        }

        .ext-title {
            font-size: 1.2rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }

        .ext-desc {
            color: var(--text-secondary);
            font-size: 0.9rem;
            line-height: 1.5;
            margin-bottom: 1.5rem;
        }

        .ext-status {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .status-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            background: rgba(16, 185, 129, 0.15);
            color: #10b981;
        }
      `}</style>
      
      <nav className="top-nav">
          <div className="logo"><Link to="/workspace" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Workspace</Link> | Integrations & Extensions</div>
      </nav>

      <div className="ext-container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2>LegalTech Ecosystem</h2>
              <p style={{ color: 'var(--text-secondary)' }}>Connect your preferred tools and databases to supercharge your workflow.</p>
          </div>

          <div className="ext-grid">
              
              <div className="ext-card">
                  <div className="ext-icon">⚖️</div>
                  <div className="ext-title">Manupatra Sync</div>
                  <div className="ext-desc">Directly fetch case laws, bare acts, and citations from Manupatra database into your workspace.</div>
                  <div className="ext-status">
                      <span className="status-badge">Installed</span>
                      <button className="btn" style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>Configure</button>
                  </div>
              </div>

              <div className="ext-card">
                  <div className="ext-icon">☁️</div>
                  <div className="ext-title">Google Drive</div>
                  <div className="ext-desc">Seamlessly import case files, evidence, and export final drafts directly to your legal team's shared drive.</div>
                  <div className="ext-status">
                      <span className="status-badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>Available</span>
                      <button className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Install</button>
                  </div>
              </div>

              <div className="ext-card">
                  <div className="ext-icon">📅</div>
                  <div className="ext-title">Court Docket Calendar</div>
                  <div className="ext-desc">Sync hearing dates, limitations deadlines, and filing schedules with Outlook or Google Calendar.</div>
                  <div className="ext-status">
                      <span className="status-badge">Installed</span>
                      <button className="btn" style={{ background: 'var(--surface-color)', border: '1px solid var(--border-color)' }}>Configure</button>
                  </div>
              </div>

              <div className="ext-card">
                  <div className="ext-icon">📝</div>
                  <div className="ext-title">Microsoft Word Plugin</div>
                  <div className="ext-desc">Draft documents in MS Word while AI suggests citations and Auto-generates legal formatting.</div>
                  <div className="ext-status">
                      <span className="status-badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>Available</span>
                      <button className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Install</button>
                  </div>
              </div>

              <div className="ext-card">
                  <div className="ext-icon">💵</div>
                  <div className="ext-title">Billable Hours Tracker</div>
                  <div className="ext-desc">Automatically track time spent on specific cases/documents and generate client invoices.</div>
                  <div className="ext-status">
                      <span className="status-badge" style={{ background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>Available</span>
                      <button className="btn btn-primary" style={{ padding: '0.4rem 1rem' }}>Install</button>
                  </div>
              </div>

          </div>
      </div>
    </div>
  );
};

export default Extensions;