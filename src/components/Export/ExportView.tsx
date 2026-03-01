import { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { exportGCMP } from '../../lib/exporter';

export function ExportView() {
  const { state } = useProject();
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const project = state.projects.find(p => p.id === state.activeProjectId);
  if (!project) return null;

  const d = project.globalData;
  const ss = project.sectionStates;

  const totalSections = 80;
  const skippedCount = Object.values(ss).filter(s => s.status === 'skipped').length;
  const includedCount = totalSections - skippedCount;

  const filledFields = Object.values(d).filter(v => v && v.toString().trim() !== '').length;
  const narrativeCount = Object.values(ss).filter(s => s.narrative && s.narrative.trim() !== '').length;
  const totalFields = 65;
  const fieldsPct = Math.round((filledFields / totalFields) * 100);

  const warnings: string[] = [];
  if (!d.mine_name) warnings.push('Mine name is not entered — will show placeholder in document');
  if (!d.doc_number) warnings.push('Document number is not entered');
  if (!d.prepared_by_name) warnings.push('Prepared By is not entered');
  if (!d.approved_by_name) warnings.push('Approved By is not entered');
  if (!d.geotech_engineer) warnings.push('Responsible Geotechnical Engineer is not entered');

  async function handleExport() {
    setExporting(true);
    setError(null);
    setDone(false);
    try {
      await exportGCMP(project!);
      setDone(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Export failed');
    } finally {
      setExporting(false);
    }
  }

  return (
    <div className="export-view">
      <div className="export-header">
        <h2>Export GCMP Document</h2>
        <p className="export-subtitle">
          Generates a formatted Word document (.docx) containing all included sections with guidance notes,
          template language, and your entered global data pre-populated throughout.
        </p>
      </div>

      {/* Project summary */}
      <div className="export-summary-grid">
        <div className="export-summary-card">
          <div className="summary-value">{includedCount}</div>
          <div className="summary-label">Sections included</div>
        </div>
        <div className="export-summary-card skipped">
          <div className="summary-value">{skippedCount}</div>
          <div className="summary-label">Sections skipped</div>
        </div>
        <div className="export-summary-card">
          <div className="summary-value">{fieldsPct}%</div>
          <div className="summary-label">Global data filled</div>
        </div>
        <div className="export-summary-card">
          <div className="summary-value">{filledFields}/{totalFields}</div>
          <div className="summary-label">Fields entered</div>
        </div>
        <div className="export-summary-card">
          <div className="summary-value">{narrativeCount}</div>
          <div className="summary-label">Sections with narrative</div>
        </div>
      </div>

      {/* Document info */}
      <div className="export-doc-info">
        <h3>Document Details</h3>
        <table className="doc-info-table">
          <tbody>
            <tr><td>Mine Name</td><td>{d.mine_name || <span className="placeholder">[not entered]</span>}</td></tr>
            <tr><td>Company</td><td>{d.company_name || <span className="placeholder">[not entered]</span>}</td></tr>
            <tr><td>Document Number</td><td>{d.doc_number || <span className="placeholder">[not entered]</span>}</td></tr>
            <tr><td>Revision</td><td>{d.revision_number || <span className="placeholder">[not entered]</span>}</td></tr>
            <tr><td>Revision Date</td><td>{d.revision_date || <span className="placeholder">[not entered]</span>}</td></tr>
            <tr><td>Prepared By</td><td>{d.prepared_by_name || <span className="placeholder">[not entered]</span>}</td></tr>
            <tr><td>Approved By</td><td>{d.approved_by_name || <span className="placeholder">[not entered]</span>}</td></tr>
          </tbody>
        </table>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="export-warnings">
          <h3>⚠ Incomplete Fields</h3>
          <p>These fields will show placeholders in the document. You can still export — fill them in before sending to a client.</p>
          <ul>
            {warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}

      {/* What's included */}
      <div className="export-contents">
        <h3>What's in this export</h3>
        <ul className="contents-list">
          <li>✓ Cover page with mine name, company, document control fields, and MSHA ID</li>
          <li>✓ Revision history table</li>
          <li>✓ Table of contents (update in Word after opening)</li>
          <li>✓ Omission summary — list of all skipped sections with notes</li>
          <li>✓ All {includedCount} included sections across Parts I–VI with full guidance notes</li>
          <li>✓ Template language (green boxes) with your global data pre-substituted</li>
          <li>✓ Validation checklists on all 6 priority sections (★)</li>
          <li>✓ MSHA 30 CFR citations on applicable sections</li>
          <li>✓ Action tables for multi-value data (joint sets, design sectors, rock mass parameters)</li>
          <li>✓ Public data lookup references (NOAA Atlas 14, USGS Hazard Tool)</li>
          {skippedCount > 0 && <li>✓ Omission stubs for {skippedCount} skipped sections with explanatory notes</li>}
        </ul>
        <p className="export-note">
          <strong>Phase 3 document.</strong> Each section now has a narrative editor — use ✎ Write in the Section Navigator to author section bodies. Narratives appear in the export above the template language guidance box. Sections without a narrative will show only the template language and guidance notes.
        </p>
      </div>

      {/* Export button */}
      <div className="export-action">
        {done && (
          <div className="export-success">
            ✓ Document generated successfully — check your downloads folder for{' '}
            <strong>{(d.mine_name || 'GCMP').replace(/[^a-zA-Z0-9_-]/g, '_')}{d.doc_number ? `_${d.doc_number}` : ''}{d.revision_number ? `_Rev${d.revision_number}` : ''}_GCMP.docx</strong>
          </div>
        )}
        {error && (
          <div className="export-error">
            ✗ Export error: {error}
          </div>
        )}
        <button
          className="export-btn"
          onClick={handleExport}
          disabled={exporting}
        >
          {exporting ? (
            <>
              <span className="spinner" /> Generating document…
            </>
          ) : (
            <>
              ⬇ Export GCMP to Word (.docx)
            </>
          )}
        </button>
      </div>
    </div>
  );
}
