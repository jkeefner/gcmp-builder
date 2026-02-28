import React, { createContext, useContext, useReducer, useEffect } from 'react';
import type { Project, AppState, AppView, GlobalData, SectionStatus } from '../types';
import { createProject, createEmptyGlobalData } from '../types';

// ─── ACTIONS ──────────────────────────────────────────────────────────────────

type Action =
  | { type: 'LOAD_PROJECTS'; projects: Project[] }
  | { type: 'CREATE_PROJECT'; mineName: string }
  | { type: 'SELECT_PROJECT'; id: string }
  | { type: 'DELETE_PROJECT'; id: string }
  | { type: 'SET_VIEW'; view: AppView }
  | { type: 'SET_GLOBAL_DATA_GROUP'; group: string }
  | { type: 'UPDATE_GLOBAL_FIELD'; key: keyof GlobalData; value: string }
  | { type: 'UPDATE_SECTION_STATUS'; sectionId: string; status: SectionStatus; skipReason?: string }
  | { type: 'UPDATE_NOTES'; notes: string }
  | { type: 'MARK_SAVED' };

// ─── REDUCER ──────────────────────────────────────────────────────────────────

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {

    case 'LOAD_PROJECTS':
      return { ...state, projects: action.projects };

    case 'CREATE_PROJECT': {
      const project = createProject(action.mineName);
      return {
        ...state,
        projects: [...state.projects, project],
        activeProjectId: project.id,
        view: 'global-data',
        globalDataGroup: 'identity',
        isDirty: true,
      };
    }

    case 'SELECT_PROJECT':
      return {
        ...state,
        activeProjectId: action.id,
        view: 'global-data',
        globalDataGroup: 'identity',
        isDirty: false,
      };

    case 'DELETE_PROJECT': {
      const projects = state.projects.filter(p => p.id !== action.id);
      return {
        ...state,
        projects,
        activeProjectId: projects.length > 0 ? projects[projects.length - 1].id : null,
        view: projects.length === 0 ? 'home' : state.view,
        isDirty: false,
      };
    }

    case 'SET_VIEW':
      return { ...state, view: action.view };

    case 'SET_GLOBAL_DATA_GROUP':
      return { ...state, globalDataGroup: action.group };

    case 'UPDATE_GLOBAL_FIELD': {
      if (!state.activeProjectId) return state;
      const projects = state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;
        return {
          ...p,
          modified: new Date().toISOString(),
          globalData: { ...p.globalData, [action.key]: action.value },
        };
      });
      return { ...state, projects, isDirty: true };
    }

    case 'UPDATE_SECTION_STATUS': {
      if (!state.activeProjectId) return state;
      const projects = state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;
        return {
          ...p,
          modified: new Date().toISOString(),
          sectionStates: {
            ...p.sectionStates,
            [action.sectionId]: {
              status: action.status,
              skipReason: action.skipReason,
            },
          },
        };
      });
      return { ...state, projects, isDirty: true };
    }

    case 'UPDATE_NOTES': {
      if (!state.activeProjectId) return state;
      const projects = state.projects.map(p => {
        if (p.id !== state.activeProjectId) return p;
        return { ...p, notes: action.notes, modified: new Date().toISOString() };
      });
      return { ...state, projects, isDirty: true };
    }

    case 'MARK_SAVED':
      return { ...state, isDirty: false };

    default:
      return state;
  }
}

// ─── INITIAL STATE ────────────────────────────────────────────────────────────

const initialState: AppState = {
  projects: [],
  activeProjectId: null,
  view: 'home',
  globalDataGroup: 'identity',
  isDirty: false,
};

// ─── CONTEXT ──────────────────────────────────────────────────────────────────

interface ProjectContextValue {
  state: AppState;
  dispatch: React.Dispatch<Action>;
  activeProject: Project | null;
}

const ProjectContext = createContext<ProjectContextValue | null>(null);

const STORAGE_KEY = 'gcmp_builder_projects_v1';

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const projects: Project[] = JSON.parse(raw);
        dispatch({ type: 'LOAD_PROJECTS', projects });
      }
    } catch {
      console.warn('Could not load saved projects');
    }
  }, []);

  // Save to localStorage whenever projects change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.projects));
      if (state.isDirty) dispatch({ type: 'MARK_SAVED' });
    } catch {
      console.warn('Could not save projects to localStorage');
    }
  }, [state.projects]);

  const activeProject = state.projects.find(p => p.id === state.activeProjectId) ?? null;

  return (
    <ProjectContext.Provider value={{ state, dispatch, activeProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProject() {
  const ctx = useContext(ProjectContext);
  if (!ctx) throw new Error('useProject must be used within ProjectProvider');
  return ctx;
}

// ─── CONVENIENCE HOOKS ────────────────────────────────────────────────────────

export function useGlobalField(key: keyof GlobalData): [string, (v: string) => void] {
  const { activeProject, dispatch } = useProject();
  const value = activeProject?.globalData[key] ?? '';
  const setValue = (v: string) => dispatch({ type: 'UPDATE_GLOBAL_FIELD', key, value: v });
  return [value, setValue];
}
