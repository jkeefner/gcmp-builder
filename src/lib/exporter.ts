// ─── GCMP DOCUMENT EXPORTER ───────────────────────────────────────────────────
// Assembles all parts into a single docx and triggers browser download.

import {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  LevelFormat, TableOfContents,
} from 'docx';
import type { Project, SectionStates } from '../types';
import { C, allBorders, para, divider, pageBreak, heading1, bullet, narrativeBlock } from './docHelpers';
import { buildPartI } from './docSections/partI';
import { buildPartII, buildPartIII } from './docSections/partsIIIII';
import { buildPartIV } from './docSections/partIV';
import { buildPartV, buildPartVI } from './docSections/partsVVI';


// ─── NARRATIVE INJECTOR ───────────────────────────────────────────────────────
// Post-processes the assembled children array.
// After each Heading 2 node whose text starts with a section ID (e.g. "1.1  Cover Page…"),
// inserts the engineer's narrative block if one exists.

function injectNarratives(
  nodes: (Paragraph | Table)[],
  ss: SectionStates
): (Paragraph | Table)[] {
  const result: (Paragraph | Table)[] = [];
  for (const node of nodes) {
    result.push(node);
    // Heading 2 paragraphs have the section number as their first text run
    if (node instanceof Paragraph) {
      const runs = (node as any)._runs ?? (node as any).options?.children ?? [];
      const firstRun = runs[0];
      const text: string = firstRun?.text ?? firstRun?.options?.text ?? '';
      // Match "1.1  Cover Page..." or "4A.2  Waste Rock..."
      const match = text.match(/^([\dA-Z]+\.[\dA-Z]+(?:\.\d+)?)\s/);
      if (match) {
        const secId = match[1];
        const narrative = ss[secId]?.narrative;
        if (narrative && narrative.trim() !== '') {
          for (const nb of narrativeBlock(narrative)) {
            result.push(nb);
          }
        }
      }
    }
  }
  return result;
}

// ─── COVER PAGE ───────────────────────────────────────────────────────────────

function buildCoverPage(p: Project): (Paragraph | Table)[] {
  const d = p.globalData;
  const mineName = d.mine_name || '[Mine Name]';
  const company = d.company_name || '[Company Name]';
  const docNum = d.doc_number || '[Document Number]';
  const rev = d.revision_number || '0.1';
  const revDate = d.revision_date || new Date().toISOString().split('T')[0];
  const preparedBy = d.prepared_by_name ? `${d.prepared_by_name}${d.prepared_by_title ? ', ' + d.prepared_by_title : ''}` : '[Author]';
  const approvedBy = d.approved_by_name ? `${d.approved_by_name}${d.approved_by_title ? ', ' + d.approved_by_title : ''}` : '[Approver]';

  return [
    new Paragraph({ spacing: { before: 1440, after: 200 }, alignment: AlignmentType.CENTER,
      children: [new TextRun({ text: mineName.toUpperCase(), bold: true, size: 52, font: 'Arial', color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
      children: [new TextRun({ text: company, size: 26, font: 'Arial', color: C.blue })] }),
    divider(),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 360, after: 120 },
      children: [new TextRun({ text: 'GROUND CONTROL MANAGEMENT PLAN', bold: true, size: 36, font: 'Arial', color: C.navy })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 },
      children: [new TextRun({ text: docNum, size: 24, font: 'Arial', color: C.gray })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
      children: [new TextRun({ text: `Revision ${rev}  ·  ${revDate}`, size: 24, font: 'Arial', color: C.gray })] }),
    new Table({
      width: { size: 6000, type: WidthType.DXA },
      alignment: AlignmentType.CENTER,
      rows: [
        new TableRow({ children: [
          new TableCell({ borders: allBorders, shading: { fill: C.lightGray, type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 2000, type: WidthType.DXA },
            children: [new Paragraph({ children: [new TextRun({ text: 'Prepared By', bold: true, font: 'Arial', size: 20 })] })] }),
          new TableCell({ borders: allBorders, margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 4000, type: WidthType.DXA },
            children: [new Paragraph({ children: [new TextRun({ text: preparedBy, font: 'Arial', size: 20 })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ borders: allBorders, shading: { fill: C.lightGray, type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 2000, type: WidthType.DXA },
            children: [new Paragraph({ children: [new TextRun({ text: 'Approved By', bold: true, font: 'Arial', size: 20 })] })] }),
          new TableCell({ borders: allBorders, margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 4000, type: WidthType.DXA },
            children: [new Paragraph({ children: [new TextRun({ text: approvedBy, font: 'Arial', size: 20 })] })] }),
        ]}),
        new TableRow({ children: [
          new TableCell({ borders: allBorders, shading: { fill: C.lightGray, type: ShadingType.CLEAR },
            margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 2000, type: WidthType.DXA },
            children: [new Paragraph({ children: [new TextRun({ text: 'MSHA Mine ID', bold: true, font: 'Arial', size: 20 })] })] }),
          new TableCell({ borders: allBorders, margins: { top: 100, bottom: 100, left: 200, right: 200 }, width: { size: 4000, type: WidthType.DXA },
            children: [new Paragraph({ children: [new TextRun({ text: d.msha_id || '[MSHA ID]', font: 'Arial', size: 20, color: d.msha_id ? '000000' : C.gray })] })] }),
        ]}),
      ],
    }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 400, after: 120 },
      children: [new TextRun({ text: 'Prepared by Keefner Mining & Geotech LLC', size: 18, font: 'Arial', color: C.gray, italics: true })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
      children: [new TextRun({ text: 'Based on CSIRO LOP Guidelines · WA DMIRS Ground Control Guideline · MSHA 30 CFR', size: 18, font: 'Arial', color: C.gray, italics: true })] }),
    pageBreak(),
  ];
}

// ─── REVISION TABLE ───────────────────────────────────────────────────────────

function buildRevisionTable(p: Project): (Paragraph | Table)[] {
  const d = p.globalData;
  return [
    heading1('REVISION HISTORY'),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [1200, 1400, 3360, 2000, 1400],
      rows: [
        new TableRow({ children: [
          ...['Rev', 'Date', 'Description', 'Prepared By', 'Approved By'].map(h =>
            new TableCell({ borders: allBorders, shading: { fill: C.navy, type: ShadingType.CLEAR },
              margins: { top: 80, bottom: 80, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: h, bold: true, font: 'Arial', size: 18, color: C.white })] })] })
          ),
        ]}),
        new TableRow({ children: [
          new TableCell({ borders: allBorders, shading: { fill: C.lightGray, type: ShadingType.CLEAR }, margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: d.revision_number || '0.1', font: 'Arial', size: 18 })] })] }),
          new TableCell({ borders: allBorders, margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: d.revision_date || '', font: 'Arial', size: 18 })] })] }),
          new TableCell({ borders: allBorders, margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Initial Issue', font: 'Arial', size: 18 })] })] }),
          new TableCell({ borders: allBorders, margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: d.prepared_by_name || '', font: 'Arial', size: 18 })] })] }),
          new TableCell({ borders: allBorders, margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: d.approved_by_name || '', font: 'Arial', size: 18 })] })] }),
        ]}),
      ],
    }),
    para(''),
    pageBreak(),
  ];
}

