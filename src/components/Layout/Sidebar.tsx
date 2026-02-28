import React from 'react';
import { useProject } from '../../context/ProjectContext';
import type { AppView } from '../../types';
import { TOTAL_FIELDS } from '../../data/globalFields';
import { TOTAL_SECTIONS } from '../../data/sections';

export function Sidebar() {
  const { state, dispatch, activeProject } = useProject();

  const setView = (view: AppView) => dispatch({ type: 'SET_VIEW', view });

  // Calculate fill % for progress bar
  const filledFields = activeProject
    ? Object.values(activeProject.globalData).filter(v => v !== '').length
    : 0;
  const fillPct = TOTAL_FIELDS > 0 ? Math.round((filledFields / TOTAL_FIELDS) * 100) : 0;

  const includedSections = activeProject
    ? Object.values(activeProject.sectionStates).filter(s => s.status === 'included').length
    : 0;

  const isActive = (v: AppView) => state.view === v;

  return (
    <aside className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-mark">
          <div className="sidebar-logo-icon">⛏</div>
          <div className="sidebar-logo-text">GCMP Builder</div>
        </div>
        <div className="sidebar-logo-sub">Keefner Mining & Geotech</div>
      </div>

      {/* Active project */}
      {activeProject && (
        <div className="sidebar-project" onClick={() => setView('home')}>
          <div className="sidebar-project-label">Active Project</div>
          <div className="sidebar-project-name">{activeProject.globalData.mine_name || 'Unnamed Project'}</div>
        </div>
      )}

      {/* Nav */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Navigation</div>

        <button
          className={`sidebar-item${isActive('home') ? ' active' : ''}`}
          onClick={() => setView('home')}
        >
          <span className="sidebar-item-icon">🏠</span>
          <span className="sidebar-item-label">Projects</span>
          {state.projects.length > 0 && (
            <span className="sidebar-item-badge">{state.projects.length}</span>
          )}
        </button>

        {activeProject && (
          <>
            <div className="sidebar-section-label" style={{ marginTop: 8 }}>Current Project</div>

            <button
              className={`sidebar-item${isActive('global-data') ? ' active' : ''}`}
              onClick={() => setView('global-data')}
            >
              <span className="sidebar-item-icon">📋</span>
              <span className="sidebar-item-label">Global Data</span>
              <span className="sidebar-item-badge">{filledFields}/{TOTAL_FIELDS}</span>
            </button>

            <button
              className={`sidebar-item${isActive('sections') ? ' active' : ''}`}
              onClick={() => setView('sections')}
            >
              <span className="sidebar-item-icon">📑</span>
              <span className="sidebar-item-label">Section Library</span>
              <span className="sidebar-item-badge">{TOTAL_SECTIONS}</span>
            </button>

            <button
              className={`sidebar-item${isActive('export') ? ' active' : ''}`}
              onClick={() => setView('export')}
              style={{ opacity: 0.5, cursor: 'not-allowed' }}
            >
              <span className="sidebar-item-icon">📄</span>
              <span className="sidebar-item-label">Export Document</span>
              <span className="sidebar-item-badge" style={{ background: 'rgba(255,255,255,.05)' }}>Phase 3</span>
            </button>
          </>
        )}
      </nav>

      {/* Progress */}
      {activeProject && (
        <div className="sidebar-progress">
          <div className="sidebar-progress-label">
            <span>Global Data</span>
            <span>{fillPct}%</span>
          </div>
          <div className="sidebar-progress-bar">
            <div className="sidebar-progress-fill" style={{ width: `${fillPct}%` }} />
          </div>
        </div>
      )}
    </aside>
  );
}
