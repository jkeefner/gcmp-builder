import React, { useMemo } from 'react';
import { useProject } from '../../context/ProjectContext';
import { FIELD_GROUPS } from '../../data/globalFields';
import { SECTION_LIBRARY, PRIORITY_SECTIONS } from '../../data/sections';
import type { GlobalData } from '../../types';

// ─── HELPERS ──────────────────────────────────────────────────────────────────

function isFilled(val: string | undefined): boolean {
  return !!(val && val.trim() !== '');
}

// ─── TYPES ────────────────────────────────────────────────────────────────────

interface GroupSummary {
  id: string;
  label: string;
  icon: string;
  total: number;
  filled: number;
  required: number;
  requiredFilled: number;
  missingRequired: { key: string; label: string }[];
  missingOptional: { key: string; label: string }[];
}

interface SectionSummary {
  id: string;
  title: string;
  isPriority: boolean;
  status: 'included' | 'skipped';
  hasNarrative: boolean;
}

// ─── SCORE RING ───────────────────────────────────────────────────────────────

function ScoreRing({ pct, label, size = 80 }: { pct: number; label: string; size?: number }) {
  const r = size * 0.38;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  const color = pct >= 80 ? '#2a7a4b' : pct >= 50 ? '#f59e0b' : '#dc2626';

  return (
    <div className="score-ring-wrap" style={{ width: size, flexShrink: 0 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#e5e7eb" strokeWidth={size * 0.1} />
        <circle
          cx={size / 2} cy={size / 2} r={r}
          fill="none" stroke={color} strokeWidth={size * 0.1}
          strokeDasharray={`${dash} ${circ}`}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          style={{ transition: 'stroke-dasharray 0.6s ease' }}
        />
        <text x={size / 2} y={size / 2 + 1} textAnchor="middle" dominantBaseline="middle"
          fontSize={size * 0.22} fontWeight="700" fill={color} fontFamily="Arial">
          {pct}%
        </text>
      </svg>
      <div className="score-ring-label">{label}</div>
    </div>
  );
}

// ─── PROGRESS BAR ─────────────────────────────────────────────────────────────

function MiniBar({ filled, total, color = 'var(--blue)' }: { filled: number; total: number; color?: string }) {
  const pct = total === 0 ? 100 : Math.round((filled / total) * 100);
  return (
    <div className="mini-bar-wrap">
      <div className="mini-bar-track">
        <div className="mini-bar-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
      <span className="mini-bar-text">{filled}/{total}</span>
    </div>
  );
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────

export function Dashboard() {
  const { activeProject, dispatch } = useProject();

  const analysis = useMemo(() => {
    if (!activeProject) return null;
    const d = activeProject.globalData;
    const ss = activeProject.sectionStates;

    // ── Global data by group ─────────────────────────────────────────────────
    const groups: GroupSummary[] = FIELD_GROUPS.map(g => {
      const missingRequired: { key: string; label: string }[] = [];
      const missingOptional: { key: string; label: string }[] = [];
      let filled = 0;
      let requiredFilled = 0;

      for (const f of g.fields) {
        const val = d[f.key as keyof GlobalData];
        const ok = isFilled(val);
        if (ok) {
          filled++;
          if (f.required) requiredFilled++;
        } else {
          if (f.required) missingRequired.push({ key: f.key, label: f.label });
          else missingOptional.push({ key: f.key, label: f.label });
        }
      }

      return {
        id: g.id,
        label: g.label,
        icon: g.icon,
        total: g.fields.length,
        filled,
        required: g.fields.filter(f => f.required).length,
        requiredFilled,
        missingRequired,
        missingOptional,
      };
    });

    const totalFields = groups.reduce((s, g) => s + g.total, 0);
    const totalFilled = groups.reduce((s, g) => s + g.filled, 0);
    const totalRequired = groups.reduce((s, g) => s + g.required, 0);
    const totalRequiredFilled = groups.reduce((s, g) => s + g.requiredFilled, 0);

    // ── Sections ─────────────────────────────────────────────────────────────
    const allSections: SectionSummary[] = SECTION_LIBRARY
      .flatMap(p => p.chapters.flatMap(c => c.sections))
      .map(s => ({
        id: s.id,
        title: s.title,
        isPriority: s.isPriority,
        status: (ss[s.id]?.status === 'skipped' ? 'skipped' : 'included') as 'included' | 'skipped',
        hasNarrative: isFilled(ss[s.id]?.narrative),
      }));

    const included = allSections.filter(s => s.status === 'included');
    const skipped = allSections.filter(s => s.status === 'skipped');
    const withNarrative = included.filter(s => s.hasNarrative);
    const withoutNarrative = included.filter(s => !s.hasNarrative);

    const prioritySections = allSections.filter(s => s.isPriority);
    const priorityIncluded = prioritySections.filter(s => s.status === 'included');
    const priorityWithNarrative = priorityIncluded.filter(s => s.hasNarrative);
    const priorityProblems = prioritySections.filter(
      s => s.status === 'skipped' || !s.hasNarrative
    );

    // ── Overall score ─────────────────────────────────────────────────────────
    // Weighted: required fields 40%, all fields 20%, section narratives 40%
    const requiredPct = totalRequired === 0 ? 100 : Math.round((totalRequiredFilled / totalRequired) * 100);
    const fieldsPct = totalFields === 0 ? 100 : Math.round((totalFilled / totalFields) * 100);
    const narrativePct = included.length === 0 ? 100 : Math.round((withNarrative.length / included.length) * 100);
    const overallScore = Math.round(requiredPct * 0.4 + fieldsPct * 0.2 + narrativePct * 0.4);

    // ── Export readiness ──────────────────────────────────────────────────────
    const readinessChecks = [
      { label: 'Mine name entered', ok: isFilled(d.mine_name) },
      { label: 'Document number entered', ok: isFilled(d.doc_number) },
      { label: 'Revision number entered', ok: isFilled(d.revision_number) },
      { label: 'Prepared By entered', ok: isFilled(d.prepared_by_name) },
      { label: 'Approved By entered', ok: isFilled(d.approved_by_name) },
      { label: 'RGE name entered', ok: isFilled(d.geotech_engineer) },
      { label: 'All required fields filled', ok: totalRequiredFilled === totalRequired },
      { label: 'All priority sections included', ok: priorityIncluded.length === prioritySections.length },
      { label: 'Priority sections have narratives', ok: priorityWithNarrative.length === priorityIncluded.length },
    ];

    const readinessScore = readinessChecks.filter(c => c.ok).length;

    return {
      groups, totalFields, totalFilled, totalRequired, totalRequiredFilled,
      allSections, included, skipped, withNarrative, withoutNarrative,
      prioritySections, priorityIncluded, priorityWithNarrative, priorityProblems,
      requiredPct, fieldsPct, narrativePct, overallScore,
      readinessChecks, readinessScore,
    };
  }, [activeProject]);

  if (!activeProject || !analysis) return null;

  const {
    groups, totalFields, totalFilled, totalRequired, totalRequiredFilled,
    included, skipped, withNarrative, withoutNarrative,
    prioritySections, priorityIncluded, priorityWithNarrative, priorityProblems,
    requiredPct, fieldsPct, narrativePct, overallScore,
    readinessChecks, readinessScore,
  } = analysis;

  const goToGroup = (groupId: string) => {
    dispatch({ type: 'SET_GLOBAL_DATA_GROUP', group: groupId });
    dispatch({ type: 'SET_VIEW', view: 'global-data' });
  };

  const goToSection = (sectionId: string) => {
    dispatch({ type: 'SET_ACTIVE_SECTION', sectionId });
    dispatch({ type: 'SET_VIEW', view: 'section-content' });
  };

  const goToSectionList = () => dispatch({ type: 'SET_VIEW', view: 'sections' });

  return (
    <div className="dashboard">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div className="dash-header">
        <div>
          <h2 className="dash-title">Project Dashboard</h2>
          <p className="dash-subtitle">
            {activeProject.globalData.mine_name || 'Unnamed Project'} · Completeness overview
          </p>
        </div>
      </div>

      {/* ── Overall health ───────────────────────────────────────────────────── */}
      <div className="dash-card dash-health-card">
        <div className="dash-health-rings">
          <ScoreRing pct={overallScore} label="Overall" size={90} />
          <ScoreRing pct={requiredPct} label="Required fields" size={72} />
          <ScoreRing pct={fieldsPct} label="All fields" size={72} />
          <ScoreRing pct={narrativePct} label="Narratives" size={72} />
        </div>
        <div className="dash-health-legend">
          <div className="dash-legend-row">
            <span className="dash-legend-dot" style={{ background: '#2a7a4b' }} />
            <span>≥ 80% — Ready</span>
          </div>
          <div className="dash-legend-row">
            <span className="dash-legend-dot" style={{ background: '#f59e0b' }} />
            <span>50–79% — In progress</span>
          </div>
          <div className="dash-legend-row">
            <span className="dash-legend-dot" style={{ background: '#dc2626' }} />
            <span>&lt; 50% — Needs work</span>
          </div>
        </div>
      </div>

      <div className="dash-two-col">

        {/* ── Export readiness ──────────────────────────────────────────────── */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">Export Readiness</span>
            <span className={`dash-readiness-badge ${readinessScore === readinessChecks.length ? 'ready' : readinessScore >= 6 ? 'partial' : 'not-ready'}`}>
              {readinessScore}/{readinessChecks.length} checks
            </span>
          </div>
          <div className="dash-checklist">
            {readinessChecks.map((c, i) => (
              <div key={i} className={`dash-check-row ${c.ok ? 'ok' : 'fail'}`}>
                <span className="dash-check-icon">{c.ok ? '✓' : '✗'}</span>
                <span className="dash-check-label">{c.label}</span>
              </div>
            ))}
          </div>
          <button className="dash-action-btn" onClick={() => dispatch({ type: 'SET_VIEW', view: 'export' })}>
            Go to Export →
          </button>
        </div>

        {/* ── Priority sections ─────────────────────────────────────────────── */}
        <div className="dash-card">
          <div className="dash-card-header">
            <span className="dash-card-title">★ Priority Sections</span>
            <span className={`dash-readiness-badge ${priorityProblems.length === 0 ? 'ready' : 'partial'}`}>
              {priorityWithNarrative.length}/{prioritySections.length} complete
            </span>
          </div>
          <div className="dash-priority-list">
            {prioritySections.map(s => {
              const isSkipped = s.status === 'skipped';
              const hasContent = s.hasNarrative;
              const status = isSkipped ? 'skipped' : hasContent ? 'written' : 'empty';
              return (
                <button
                  key={s.id}
                  className={`dash-priority-row ${status}`}
                  onClick={() => isSkipped ? goToSectionList() : goToSection(s.id)}
                  title={isSkipped ? 'Click to go to section list and re-include' : `Click to write section ${s.id}`}
                >
                  <span className="dash-prio-id">{s.id}</span>
                  <span className="dash-prio-title">{s.title}</span>
                  <span className="dash-prio-status">
                    {isSkipped ? '— Skipped' : hasContent ? '✓ Written' : '○ Empty'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>

      {/* ── Global data by group ──────────────────────────────────────────────── */}
      <div className="dash-card">
        <div className="dash-card-header">
          <span className="dash-card-title">Global Data Fields</span>
          <span className="dash-card-count">{totalFilled}/{totalFields} filled · {totalRequiredFilled}/{totalRequired} required</span>
        </div>
        <div className="dash-group-grid">
          {groups.map(g => {
            const pct = g.total === 0 ? 100 : Math.round((g.filled / g.total) * 100);
            const reqOk = g.missingRequired.length === 0;
            return (
              <div
                key={g.id}
                className={`dash-group-card ${!reqOk ? 'has-required-missing' : ''}`}
                onClick={() => goToGroup(g.id)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && goToGroup(g.id)}
              >
                <div className="dash-group-top">
                  <span className="dash-group-icon">{g.icon}</span>
                  <span className="dash-group-label">{g.label}</span>
                  <span className={`dash-group-pct ${pct === 100 ? 'full' : pct >= 60 ? 'partial' : 'low'}`}>{pct}%</span>
                </div>
                <MiniBar filled={g.filled} total={g.total}
                  color={pct === 100 ? '#2a7a4b' : pct >= 60 ? '#f59e0b' : '#dc2626'} />
                {g.missingRequired.length > 0 && (
                  <div className="dash-group-missing-req">
                    {g.missingRequired.map(f => (
                      <span key={f.key} className="dash-missing-chip req">{f.label}</span>
                    ))}
                  </div>
                )}
                {g.missingRequired.length === 0 && g.missingOptional.length > 0 && (
                  <div className="dash-group-missing-opt">
                    <span className="dash-missing-opt-count">{g.missingOptional.length} optional field{g.missingOptional.length !== 1 ? 's' : ''} empty</span>
                  </div>
                )}
                {g.filled === g.total && (
                  <div className="dash-group-complete">✓ All fields complete</div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Section narratives ───────────────────────────────────────────────── */}
      <div className="dash-card">
        <div className="dash-card-header">
          <span className="dash-card-title">Section Narratives</span>
          <span className="dash-card-count">
            {withNarrative.length} written · {withoutNarrative.length} empty · {skipped.length} skipped
          </span>
        </div>

        <div className="dash-section-summary-bar">
          <div className="dash-ssb-written" style={{ flex: withNarrative.length }} title={`${withNarrative.length} written`} />
          <div className="dash-ssb-empty" style={{ flex: withoutNarrative.length }} title={`${withoutNarrative.length} empty`} />
          <div className="dash-ssb-skipped" style={{ flex: skipped.length }} title={`${skipped.length} skipped`} />
        </div>
        <div className="dash-ssb-legend">
          <span className="dash-ssb-leg written">■ {withNarrative.length} written</span>
          <span className="dash-ssb-leg empty">■ {withoutNarrative.length} empty (included)</span>
          <span className="dash-ssb-leg skipped">■ {skipped.length} skipped</span>
        </div>

        {withoutNarrative.length > 0 && (
          <div className="dash-empty-sections">
            <div className="dash-empty-sections-label">Included sections without narrative — click to write:</div>
            <div className="dash-empty-section-chips">
              {withoutNarrative.slice(0, 30).map(s => (
                <button
                  key={s.id}
                  className={`dash-section-chip${s.isPriority ? ' priority' : ''}`}
                  onClick={() => goToSection(s.id)}
                  title={s.title}
                >
                  {s.isPriority ? '★ ' : ''}{s.id}
                </button>
              ))}
              {withoutNarrative.length > 30 && (
                <button className="dash-section-chip more" onClick={goToSectionList}>
                  +{withoutNarrative.length - 30} more →
                </button>
              )}
            </div>
          </div>
        )}

        {withoutNarrative.length === 0 && included.length > 0 && (
          <div className="dash-all-written">
            ✓ All {included.length} included sections have narrative content.
          </div>
        )}
      </div>

    </div>
  );
}
