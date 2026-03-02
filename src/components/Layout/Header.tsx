import React, { useState, useEffect } from 'react';
import { useProject } from '../../context/ProjectContext';

const VIEW_TITLES: Record<string, { title: string; sub: string }> = {
  home:             { title: 'Projects',           sub: 'Create and manage GCMP projects' },
  dashboard:        { title: 'Dashboard',          sub: 'Project completeness overview' },
  'global-data':    { title: 'Global Data Entry',  sub: 'Site-wide fields that auto-populate throughout the document' },
  sections:         { title: 'Section Library',    sub: 'Review and configure sections — include, skip, or write narratives' },
  'section-content':{ title: 'Section Editor',     sub: 'Write site-specific narrative content' },
  export:           { title: 'Export Document',    sub: 'Generate the GCMP Word document' },
};

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export function Header() {
  const { state, activeProject } = useProject();
  const info = VIEW_TITLES[state.view] ?? VIEW_TITLES.home;

  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setInstallPrompt(e as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handler);
    window.addEventListener('appinstalled', () => setInstalled(true));
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    const { outcome } = await installPrompt.userChoice;
    if (outcome === 'accepted') setInstalled(true);
    setInstallPrompt(null);
  };

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
        {installPrompt && !installed && (
          <button className="install-btn" onClick={handleInstall} title="Install GCMP Builder as a desktop app">
            ⬇ Install App
          </button>
        )}
        <div className={`save-indicator ${state.isDirty ? '' : 'saved'}`}>
          <div className="save-dot" />
          {state.isDirty ? 'Unsaved changes' : 'All changes saved'}
        </div>
      </div>
    </header>
  );
}
