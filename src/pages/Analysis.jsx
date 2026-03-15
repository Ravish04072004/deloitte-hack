import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Analysis = () => {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', height: '100vh', overflow: 'hidden' }}>
      <style>{`
        .analysis-grid {
            display: grid;
            grid-template-columns: 40% 60%;
            height: calc(100vh - 65px);
        }
        .pdf-pane {
            background: var(--surface-color);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--border-color);
            color: var(--text-primary);
        }
        .pdf-viewer {
            flex-grow: 1;
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            margin-top: 1rem;
            padding: 2rem;
            overflow-y: auto;
            font-family: serif;
            line-height: 1.6;
            color: var(--text-primary);
        }
        .structure-pane {
            padding: 2rem;
            background: var(--bg-color);
            overflow-y: auto;
            color: var(--text-primary);
        }
        .toolbar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-bottom: 1rem;
            border-bottom: 1px solid var(--border-color);
            margin-bottom: 1.5rem;
        }
        .editable-section {
            background: var(--surface-color);
            padding: 1.5rem;
            border: 1px solid var(--border-color);
            border-radius: 8px;
            margin-bottom: 1rem;
            position: relative;
        }
        .editable-section h3 {
            margin-bottom: 0.5rem;
            color: var(--primary-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        .edit-btn {
            font-size: 0.8em;
            background: var(--bg-color);
            color: var(--text-secondary);
            border: 1px solid var(--border-color);
            padding: 2px 8px;
            border-radius: 4px;
            cursor: pointer;
        }
        .edit-btn:hover {
            background: var(--border-color);
        }
        .highlight-issue { background: rgba(234, 179, 8, 0.3); padding: 0 4px; border-radius: 2px; }
        .highlight-argument { background: rgba(59, 130, 246, 0.3); padding: 0 4px; border-radius: 2px; }
      `}</style>
      
      <nav className="top-nav">
        <div className="logo"><Link to="/workspace" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Workspace</Link> | Judgment Analysis Studio</div>
        <div className="nav-actions">
            <button className="btn" style={{ border: '1px solid var(--border-color)' }}>Export PDF</button>
            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', width: 'auto' }}>💾 Save Analysis</button>
        </div>
      </nav>

      <div className="analysis-grid">
          {/* Left Pane: Original Judgment */}
          <div className="pdf-pane">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Original Judgment File</strong>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn" style={{ padding: '2px 8px', background: 'var(--bg-color)' }}>🔍 Search</button>
                      <button className="btn" style={{ padding: '2px 8px', background: 'var(--bg-color)' }}>➖</button>
                      <button className="btn" style={{ padding: '2px 8px', background: 'var(--bg-color)' }}>➕</button>
                  </div>
              </div>
              <div className="pdf-viewer">
                  <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-primary)' }}>IN THE HIGH COURT OF JUDICATURE</h2>
                  <p>...14. The respondent has contended that the patent was <span className="highlight-argument">already in the public domain</span> prior to the filing of the application. This is a crucial point of law under...</p>
                  <br />
                  <p>...15. Upon examining the evidence, we find that <span className="highlight-issue">the core issue lies in determining the date of first public disclosure.</span> Therefore...</p>
                  <br />
                  <p style={{ color: 'var(--text-secondary)' }}>[Pages 3-45 omitted for prototype view]</p>
              </div>
          </div>

          {/* Right Pane: Structured Analysis */}
          <div className="structure-pane">
              <div className="toolbar">
                  <div>
                      <h2>Case Title: <span style={{ fontWeight: 'normal' }}>State vs. Sharma Enterprise</span></h2>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>Court: Delhi High Court | Date: 12 Oct 2023</p>
                  </div>
                  <button className="btn" style={{ border: '1px solid var(--border-color)', background: 'var(--surface-color)' }} onClick={() => navigate('/converter')}>⚖️ Open IPC/BNS Converter</button>
              </div>

              <div className="editable-section">
                  <h3>🎯 Core Issue <button className="edit-btn">Edit</button></h3>
                  <p>Whether the patent was introduced to the public domain prior to the official filing date, rendering the intellectual property claim invalid.</p>
              </div>

              <div className="editable-section">
                  <h3>👥 Parties <button className="edit-btn">Edit</button></h3>
                  <p><strong>Petitioner:</strong> State</p>
                  <p><strong>Respondent:</strong> Sharma Enterprise</p>
              </div>

              <div className="editable-section">
                  <h3>⚖️ Legal Sections Applied <button className="edit-btn">Edit</button></h3>
                  <ul style={{ paddingLeft: '1.5rem', marginTop: '0.5rem' }}>
                      <li>IPC Section 420 (BNS 316): Cheating</li>
                      <li>Evidence Act Section 65B: Electronic evidence</li>
                  </ul>
              </div>

              <div className="editable-section">
                  <h3>🧠 Court's Reasoning <button className="edit-btn">Edit</button></h3>
                  <p style={{ color: 'var(--text-secondary)' }}>[AI-extracted key reasoning points will appear here. Highlight text in the left pane to add directly to this section.]</p>
              </div>
          </div>
      </div>
    </div>
  );
};

export default Analysis;