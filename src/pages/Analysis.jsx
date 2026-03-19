import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ANALYSIS_JUDGMENT } from '../data/demoData';

const Analysis = () => {
    const [openSections, setOpenSections] = useState({
        issue: true,
        parties: true,
        petitioner: true,
        respondent: true,
        framework: true,
        precedents: true,
        reasoning: true,
        final: true,
    });

    const toggleSection = (key) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const SectionCard = ({ id, title, children }) => (
        <div className="editable-section" style={{ cursor: 'default' }}>
            <h3>
                <button
                    style={{ background: 'transparent', border: 'none', color: 'inherit', fontSize: '1rem', textAlign: 'left', cursor: 'pointer', fontWeight: 600 }}
                    onClick={() => toggleSection(id)}
                >
                    {title}
                </button>
                <button className="edit-btn" title="Regenerate section">⟳</button>
            </h3>
            {openSections[id] ? children : null}
        </div>
    );

  return (
    <div style={{ backgroundColor: 'var(--bg-color)', color: 'var(--text-primary)', height: '100vh', overflow: 'hidden' }}>
      <style>{`
        .analysis-grid {
            display: grid;
            grid-template-columns: 40% 60%;
            height: calc(100vh - 65px);
        }
        .pdf-pane {
            background: var(--glass-surface);
            padding: 1rem;
            display: flex;
            flex-direction: column;
            border-right: 1px solid var(--glass-border);
            color: var(--text-primary);
            backdrop-filter: blur(12px);
        }
        .pdf-viewer {
            flex-grow: 1;
            background: rgba(0, 0, 0, 0.22);
            border: 1px solid var(--glass-border);
            margin-top: 1rem;
            padding: 2rem;
            overflow-y: auto;
            font-family: serif;
            line-height: 1.6;
            color: var(--text-primary);
            border-radius: 12px;
            backdrop-filter: blur(8px);
        }
        .structure-pane {
            padding: 2rem;
            background: rgba(0, 0, 0, 0.1);
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
            background: rgba(23, 23, 23, 0.72);
            padding: 1.5rem;
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            margin-bottom: 1rem;
            position: relative;
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.24);
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
                    <button className="btn" style={{ border: '1px solid var(--border-color)' }}>Side-by-Side View</button>
                    <button className="btn" style={{ border: '1px solid var(--border-color)' }}>Edit Analysis</button>
                    <button className="btn">Export PDF</button>
                    <button className="btn">Export DOCX</button>
                    <button className="btn btn-primary" style={{ width: 'auto' }}>Add to Case</button>
        </div>
      </nav>

      <div className="analysis-grid">
          {/* Left Pane: Original Judgment */}
          <div className="pdf-pane">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <strong>Original Judgment File</strong>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button className="btn" style={{ padding: '2px 8px', background: 'var(--bg-color)' }}>◀</button>
                      <button className="btn" style={{ padding: '2px 8px', background: 'var(--bg-color)' }}>▶</button>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', alignSelf: 'center' }}>Page 1 of 23</span>
                  </div>
              </div>
              <div className="pdf-viewer">
                  <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: 'var(--text-primary)' }}>IN THE HIGH COURT OF DELHI</h2>
                  <p style={{ color: 'var(--text-secondary)', textAlign: 'center', marginBottom: '1rem' }}>{ANALYSIS_JUDGMENT.title} - Delhi HC, 2024</p>
                  <p>...14. The respondent has contended that the bank is not liable for telecom disruption. However, the record reveals <span className="highlight-argument">11 rapid sequential transfers in 4 minutes</span>, which ought to have triggered fraud velocity checks.</p>
                  <br />
                  <p>...15. Upon examining the evidence, we find that <span className="highlight-issue">the core issue is Section 43A compliance and reasonable security practices</span> when digital identity compromise is established.</p>
                  <br />
                  <p style={{ color: 'var(--text-secondary)' }}>[Pages 2-23 omitted for prototype view]</p>
              </div>
          </div>

          {/* Right Pane: Structured Analysis */}
          <div className="structure-pane">
                            <div className="toolbar">
                                <div>
                                    <h2>{ANALYSIS_JUDGMENT.title}</h2>
                                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9em' }}>
                                        {ANALYSIS_JUDGMENT.citation} | {ANALYSIS_JUDGMENT.court} | {ANALYSIS_JUDGMENT.date}
                                    </p>
                                </div>
                                <span style={{ padding: '0.35rem 0.75rem', borderRadius: '999px', background: 'rgba(16,185,129,0.2)', border: '1px solid #10b981', color: '#34d399', fontWeight: 700 }}>
                                    {ANALYSIS_JUDGMENT.outcome}
                                </span>
                            </div>

                            <SectionCard id="issue" title="🎯 Core Issue">
                                <p>{ANALYSIS_JUDGMENT.coreIssue}</p>
                            </SectionCard>

                            <SectionCard id="parties" title="👥 Parties & Background">
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.8rem' }}>
                                    <div className="case-card" style={{ marginBottom: 0 }}>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Petitioner</p>
                                        <p style={{ marginTop: '0.4rem', fontWeight: 700 }}>{ANALYSIS_JUDGMENT.petitioner.name}</p>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.35rem' }}>{ANALYSIS_JUDGMENT.petitioner.role}</p>
                                    </div>
                                    <div className="case-card" style={{ marginBottom: 0 }}>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>Respondent</p>
                                        <p style={{ marginTop: '0.4rem', fontWeight: 700 }}>{ANALYSIS_JUDGMENT.respondent.name}</p>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.35rem' }}>{ANALYSIS_JUDGMENT.respondent.role}</p>
                                    </div>
                                </div>
                                <p style={{ marginTop: '0.7rem', color: 'var(--text-secondary)' }}>{ANALYSIS_JUDGMENT.history}</p>
                            </SectionCard>

                            <SectionCard id="petitioner" title="📋 Petitioner's Arguments">
                                <ol style={{ paddingLeft: '1.2rem' }}>
                                    {ANALYSIS_JUDGMENT.petitionerArgs.map((arg) => (
                                        <li key={arg.arg} style={{ marginBottom: '0.6rem' }}>
                                            <p>{arg.arg}</p>
                                            <span className="citation-chip">Supported by: {arg.support}</span>
                                        </li>
                                    ))}
                                </ol>
                            </SectionCard>

                            <SectionCard id="respondent" title="📋 Respondent's Arguments">
                                <ol style={{ paddingLeft: '1.2rem' }}>
                                    {ANALYSIS_JUDGMENT.respondentArgs.map((arg) => (
                                        <li key={arg.arg} style={{ marginBottom: '0.6rem' }}>
                                            <p>{arg.arg}</p>
                                            <span className="citation-chip" style={{ background: 'rgba(239,68,68,0.2)', color: '#fca5a5' }}>Supported by: {arg.support}</span>
                                        </li>
                                    ))}
                                </ol>
                            </SectionCard>

                            <SectionCard id="framework" title="⚖️ Legal Framework Applied">
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>Section</th>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>Description</th>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>Application</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ANALYSIS_JUDGMENT.legalFramework.map((row) => (
                                            <tr key={row.section}>
                                                <td style={{ paddingTop: '0.45rem', paddingRight: '0.5rem' }}>{row.section}</td>
                                                <td style={{ paddingTop: '0.45rem', paddingRight: '0.5rem', color: 'var(--text-secondary)' }}>{row.description}</td>
                                                <td style={{ paddingTop: '0.45rem', color: 'var(--text-secondary)' }}>{row.application}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </SectionCard>

                            <SectionCard id="precedents" title="📚 Precedents Cited">
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead>
                                        <tr>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>Case Name</th>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>Year</th>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>Court</th>
                                            <th style={{ textAlign: 'left', borderBottom: '1px solid var(--glass-border)', paddingBottom: '0.4rem' }}>How Applied</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {ANALYSIS_JUDGMENT.precedentsCited.map((row) => (
                                            <tr key={row.name}>
                                                <td style={{ paddingTop: '0.45rem', paddingRight: '0.5rem' }}>{row.name}</td>
                                                <td style={{ paddingTop: '0.45rem', paddingRight: '0.5rem', color: 'var(--text-secondary)' }}>{row.year}</td>
                                                <td style={{ paddingTop: '0.45rem', paddingRight: '0.5rem', color: 'var(--text-secondary)' }}>{row.court}</td>
                                                <td style={{ paddingTop: '0.45rem', color: 'var(--text-secondary)' }}>{row.how}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </SectionCard>

                            <SectionCard id="reasoning" title="🧠 Court's Reasoning">
                                <ul style={{ paddingLeft: '1.2rem' }}>
                                    {ANALYSIS_JUDGMENT.reasoning.map((reason) => (
                                        <li key={reason} style={{ marginBottom: '0.5rem' }}>{reason}</li>
                                    ))}
                                </ul>
                            </SectionCard>

                            <SectionCard id="final" title="⚖️ Final Judgment">
                                <span style={{ padding: '0.25rem 0.6rem', borderRadius: '999px', border: '1px solid #10b981', color: '#34d399' }}>
                                    {ANALYSIS_JUDGMENT.finalJudgment.outcome}
                                </span>
                                <ul style={{ marginTop: '0.6rem', paddingLeft: '1.2rem' }}>
                                    {ANALYSIS_JUDGMENT.finalJudgment.directives.map((d) => (
                                        <li key={d} style={{ marginBottom: '0.45rem' }}>{d}</li>
                                    ))}
                                </ul>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{ANALYSIS_JUDGMENT.finalJudgment.orders}</p>
                            </SectionCard>

                            <div className="case-card" style={{ marginBottom: 0 }}>
                                <strong>Agent Processing Stats</strong>
                                <p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>7 agents · 2m 14s · 23 pages analyzed · 3 precedents extracted</p>
                            </div>
          </div>
      </div>
    </div>
  );
};

export default Analysis;