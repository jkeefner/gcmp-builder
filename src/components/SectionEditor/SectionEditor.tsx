import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useProject } from '../../context/ProjectContext';
import { SECTION_LIBRARY } from '../../data/sections';
import type { Section, Chapter, Part } from '../../data/sections';

// ─── FLAT SECTION LIST ────────────────────────────────────────────────────────
// Build a flat ordered list of { part, chapter, section } for prev/next nav.

interface FlatSection {
  part: Part;
  chapter: Chapter;
  section: Section;
  index: number;
}

const FLAT_SECTIONS: FlatSection[] = (() => {
  const result: FlatSection[] = [];
  let i = 0;
  for (const part of SECTION_LIBRARY) {
    for (const chapter of part.chapters) {
      for (const section of chapter.sections) {
        result.push({ part, chapter, section, index: i++ });
      }
    }
  }
  return result;
})();

// ─── WRITING PROMPTS ─────────────────────────────────────────────────────────
// Context-sensitive prompts shown above the textarea to guide narrative content.

const NARRATIVE_PROMPTS: Record<string, string> = {
  '1.1': 'Describe the document: its formal title, document number series, and its relationship to other management plans on site.',
  '1.2': 'Describe the version control process — how revisions are initiated, reviewed, approved, and distributed.',
  '1.3': 'Describe the distribution process and how acknowledgment is confirmed (email, log book, LMS).',
  '2.1': 'State the purpose of this GCMP, the regulatory or corporate driver for its preparation, and the operational context.',
  '2.2': 'Describe the scope — which pits, which infrastructure, what does this plan cover and explicitly exclude.',
  '2.3': 'Identify the applicable federal and state/provincial regulatory framework and any relevant permit conditions.',
  '2.4': 'List all referenced standards, guidelines, reports, and plans. CSIRO LOP, site geotechnical reports, etc.',
  '3.1': 'Describe mine location, access, elevation, and site setting. Include coordinates, nearest town, and general topographic context.',
  '3.2': 'Summarize climate: mean annual precipitation, seasonal extremes, design storm, freeze-thaw, and any hydrology relevant to slope stability.',
  '3.3': 'Summarize the history of the operation and prior geotechnical investigations — who did what, when, and key findings.',
  '4.1': 'Describe the organizational structure for ground control: who holds stop-work authority, who signs off on designs, how the contractor chain of responsibility works.',
  '4.2': 'Define competency requirements by role: RGE qualifications, geotechnical technician requirements, supervisor expectations.',
  '4A.1': 'Describe the pit slopes in scope: which pits, current and final pit geometry, overall depth, and consequence classification.',
  '4A.2': 'If waste dumps are managed under this GCMP, describe their location, current status, and management approach.',
  '4A.3': 'If the heap leach facility is managed under this GCMP, describe its current status and the basis for that decision.',
  '4A.4': 'If the TSF is managed under this GCMP, describe its current status. Note: most TSFs have a standalone TARP and Engineer of Record structure.',
  '5.1': 'Describe the data confidence level for each design sector, the basis for that classification (CSIRO LOP Table 8.1), and the data collection history.',
  '5.2': 'Summarize the regional and site geology: lithology, major structural features, alteration, and geologic history relevant to slope behavior.',
  '5.3': 'Summarize the structural geology: dominant discontinuity sets, orientations, persistence, and how they were characterized.',
  '5.4': 'Summarize rock mass characterization: classification systems used, ranges by domain, and key geomechanical parameters.',
  '5.5': 'Describe the hydrogeological model: permeability structure, recharge sources, seasonal piezometric behavior, and groundwater influence on slope stability.',
  '5.6': 'Summarize in situ stress data if available: measurement method, results, and relevance to slope design.',
  '6.1': 'Describe the slope design philosophy: deterministic vs. probabilistic, risk tolerance, how the FoS/PoF targets were set.',
  '6.2': 'Define the geotechnical domains used for slope design: boundaries, basis for domain boundaries, and key distinguishing characteristics.',
  '6.3': 'State the design acceptance criteria (FoS and PoF) for bench, inter-ramp, and overall slopes under static and seismic loading.',
  '6.4': 'Describe the design sectors, their boundaries, and the approved slope angles. Reference the sector plan drawing.',
  '6.5': 'Describe the identified failure modes for each design sector: structural (planar, wedge, toppling), circular, deep-seated.',
  '6.6': 'Describe the seismic hazard and the approach to seismic design: pseudo-static coefficient source, design earthquake, and how seismic loading is incorporated.',
  '6.7': 'Describe any weak rock or highly weathered zones and how these are addressed in the slope design.',
  '7.1': 'Describe the design review and approval process: what triggers a formal review, who is required to sign off, and what documentation is generated.',
  '7.2': 'Describe the blast management approach for slope stability: controlled blasting standards, pre-split or trim blast requirements, and monitoring.',
  '7.3': 'Describe the survey control and design compliance monitoring program: frequency, format, reporting, and response to non-compliance.',
  '7.4': 'Describe the scaling program: frequency, responsible party, equipment used, and documentation.',
  '7.5': 'Describe the ongoing geotechnical data collection program during mining: mapping, logging, and data entry requirements.',
  '8.1': 'Describe the overall monitoring strategy: what failure modes it addresses, how monitoring zones are defined, and the hierarchy of monitoring methods.',
  '8.2': 'Describe the visual inspection program: frequency, who conducts it, what they look for, how it is documented, and reporting chain.',
  '8.3': 'Describe the prism monitoring network: instrument count, coverage areas, ATS vs manual, measurement frequency, and alert thresholds.',
  '8.4': 'Describe the slope stability radar deployment: units, coverage sectors, alarm settings, and integration with TARPs.',
  '8.5': 'Describe the InSAR monitoring program: provider, revisit period, processing approach, and how results are used.',
  '8.6': 'Describe the piezometer network: instrument types, locations, data logger setup, and seasonal monitoring approach.',
  '8.7': 'Describe inclinometer installations: locations, measurement frequency, and how shear zone identification is used in slope management.',
  '8.8': 'Describe the seismic monitoring network: instrument type, coverage, and integration with blast monitoring.',
  '8.9': 'Describe the crack monitoring program: location, measurement method, frequency, and alert levels.',
  '8.10': 'Describe the monitoring data management system: software platform, update frequency, report format, and distribution list.',
  '9.1': 'Describe the dewatering strategy: target pore pressure conditions, dewatering infrastructure, and how performance is evaluated.',
  '9.2': 'Describe the horizontal drain program: installed drain inventory, maintenance program, and flow monitoring.',
  '9.3': 'Describe surface water management: berm gradient standards, drainage infrastructure, and storm response procedures.',
  '10.1': 'Describe the hazard register structure and summarize current known geotechnical hazards by sector. Reference the register document if separate.',
  '10.2': 'Describe the geotechnical hazard mapping program: map format, update frequency, and how maps are communicated to operations.',
  '10.3': 'Describe the overall TARP framework: number of alert levels, the authority to declare each level, and the communication system.',
  '10.4': 'Describe the approach to setting TARP thresholds: how background noise was characterized, how failure velocities were estimated, and how thresholds were calibrated.',
  '10.5': 'Describe the exclusion zones, evacuation routes, assembly points, and emergency command structure for slope failure scenarios.',
  '11.1': 'Describe the geotechnical reporting structure: what reports are produced, who writes them, who receives them, and at what frequency.',
  '11.2': 'Describe the ground control training program: mandatory training by role, induction content, refresher frequency, and records system.',
  '11.3': 'Describe the pre-start inspection program: who inspects, what the checklist covers, how defects are reported, and follow-up.',
  '12.1': 'Describe ground movement event reporting: what constitutes a reportable event, how to report, to whom, and in what timeframe.',
  '12.2': 'Describe the ground movement investigation procedure: investigation team, timeline, root cause analysis method, and action tracking.',
  '13.1': 'Describe the GCMP review schedule and the conditions that trigger an unscheduled review.',
  '13.2': 'Describe the internal geotechnical audit program: frequency, scope, auditor qualifications, and finding management.',
  '13.3': 'Describe the external review program: reviewer qualifications, frequency, scope, and how findings are incorporated into the GCMP.',
  '14.1': 'Describe the closure slope design philosophy: long-term stability criteria, reclamation design basis, and permit requirements.',
  '14.2': 'Describe post-closure monitoring obligations: who is responsible, what is monitored, what triggers post-closure intervention.',
};

