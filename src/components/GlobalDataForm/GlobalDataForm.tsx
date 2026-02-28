import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { FIELD_GROUPS } from '../../data/globalFields';
import type { GlobalData } from '../../types';
import { Field } from './Field';

export function GlobalDataForm() {
  const { state, dispatch, activeProject } = useProject();

  if (!activeProject) return null;

  const activeGroup = FIELD_GROUPS.find(g => g.id === state.globalDataGroup)
    ?? FIELD_GROUPS[0];

  // Count filled fields per group for indicators
  const groupFillCounts = FIELD_GROUPS.map(group => {
    const filled = group.fields.filter(f => {
      const val = activeProject.globalData[f.key as keyof GlobalData];
      return val && val !== '';
    }).length;
    return { id: group.id, filled, total: group.fields.length };
  });

  const totalFilled = groupFillCounts.reduce((s, g) => s + g.filled, 0);
  const totalFields = groupFillCounts.reduce((s, g) => s + g.total, 0);
  const fillPct = Math.round((totalFilled / totalFields) * 100);

  return (
    <div className="main-content" style={{ padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>

      {/* Progress header */}
      <div style={{
        background: 'var(--panel)', borderBottom: '1px solid var(--border)',
        padding: '10px 28px', display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0
      }}>
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, fontFamily: 'var(--font-mono)', color: 'var(--text-muted)', marginBottom: 5 }}>
            <span>Global data — {totalFilled} of {totalFields} fields completed</span>
            <span style={{ fontWeight: 600, color: fillPct === 100 ? 'var(--green-data)' : 'var(--blue)' }}>{fillPct}%</span>
          </div>
          <div style={{ height: 4, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${fillPct}%`, background: fillPct === 100 ? 'var(--green-data)' : 'var(--blue)', borderRadius: 2, transition: 'width .3s ease' }} />
          </div>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', flexShrink: 0 }}>
          Fields with blue borders are completed · * required
        </div>
      </div>

      {/* Two-column layout: group nav + form panel */}
      <div className="form-layout" style={{ flex: 1, overflow: 'hidden' }}>

        {/* Group nav */}
        <div className="form-group-nav">
          {FIELD_GROUPS.map(group => {
            const counts = groupFillCounts.find(g => g.id === group.id)!;
            const isActive = group.id === state.globalDataGroup;
            const allFilled = counts.filled === counts.total && counts.total > 0;
            return (
              <div
                key={group.id}
                className={`form-group-nav-item${isActive ? ' active' : ''}`}
                onClick={() => dispatch({ type: 'SET_GLOBAL_DATA_GROUP', group: group.id })}
              >
                <span className="form-group-nav-icon">{group.icon}</span>
                <span style={{ flex: 1, fontSize: 13 }}>{group.label}</span>
                {allFilled && <span className="form-group-filled-dot" title="All fields complete" />}
                <span className="form-group-nav-count">{counts.filled}/{counts.total}</span>
              </div>
            );
          })}
        </div>

        {/* Form panel */}
        <div className="form-panel">
          <div className="form-panel-header">
            <div className="form-panel-title">
              {activeGroup.icon} {activeGroup.label}
            </div>
            <div className="form-panel-desc">{activeGroup.description}</div>
          </div>

          <div className="form-grid">
            {activeGroup.fields.map(field => (
              <Field key={field.key} field={field} />
            ))}
          </div>

          {/* Group nav buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 28, paddingTop: 20, borderTop: '1px solid var(--border-light)' }}>
            {(() => {
              const idx = FIELD_GROUPS.findIndex(g => g.id === state.globalDataGroup);
              const prev = idx > 0 ? FIELD_GROUPS[idx - 1] : null;
              const next = idx < FIELD_GROUPS.length - 1 ? FIELD_GROUPS[idx + 1] : null;
              return (
                <>
                  {prev ? (
                    <button className="btn btn-secondary" onClick={() => dispatch({ type: 'SET_GLOBAL_DATA_GROUP', group: prev.id })}>
                      ← {prev.label}
                    </button>
                  ) : <div />}
                  {next ? (
                    <button className="btn btn-primary" onClick={() => dispatch({ type: 'SET_GLOBAL_DATA_GROUP', group: next.id })}>
                      {next.label} →
                    </button>
                  ) : (
                    <button className="btn btn-primary" onClick={() => dispatch({ type: 'SET_VIEW', view: 'sections' })}>
                      View Section Library →
                    </button>
                  )}
                </>
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
