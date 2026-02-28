import React from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { ProjectManager } from './components/ProjectManager/ProjectManager';
import { GlobalDataForm } from './components/GlobalDataForm/GlobalDataForm';
import { SectionNav } from './components/SectionNav/SectionNav';
import './styles/index.css';

function AppInner() {
  const { state, activeProject } = useProject();

  const renderContent = () => {
    if (state.view === 'home' || !activeProject) {
      return <ProjectManager />;
    }
    if (state.view === 'global-data') {
      return <GlobalDataForm />;
    }
    if (state.view === 'sections') {
      return <SectionNav />;
    }
    if (state.view === 'export') {
      return (
        <div className="main-content">
          <div className="empty-state">
            <div className="empty-state-icon">📄</div>
            <h3>Export — Phase 3</h3>
            <p>
              Document export will be built in Phase 3. It will generate a complete Word document
              using all global data fields and the selected section configuration.
            </p>
          </div>
        </div>
      );
    }
    return <ProjectManager />;
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main">
        <Header />
        {renderContent()}
      </main>
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <AppInner />
    </ProjectProvider>
  );
}