const DEFAULT_PROMPT = 'Enter the site-specific narrative for this section. This text will appear in the exported Word document ahead of the guidance notes and template language.';

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export function SectionEditor() {
  const { state, dispatch, activeProject } = useProject();
  const activeSectionId = state.activeSectionId;

  const [localText, setLocalText] = useState('');
  const [saveStatus, setSaveStatus] = useState<'saved' | 'unsaved' | 'saving'>('saved');
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // ─── Find active section in flat list ─────────────────────────────────────
  const flatEntry = FLAT_SECTIONS.find(fs => fs.section.id === activeSectionId) ?? null;
  const currentIndex = flatEntry?.index ?? -1;
  const prevEntry = currentIndex > 0 ? FLAT_SECTIONS[currentIndex - 1] : null;
  const nextEntry = currentIndex < FLAT_SECTIONS.length - 1 ? FLAT_SECTIONS[currentIndex + 1] : null;

  // ─── Sync local text from project state ───────────────────────────────────
  useEffect(() => {
    if (!activeSectionId || !activeProject) return;
    const saved = activeProject.sectionStates[activeSectionId]?.narrative ?? '';
    setLocalText(saved);
    setSaveStatus('saved');
    textareaRef.current?.focus();
  }, [activeSectionId, activeProject?.id]);

  // ─── Debounced save ───────────────────────────────────────────────────────
  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    setLocalText(val);
    setSaveStatus('unsaved');
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(() => {
      if (!activeSectionId) return;
      dispatch({ type: 'UPDATE_SECTION_NARRATIVE', sectionId: activeSectionId, narrative: val });
      setSaveStatus('saved');
    }, 800);
  }, [activeSectionId, dispatch]);

  // ─── Navigation helpers ───────────────────────────────────────────────────
  const goToSection = (id: string) => {
    // Flush any pending save before navigating
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (activeSectionId && saveStatus === 'unsaved') {
      dispatch({ type: 'UPDATE_SECTION_NARRATIVE', sectionId: activeSectionId, narrative: localText });
    }
    dispatch({ type: 'SET_ACTIVE_SECTION', sectionId: id });
  };

  const goBack = () => {
    if (saveTimer.current) clearTimeout(saveTimer.current);
    if (activeSectionId && saveStatus === 'unsaved') {
      dispatch({ type: 'UPDATE_SECTION_NARRATIVE', sectionId: activeSectionId, narrative: localText });
    }
    dispatch({ type: 'SET_VIEW', view: 'sections' });
  };

  if (!activeProject || !flatEntry) {
    return (
      <div className="main-content">
        <div className="empty-state">
          <div className="empty-state-icon">✎</div>
          <h3>No section selected</h3>
          <button className="btn-primary" onClick={goBack}>Back to Section List</button>
        </div>
      </div>
    );
  }

  const { section, chapter, part } = flatEntry;
  const status = activeProject.sectionStates[section.id]?.status ?? 'included';
  const isSkipped = status === 'skipped';
  const wordCount = localText.trim() ? localText.trim().split(/\s+/).length : 0;
  const charCount = localText.length;
  const prompt = NARRATIVE_PROMPTS[section.id] ?? DEFAULT_PROMPT;

  // Count sections with content in this chapter
  const chapterSections = flatEntry.chapter.sections;
  const chapterWithContent = chapterSections.filter(
    s => activeProject.sectionStates[s.id]?.narrative?.trim()
  ).length;

  return (
    <div className="section-editor-shell">

      {/* ── Top bar ───────────────────────────────────────────────────────── */}
      <div className="se-topbar">
        <button className="se-back-btn" onClick={goBack}>
          ← Section List
        </button>
        <div className="se-breadcrumb">
          <span className="se-bc-part">Part {part.num}</span>
          <span className="se-bc-sep">›</span>
          <span className="se-bc-chapter">Ch {chapter.id}: {chapter.title}</span>
          <span className="se-bc-sep">›</span>
          <span className="se-bc-section">{section.id}</span>
        </div>
        <div className="se-save-status">
          {saveStatus === 'saved' && <span className="se-saved">✓ Saved</span>}
          {saveStatus === 'unsaved' && <span className="se-unsaved">Unsaved…</span>}
          {saveStatus === 'saving' && <span className="se-saving">Saving…</span>}
        </div>
      </div>

      {/* ── Main layout ───────────────────────────────────────────────────── */}
      <div className="se-layout">

        {/* ── Left panel: section info + textarea ───────────────────────── */}
        <div className="se-main-panel">

          {/* Section header card */}
          <div className="se-section-card">
            <div className="se-section-meta">
              <span className="se-section-num">{section.id}</span>
              {section.isPriority && <span className="se-priority-chip">★ Priority</span>}
              <span className={`se-applicability ${section.applicability}`}>{section.applicability}</span>
              {section.mshaCfr && <span className="se-cfr-chip">CFR</span>}
              <span className={`se-status-chip ${isSkipped ? 'skipped' : 'included'}`}>
                {isSkipped ? 'Skipped' : 'Included'}
              </span>
            </div>
            <h2 className="se-section-title">{section.title}</h2>
            <div className="se-section-applicability-note">{section.applicabilityNote}</div>
            {section.mshaCfr && (
              <div className="se-cfr-note">{section.mshaCfr}</div>
            )}
            {section.crossRefs.length > 0 && (
              <div className="se-crossrefs">
                Cross-refs: {section.crossRefs.map((r, i) => (
                  <button
                    key={r}
                    className="se-crossref-btn"
                    onClick={() => {
                      const target = FLAT_SECTIONS.find(fs => fs.section.id === r);
                      if (target) goToSection(r);
                    }}
                    title={`Go to section ${r}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Skip warning */}
          {isSkipped && (
            <div className="se-skip-warning">
              ⚠ This section is marked <strong>Skipped</strong>. The exported document will show an omission stub instead of content.
              Narrative entered here is saved but will not appear in the export while the section is skipped.
              <button
                className="se-unskip-btn"
                onClick={() => dispatch({ type: 'UPDATE_SECTION_STATUS', sectionId: section.id, status: 'included' })}
              >
                Re-include section
              </button>
            </div>
          )}

          {/* Writing prompt */}
          <div className="se-prompt-box">
            <div className="se-prompt-label">Writing guide</div>
            <div className="se-prompt-text">{prompt}</div>
          </div>

          {/* Textarea */}
          <div className="se-textarea-wrap">
            <textarea
              ref={textareaRef}
              className="se-textarea"
              value={localText}
              onChange={handleChange}
              placeholder="Enter the site-specific narrative for this section…&#10;&#10;This text will appear in the exported Word document before the guidance notes and template language. Write in the third person (e.g. 'The Responsible Geotechnical Engineer is…') as it will be read by regulators and auditors."
              disabled={false}
            />
            <div className="se-textarea-footer">
              <span className="se-word-count">{wordCount} words · {charCount} characters</span>
              {localText.length > 0 && (
                <button
                  className="se-clear-btn"
                  onClick={() => {
                    if (window.confirm('Clear this section narrative? This cannot be undone.')) {
                      setLocalText('');
                      if (activeSectionId) {
                        dispatch({ type: 'UPDATE_SECTION_NARRATIVE', sectionId: activeSectionId, narrative: '' });
                      }
                      setSaveStatus('saved');
                    }
                  }}
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Include/Skip toggle */}
          <div className="se-status-row">
            <span className="se-status-label">Section status:</span>
            <button
              className={`status-btn${!isSkipped ? ' active-included' : ''}`}
              onClick={() => {
                if (isSkipped) dispatch({ type: 'UPDATE_SECTION_STATUS', sectionId: section.id, status: 'included' });
              }}
            >✓ Include</button>
            <button
              className={`status-btn${isSkipped ? ' active-skipped' : ''}`}
              onClick={() => dispatch({ type: 'UPDATE_SECTION_STATUS', sectionId: section.id, status: 'skipped' })}
            >— Skip</button>
          </div>

        </div>

        {/* ── Right panel: chapter progress + nav ───────────────────────── */}
        <div className="se-side-panel">

          <div className="se-side-chapter">
            <div className="se-side-chapter-title">Chapter {chapter.id}: {chapter.title}</div>
            <div className="se-side-chapter-progress">
              {chapterWithContent} / {chapterSections.length} sections have content
            </div>
            <div className="se-chapter-section-list">
              {chapterSections.map(s => {
                const hasContent = !!(activeProject.sectionStates[s.id]?.narrative?.trim());
                const sStatus = activeProject.sectionStates[s.id]?.status ?? 'included';
                const isActive = s.id === section.id;
                return (
                  <button
                    key={s.id}
                    className={`se-chapter-section-btn${isActive ? ' active' : ''}${hasContent ? ' has-content' : ''}${sStatus === 'skipped' ? ' skipped' : ''}`}
                    onClick={() => goToSection(s.id)}
                  >
                    <span className="se-csl-id">{s.id}</span>
                    <span className="se-csl-title">{s.title}</span>
                    {hasContent && <span className="se-csl-dot" title="Has narrative content" />}
                    {sStatus === 'skipped' && <span className="se-csl-skip" title="Skipped">—</span>}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Overall progress */}
          <div className="se-side-progress">
            <div className="se-side-progress-label">Overall progress</div>
            {(() => {
              const total = FLAT_SECTIONS.length;
              const withContent = FLAT_SECTIONS.filter(
                fs => activeProject.sectionStates[fs.section.id]?.narrative?.trim()
              ).length;
              const pct = Math.round((withContent / total) * 100);
              return (
                <>
                  <div className="se-progress-bar-wrap">
                    <div className="se-progress-bar" style={{ width: `${pct}%` }} />
                  </div>
                  <div className="se-progress-text">{withContent} of {total} sections written ({pct}%)</div>
                </>
              );
            })()}
          </div>

        </div>
      </div>

      {/* ── Bottom nav ───────────────────────────────────────────────────── */}
      <div className="se-bottom-nav">
        <button
          className="se-nav-btn"
          disabled={!prevEntry}
          onClick={() => prevEntry && goToSection(prevEntry.section.id)}
        >
          ← {prevEntry ? `${prevEntry.section.id} — ${prevEntry.section.title}` : 'First section'}
        </button>
        <span className="se-nav-pos">{currentIndex + 1} / {FLAT_SECTIONS.length}</span>
        <button
          className="se-nav-btn"
          disabled={!nextEntry}
          onClick={() => nextEntry && goToSection(nextEntry.section.id)}
        >
          {nextEntry ? `${nextEntry.section.id} — ${nextEntry.section.title}` : 'Last section'} →
        </button>
      </div>

    </div>
  );
}
