import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';
import { GRAPH_EDGES, GRAPH_NODES } from '../data/demoData';

const Graph = () => {
  const d3Container = useRef(null);
    const [selectedNode, setSelectedNode] = useState(null);
    const [visibleGroups, setVisibleGroups] = useState({
        current: true,
        doc: true,
        precedent: true,
        section: true,
        related: true,
    });

    const filteredGraph = useMemo(() => {
        const nodes = GRAPH_NODES.filter((node) => visibleGroups[node.group]);
        const visibleIds = new Set(nodes.map((node) => node.id));
        const edges = GRAPH_EDGES.filter((edge) => visibleIds.has(edge.source) && visibleIds.has(edge.target));
        return { nodes, edges };
    }, [visibleGroups]);

  useEffect(() => {
    if (d3Container.current) {
        // Clear previous runs
        const targetSvg = d3.select(d3Container.current);
        targetSvg.selectAll("*").remove();

        let width = targetSvg.node().getBoundingClientRect().width || 800;
        let height = targetSvg.node().getBoundingClientRect().height || 500;

                const nodes = filteredGraph.nodes.map((node) => ({
                    ...node,
                    radius: node.group === 'current' ? 18 : node.group === 'doc' ? 10 : node.group === 'related' ? 8 : 11,
                }));
                const links = filteredGraph.edges.map((edge) => ({ ...edge }));

                const colorByGroup = {
                    current: '#f59e0b',
                    doc: '#60a5fa',
                    regulation: '#60a5fa',
                    precedent: '#22c55e',
                    section: '#fb923c',
                    related: '#a78bfa',
                };

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2));

        const g = targetSvg.append("g");

        // Setup zooming
        targetSvg.call(d3.zoom().on("zoom", (e) => {
            g.attr("transform", e.transform);
        }));

        const link = g.append("g")
            .attr("stroke-opacity", 0.8)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 1.5)
            .attr('stroke', (d) => {
                if (d.label === 'relies on') return '#22c55e';
                if (d.label === 'distinguishes') return '#ef4444';
                if (d.label === 'cites') return '#9ca3af';
                return '#4b5563';
            })
            .attr('stroke-dasharray', (d) => (d.label === 'distinguishes' ? '5 4' : null));

        // Draw node groups
        const nodeGroup = g.append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        const circles = nodeGroup.append("circle")
            .attr("r", d => d.radius)
            .attr("fill", d => colorByGroup[d.group] || '#a1a1aa')
            .attr("stroke", "#0a0a0a")
            .attr("stroke-width", 1.5)
            .on('click', (_, d) => setSelectedNode(d));

        circles
            .filter((d) => d.group === 'current')
            .attr('stroke', '#fcd34d')
            .attr('stroke-width', 2.5);

        nodeGroup.append("text")
            .attr("x", 14)
            .attr("y", "0.31em")
            .text(d => d.id)
            .style("fill", "#a1a1aa")
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
            .style("pointer-events", "none");

        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
        });

        function dragstarted(event) {
            if (!event.active) simulation.alphaTarget(0.3).restart();
            event.subject.fx = event.subject.x;
            event.subject.fy = event.subject.y;
        }
        function dragged(event) {
            event.subject.fx = event.x;
            event.subject.fy = event.y;
        }
        function dragended(event) {
            if (!event.active) simulation.alphaTarget(0);
            event.subject.fx = null;
            event.subject.fy = null;
        }
        
        const handleResize = () => {
            if (!targetSvg.node()) return;
            width = targetSvg.node().getBoundingClientRect().width;
            height = targetSvg.node().getBoundingClientRect().height;
            simulation.force("center", d3.forceCenter(width / 2, height / 2));
            simulation.alpha(0.3).restart();
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            simulation.stop();
        };
    }
    }, [filteredGraph]);

    const toggleGroup = (group) => {
        setVisibleGroups((prev) => ({ ...prev, [group]: !prev[group] }));
    };

  return (
    <div style={{ background: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
      <style>{`
        .graph-layout {
            display: grid;
            grid-template-columns: 20% 80%;
            height: calc(100vh - 65px);
            flex: 1;
        }

        .filter-sidebar {
            background: var(--glass-surface);
            padding: 1.5rem;
            border-right: 1px solid var(--glass-border);
            overflow-y: auto;
            backdrop-filter: blur(12px);
        }

        .filter-group {
            margin-bottom: 1.5rem;
        }

        .filter-group h4 {
            margin-bottom: 0.5rem;
            font-size: 0.9rem;
            color: var(--text-primary);
        }

        .filter-label {
            display: block;
            margin-bottom: 0.25rem;
            font-size: 0.85rem;
            color: var(--text-secondary);
        }

        .graph-area {
            background: rgba(30, 30, 30, 0.72);
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
            border-left: 1px solid var(--glass-border);
        }

        .graph-overlay {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(10, 10, 10, 0.55);
            padding: 1rem;
            border-radius: 10px;
            pointer-events: none;
            border: 1px solid var(--glass-border);
            color: white;
            backdrop-filter: blur(10px);
            box-shadow: var(--glass-shadow);
        }
      `}</style>

      <nav className="top-nav" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--glass-border)', background: 'var(--glass-elevated)' }}>
          <div className="logo"><Link to="/workspace" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Workspace</Link> | Case Knowledge Graph · Sharma v. HDFC Bank · {filteredGraph.nodes.length} nodes · {filteredGraph.edges.length} edges</div>
          <div className="nav-actions">
              <input type="text" placeholder="Highlight Nodes..." style={{ padding: '0.45rem 0.6rem', borderRadius: '6px', border: '1px solid var(--glass-border)', background: 'rgba(0,0,0,0.2)', color: 'var(--text-primary)', backdropFilter: 'blur(8px)' }} />
          </div>
      </nav>

      <div className="graph-layout">
          <aside className="filter-sidebar">
              <h3>Filters</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Isolate legal patterns</p>

              <div className="filter-group">
                  <h4>Node Types</h4>
                  <label className="filter-label"><input type="checkbox" checked={visibleGroups.current} onChange={() => toggleGroup('current')} /> Current Case</label>
                  <label className="filter-label"><input type="checkbox" checked={visibleGroups.doc} onChange={() => toggleGroup('doc')} /> Documents</label>
                  <label className="filter-label"><input type="checkbox" checked={visibleGroups.precedent} onChange={() => toggleGroup('precedent')} /> Precedents</label>
                  <label className="filter-label"><input type="checkbox" checked={visibleGroups.section} onChange={() => toggleGroup('section')} /> Sections</label>
                  <label className="filter-label"><input type="checkbox" checked={visibleGroups.related} onChange={() => toggleGroup('related')} /> Related Cases</label>
              </div>

              <div className="filter-group">
                  <h4>Court/Year</h4>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> Delhi HC</label>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> Kerala HC</label>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> 2015-2024</label>
              </div>
          </aside>

          <main className="graph-area" style={{ background: 'rgba(23, 23, 23, 0.78)', position: 'relative' }}>
              <svg ref={d3Container} id="force-graph" style={{ width: '100%', height: '100%', display: 'block' }}></svg>

              <div className="graph-legend">
                <strong style={{ display: 'block', marginBottom: '0.4rem' }}>Legend</strong>
                <div>🟡 Current Case</div>
                <div>🔵 Documents</div>
                <div>🟢 Precedents</div>
                <div>🟠 Sections</div>
                <div>🟣 Related Cases</div>
              </div>

              <div className="graph-overlay">
                  <strong>Interactive Graph</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Drag nodes to interact. Scroll to zoom inside graph. Click nodes to inspect.</p>
              </div>

              {selectedNode && (
                <div style={{ position: 'absolute', left: '20px', top: '20px', maxWidth: '300px', background: 'rgba(10,10,10,0.75)', border: '1px solid var(--glass-border)', borderRadius: '10px', padding: '0.8rem', backdropFilter: 'blur(8px)' }}>
                  <strong>{selectedNode.label}</strong>
                  <p style={{ marginTop: '0.4rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                    {selectedNode.group === 'precedent' && 'Precedent · Court-level reference · Outcome context available'}
                    {selectedNode.group === 'section' && 'Legal Section · Statutory interpretation and applicability'}
                    {selectedNode.group === 'doc' && 'Document Node · Extracted from current case workspace'}
                    {selectedNode.group === 'current' && 'Primary case node for the live demo storyline'}
                    {selectedNode.group === 'related' && 'Related matter with overlapping legal issues'}
                  </p>
                </div>
              )}
          </main>
      </div>
    </div>
  );
};

export default Graph;