import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AGENT_PIPELINE = [
    { name: 'Issue Identification Agent', time: '0.8s' },
    { name: 'Parties & Background Agent', time: '0.6s' },
    { name: 'Argument Extraction Agent', time: '1.2s' },
    { name: 'Counter-Argument Agent', time: '1.1s' },
    { name: 'Legal Framework Agent', time: '0.9s' },
    { name: 'Precedent Analysis Agent', time: '1.0s' },
    { name: 'Reasoning & Judgment Agent', time: '1.3s' },
];

const initialStatuses = () => AGENT_PIPELINE.map((agent) => ({ ...agent, status: 'waiting' }));

const Upload = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [docType, setDocType] = useState('Judgment');
    const [fileName, setFileName] = useState('');
    const [agentStatuses, setAgentStatuses] = useState(initialStatuses);

    useEffect(() => {
        if (step !== 2) {
            return;
        }

        const timers = [];
        AGENT_PIPELINE.forEach((_, index) => {
            const startTimer = setTimeout(() => {
                setAgentStatuses((prev) => prev.map((item, i) => (i === index ? { ...item, status: 'running' } : item)));
            }, index * 600);

            const doneTimer = setTimeout(() => {
                setAgentStatuses((prev) => prev.map((item, i) => (i === index ? { ...item, status: 'done' } : item)));
            }, index * 600 + 480);

            timers.push(startTimer, doneTimer);
        });

        const finishTimer = setTimeout(() => setStep(3), AGENT_PIPELINE.length * 600 + 700);
        timers.push(finishTimer);

        return () => timers.forEach((timer) => clearTimeout(timer));
    }, [step]);

    const startPipeline = () => {
        if (!fileName) {
            setFileName('Ramesh_Gupta_v_Kotak_2024.pdf');
        }
        setAgentStatuses(initialStatuses());
        setStep(2);
    };

    const uploadSample = () => {
        setFileName('Ramesh_Gupta_v_Kotak_2024.pdf');
        setDocType('Judgment');
        setAgentStatuses(initialStatuses());
        setStep(2);
    };

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <style>{`
        .upload-modal {
            max-width: 700px;
            margin: 3rem auto;
            background: var(--glass-surface);
            border-radius: 12px;
            padding: 2.5rem;
            box-shadow: var(--glass-shadow);
            border: 1px solid var(--glass-border);
            backdrop-filter: blur(14px);
        }
        .drop-zone {
            border: 2px dashed var(--primary-color);
            background: rgba(0, 0, 0, 0.18);
            border-radius: 12px;
            padding: 4rem 2rem;
            text-align: center;
            cursor: pointer;
            transition: background 0.3s, transform 0.2s;
            margin-bottom: 2rem;
        }
        .drop-zone:hover {
            background: rgba(255, 255, 255, 0.05);
            transform: translateY(-2px);
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
            border: 1px solid var(--glass-border);
            background: rgba(0, 0, 0, 0.16);
            color: var(--text-primary);
            border-radius: 6px;
            font-size: 1rem;
            backdrop-filter: blur(8px);
        }
        .processing-area {
            background: rgba(0, 0, 0, 0.2);
            border: 1px solid var(--glass-border);
            border-radius: 8px;
            padding: 1.5rem;
            margin-top: 2rem;
            backdrop-filter: blur(8px);
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
                {step === 1 && (
                    <>
                        <div className="drop-zone">
                            <h2 style={{ color: 'var(--text-primary)' }}>📄 Drop documents here or click to browse</h2>
                            <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Supported formats: PDF, DOCX, TXT, Images (OCR)</p>
                            <input
                                className="form-control"
                                style={{ marginTop: '1rem' }}
                                placeholder="Selected file..."
                                value={fileName}
                                onChange={(e) => setFileName(e.target.value)}
                            />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                            <div>
                                <div className="form-group">
                                    <label>Document Type</label>
                                    <select className="form-control" value={docType} onChange={(e) => setDocType(e.target.value)}>
                                        <option>FIR</option>
                                        <option>Judgment</option>
                                        <option>Evidence</option>
                                        <option>Petition</option>
                                        <option>Client Statement</option>
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

                        <div style={{ marginTop: '1.2rem', display: 'flex', gap: '0.8rem', justifyContent: 'flex-end' }}>
                            <button className="btn" onClick={uploadSample}>Upload Sample Judgment</button>
                            <button className="btn btn-primary" onClick={startPipeline}>Process Document</button>
                        </div>
                    </>
                )}

                {step === 2 && (
                    <div className="processing-area">
                        <h3>7-Agent Processing Pipeline</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>{fileName || 'Ramesh_Gupta_v_Kotak_2024.pdf'} · {docType}</p>
                        <div style={{ marginTop: '1rem', display: 'grid', gap: '0.55rem' }}>
                            {agentStatuses.map((agent) => (
                                <div key={agent.name} className={`pipeline-step ${agent.status === 'running' ? 'running' : ''} ${agent.status === 'done' ? 'done' : ''}`}>
                                    <span style={{ width: '22px', display: 'inline-block' }}>
                                        {agent.status === 'done' ? '✅' : agent.status === 'running' ? '⏳' : '⬜'}
                                    </span>
                                    <span style={{ flex: 1 }}>{agent.name}</span>
                                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                                        {agent.status === 'done' ? `Completed in ${agent.time}` : agent.status === 'running' ? 'Analyzing...' : 'Waiting'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {step === 3 && (
                    <div className="processing-area">
                        <h3>✅ Analysis Complete - 23 pages processed in 2m 14s</h3>
                        <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(3,minmax(0,1fr))', marginTop: '1rem' }}>
                            <div className="stat-box"><strong>3 Legal Sections</strong><p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>IPC 420 · 66C · 43A</p></div>
                            <div className="stat-box"><strong>4 Precedents Auto-Fetched</strong><p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>Delhi & Madras HC</p></div>
                            <div className="stat-box"><strong>Knowledge Graph Updated</strong><p style={{ color: 'var(--text-secondary)', marginTop: '0.4rem' }}>+7 connections added</p></div>
                        </div>
                        <div style={{ marginTop: '1.2rem', display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                            <button className="btn" onClick={() => setStep(1)}>Upload Another</button>
                            <button className="btn btn-primary" onClick={() => navigate('/analysis')}>View Full Analysis →</button>
                        </div>
                    </div>
                )}
            </div>
    </div>
  );
};

export default Upload;