// ─── OMISSION SUMMARY ─────────────────────────────────────────────────────────
// Lists all skipped sections at the start of the document.

function buildOmissionSummary(p: Project): (Paragraph | Table)[] | [] {
  const skipped = Object.entries(p.sectionStates)
    .filter(([, v]) => v.status === 'skipped')
    .map(([id]) => id)
    .sort();

  if (skipped.length === 0) return [];

  return [
    heading1('SCOPE NOTES — OMITTED SECTIONS'),
    para('The following sections were intentionally excluded from this GCMP for this operation. Each omitted section includes a note in the document body explaining the exclusion.'),
    para(''),
    ...skipped.map(id => bullet(`Section ${id} — marked not applicable`)),
    para(''),
    para('If any of the above sections become applicable in future (change in mine plan, new infrastructure, regulatory requirement), this GCMP must be revised accordingly.', { italic: true, color: C.gray }),
    para(''),
    pageBreak(),
  ];
}

// ─── MAIN EXPORT FUNCTION ─────────────────────────────────────────────────────

export async function exportGCMP(project: Project): Promise<void> {
  const d = project.globalData;
  const ss = project.sectionStates;

  const rawChildren = [
    ...buildCoverPage(project),
    // TOC
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { before: 360, after: 60 },
      children: [new TextRun({ text: 'TABLE OF CONTENTS', bold: true, size: 32, font: 'Arial', color: C.navy })] }),
    divider(),
    para(''),
    new TableOfContents('Table of Contents', { hyperlink: true, headingStyleRange: '1-3' }),
    para(''),
    para('Right-click the table of contents in Word and select \'Update Field\' → \'Update entire table\' to populate page numbers.', { italic: true, color: C.gray, size: 18 }),
    pageBreak(),
    ...buildRevisionTable(project),
    ...buildOmissionSummary(project),
    ...buildPartI(d, ss),
    ...buildPartII(d, ss),
    ...buildPartIII(d, ss),
    ...buildPartIV(d, ss),
    ...buildPartV(d, ss),
    ...buildPartVI(d, ss),
  ];

  const children = injectNarratives(rawChildren, ss);

  const doc = new Document({
    features: { updateFields: true },
    styles: {
      default: { document: { run: { font: 'Arial', size: 22 } } },
      paragraphStyles: [
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 32, bold: true, font: 'Arial', color: C.navy },
          paragraph: { spacing: { before: 360, after: 180 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 26, bold: true, font: 'Arial', color: C.blue },
          paragraph: { spacing: { before: 280, after: 140 }, outlineLevel: 1 } },
        { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 22, bold: true, font: 'Arial', color: C.navy },
          paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
      ],
    },
    numbering: {
      config: [{
        reference: 'bullets',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } }, run: { font: 'Arial', size: 22 } } }],
      }],
    },
    sections: [{
      properties: {
        page: { size: { width: 12240, height: 15840 }, margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } },
      },
      children,
    }],
  });

  const blob = await Packer.toBlob(doc);
  const mineName = (d.mine_name || 'GCMP').replace(/[^a-zA-Z0-9_-]/g, '_');
  const docNum = d.doc_number ? `_${d.doc_number}` : '';
  const rev = d.revision_number ? `_Rev${d.revision_number}` : '';
  const filename = `${mineName}${docNum}${rev}_GCMP.docx`;

  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
