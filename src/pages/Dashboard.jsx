import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <a href="#search" className="menu-item" style={{ color: 'var(--text-secondary)', marginBottom: '0.5rem' }}>
          <i className="fa-solid fa-search"></i> Search
        </a>
        
        <a href="#ai" className="menu-item active" style={{ marginBottom: '1rem' }}>
          <i className="fa-solid fa-desktop" style={{ color: 'var(--text-primary)' }}></i> Legal AI
        </a>
        
        <button className="new-task-btn" onClick={() => navigate('/upload')}>
          <i className="fa-solid fa-plus"></i> New Case
        </button>
        
        <Link to="/workspace" className="menu-item"><i className="fa-regular fa-circle-check"></i> Active Cases</Link>
        <Link to="/upload" className="menu-item"><i className="fa-regular fa-file-lines"></i> Documents</Link>
        <Link to="/graph" className="menu-item"><i className="fa-solid fa-link"></i> Precedents</Link>
        <Link to="/extensions" className="menu-item"><i className="fa-solid fa-shapes"></i> Extensions</Link>
        <a href="#templates" className="menu-item"><i className="fa-regular fa-images"></i> Templates</a>
      </aside>

      {/* Main Content Area */}
      <main className="main-content">
        <div className="center-hero">
          <h1 className="hero-title">Legal AI works for you.</h1>
          
          {/* Main Search/Input Box */}
          <div className="search-container">
            <button className="action-btn"><i className="fa-solid fa-plus"></i></button>
            <input type="text" className="search-input" placeholder="What should we work on next?" />
            <button className="action-btn" onClick={() => navigate('/voice')}><i className="fa-solid fa-microphone"></i></button>
            <button className="action-btn voice-btn"><i className="fa-solid fa-bars-staggered"></i></button>
          </div>

          {/* Suggestion Chips */}
          <div className="suggestions-scroller">
            <button className="suggestion-chip active"><i className="fa-solid fa-book-open"></i> From the gallery</button>
            <button className="suggestion-chip" onClick={() => navigate('/analysis')}><i className="fa-solid fa-briefcase"></i> Analyze a judgment</button>
            <button className="suggestion-chip" onClick={() => navigate('/graph')}><i className="fa-solid fa-code"></i> Find connections</button>
            <button className="suggestion-chip" onClick={() => navigate('/converter')}><i className="fa-solid fa-list-ul"></i> Convert IPC to BNS</button>
          </div>

          {/* Gallery Grid */}
          <div className="gallery-grid" style={{ marginTop: '2rem' }}>
            {/* Card 1 */}
            <div className="gallery-card" onClick={() => navigate('/workspace')}>
              <div className="gallery-img" style={{ background: 'linear-gradient(to bottom right, #1e1e1e, #ef4444)' }}></div>
              <div className="gallery-title"><i className="fa-regular fa-file"></i> State vs. Sharma Data...</div>
            </div>
            
            {/* Card 2 */}
            <div className="gallery-card" onClick={() => navigate('/analysis')}>
              <div className="gallery-img" style={{ background: 'linear-gradient(to bottom right, #1e1e1e, #3b82f6)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '1.5rem', textAlign: 'center' }}>
                <span style={{ display: 'block', marginTop: '30px', fontFamily: 'serif', opacity: 0.8 }}>H.C. Judgment<br /><span style={{ fontSize: '0.5em' }}>Delhi 2023</span></span>
              </div>
              <div className="gallery-title"><i className="fa-solid fa-desktop"></i> IP Info_Disclosure</div>
            </div>

            {/* Card 3 */}
            <div className="gallery-card">
              <div className="gallery-img" style={{ background: 'linear-gradient(to bottom right, #1e1e1e, #a855f7)' }}></div>
              <div className="gallery-title"><i className="fa-regular fa-file"></i> Petition Draft v2</div>
            </div>

            {/* Card 4 */}
            <div className="gallery-card" onClick={() => navigate('/graph')}>
              <div className="gallery-img" style={{ background: 'linear-gradient(to bottom right, #1e1e1e, #10b981)' }}></div>
              <div className="gallery-title"><i className="fa-regular fa-file"></i> Precedent Map</div>
            </div>
          </div>

          {/* Footer Links under gallery */}
          <div className="gallery-footer">
            <span style={{ cursor: 'pointer' }}><i className="fa-solid fa-magnifying-glass"></i> View all</span>
            <span style={{ cursor: 'pointer' }}><i className="fa-solid fa-shuffle"></i> Shuffle</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
