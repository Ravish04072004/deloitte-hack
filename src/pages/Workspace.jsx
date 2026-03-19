import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CASE_DOCUMENTS, DEMO_CASE, WORKSPACE_CHAT } from '../data/demoData';

const Workspace = () => {
    const navigate = useNavigate();
    const [activeDoc, setActiveDoc] = useState(CASE_DOCUMENTS[0]?.id || null);
    const [showTyping, setShowTyping] = useState(false);

    useEffect(() => {
        setShowTyping(true);
        const timer = setTimeout(() => setShowTyping(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const groupedDocs = useMemo(() => {
        return CASE_DOCUMENTS.reduce((acc, doc) => {
            if (!acc[doc.type]) {
                acc[doc.type] = [];
            }
            acc[doc.type].push(doc);
            return acc;
        }, {});
    }, []);

    const markdownToHtml = (text) => {
        let html = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n\n/g, '<br/><br/>')
            .replace(/\n- (.*?)(?=<br\/>|$)/g, '<li>$1</li>')
            .replace(/(^|<br\/>)\d+\. (.*?)(?=<br\/>|$)/g, '$1<li>$2</li>');

        html = html.replace(/(<li>.*?<\/li>)+/g, '<ul>$&</ul>');

        if (html.includes('|')) {
            const lines = text.split('\n').filter((line) => line.trim().startsWith('|'));
            if (lines.length > 2) {
                const rows = lines.filter((line, index) => index !== 1).map((line) =>
                    line
                        .split('|')
                        .filter(Boolean)
                        .map((cell) => cell.trim())
                );
                if (rows.length > 1) {
                    const head = rows[0].map((cell) => `<th>${cell}</th>`).join('');
                    const body = rows
                        .slice(1)
                        .map((cells) => `<tr>${cells.map((cell) => `<td>${cell}</td>`).join('')}</tr>`)
                        .join('');
                    const table = `<table style="width:100%;margin-top:0.7rem;border-collapse:collapse"><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table>`;
                    html += table;
                }
            }
        }

        return html;
    };

    return (
        <div style={{ background: 'var(--bg-color)', color: 'var(--text-primary)', minHeight: '100vh', height: '100vh', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <style>{`
                .workspace-grid {
                    display: grid;
                    grid-template-columns: 20% 50% 30%;
                    height: 100%;
                    gap: 1rem;
                    padding: 1rem;
                    min-height: 0;
                }
                
                .chat-area {
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    min-height: 0;
                    background: var(--glass-surface);
                    border: 1px solid var(--glass-border);
                    border-radius: 14px;
                    backdrop-filter: blur(14px);
                    box-shadow: var(--glass-shadow);
                }

                .chat-history {
                    flex-grow: 1;
                    min-height: 0;
                    padding: 2rem;
                    overflow-y: auto;
                    color: var(--text-primary);
                }

                .chat-input {
                    padding: 1.5rem;
                    border-top: 1px solid var(--glass-border);
                    background: rgba(0, 0, 0, 0.18);
                    border-radius: 0 0 14px 14px;
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
                    background: rgba(23, 23, 23, 0.72);
                    color: var(--text-primary);
                    padding: 1rem;
                    border-radius: 8px 8px 8px 0;
                    margin-bottom: 1rem;
                    max-width: 80%;
                    border: 1px solid var(--glass-border);
                    backdrop-filter: blur(10px);
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
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid var(--glass-border);
                    border-radius: 12px;
                    font-size: 0.75rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                    transition: all 0.2s;
                }
                .chip:hover {
                    background: rgba(255, 255, 255, 0.09);
                    transform: translateY(-1px);
                }
            `}</style>

            <nav className="top-nav">
                <div className="logo"><Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Home</Link> | {DEMO_CASE.title} - {DEMO_CASE.number}</div>
                <div className="nav-actions">
                    <span style={{ background: 'var(--civ-blue)', padding: '5px 10px', borderRadius: '20px', color: 'white', fontSize: '0.8em' }}>{DEMO_CASE.court}</span>
                    <span style={{ background: 'rgba(245,158,11,0.18)', color: '#f59e0b', padding: '5px 10px', borderRadius: '20px', fontSize: '0.8em', border: '1px solid #f59e0b' }}>{DEMO_CASE.status}</span>
                </div>
            </nav>

            <div style={{ flex: 1, minHeight: 0 }}>
            <div className="workspace-grid">
                {/* Left Sidebar: Document Tree */}
                <aside className="sidebar file-tree" style={{ background: 'var(--glass-surface)', border: '1px solid var(--glass-border)', borderRadius: '14px', boxShadow: 'var(--glass-shadow)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>📁 Case Documents</h3>
                    {Object.entries(groupedDocs).map(([type, docs]) => (
                        <div key={type} style={{ marginBottom: '0.8rem' }}>
                            <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.35rem' }}>{type}</p>
                            <ul>
                                {docs.map((doc) => (
                                    <li
                                        key={doc.id}
                                        onClick={() => setActiveDoc(doc.id)}
                                        style={{
                                            color: activeDoc === doc.id ? 'var(--text-primary)' : 'var(--text-secondary)',
                                            background: activeDoc === doc.id ? 'rgba(168,85,247,0.2)' : 'transparent',
                                            borderRadius: '8px',
                                            padding: '0.35rem 0.5rem',
                                        }}
                                    >
                                        📄 {doc.name}
                                        {doc.autoFetched && (
                                            <span style={{ marginLeft: '0.45rem', fontSize: '0.68rem', background: 'rgba(245,158,11,0.25)', color: '#fbbf24', borderRadius: '999px', padding: '0.1rem 0.45rem' }}>
                                                ⚡ Auto-fetched
                                            </span>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </aside>

                {/* Center: Chat Interface */}
                <main className="chat-area">
                    <div className="chat-history">
                        {WORKSPACE_CHAT.map((message, idx) => (
                            <div key={`${message.time}-${idx}`} className={message.role === 'ai' ? 'msg-ai chat-ai-message' : 'msg-user chat-user-message'}>
                                {message.role === 'ai' && (
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.6rem' }}>
                                        <span style={{ width: '28px', height: '28px', borderRadius: '999px', background: 'radial-gradient(circle at 30% 30%, #60a5fa, #a855f7)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, boxShadow: '0 0 14px rgba(96,165,250,0.45)' }}>AI</span>
                                        <strong>LegalMind AI</strong>
                                        {message.extensionActive && <span style={{ marginLeft: 'auto', fontSize: '0.7rem', background: 'rgba(168,85,247,0.25)', color: '#d8b4fe', borderRadius: '999px', padding: '0.2rem 0.45rem' }}>{message.extensionActive} Active</span>}
                                    </div>
                                )}
                                {message.role === 'ai' ? (
                                    <div dangerouslySetInnerHTML={{ __html: markdownToHtml(message.text) }} />
                                ) : (
                                    <p style={{ margin: 0 }}>{message.text}</p>
                                )}
                                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{message.time}</div>
                                {message.citations && (
                                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginTop: '0.6rem' }}>
                                        {message.citations.map((citation) => (
                                            <span key={citation} className="citation-chip">{citation}</span>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        {showTyping && (
                            <div className="typing-indicator" style={{ width: '90px', marginBottom: '1rem' }}>
                                <span></span><span></span><span></span>
                            </div>
                        )}
                    </div>
                    
                    <div className="chat-input" style={{ background: 'rgba(0,0,0,0.16)' }}>
                        <div className="chat-toolbar">
                            <span className="chip" onClick={() => navigate('/analysis')}>Summarize Judgment</span>
                            <span className="chip">Find Precedents</span>
                            <span className="chip">Compare Arguments</span>
                        </div>
                        <div style={{ display: 'flex', gap: '1rem', border: '1px solid var(--glass-border)', padding: '0.5rem', borderRadius: '10px', background: 'rgba(23,23,23,0.76)', backdropFilter: 'blur(10px)' }}>
                            <button className="action-btn" style={{ padding: '0.2rem', color: 'var(--text-secondary)' }}><i className="fa-solid fa-paperclip"></i></button>
                            <input type="text" defaultValue="What is the strongest counter-argument HDFC Bank will likely raise?" style={{ flexGrow: 1, border: 'none', outline: 'none', background: 'transparent', color: 'var(--text-primary)' }} />
                            <button className="action-btn" style={{ padding: '0.2rem', color: 'var(--text-secondary)' }}><i className="fa-solid fa-microphone"></i></button>
                            <button className="btn btn-primary" style={{ padding: '0.5rem 1rem', borderRadius: '6px' }}>Send</button>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar: Local Graph */}
                <aside className="sidebar" style={{ border: '1px solid var(--glass-border)', background: 'var(--glass-surface)', padding: '1rem', borderRadius: '14px', boxShadow: 'var(--glass-shadow)' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>Case Intelligence</h3>
                    <p style={{ fontSize: '0.8em', color: 'var(--text-secondary)', marginBottom: '0.8rem' }}>{DEMO_CASE.title}</p>

                    <div className="case-card" style={{ marginBottom: '0.8rem' }}>
                        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Active Extensions</p>
                        <div style={{ marginTop: '0.5rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Cyber Law Assistant</span>
                            <span style={{ color: '#22c55e' }}>ON</span>
                        </div>
                        <div style={{ marginTop: '0.35rem', display: 'flex', justifyContent: 'space-between' }}>
                            <span>Google Calendar</span>
                            <span style={{ color: '#22c55e' }}>ON</span>
                        </div>
                    </div>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.45rem' }}>Related Cases</p>
                    <div className="case-card" style={{ marginBottom: '0.55rem' }}>
                        <strong>Verma v. PNB (2023)</strong>
                        <div style={{ marginTop: '0.35rem', color: '#60a5fa', fontSize: '0.8rem' }}>Similarity 82%</div>
                    </div>
                    <div className="case-card" style={{ marginBottom: '0.8rem' }}>
                        <strong>Umashankar v. ICICI</strong>
                        <div style={{ marginTop: '0.35rem', color: '#60a5fa', fontSize: '0.8rem' }}>Similarity 79%</div>
                    </div>

                    <button className="btn" style={{ width: '100%', marginTop: '0.4rem' }}>Generate Hearing Brief</button>
                    <button className="btn" style={{ width: '100%', marginTop: '0.5rem' }}>Export as PDF</button>
                    <button className="btn" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => navigate('/graph')}>Add to Knowledge Graph</button>
                    <button className="btn" style={{ width: '100%', marginTop: '0.5rem' }} onClick={() => navigate('/voice')}>Voice Dictate Note</button>
                </aside>
            </div>
            </div>
        </div>
    );
};

export default Workspace;