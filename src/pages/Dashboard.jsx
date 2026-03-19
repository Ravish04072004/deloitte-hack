import React, { useEffect, useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDemoState } from '../context/DemoContext';
import { DEMO_CASE, IMPACT_STATS, RECENT_CASES } from '../data/demoData';

const COUNTER_ITEMS = [
  { label: 'Judgments Processed', value: 1247, suffix: '' },
  { label: 'Precedents Indexed', value: 3891, suffix: '' },
  { label: 'Active Cases', value: 142, suffix: '' },
  { label: 'Lawyer Hours Saved', value: 23000000, suffix: 'Rs.' },
];

const WORKFLOW_STEPS = [
  { icon: '1', title: 'Create Case', desc: 'Open file and client profile.' },
  { icon: '2', title: 'Upload Docs', desc: 'Ingest evidence and pleadings.' },
  { icon: '3', title: 'AI Analysis', desc: 'Parse issues and framework.' },
  { icon: '4', title: 'Chat & Research', desc: 'Query precedents with context.' },
  { icon: '5', title: 'Draft & Export', desc: 'Generate hearing-ready output.' },
];

const CHIP_PROMPTS = [
  'Find precedents for Section 66C SIM-swap cases',
  'Summarize Sharma v. HDFC Bank arguments',
  'Convert IPC 420 to BNS equivalent',
  'Show case relationship graph',
];

const DOMAIN_BADGE = {
  'Cyber Law': 'badge-cyber',
  Criminal: 'badge-criminal',
  'IP & Patent': 'badge-ip',
  Taxation: 'badge-tax',
};

const formatCounter = (item, value) => {
  if (item.label === 'Lawyer Hours Saved') {
    return `${item.suffix}${(value / 10000000).toFixed(1)}Cr`;
  }
  return value.toLocaleString('en-IN');
};

