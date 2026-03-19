import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { CONVERTER_DATA } from '../data/demoData';

const Converter = () => {
    const [query, setQuery] = useState('IPC 420');
    const [activeRow, setActiveRow] = useState(null);
    const [tab, setTab] = useState('lookup');
    const [converted, setConverted] = useState(false);

    const filteredData = useMemo(() => {
        const term = query.toLowerCase();
        return CONVERTER_DATA.filter((row) => `${row.ipc} ${row.ipcTitle} ${row.bns} ${row.bnsTitle}`.toLowerCase().includes(term));
    }, [query]);

    const changeColor = {
        Minor: '#f59e0b',
        Significant: '#ef4444',
        Cosmetic: '#94a3b8',
        Removed: '#7f1d1d',
        Absorbed: '#3b82f6',
    };

    const rawDoc = 'Charge under IPC Section 420, Section 499 and Section 124A is framed. IT Act Section 66C shall also apply.';
    const convertedDoc = 'Charge under BNS Section 318, BNS Section 356 and [REPEALED: IPC Section 124A] is framed. IT Act Section 66C and BNS Section 319 shall also apply.';

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <style>{`
        .converter-container {
            max-width: 900px;
            margin: 3rem auto;
            background: var(--glass-surface);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            backdrop-filter: blur(14px);
            box-shadow: var(--glass-shadow);
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
            background: rgba(0, 0, 0, 0.2);
            color: var(--text-primary);
            border-radius: 8px;
            outline: none;
            backdrop-filter: blur(8px);
        }

        .comparison-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1.5rem;
        }

        .law-card {
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            overflow: hidden;
            background: rgba(0, 0, 0, 0.18);
            backdrop-filter: blur(10px);
            box-shadow: 0 8px 24px rgba(0, 0, 0, 0.25);
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

            <div className="converter-container" style={{ maxWidth: '1100px' }}>
                <div style={{ display: 'flex', gap: '0.6rem', marginBottom: '1rem' }}>
                    <button className={`btn ${tab === 'lookup' ? 'btn-primary' : ''}`} onClick={() => setTab('lookup')}>Section Lookup</button>
                    <button className={`btn ${tab === 'document' ? 'btn-primary' : ''}`} onClick={() => setTab('document')}>Document Conversion</button>
                </div>

                <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>545 IPC Sections Mapped → BNS 2023 | 23 Sections Repealed | 12 Sections Merged | 8 New Sections</p>

                {tab === 'lookup' && (
                    <>
                        <div className="search-area">
                            <h1>IPC → BNS Legal Code Converter</h1>
                            <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Search and compare mapped sections with change impact.</p>
                            <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center' }}>
                                <input type="text" className="search-input-large" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Enter IPC Section or Description..." />
                                <button className="btn btn-primary">Search</button>
                            </div>
                        </div>

                        <div className="case-card" style={{ marginBottom: 0 }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.7fr 1fr', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
                                <strong>IPC Section</strong>
                                <strong>Change Type</strong>
                                <strong>BNS Equivalent</strong>
                            </div>
                            <div style={{ marginTop: '0.6rem', display: 'grid', gap: '0.55rem' }}>
                                {filteredData.map((row) => (
                                    <div key={row.ipc} style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.65rem' }}>
                                        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.7fr 1fr', gap: '0.75rem', alignItems: 'center' }}>
                                            <div style={row.change === 'Removed' ? { textDecoration: 'line-through', color: '#f87171' } : undefined}>
                                                <strong>{row.ipc}</strong>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '0.25rem' }}>{row.ipcTitle}</p>
                                            </div>
                                            <span style={{ border: `1px solid ${changeColor[row.change] || '#94a3b8'}`, color: changeColor[row.change] || '#94a3b8', borderRadius: '999px', padding: '0.2rem 0.45rem', fontSize: '0.75rem', width: 'fit-content' }}>{row.change}</span>
                                            <div>
                                                <strong>{row.bnsTitle === 'REPEALED' ? 'REPEALED' : row.bns}</strong>
                                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '0.25rem' }}>{row.bnsTitle}</p>
                                            </div>
                                        </div>
                                        <button className="btn" style={{ marginTop: '0.5rem' }} onClick={() => setActiveRow(activeRow === row.ipc ? null : row.ipc)}>
                                            {activeRow === row.ipc ? 'Hide Diff' : 'Show Diff'}
                                        </button>
                                        {activeRow === row.ipc && (
                                            <div style={{ marginTop: '0.5rem', background: 'rgba(34,197,94,0.12)', border: '1px solid rgba(34,197,94,0.4)', borderRadius: '8px', padding: '0.5rem 0.6rem' }}>
                                                <strong>Diff Insight</strong>
                                                <p style={{ marginTop: '0.25rem' }}>{row.diff}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </>
                )}

                {tab === 'document' && (
                    <div className="case-card" style={{ marginBottom: 0 }}>
                        <h3>Document Conversion Sandbox</h3>
                        <p style={{ color: 'var(--text-secondary)', marginTop: '0.5rem' }}>Sample charge sheet references are auto-mapped to BNS equivalents.</p>
                        <textarea className="form-control" style={{ minHeight: '140px', marginTop: '0.8rem' }} value={converted ? convertedDoc : rawDoc} readOnly />
                        <div style={{ marginTop: '0.8rem', display: 'flex', justifyContent: 'flex-end' }}>
                            <button className="btn btn-primary" onClick={() => setTimeout(() => setConverted(true), 1500)}>Convert Document</button>
                        </div>
                    </div>
                )}
            </div>
    </div>
  );
};

export default Converter;