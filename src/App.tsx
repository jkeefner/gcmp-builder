import React from 'react';
import { ProjectProvider, useProject } from './context/ProjectContext';
import { Sidebar } from './components/Layout/Sidebar';
import { Header } from './components/Layout/Header';
import { ProjectManager } from './components/ProjectManager/ProjectManager';
import { GlobalDataForm } from './components/GlobalDataForm/GlobalDataForm';
import { SectionNav } from './components/SectionNav/SectionNav';
import { ExportView } from './components/Export/ExportView';
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
          <ExportView />
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
