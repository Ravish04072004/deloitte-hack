import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

const Extensions = () => {
    const extensionCatalog = useMemo(
        () => [
            {
                id: 'cyber-law',
                icon: '🛡️',
                name: 'Cyber Law Assistant',
                subtitle: 'Digital fraud, SIM-swap, phishing jurisprudence',
                stats: '10,247 precedents · IT Act 2000 + Cyber Crime DB · Updated: March 2026',
                features: ['SIM-swap and phishing case law', 'Digital evidence chain guidance', 'IT Act 2000 statutory mapping'],
                preview: 'Q: Best Delhi HC precedent under Section 43A? → Ramesh Gupta v. Kotak (2024)',
            },
            {
                id: 'taxation',
                icon: '💰',
                name: 'Taxation Law Module',
                subtitle: 'Income Tax Act and GST litigation intelligence',
                stats: '8,440 cases · ITAT + GST Tribunal DB · Updated: March 2026',
                features: ['Income Tax Act navigation', 'GST appeal strategy prompts', 'Tax evasion precedent summaries'],
                preview: 'Q: Show section 148 reassessment trend → 12 relevant tribunal rulings',
            },
            {
                id: 'ip-patent',
                icon: '🧬',
                name: 'IP & Patent Specialist',
                subtitle: 'Patent, trademark and copyright litigation',
                stats: '5,109 cases · IPAB + HC corpus · Updated: March 2026',
                features: ['Trademark infringement patterns', 'Prior art defense templates', 'Copyright injunction strategy'],
                preview: 'Q: Draft passing-off test checklist → Generated 5-factor matrix',
            },
            {
                id: 'corporate-law',
                icon: '🏢',
                name: 'Corporate Law Suite',
                subtitle: 'Companies Act, M&A, and SEBI compliance',
                stats: '6,782 cases · NCLT/NCLAT + SEBI DB · Updated: March 2026',
                features: ['Companies Act 2013 coverage', 'M&A risk memo generation', 'SEBI regulation lookup'],
                preview: 'Q: Oppression/mismanagement relief standards? → 9 key NCLAT holdings',
            },
            {
                id: 'criminal-law',
                icon: '⚖️',
                name: 'Criminal Law Pro',
                subtitle: 'IPC/BNS, bail jurisprudence, evidence law',
                stats: '22,000+ cases · Sessions + HC + SC DB · Updated: March 2026',
                features: ['IPC/BNS parity insights', 'Bail precedent clustering', 'Evidence Act contradiction spotting'],
                preview: 'Q: Anticipatory bail in cyber fraud? → High-probability argument pack',
            },
        ],
        []
    );

    const [installedExtensions, setInstalledExtensions] = useState([]);

    useEffect(() => {
        const raw = localStorage.getItem('app_chat_extensions');
        if (!raw) {
            setInstalledExtensions(['cyber-law']);
            return;
        }

        try {
            const parsed = JSON.parse(raw);
            if (Array.isArray(parsed)) {
                setInstalledExtensions(parsed);
            }
        } catch {
            setInstalledExtensions(['cyber-law']);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('app_chat_extensions', JSON.stringify(installedExtensions));
    }, [installedExtensions]);

    const toggleExtension = (id) => {
        setInstalledExtensions((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)' }}>
      <style>{`
        .ext-container {
            max-width: 1000px;
            margin: 3rem auto;
            background: var(--glass-surface);
            padding: 2rem;
            border-radius: 12px;
            border: 1px solid var(--glass-border);
            backdrop-filter: blur(14px);
            box-shadow: var(--glass-shadow);
        }

        .ext-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
            gap: 1.5rem;
            margin-top: 2rem;
        }

        .ext-card {
            border: 1px solid var(--glass-border);
            border-radius: 12px;
            padding: 1.5rem;
            background: rgba(0, 0, 0, 0.2);
            transition: transform 0.2s, border-color 0.2s, box-shadow 0.2s;
            backdrop-filter: blur(8px);
        }

        .ext-card:hover {
            transform: translateY(-5px);
            border-color: var(--primary-color);
            box-shadow: 0 10px 24px rgba(0, 0, 0, 0.26);
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
            gap: 0.8rem;
        }

        .status-badge {
            padding: 0.25rem 0.5rem;
            border-radius: 4px;
            font-size: 0.8rem;
            background: rgba(16, 185, 129, 0.15);
            color: #10b981;
        }

        .category-chip {
            display: inline-block;
            padding: 0.25rem 0.5rem;
            border-radius: 999px;
            margin-bottom: 0.8rem;
            font-size: 0.72rem;
            background: rgba(168, 85, 247, 0.12);
            color: var(--primary-color);
            border: 1px solid rgba(168, 85, 247, 0.25);
        }

        .action-btn {
            border: 1px solid var(--border-color);
            border-radius: 6px;
            padding: 0.45rem 0.9rem;
            font-size: 0.85rem;
            cursor: pointer;
            transition: all 0.2s;
        }

        .action-btn.install {
            background: var(--primary-color);
            color: white;
            border-color: var(--primary-color);
        }

        .action-btn.install:hover {
            opacity: 0.92;
        }

        .action-btn.remove {
            background: transparent;
            color: var(--text-secondary);
        }

        .action-btn.remove:hover {
            border-color: #f87171;
            color: #f87171;
        }
      `}</style>
      
      <nav className="top-nav">
          <div className="logo"><Link to="/workspace" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Workspace</Link> | Integrations & Extensions</div>
      </nav>

            <div className="ext-container">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2>Chat Specialization Extensions</h2>
              <p style={{ color: 'var(--text-secondary)' }}>
                                Install domain assistants to specialize legal reasoning by practice area.
              </p>
          </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', marginBottom: '1rem' }}>
                        <span style={{ color: 'var(--text-secondary)', fontSize: '0.83rem', alignSelf: 'center' }}>Currently Active:</span>
                        {installedExtensions.length === 0 ? <span className="citation-chip">No active extension</span> : null}
                        {installedExtensions.map((id) => {
                            const ext = extensionCatalog.find((item) => item.id === id);
                            return ext ? <span key={id} className="citation-chip" style={{ color: '#34d399' }}>{ext.name}</span> : null;
                        })}
                    </div>

          <div className="ext-grid">
              {extensionCatalog.map((extension) => {
                const isInstalled = installedExtensions.includes(extension.id);

                return (
                  <div className="ext-card" key={extension.id}>
                    <div className="ext-icon">{extension.icon}</div>
                                        <span className="category-chip">Domain Chat</span>
                    <div className="ext-title">{extension.name}</div>
                                        <div className="ext-desc">{extension.subtitle}</div>
                                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginBottom: '0.6rem' }}>{extension.stats}</p>
                                        <ul style={{ paddingLeft: '1rem', color: 'var(--text-secondary)', fontSize: '0.82rem', marginBottom: '0.7rem' }}>
                                            {extension.features.map((feature) => <li key={feature}>{feature}</li>)}
                                        </ul>
                                        <div style={{ border: '1px solid var(--glass-border)', borderRadius: '8px', padding: '0.45rem 0.5rem', background: 'rgba(255,255,255,0.02)', marginBottom: '0.8rem', fontSize: '0.78rem' }}>
                                            {extension.preview}
                                        </div>
                    <div className="ext-status">
                      <span
                        className="status-badge"
                        style={
                          isInstalled
                            ? undefined
                            : { background: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }
                        }
                      >
                                                {isInstalled ? 'Installed' : 'Available'}
                      </span>
                                            {isInstalled && <span style={{ fontSize: '0.72rem', color: '#22c55e' }}>Active</span>}
                      <button
                        className={`action-btn ${isInstalled ? 'remove' : 'install'}`}
                        onClick={() => toggleExtension(extension.id)}
                      >
                        {isInstalled ? 'Remove' : 'Install'}
                      </button>
                    </div>
                  </div>
                );
              })}

          </div>
      </div>
    </div>
  );
};

export default Extensions;