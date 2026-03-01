import { useState, useEffect, useRef, useCallback } from 'react';
import { useProject } from '../../context/ProjectContext';
import { sectionContent, orderedSectionIds } from '../../data/sectionContent';
import { SECTION_LIBRARY } from '../../data/sections';
import { fill } from '../../lib/docHelpers';
import type { GlobalData } from '../../types';

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function findSectionMeta(id: string) {
  for (const part of SECTION_LIBRARY) {
    for (const chapter of part.chapters) {
      const sec = chapter.sections.find(s => s.id === id);
      if (sec) return { sec, chapter, part };
    }
  }
  return null;
}

function wordCount(text: string): number {
  return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function SectionContentView() {
  const { state, dispatch, activeProject } = useProject();
  const sectionId = state.activeSectionId;

  const [localText, setLocalText] = useState('');
  const [saved, setSaved] = useState(true);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const project = activeProject;
  if (!project || !sectionId) {
    return (
      <div className="section-content-empty">
        <p>No section selected. Return to the Section Navigator to choose a section.</p>
      </div>
    );
  }

  const meta = findSectionMeta(sectionId);
  const content = sectionContent[sectionId];
  const sectionState = project.sectionStates[sectionId];
  const currentNarrative = sectionState?.narrative ?? '';

  // Sync local text when section changes
  useEffect(() => {
    setLocalText(currentNarrative);
    setSaved(true);
    textareaRef.current?.focus();
  }, [sectionId]);

  // Auto-save with debounce
  const save = useCallback((text: string) => {
    dispatch({ type: 'UPDATE_SECTION_NARRATIVE', sectionId, narrative: text });
    setSaved(true);
  }, [sectionId, dispatch]);

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const text = e.target.value;
    setLocalText(text);
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => save(text), 800);
  }

  function handleBlur() {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (!saved) save(localText);
  }

  // Use template prompt as starting point if textarea is empty
  function handleUseTemplate() {
    if (!content?.templatePrompt) return;
    const filled = fill(content.templatePrompt, project!.globalData);
    setLocalText(filled);
    setSaved(false);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => save(filled), 800);
    textareaRef.current?.focus();
  }

  function handleClear() {
    if (localText !== '' && !window.confirm('Clear this section\'s narrative?')) return;
    setLocalText('');
    save('');
  }

  // Navigation
  const idx = orderedSectionIds.indexOf(sectionId);
  const prevId = idx > 0 ? orderedSectionIds[idx - 1] : null;
  const nextId = idx < orderedSectionIds.length - 1 ? orderedSectionIds[idx + 1] : null;

  function goTo(id: string) {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (!saved) save(localText);
    dispatch({ type: 'SET_ACTIVE_SECTION', sectionId: id });
  }

  function goBack() {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (!saved) save(localText);
    dispatch({ type: 'SET_VIEW', view: 'sections' });
    dispatch({ type: 'SET_ACTIVE_SECTION', sectionId: null });
  }

  const isSkipped = sectionState?.status === 'skipped';
  const words = wordCount(localText);

  return (
    <div className="sc-shell">

      {/* ── Top bar ── */}
      <div className="sc-topbar">
        <button className="sc-back-btn" onClick={goBack}>
          ← Section Navigator
        </button>
        <div className="sc-breadcrumb">
          {meta?.part.title && <span className="sc-bc-part">{meta.part.title}</span>}
          {meta?.chapter.title && <><span className="sc-bc-sep">/</span><span>{meta.chapter.title}</span></>}
        </div>
        <div className="sc-save-status">
          {saved ? <span className="sc-saved">✓ Saved</span> : <span className="sc-unsaved">● Unsaved</span>}
        </div>
      </div>

      {/* ── Section header ── */}
      <div className="sc-header">
        <div className="sc-section-id">{sectionId}</div>
        <h2 className="sc-section-title">{meta?.sec.title ?? sectionId}</h2>
        <div className="sc-badges">
          {meta?.sec.isPriority && <span className="badge badge-priority">★ Priority</span>}
          {meta?.sec.applicability === 'conditional' && <span className="badge badge-cond">Conditional</span>}
          {meta?.sec.applicability === 'optional' && <span className="badge badge-opt">Optional</span>}
          {isSkipped && <span className="badge badge-skip">Skipped</span>}
          {meta?.sec.mshaCfr && <span className="badge badge-cfr" title={meta.sec.mshaCfr}>CFR</span>}
        </div>
        {meta?.sec.mshaCfr && (
          <div className="sc-cfr">{meta.sec.mshaCfr}</div>
        )}
      </div>

      {isSkipped && (
        <div className="sc-skip-notice">
          ⚠ This section is marked as skipped. Any narrative entered here will be saved but will not appear in the exported document unless you change the section status to Included in the Section Navigator.
        </div>
      )}

      {/* ── Writing hint ── */}
      {content && (
        <div className="sc-hint">
          <span className="sc-hint-label">What to write</span>
          <p>{content.hint}</p>
        </div>
      )}

      {/* ── Toolbar ── */}
      <div className="sc-toolbar">
        {content?.templatePrompt && (
          <button
            className="sc-tool-btn"
            onClick={handleUseTemplate}
            title="Insert template language as a starting point — your global data will be pre-filled"
          >
            ✦ Insert template
          </button>
        )}
        {localText && (
          <button className="sc-tool-btn sc-tool-btn--clear" onClick={handleClear}>
            ✕ Clear
          </button>
        )}
        <span className="sc-word-count">{words} {words === 1 ? 'word' : 'words'}</span>
      </div>

      {/* ── Textarea ── */}
      <textarea
        ref={textareaRef}
        className="sc-textarea"
        value={localText}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={content?.placeholder ?? `Write the ${sectionId} section narrative here...`}
        spellCheck
      />

      {/* ── Cross-refs & export note ── */}
      <div className="sc-footer-info">
        {meta?.sec.crossRefs && meta.sec.crossRefs.length > 0 && (
          <div className="sc-crossrefs">
            <span className="sc-crossrefs-label">Cross-references:</span>
            {meta.sec.crossRefs.map(ref => (
              <button
                key={ref}
                className="sc-crossref-btn"
                onClick={() => orderedSectionIds.includes(ref) && goTo(ref)}
                title={`Go to section ${ref}`}
              >
                {ref}
              </button>
            ))}
          </div>
        )}
        <div className="sc-export-note">
          In the Word export, this narrative appears as the section body. The template language guidance box remains as a reference for the engineer.
        </div>
      </div>

      {/* ── Prev / Next navigation ── */}
      <div className="sc-nav">
        <button
          className="sc-nav-btn sc-nav-btn--prev"
          onClick={() => prevId && goTo(prevId)}
          disabled={!prevId}
        >
          ← {prevId ? `§${prevId}` : 'Start'}
        </button>
        <div className="sc-nav-progress">
          Section {idx + 1} of {orderedSectionIds.length}
        </div>
        <button
          className="sc-nav-btn sc-nav-btn--next"
          onClick={() => nextId && goTo(nextId)}
          disabled={!nextId}
        >
          {nextId ? `§${nextId}` : 'End'} →
        </button>
      </div>

    </div>
  );
}