const Dashboard = () => {
  const navigate = useNavigate();
  const { onboardingDone, skipOnboarding } = useDemoState();
  const [search, setSearch] = useState('');
  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [tourOpen, setTourOpen] = useState(!onboardingDone);
  const [tourStep, setTourStep] = useState(0);
  const [spotlight, setSpotlight] = useState(null);
  const improvement = useMemo(() => IMPACT_STATS.slice(0, 4), []);

  const tourSteps = useMemo(
    () => [
      { selector: '.sidebar', title: 'Navigation Hub', description: 'Use this sidebar to move across case workflows and modules.' },
      { selector: '.new-task-btn', title: 'Create New Case', description: 'Kick off a new case ingestion pipeline from here.' },
      { selector: '.search-container', title: 'AI Workbox', description: 'Ask strategy, precedent, and section queries in one place.' },
      { selector: '.suggestions-scroller', title: 'Prompt Shortcuts', description: 'One-click prompts quickly trigger common legal workflows.' },
      { selector: '.gallery-grid', title: 'Recent Cases', description: 'Resume the active narrative case or inspect related matters.' },
    ],
    []
  );

  useEffect(() => {
    const start = Date.now();
    const duration = 2000;
    const interval = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      setCounters(COUNTER_ITEMS.map((item) => Math.floor(item.value * progress)));
      if (progress === 1) {
        clearInterval(interval);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const clearFocus = () => {
      document.querySelectorAll('.tour-focus-active').forEach((el) => el.classList.remove('tour-focus-active'));
    };

    if (!tourOpen) {
      clearFocus();
      setSpotlight(null);
      return;
    }

    const updateSpotlight = () => {
      const step = tourSteps[tourStep];
      if (!step) {
        return;
      }
      const target = document.querySelector(step.selector);
      if (!target) {
        clearFocus();
        setSpotlight(null);
        return;
      }

      clearFocus();
      target.classList.add('tour-focus-active');

      const rect = target.getBoundingClientRect();
      setSpotlight({
        top: rect.top,
        left: rect.left,
        width: rect.width,
        height: rect.height,
      });
    };

    updateSpotlight();
    window.addEventListener('resize', updateSpotlight);
    window.addEventListener('scroll', updateSpotlight, true);

    return () => {
      clearFocus();
      window.removeEventListener('resize', updateSpotlight);
      window.removeEventListener('scroll', updateSpotlight, true);
    };
  }, [tourOpen, tourStep, tourSteps]);

  const closeTour = () => {
    setTourOpen(false);
    skipOnboarding();
  };

  const startTour = () => {
    setTourStep(0);
    setTourOpen(true);
  };

  const nextStep = () => {
    if (tourStep >= tourSteps.length - 1) {
      closeTour();
      return;
    }
    setTourStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setTourStep((prev) => (prev > 0 ? prev - 1 : 0));
  };

  return (
    <div className="dashboard-layout" style={{ minHeight: '100vh', position: 'relative' }}>
      <style>{`
        .tour-focus-active {
          position: relative;
          z-index: 95 !important;
          outline: 2px solid rgba(168, 85, 247, 0.9);
          outline-offset: 4px;
          border-radius: 10px;
          box-shadow: 0 0 20px rgba(168, 85, 247, 0.35);
        }
      `}</style>

      <button
        onClick={startTour}
        style={{
          position: 'fixed',
          right: '24px',
          top: '16px',
          zIndex: 40,
          background: 'rgba(255, 255, 255, 0.08)',
          border: '1px solid var(--border-color)',
          color: 'var(--text-primary)',
          borderRadius: '999px',
          padding: '8px 14px',
          fontSize: '0.85rem',
          cursor: 'pointer',
          backdropFilter: 'blur(8px)',
        }}
      >
        Quick Tour
      </button>

      <aside className="sidebar">
        <Link to="/" className="menu-item active">
          <i className="fa-solid fa-desktop"></i> Legal AI
        </Link>
        <button className="new-task-btn" onClick={() => navigate('/upload')}>
          <i className="fa-solid fa-plus"></i> New Case
        </button>
        <Link to="/workspace" className="menu-item"><i className="fa-regular fa-circle-check"></i> Workspace</Link>
        <Link to="/upload" className="menu-item"><i className="fa-regular fa-file-lines"></i> Upload</Link>
        <Link to="/graph" className="menu-item"><i className="fa-solid fa-link"></i> Graph</Link>
        <Link to="/analysis" className="menu-item"><i className="fa-solid fa-scale-balanced"></i> Analysis</Link>
        <Link to="/extensions" className="menu-item"><i className="fa-solid fa-shapes"></i> Extensions</Link>

        <div className="case-card" style={{ marginTop: '1rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>ACTIVE CASE</p>
          <p style={{ marginTop: '0.5rem', fontWeight: 700 }}>{DEMO_CASE.title}</p>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.84rem', marginTop: '0.4rem' }}>
            {DEMO_CASE.status} · Delhi HC
          </p>
        </div>
      </aside>

      <main className="main-content" style={{ padding: '1.5rem 1.5rem 2rem' }}>
        <div style={{ maxWidth: '1120px', width: '100%', margin: '0 auto' }}>
          <div className="center-hero" style={{ maxWidth: 'unset', padding: 0, alignItems: 'stretch' }}>
            <h1 className="hero-title" style={{ marginBottom: '0.7rem' }}>LegalMind AI Command Center</h1>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.2rem' }}>
              Demo case thread: {DEMO_CASE.title} ({DEMO_CASE.number})
            </p>

            <div className="search-container" style={{ marginBottom: '0.85rem' }}>
              <button className="action-btn"><i className="fa-solid fa-magnifying-glass"></i></button>
              <input
                type="text"
                className="search-input"
                placeholder="Ask LegalMind about case strategy, sections, and precedents..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <button className="action-btn" onClick={() => navigate('/voice')}><i className="fa-solid fa-microphone"></i></button>
              <button className="action-btn voice-btn" onClick={() => navigate('/workspace')}><i className="fa-solid fa-arrow-right"></i></button>
            </div>

            <div className="suggestions-scroller" style={{ marginBottom: '1rem' }}>
              {CHIP_PROMPTS.map((prompt) => (
                <button key={prompt} className="suggestion-chip" onClick={() => setSearch(prompt)}>{prompt}</button>
              ))}
            </div>

            <div className="stats-grid" style={{ gridTemplateColumns: 'repeat(4, minmax(0,1fr))', marginBottom: '1.2rem' }}>
              {COUNTER_ITEMS.map((item, index) => (
                <div key={item.label} className="stat-box">
                  <div className="stat-counter">{formatCounter(item, counters[index])}</div>
                  <div style={{ color: 'var(--text-secondary)', marginTop: '0.3rem', fontSize: '0.85rem' }}>{item.label}</div>
                </div>
              ))}
            </div>

            <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(2, minmax(0,1fr))', gap: '1rem' }}>
              {RECENT_CASES.map((entry) => (
                <div key={entry.id} className="case-card" style={{ marginBottom: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.6rem' }}>
                    <span className={DOMAIN_BADGE[entry.domain] || 'badge-corporate'}>{entry.domain}</span>
                    <span
                      style={{
                        background: `${entry.statusColor}22`,
                        color: entry.statusColor,
                        border: `1px solid ${entry.statusColor}`,
                        borderRadius: '999px',
                        padding: '0.22rem 0.55rem',
                        fontSize: '0.72rem',
                      }}
                    >
                      {entry.status}
                    </span>
                  </div>
                  <h3 style={{ marginTop: '0.75rem' }}>{entry.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', marginTop: '0.35rem', fontSize: '0.85rem' }}>
                    {entry.court} · {entry.docs} docs · {entry.lastActivity}
                  </p>
                  <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.9rem' }}>
                    <button className="btn" onClick={() => navigate('/workspace')}>Open Workspace</button>
                    <button className="btn" onClick={() => navigate('/graph')}>View Graph</button>
                    <button className="btn" onClick={() => navigate('/analysis')}>Analyze</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="case-card" style={{ marginTop: '1.2rem', marginBottom: 0 }}>
              <h3 style={{ marginBottom: '0.85rem' }}>5-Step Case Workflow</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, minmax(0,1fr))', gap: '0.7rem' }}>
                {WORKFLOW_STEPS.map((step) => (
                  <div key={step.title} style={{ border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0.75rem' }}>
                    <div style={{ width: '24px', height: '24px', borderRadius: '999px', background: 'rgba(168,85,247,0.24)', color: '#fff', display: 'grid', placeItems: 'center', fontSize: '0.8rem' }}>{step.icon}</div>
                    <div style={{ marginTop: '0.45rem', fontWeight: 600, fontSize: '0.9rem' }}>{step.title}</div>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.78rem', marginTop: '0.25rem' }}>{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="stats-grid" style={{ marginTop: '1.1rem' }}>
              {improvement.map((row) => (
                <div key={row.label} className="stat-box" style={{ textAlign: 'left' }}>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.83rem' }}>{row.label}</div>
                  <div style={{ marginTop: '0.45rem', fontWeight: 700 }}>{row.before} → {row.after}</div>
                  <div style={{ color: '#34d399', marginTop: '0.35rem', fontSize: '0.85rem' }}>{row.improvement} improvement</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {tourOpen && (
        <>
          <div
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(8, 10, 16, 0.22)',
              zIndex: 80,
            }}
            onClick={closeTour}
          />

          {spotlight && (
            <div
              style={{
                position: 'fixed',
                top: `${spotlight.top - 6}px`,
                left: `${spotlight.left - 6}px`,
                width: `${spotlight.width + 12}px`,
                height: `${spotlight.height + 12}px`,
                borderRadius: '12px',
                border: '2px solid rgba(168, 85, 247, 0.9)',
                boxShadow: '0 0 20px rgba(168, 85, 247, 0.45)',
                zIndex: 90,
                pointerEvents: 'none',
              }}
            />
          )}

          <div
            style={{
              position: 'fixed',
              right: '24px',
              bottom: '24px',
              width: '360px',
              background: 'rgba(18, 18, 26, 0.72)',
              border: '1px solid var(--border-color)',
              borderRadius: '14px',
              padding: '1rem 1rem 0.9rem',
              color: 'var(--text-primary)',
              zIndex: 100,
              backdropFilter: 'blur(12px)',
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <strong>Product Walkthrough</strong>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.82rem' }}>{tourStep + 1}/{tourSteps.length}</span>
                <button
                  onClick={closeTour}
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '999px',
                    border: '1px solid var(--border-color)',
                    background: 'transparent',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    lineHeight: 1,
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            <div style={{ fontWeight: 700, marginBottom: '0.35rem' }}>{tourSteps[tourStep]?.title}</div>
            <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.5, fontSize: '0.92rem' }}>
              {tourSteps[tourStep]?.description}
            </p>

            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem', justifyContent: 'flex-end' }}>
              <button
                onClick={closeTour}
                style={{
                  background: 'transparent',
                  color: 'var(--text-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '7px 10px',
                  cursor: 'pointer',
                }}
              >
                Skip
              </button>
              <button
                onClick={prevStep}
                disabled={tourStep === 0}
                style={{
                  background: 'transparent',
                  color: tourStep === 0 ? 'var(--border-color)' : 'var(--text-primary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '8px',
                  padding: '7px 10px',
                  cursor: tourStep === 0 ? 'not-allowed' : 'pointer',
                }}
              >
                Back
              </button>
              <button
                onClick={nextStep}
                style={{
                  background: 'var(--primary-color)',
                  color: '#fff',
                  border: 'none',
                  borderRadius: '8px',
                  padding: '7px 12px',
                  cursor: 'pointer',
                }}
              >
                {tourStep === tourSteps.length - 1 ? 'Finish' : 'Next'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Dashboard;
