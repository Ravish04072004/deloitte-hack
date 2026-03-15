import React from 'react';
import { Link } from 'react-router-dom';

const Upload = () => {
  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <style>{`
        .upload-modal {
            max-width: 700px;
            margin: 3rem auto;
            background: var(--surface-color);
            border-radius: 12px;
            padding: 2.5rem;
            box-shadow: 0 10px 25px rgba(0,0,0,0.5);
            border: 1px solid var(--border-color);
        }
        .drop-zone {
            border: 2px dashed var(--primary-color);
            background: var(--bg-color);
            border-radius: 12px;
            padding: 4rem 2rem;
            text-align: center;
            cursor: pointer;
            transition: background 0.3s;
            margin-bottom: 2rem;
        }
        .drop-zone:hover {
            background: var(--sidebar-bg);
        }
        .form-group {
            margin-bottom: 1.5rem;
        }
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: bold;
        }
        .form-control {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border-color);
            background: var(--bg-color);
            color: var(--text-primary);
            border-radius: 6px;
            font-size: 1rem;
        }
        .processing-area {
            background: var(--bg-color);
            border: 1px solid var(--border-color);
            border-radius: 8px;
            padding: 1.5rem;
            margin-top: 2rem;
        }
        .progress-bar-bg {
            height: 8px;
            background: var(--border-color);
            border-radius: 4px;
            margin: 1rem 0;
            overflow: hidden;
        }
        .progress-bar-fill {
            height: 100%;
            background: var(--primary-color);
            width: 45%;
            transition: width 0.5s;
        }
      `}</style>
      
      <nav className="top-nav">
          <div className="logo"><Link to="/workspace" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Workspace</Link> | Intelligence Ingestion</div>
      </nav>

      <div className="upload-modal">
          <div className="drop-zone">
              <h2 style={{ color: 'var(--text-primary)' }}>📄 Drop documents here or click to browse</h2>
              <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Supported formats: PDF, DOCX, TXT, Images (OCR)</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
              <div>
                  <div className="form-group">
                      <label>Document Type (Auto-detected)</label>
                      <select className="form-control">
                          <option>Judgment / Precedent</option>
                          <option>Case Document (Petition/Reply)</option>
                          <option>Evidence/Exhibit</option>
                          <option>Legal Section Reference</option>
                      </select>
                  </div>
              </div>
              
              <div>
                  <div className="form-group">
                      <label>Smart Processing Options</label>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                          <label style={{ fontWeight: 'normal' }}><input type="checkbox" defaultChecked /> Auto-extract related judgments</label>
                          <label style={{ fontWeight: 'normal' }}><input type="checkbox" defaultChecked /> Generate summary</label>
                          <label style={{ fontWeight: 'normal' }}><input type="checkbox" defaultChecked /> Find precedents</label>
                      </div>
                  </div>
              </div>
          </div>

          {/* Simulated Processing State */}
          <div className="processing-area">
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                  <span>Analyzing Content...</span>
                  <span>45%</span>
              </div>
              
              <div className="progress-bar-bg">
                  <div className="progress-bar-fill"></div>
              </div>

              <ul style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', listStyle: 'none', marginTop: '1rem', lineHeight: 1.8 }}>
                  <li style={{ color: 'var(--text-secondary)' }}>✓ Uploading document...</li>
                  <li style={{ color: 'var(--text-secondary)' }}>✓ Extracting text...</li>
                  <li>⚙ Identifying legal sections...</li>
                  <li style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>⧗ Generating summary...</li>
                  <li style={{ color: 'var(--text-secondary)', opacity: 0.5 }}>⧗ Finding related judgments...</li>
              </ul>
          </div>

          <div style={{ marginTop: '2rem', display: 'flex', justifyContent: 'flex-end' }}>
              <Link to="/workspace" className="btn btn-primary" style={{ width: 'auto', padding: '0.75rem 2rem', textDecoration: 'none' }}>Add to Case Workspace</Link>
          </div>
      </div>
    </div>
  );
};

export default Upload;