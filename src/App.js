import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { DemoProvider, useDemoState } from './context/DemoContext';

// App Pages
import Dashboard from './pages/Dashboard';
import Workspace from './pages/Workspace';
import Upload from './pages/Upload';
import Graph from './pages/Graph';
import Extensions from './pages/Extensions';
import Converter from './pages/Converter';
import Analysis from './pages/Analysis';
import Voice from './pages/Voice';

import './index.css';

// Router that checks onboarding state
function AppRouter() {
  useDemoState();

  return (
    <Routes>
      {/* Demo Routes */}
      <Route path="/demo" element={<Navigate to="/" replace />} />

      {/* App Routes */}
      <Route path="/" element={<Dashboard />} />
      <Route path="/workspace" element={<Workspace />} />
      <Route path="/upload" element={<Upload />} />
      <Route path="/graph" element={<Graph />} />
      <Route path="/extensions" element={<Extensions />} />
      <Route path="/converter" element={<Converter />} />
      <Route path="/analysis" element={<Analysis />} />
      <Route path="/voice" element={<Voice />} />

      {/* Fallback - redirect to dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <DemoProvider>
        <AppRouter />
      </DemoProvider>
    </Router>
  );
}

export default App;