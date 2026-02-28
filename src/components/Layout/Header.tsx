import React from 'react';
import { useProject } from '../../context/ProjectContext';

const VIEW_TITLES: Record<string, { title: string; sub: string }> = {
  home:        { title: 'Projects',           sub: 'Create and manage GCMP projects' },
  'global-data': { title: 'Global Data Entry', sub: 'Site-wide fields that auto-populate throughout the document' },
  sections:    { title: 'Section Library',    sub: 'Review and configure sections — include, skip, or mark conditional' },
  export:      { title: 'Export Document',    sub: 'Generate the GCMP Word document (Phase 3)' },
};

export function Header() {
  const { state, activeProject } = useProject();
  const info = VIEW_TITLES[state.view] ?? VIEW_TITLES.home;

  return (
    <header className="main-header">
      <div>
        <div className="main-header-title">{info.title}</div>
        {activeProject && state.view !== 'home' && (
          <div className="main-header-sub">
            {activeProject.globalData.mine_name || 'Unnamed Project'}
            {activeProject.globalData.doc_number ? ` · ${activeProject.globalData.doc_number}` : ''}
          </div>
        )}
        {(!activeProject || state.view === 'home') && (
          <div className="main-header-sub">{info.sub}</div>
        )}
      </div>

      <div className="main-header-actions">
        <div className={`save-indicator ${state.isDirty ? '' : 'saved'}`}>
          <div className="save-dot" />
          {state.isDirty ? 'Unsaved changes' : 'All changes saved'}
        </div>
      </div>
    </header>
  );
}
