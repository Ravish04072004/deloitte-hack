import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Workspace = () => {
    const navigate = useNavigate();

    return (
        <div style={{ background: 'var(--bg-color)', color: 'var(--text-primary)', height: '100vh', overflow: 'hidden' }}>
            <style>{`
                .workspace-grid {
                    display: grid;
                    grid-template-columns: 20% 50% 30%;
                    height: calc(100vh - 65px);
                }
                
                .chat-area {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    background: var(--bg-color);
                    border-right: 1px solid var(--border-color);
                }

                .chat-history {
                    flex-grow: 1;
                    padding: 2rem;
                    overflow-y: auto;
                    color: var(--text-primary);
                }

                .chat-input {
                    padding: 1.5rem;
                    border-top: 1px solid var(--border-color);
                    background: var(--bg-color);
                }

                .msg-user {
                    background: var(--primary-color);
                    color: white;
                    padding: 1rem;
                    border-radius: 8px 8px 0 8px;
                    margin-bottom: 1rem;
                    max-width: 80%;
                    align-self: flex-end;
                    margin-left: auto;
                }

                .msg-ai {
                    background: var(--surface-color);
                    color: var(--text-primary);
                    padding: 1rem;
                    border-radius: 8px 8px 8px 0;
                    margin-bottom: 1rem;
                    max-width: 80%;
                    border: 1px solid var(--border-color);
                }

                .file-tree ul {
                    list-style-type: none;
                    padding-left: 1rem;
                    margin: 0.5rem 0;
                }
                
                .file-tree li {
                    padding: 0.2rem 0;
                    font-size: 0.9em;
                    cursor: pointer;
                    color: var(--text-secondary);
                }
                
                .file-tree li:hover {
                    color: var(--primary-color);
                }

                .chat-toolbar {
                    display: flex;
                    gap: 0.5rem;
                    margin-bottom: 0.5rem;
                }

                .chip {
                    padding: 0.2rem 0.5rem;
                    background: var(--surface-color);
                    border: 1px solid var(--border-color);
                    border-radius: 12px;
                    font-size: 0.75rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                }
                .chip:hover {
                    background: var(--border-color);
                }
            `}</style>

            <nav className="top-nav">
                <div className="logo"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Home</Link> | Case: State vs. Sharma</div>
                <div className="nav-actions">
                    <span style={{ background: 'var(--civ-blue)', padding: '5px 10px', borderRadius: '20px', color: 'white', fontSize: '0.8em' }}>Extension: Cyber Law Active</span>
                </div>
            </nav>

            <div className="workspace-grid">
                {/* Left Sidebar: Document Tree */}
                <aside className="sidebar file-tree" style={{ background: 'var(--sidebar-bg)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>📁 Case Documents</h3>
                    <ul>
                        <li>📄 Petition Filed.pdf</li>
                        <li>📄 Respondent Reply.docx</li>
                        <li>📄 Evidence Documents.pdf</li>
                        <li>📄 Court Orders.pdf</li>
                    </ul>

                    <h3 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>📁 Related Judgments</h3>
                    <ul>
                        <li>📜 Judgment A (Summary)</li>
                        <li>📜 Judgment B (Summary)</li>
                    </ul>

                    <h3 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>📁 Precedents</h3>
                    <ul>
                        <li>🏛️ Landmark Case 1</li>
                        <li>🏛️ Landmark Case 2</li>
                    </ul>

                    <h3 style={{ fontSize: '1rem', marginTop: '1.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>📁 Legal Sections</h3>
                    <ul>
                        <li>⚖️ IPC 420 → BNS 316</li>
                        <li>⚖️ CrPC 482</li>
                    </ul>
                </aside>

                {/* Center: Chat Interface */}
                <main className="chat-area">
                    <div className="chat-history">
                        <div className="msg-user">
                            What are the key arguments in the respondent's reply regarding the intellectual property claim?
                        </div>
                        <div className="msg-ai">
                            Based on the uploaded document "Respondent Reply.docx", the key arguments are:
                            <ol style={{ marginTop: '0.5rem', marginLeft: '1.5rem', marginBottom: '1rem' }}>
                                <li style={{ marginBottom: '0.5rem' }}>The patent claims were already disclosed in prior art. <span style={{color: 'var(--primary-color)', fontSize: '0.85em'}}>[Pg-4]</span></li>
                                <li style={{ marginBottom: '0.5rem' }}>The petitioner failed to demonstrate actual financial damages. <span style={{color: 'var(--primary-color)', fontSize: '0.85em'}}>[Pg-12]</span></li>
                            </ol>
                            Would you like me to find similar precedents related to public domain patent invalidation?
                        </div>
                    </div>
                    
                    <div className="chat-input" style={{ background: 'var(--bg-color)' }}>
                        <div className="chat-toolbar">
                            <span className="chip" onClick={() => navigate('/analysis')}>Summarize Judgment</span>
                            <span className="chip">Find Precedents</span>
                            <span className="chip">Compare Arguments</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', border: '1px solid var(--border-color)', padding: '0.5rem', borderRadius: '8px', background: 'var(--surface-color)' }}>
                            <button className="action-btn" style={{ padding: '0.2rem', color: 'var(--text-secondary)' }}><i className="fa-solid fa-paperclip"></i></button>
                            <input type="text" placeholder="Ask anything about this case..." style={{ flexGrow: 1, border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-primary)' }} />
                            <button className="action-btn" style={{ padding: '0.2rem', color: 'var(--text-secondary)' }}><i className="fa-solid fa-microphone"></i></button>
                            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '6px' }}>Send</button>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar: Local Graph */}
                <aside className="sidebar" style={{ borderLeft: '1px solid var(--border-color)', background: 'var(--sidebar-bg)', padding: '1rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>🧠 Case Connections</h3>
                    <p style={{ fontSize: '0.8em', color: 'var(--text-secondary)', marginBottom: '1rem' }}>Graph view of entities in State vs. Sharma</p>
                    
                    <div className="graph-preview" style={{ height: '250px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-secondary)' }}>[Local Force-Directed Map]</span>
                    </div>
                    
                    <button className="btn" style={{ width: '100%', marginTop: '1rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} onClick={() => navigate('/graph')}>View Full Graph</button>
                    <button className="btn" style={{ width: '100%', marginTop: '1rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} onClick={() => navigate('/analysis')}>Run Judgment Analysis</button>
                    <button className="btn" style={{ width: '100%', marginTop: '1rem', background: 'var(--surface-color)', border: '1px solid var(--border-color)', color: 'var(--text-primary)' }} onClick={() => navigate('/converter')}>Open IPC/BNS Converter</button>
                </aside>
            </div>
        </div>
    );
};

export default Workspace;