import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Workspace from './pages/Workspace';
import Upload from './pages/Upload';
import Graph from './pages/Graph';
import Extensions from './pages/Extensions';
import Converter from './pages/Converter';
import Analysis from './pages/Analysis';
import Voice from './pages/Voice';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/workspace" element={<Workspace />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/graph" element={<Graph />} />
        <Route path="/extensions" element={<Extensions />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/analysis" element={<Analysis />} />
        <Route path="/voice" element={<Voice />} />
      </Routes>
    </Router>
  );
}

export default App;