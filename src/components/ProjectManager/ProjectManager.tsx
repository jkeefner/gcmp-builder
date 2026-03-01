import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { TOTAL_FIELDS } from '../../data/globalFields';
import { TOTAL_SECTIONS, PRIORITY_SECTIONS } from '../../data/sections';

export function ProjectManager() {
  const { state, dispatch } = useProject();
  const [newName, setNewName] = useState('');

  const handleCreate = () => {
    const name = newName.trim();
    if (!name) return;
    dispatch({ type: 'CREATE_PROJECT', mineName: name });
    setNewName('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleCreate();
  };

  const handleSelect = (id: string) => {
    dispatch({ type: 'SELECT_PROJECT', id });
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if (confirm('Delete this project? This cannot be undone.')) {
      dispatch({ type: 'DELETE_PROJECT', id });
    }
  };

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const fieldFillPct = (proj: typeof state.projects[0]) => {
    const filled = Object.values(proj.globalData).filter(v => v !== '').length;
    return Math.round((filled / TOTAL_FIELDS) * 100);
  };

  return (
    <div className="main-content">
      <div className="home-hero">
        <div className="home-hero-logo">⛏</div>
        <h1>Ground Control Management<br />Plan Builder</h1>
        <p>
          A structured engineering tool for building GCMP documents aligned to CSIRO LOP guidelines
          and US regulatory requirements (MSHA 30 CFR). Each project stores all global data fields
          and section configuration — export to Word in Phase 3.
        </p>

        {/* Stats */}
        <div className="stats-bar" style={{ marginBottom: 28 }}>
          <div className="stat-item">
            <div className="stat-value">{TOTAL_SECTIONS}</div>
            <div className="stat-label">Sections</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-value">6</div>
            <div className="stat-label">Parts</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-value">{TOTAL_FIELDS}</div>
            <div className="stat-label">Global Fields</div>
          </div>
          <div className="stat-divider" />
          <div className="stat-item">
            <div className="stat-value">{PRIORITY_SECTIONS.length}</div>
            <div className="stat-label">Priority Sections</div>
          </div>
        </div>

        {/* Create new */}
        <div className="project-create-form">
          <h2>Create New Project</h2>
          <div className="project-create-row">
            <div style={{ flex: 1 }}>
              <input
                className="form-input"
                placeholder="Mine name — e.g. Thompson Creek Mine"
                value={newName}
                onChange={e => setNewName(e.target.value)}
                onKeyDown={handleKeyDown}
              />
            </div>
            <button
              className="btn btn-primary"
              onClick={handleCreate}
              disabled={!newName.trim()}
            >
              Create Project →
            </button>
          </div>
        </div>

        {/* Project list */}
        {state.projects.length > 0 && (
          <div className="project-list">
            <h3>Saved Projects ({state.projects.length})</h3>
            {[...state.projects].reverse().map(proj => {
              const pct = fieldFillPct(proj);
              const isActive = proj.id === state.activeProjectId;
              return (
                <div
                  key={proj.id}
                  className={`project-card${isActive ? ' active' : ''}`}
                  onClick={() => handleSelect(proj.id)}
                >
                  <div>
                    <div className="project-card-name">
                      {proj.globalData.mine_name || 'Unnamed Project'}
                    </div>
                    <div className="project-card-meta">
                      {proj.globalData.company_name && `${proj.globalData.company_name} · `}
                      Modified {formatDate(proj.modified)} · {pct}% global data complete
                      {proj.globalData.doc_number ? ` · ${proj.globalData.doc_number}` : ''}
                    </div>
                  </div>
                  <div className="project-card-actions">
                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handleSelect(proj.id)}
                    >
                      {isActive ? '✓ Active' : 'Open'}
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={e => handleDelete(e, proj.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {state.projects.length === 0 && (
          <div className="empty-state">
            <div className="empty-state-icon">📂</div>
            <h3>No projects yet</h3>
            <p>Create your first project above. Projects are saved locally in your browser.</p>
          </div>
        )}

        {/* Phase roadmap */}
        <div style={{ marginTop: 32, padding: '16px 20px', background: 'var(--panel)', border: '1px solid var(--border)', borderRadius: 'var(--r-md)' }}>
          <div style={{ fontSize: 11, fontFamily: 'var(--font-mono)', textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--text-muted)', marginBottom: 10 }}>Development Roadmap</div>
          {[
            ['✅', 'Phase 1', 'Section library document — complete'],
            ['✅', 'Phase 2', 'App shell, project management, global data entry — current'],
            ['✅', 'Phase 3', 'Word export — guidance notes, template language, global data populated — current'],
            ['🔲', 'Phase 4', 'Section content forms — structured data entry per section'],
            ['🔲', 'Phase 5', 'Priority section validation checklists, TARP builder, completeness checks'],
            ['🔲', 'Phase 6', 'Full export, Look Up integrations, offline PWA'],
          ].map(([icon, phase, desc]) => (
            <div key={phase} style={{ display: 'flex', gap: 10, padding: '5px 0', borderBottom: '1px solid var(--border-light)', fontSize: 12 }}>
              <span style={{ fontSize: 14, flexShrink: 0 }}>{icon}</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, color: 'var(--blue)', minWidth: 64 }}>{phase}</span>
              <span style={{ color: 'var(--text-muted)' }}>{desc}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
