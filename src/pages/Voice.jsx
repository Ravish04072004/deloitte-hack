import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { VOICE_AI_EXTRACTION, VOICE_TRANSCRIPT } from '../data/demoData';

const Voice = () => {
    const [tab, setTab] = useState('meeting');
    const [visibleTranscript, setVisibleTranscript] = useState(0);
    const [toast, setToast] = useState('');

    useEffect(() => {
        if (tab !== 'meeting') {
            return;
        }
        let count = 0;
        const timer = setInterval(() => {
            count += 1;
            setVisibleTranscript(Math.min(count, VOICE_TRANSCRIPT.length));
            if (count >= VOICE_TRANSCRIPT.length) {
                clearInterval(timer);
            }
        }, 400);
        return () => clearInterval(timer);
    }, [tab]);

    const visibleExtraction = useMemo(() => {
        const progress = Math.max(1, visibleTranscript);
        return {
            keyFacts: VOICE_AI_EXTRACTION.keyFacts.slice(0, Math.min(progress, VOICE_AI_EXTRACTION.keyFacts.length)),
            legalIssues: VOICE_AI_EXTRACTION.legalIssues.slice(0, Math.min(progress, VOICE_AI_EXTRACTION.legalIssues.length)),
            documentsNeeded: VOICE_AI_EXTRACTION.documentsNeeded.slice(0, Math.min(progress + 1, VOICE_AI_EXTRACTION.documentsNeeded.length)),
            nextSteps: VOICE_AI_EXTRACTION.nextSteps.slice(0, Math.min(progress, VOICE_AI_EXTRACTION.nextSteps.length)),
        };
    }, [visibleTranscript]);

    const generateSummary = () => {
        setToast('Meeting Summary Generated · Added to Sharma v. HDFC Bank');
        setTimeout(() => setToast(''), 2200);
    };

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <style>{`
        .voice-container {
            max-width: 1000px;
            margin: 3rem auto;
            background: var(--glass-surface);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            backdrop-filter: blur(14px);
            box-shadow: var(--glass-shadow);
        }

        .record-section {
            text-align: center;
            padding: 3rem;
            border: 2px dashed rgba(255, 255, 255, 0.2);
            border-radius: 12px;
            margin-bottom: 2rem;
            background: rgba(0, 0, 0, 0.2);
            backdrop-filter: blur(8px);
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
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1.5rem;
            min-height: 300px;
            backdrop-filter: blur(8px);
        }

        .ai-features {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1.5rem;
            backdrop-filter: blur(8px);
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
                <div className="logo"><Link to="/workspace" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Workspace</Link> | Voice Intelligence</div>
            </nav>

            <div className="voice-container">
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
                    <button className={`btn ${tab === 'assistant' ? 'btn-primary' : ''}`} onClick={() => setTab('assistant')}>Voice Assistant</button>
                    <button className={`btn ${tab === 'meeting' ? 'btn-primary' : ''}`} onClick={() => setTab('meeting')}>Meeting Recorder</button>
                </div>

                {tab === 'meeting' && (
                    <>
                        <div className="record-section">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                                <span style={{ color: '#ef4444', fontWeight: 700 }}>● RECORDING</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginTop: '0.8rem' }}>
                                {Array.from({ length: 8 }).map((_, index) => (
                                    <span key={index} className="waveform-bar" style={{ animationDelay: `${index * 90}ms` }}></span>
                                ))}
                            </div>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '0.8rem' }}>00:01:34 | Client: Anuj Sharma | Case: Sharma v. HDFC Bank</p>
                        </div>

                        <div className="transcript-grid">
                            <div className="transcript-box">
                                <h3 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>Live Transcript</h3>
                                <div style={{ display: 'grid', gap: '0.55rem' }}>
                                    {VOICE_TRANSCRIPT.slice(0, visibleTranscript).map((line) => (
                                        <div key={`${line.time}-${line.speaker}`} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--glass-border)', borderLeft: `3px solid ${line.speaker === 'Client' ? '#60a5fa' : '#34d399'}`, borderRadius: '8px', padding: '0.5rem 0.6rem' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                                                <span>{line.speaker}</span>
                                                <span>{line.time}</span>
                                            </div>
                                            <p style={{ marginTop: '0.35rem', lineHeight: 1.5 }}>{line.text}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="ai-features">
                                <h3 style={{ marginBottom: '0.8rem' }}>AI Extraction Panel</h3>
                                <div className="feature-item">
                                    <div>
                                        <strong>Key Facts Identified</strong>
                                        <ul style={{ marginTop: '0.35rem', paddingLeft: '1rem' }}>
                                            {visibleExtraction.keyFacts.map((fact) => <li key={fact}>{fact}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div>
                                        <strong>Legal Issues Flagged</strong>
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginTop: '0.4rem' }}>
                                            {visibleExtraction.legalIssues.map((issue) => <span key={issue} className="citation-chip">{issue}</span>)}
                                        </div>
                                    </div>
                                </div>
                                <div className="feature-item">
                                    <div>
                                        <strong>Documents to Collect</strong>
                                        <ul style={{ marginTop: '0.35rem', paddingLeft: '1rem' }}>
                                            {visibleExtraction.documentsNeeded.map((doc) => <li key={doc}>☐ {doc}</li>)}
                                        </ul>
                                    </div>
                                </div>
                                <div className="feature-item" style={{ borderBottom: 'none' }}>
                                    <div>
                                        <strong>Suggested Next Steps</strong>
                                        <ol style={{ marginTop: '0.35rem', paddingLeft: '1rem' }}>
                                            {visibleExtraction.nextSteps.map((next) => <li key={next}>{next}</li>)}
                                        </ol>
                                    </div>
                                </div>

                                <button className="btn btn-primary" style={{ width: '100%', marginTop: '0.8rem' }} onClick={generateSummary}>Stop Recording & Generate Summary</button>
                            </div>
                        </div>
                    </>
                )}

                {tab === 'assistant' && (
                    <div className="record-section">
                        <button className="mic-button pulse">🎙️</button>
                        <h2>Voice Assistant</h2>
                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', justifyContent: 'center', marginTop: '0.85rem' }}>
                            <span className="citation-chip">Show latest SC judgment on Section 420</span>
                            <span className="citation-chip">Summarize respondent reply</span>
                            <span className="citation-chip">Find SIM-swap precedents</span>
                        </div>

                        <div className="case-card" style={{ marginTop: '1rem', textAlign: 'left' }}>
                            <strong>Recent Commands</strong>
                            <p style={{ marginTop: '0.55rem', color: 'var(--text-secondary)' }}>1. "Show Delhi HC precedent on bank liability" → 4 matches, 1 landmark</p>
                            <p style={{ marginTop: '0.4rem', color: 'var(--text-secondary)' }}>2. "Summarize HDFC reply notice" → 6-point defense summary</p>
                            <p style={{ marginTop: '0.4rem', color: 'var(--text-secondary)' }}>3. "Draft next hearing opening" → argument skeleton generated</p>
                        </div>
                    </div>
                )}
            </div>

            {toast && (
                <div style={{ position: 'fixed', right: '16px', bottom: '16px', background: 'rgba(16,185,129,0.16)', color: '#34d399', border: '1px solid #34d399', borderRadius: '10px', padding: '0.65rem 0.9rem' }}>
                    {toast}
                </div>
            )}
    </div>
  );
};

export default Voice;