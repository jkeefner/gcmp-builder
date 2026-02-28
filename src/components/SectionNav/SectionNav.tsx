import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { SECTION_LIBRARY, TOTAL_SECTIONS, PRIORITY_SECTIONS } from '../../data/sections';
import type { SectionStatus } from '../../types';

export function SectionNav() {
  const { activeProject, dispatch } = useProject();
  const [expandedParts, setExpandedParts] = useState<Set<string>>(
    new Set(SECTION_LIBRARY.map(p => p.num))
  );

  if (!activeProject) return null;

  const sectionStates = activeProject.sectionStates;

  const getSectionStatus = (sectionId: string): SectionStatus => {
    return sectionStates[sectionId]?.status ?? 'included';
  };

  const toggleStatus = (sectionId: string, newStatus: SectionStatus) => {
    const current = getSectionStatus(sectionId);
    dispatch({
      type: 'UPDATE_SECTION_STATUS',
      sectionId,
      status: current === newStatus ? 'included' : newStatus,
    });
  };

  const togglePart = (num: string) => {
    setExpandedParts(prev => {
      const next = new Set(prev);
      if (next.has(num)) next.delete(num);
      else next.add(num);
      return next;
    });
  };

  const includedCount = SECTION_LIBRARY
    .flatMap(p => p.chapters.flatMap(c => c.sections))
    .filter(s => getSectionStatus(s.id) !== 'skipped').length;

  const skippedCount = SECTION_LIBRARY
    .flatMap(p => p.chapters.flatMap(c => c.sections))
    .filter(s => getSectionStatus(s.id) === 'skipped').length;

  return (
    <div className="main-content">

      {/* Stats */}
      <div className="stats-bar">
        <div className="stat-item">
          <div className="stat-value">{TOTAL_SECTIONS}</div>
          <div className="stat-label">Total Sections</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--green-data)' }}>{includedCount}</div>
          <div className="stat-label">Included</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--amber)' }}>{skippedCount}</div>
          <div className="stat-label">Skipped</div>
        </div>
        <div className="stat-divider" />
        <div className="stat-item">
          <div className="stat-value" style={{ color: 'var(--red-priority)' }}>{PRIORITY_SECTIONS.length}</div>
          <div className="stat-label">Priority</div>
        </div>
      </div>

      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16, lineHeight: 1.5, padding: '10px 14px', background: 'var(--blue-ghost)', borderRadius: 'var(--r-sm)', border: '1px solid var(--blue-pale)' }}>
        <strong>Phase 2 — View Only.</strong> Toggle sections below to mark them as Included or Skipped for your operation.
        Any section can be skipped at the engineer's discretion — the final document will include a flagged omission note.
        Section content forms (guidance, template language, data entry) will be built in Phases 4–5.
        <br /><span style={{ color: 'var(--red-priority)', fontWeight: 600 }}>★ Priority sections</span> receive enhanced validation checklists in Phase 5.
      </div>

      <div className="section-nav-layout">
        {SECTION_LIBRARY.map(part => {
          const isExpanded = expandedParts.has(part.num);
          const partSectionCount = part.chapters.flatMap(c => c.sections).length;
          const partSkipped = part.chapters.flatMap(c => c.sections).filter(s => getSectionStatus(s.id) === 'skipped').length;

          return (
            <div key={part.num} className="part-block">
              <div
                className="part-header"
                style={{ cursor: 'pointer', userSelect: 'none' }}
                onClick={() => togglePart(part.num)}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span className="part-badge">Part {part.num}</span>
                    <span className="part-title">{part.title}</span>
                    <span style={{ marginLeft: 'auto', fontSize: 11, fontFamily: 'var(--font-mono)', color: '#7aa0cc' }}>
                      {partSectionCount} sections
                      {partSkipped > 0 ? ` · ${partSkipped} skipped` : ''}
                      {' · '}{isExpanded ? '▲' : '▼'}
                    </span>
                  </div>
                  <div className="part-subtitle">{part.subtitle}</div>
                </div>
              </div>

              {isExpanded && part.chapters.map(chapter => (
                <div key={chapter.id} className="chapter-block">
                  <div className="chapter-header">
                    <span className="chapter-id">Ch {chapter.id}</span>
                    <div style={{ flex: 1 }}>
                      <div className="chapter-title">{chapter.title}</div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 2 }}>{chapter.purpose}</div>
                    </div>
                    <span className="chapter-count">{chapter.sections.length} sections</span>
                  </div>

                  {chapter.sections.map(section => {
                    const status = getSectionStatus(section.id);
                    const isSkipped = status === 'skipped';

                    return (
                      <div key={section.id} className="section-row" style={{ opacity: isSkipped ? 0.6 : 1 }}>
                        <span className="section-id">{section.id}</span>
                        <div style={{ flex: 1 }}>
                          <div className="section-title" style={{ textDecoration: isSkipped ? 'line-through' : 'none' }}>
                            {section.title}
                          </div>
                          {section.mshaCfr && (
                            <div className="section-cfr" style={{ marginTop: 2 }}>CFR: {section.mshaCfr}</div>
                          )}
                        </div>

                        {section.isPriority && (
                          <span className="section-priority-badge">★ Priority</span>
                        )}

                        <span className={`section-applicability ${section.applicability}`}>
                          {section.applicability}
                        </span>

                        <div className="section-status-toggle">
                          <button
                            className={`status-btn${!isSkipped ? ' active-included' : ''}`}
                            onClick={() => {
                              if (isSkipped) toggleStatus(section.id, 'skipped');
                            }}
                            title="Include this section"
                          >
                            ✓ In
                          </button>
                          <button
                            className={`status-btn${isSkipped ? ' active-skipped' : ''}`}
                            onClick={() => toggleStatus(section.id, 'skipped')}
                            title="Skip this section"
                          >
                            — Skip
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
