import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import * as d3 from 'd3';

const Graph = () => {
  const d3Container = useRef(null);

  useEffect(() => {
    if (d3Container.current) {
        // Clear previous runs
        const targetSvg = d3.select(d3Container.current);
        targetSvg.selectAll("*").remove();

        // Simple resize tracking
        let width = targetSvg.node().getBoundingClientRect().width || 800;
        let height = targetSvg.node().getBoundingClientRect().height || 500;

        // Generate dummy data based on the legal app
        const nodes = [
            { id: "State vs Sharma", group: 1, radius: 12 },
            { id: "2024-07-11", group: 2, radius: 7 },
            { id: "Delhi HC 2023", group: 2, radius: 7 },
            { id: "1998 SC 112", group: 2, radius: 7 },
            { id: "IPC 420", group: 3, radius: 7 },
            { id: "BNS 316", group: 3, radius: 7 },
            { id: "Evidence Act 65B", group: 3, radius: 7 },
            { id: "#cyberlaw", group: 4, radius: 6 },
            { id: "#fraud", group: 4, radius: 6 },
            { id: "R.K. Dispute", group: 1, radius: 10 },
            { id: "Tax Appeal", group: 1, radius: 10 },
            { id: "2024-06-26", group: 2, radius: 7 }
        ];

        const links = [
            { source: "State vs Sharma", target: "2024-07-11" },
            { source: "State vs Sharma", target: "Delhi HC 2023" },
            { source: "State vs Sharma", target: "IPC 420" },
            { source: "IPC 420", target: "BNS 316" },
            { source: "State vs Sharma", target: "Evidence Act 65B" },
            { source: "State vs Sharma", target: "#cyberlaw" },
            { source: "State vs Sharma", target: "#fraud" },
            { source: "R.K. Dispute", target: "IPC 420" },
            { source: "R.K. Dispute", target: "1998 SC 112" },
            { source: "Tax Appeal", target: "2024-07-11" },
            { source: "Tax Appeal", target: "#fraud" },
            { source: "Delhi HC 2023", target: "#cyberlaw" },
            { source: "1998 SC 112", target: "Evidence Act 65B" },
            { source: "State vs Sharma", target: "2024-06-26" },
            { source: "R.K. Dispute", target: "2024-06-26" }
        ];

        // Map groups to theme colors
        const color = d3.scaleOrdinal()
            .domain([1, 2, 3, 4])
            .range(["#3b82f6", "#10b981", "#ef4444", "#a855f7"]); 

        const simulation = d3.forceSimulation(nodes)
            .force("link", d3.forceLink(links).id(d => d.id).distance(120))
            .force("charge", d3.forceManyBody().strength(-300))
            .force("center", d3.forceCenter(width / 2, height / 2));

        // Setup arrowhead defs
        targetSvg.append("defs").append("marker")
            .attr("id", "arrowhead")
            .attr("viewBox", "-0 -5 10 10")
            .attr("refX", 22)
            .attr("refY", 0)
            .attr("orient", "auto")
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("xoverflow", "visible")
            .append("svg:path")
            .attr("d", "M 0,-5 L 10 ,0 L 0,5")
            .attr("fill", "#666")
            .style("stroke","none");

        const g = targetSvg.append("g");

        // Setup zooming
        targetSvg.call(d3.zoom().on("zoom", (e) => {
            g.attr("transform", e.transform);
        }));

        // Draw links
        const link = g.append("g")
            .attr("stroke", "#555")
            .attr("stroke-opacity", 0.8)
            .selectAll("line")
            .data(links)
            .join("line")
            .attr("stroke-width", 1)
            .attr("marker-end", "url(#arrowhead)");

        // Draw node groups
        const nodeGroup = g.append("g")
            .selectAll("g")
            .data(nodes)
            .join("g")
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended));

        // Draw circles
        nodeGroup.append("circle")
            .attr("r", d => d.radius)
            .attr("fill", d => color(d.group))
            .attr("stroke", "#0a0a0a")
            .attr("stroke-width", 1.5);

        // Draw texts
        nodeGroup.append("text")
            .attr("x", 14)
            .attr("y", "0.31em")
            .text(d => d.id)
            .style("fill", "#a1a1aa")
            .style("font-size", "12px")
            .style("font-family", "sans-serif")
            .style("pointer-events", "none");

        // Simulation tick update
        simulation.on("tick", () => {
            link
                .attr("x1", d => d.source.x)
                .attr("y1", d => d.source.y)
                .attr("x2", d => d.target.x)
                .attr("y2", d => d.target.y);

            nodeGroup.attr("transform", d => `translate(${d.x},${d.y})`);
        });

        // Drag interactions
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
        
        // Handle resizing
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
  }, []);

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
            background: var(--surface-color);
            padding: 1.5rem;
            border-right: 1px solid var(--border-color);
            overflow-y: auto;
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
            background: #1e1e1e; /* Dark theme suitable for Obsidian style graphs */
            position: relative;
            overflow: hidden;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .graph-overlay {
            position: absolute;
            top: 20px;
            right: 20px;
            background: rgba(10, 10, 10, 0.9);
            padding: 1rem;
            border-radius: 8px;
            pointer-events: none;
            border: 1px solid var(--border-color);
            color: white;
        }
      `}</style>

      <nav className="top-nav" style={{ padding: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-color)', background: 'var(--surface-color)' }}>
          <div className="logo"><Link to="/workspace" style={{ textDecoration: 'none', color: 'inherit' }}>⬅️ Back to Workspace</Link> | Knowledge Graph</div>
          <div className="nav-actions">
              <input type="text" placeholder="Highlight Nodes..." style={{ padding: '0.4rem', borderRadius: '4px', border: '1px solid #333', background: 'var(--bg-color)', color: 'var(--text-primary)' }} />
          </div>
      </nav>

      <div className="graph-layout">
          <aside className="filter-sidebar">
              <h3>Filters</h3>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '2rem' }}>Isolate legal patterns</p>

              <div className="filter-group">
                  <h4>Legal Domain</h4>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> Criminal Law (Red)</label>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> Civil Law (Blue)</label>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> Constitutional (Green)</label>
              </div>

              <div className="filter-group">
                  <h4>Node Types</h4>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> Case Files</label>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> Judgments</label>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> Legal Sections</label>
                  <label className="filter-label"><input type="checkbox" defaultChecked /> Precedents</label>
              </div>

              <div className="filter-group">
                  <h4>Timeline</h4>
                  <input type="range" min="1950" max="2024" defaultValue="2024" style={{ width: '100%' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginTop: '0.5rem' }}>
                      <span>1950</span><span>2024</span>
                  </div>
              </div>
          </aside>

          <main className="graph-area" style={{ background: '#171717', position: 'relative' }}>
              <svg ref={d3Container} id="force-graph" style={{ width: '100%', height: '100%', display: 'block' }}></svg>

              <div className="graph-overlay">
                  <strong>Interactive Graph</strong>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '5px' }}>Drag nodes to interact. Scroll to zoom inside graph.</p>
              </div>
          </main>
      </div>
    </div>
  );
};

export default Graph;