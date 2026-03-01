// ─── DOC HELPERS ─────────────────────────────────────────────────────────────
// All docx primitives used throughout the document generator.
// Ported from gcmp_library.js Phase 1 generator to TypeScript ES modules.

import {
  Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  LevelFormat, PageBreak, VerticalAlign, TableOfContents,
} from 'docx';
import type { GlobalData } from '../types';

// ─── COLORS ───────────────────────────────────────────────────────────────────

export const C = {
  navy:      '1F3864',
  blue:      '2E75B6',
  lightBlue: 'D6E4F0',
  amber:     'F4B942',
  amberBg:   'FFF3CD',
  green:     '375623',
  greenBg:   'E2EFDA',
  red:       'C00000',
  gray:      '595959',
  lightGray: 'F2F2F2',
  white:     'FFFFFF',
} as const;

// ─── BORDERS ─────────────────────────────────────────────────────────────────

const thin = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
export const allBorders = { top: thin, bottom: thin, left: thin, right: thin };

// ─── TEMPLATE VARIABLE SUBSTITUTION ──────────────────────────────────────────

export function fill(template: string, d: GlobalData): string {
  const v = (val: string, fallback: string) => val || fallback;
  return template
    .replace(/\[MINE_NAME\]/g,          v(d.mine_name,          '[Mine Name]'))
    .replace(/\[COMPANY_NAME\]/g,        v(d.company_name,        '[Company Name]'))
    .replace(/\[PARENT_COMPANY\]/g,      v(d.parent_company,      '[Parent Company]'))
    .replace(/\[SITE_LOCATION\]/g,       v(d.site_location,       '[Site Location]'))
    .replace(/\[COMMODITY\]/g,           v(d.commodity,           '[Commodity]'))
    .replace(/\[DOCUMENT_NUMBER\]/g,     v(d.doc_number,          '[Document Number]'))
    .replace(/\[REVISION_NUMBER\]/g,     v(d.revision_number,     '[Rev X]'))
    .replace(/\[REVISION_DATE\]/g,       v(d.revision_date,       '[Date]'))
    .replace(/\[PREPARED_BY_NAME\]/g,    v(d.prepared_by_name,    '[Author]'))
    .replace(/\[PREPARED_BY_TITLE\]/g,   v(d.prepared_by_title,   '[Title]'))
    .replace(/\[APPROVED_BY_NAME\]/g,    v(d.approved_by_name,    '[Approver]'))
    .replace(/\[APPROVED_BY_TITLE\]/g,   v(d.approved_by_title,   '[Title]'))
    .replace(/\[MINE_MANAGER\]/g,        v(d.mine_manager,        '[Mine Manager]'))
    .replace(/\[GEOTECH_ENGINEER\]/g,    v(d.geotech_engineer,    '[RGE Name, P.E.]'))
    .replace(/\[GEOTECH_ENGINEER_TITLE\]/g, 'Responsible Geotechnical Engineer')
    .replace(/\[PITS_IN_SCOPE\]/g,       v(d.pits_in_scope,       '[Pits in Scope]'))
    .replace(/\[MINE_LIFE\]/g,           v(d.mine_life,           '[Mine Life]'))
    .replace(/\[REVIEW_FREQUENCY\]/g,    v(d.scheduled_review_freq,'annual'))
    .replace(/\[FEDERAL_REGULATION\]/g,  v(d.federal_regulation,  '[Federal Regulation]'))
    .replace(/\[STATE_REGULATION\]/g,    v(d.state_regulation,    '[State Regulation]'))
    .replace(/\[MSHA_ID\]/g,             v(d.msha_id,             '[MSHA Mine ID]'))
    .replace(/\[MINE_STAGE\]/g,          v(d.mine_stage,          '[Mine Stage]'))
    .replace(/\[MEAN_ANNUAL_PRECIP\]/g,  v(d.mean_annual_precip,  '[MAP]'))
    .replace(/\[SEISMIC_ZONE\]/g,        v(d.seismic_zone,        '[Seismic Zone]'))
    .replace(/\[OVERALL_FOS_STATIC\]/g,  v(d.overall_fos_static,  '[FoS]'))
    .replace(/\[CLOSURE_SLOPE_CRITERIA\]/g, v(d.closure_slope_criteria, '[Closure Criteria]'))
    .replace(/\[POST_CLOSURE_PARTY\]/g,  v(d.post_closure_party,  '[Post-Closure Party]'))
    .replace(/\[ASSEMBLY_POINTS\]/g,     v(d.assembly_points,     '[Assembly Points]'));
}

// ─── BASIC ELEMENTS ───────────────────────────────────────────────────────────

export function para(text: string, opts: {
  bold?: boolean; italic?: boolean; color?: string; size?: number;
  align?: (typeof AlignmentType)[keyof typeof AlignmentType];
  spacing?: { before?: number; after?: number };
  indent?: { left?: number };
} = {}): Paragraph {
  const { bold, italic, color, size, align, spacing, indent } = opts;
  return new Paragraph({
    alignment: align || AlignmentType.LEFT,
    spacing: spacing || { after: 120 },
    indent,
    children: [new TextRun({
      text,
      bold: bold || false,
      italics: italic || false,
      color: color || '000000',
      size: size || 22,
      font: 'Arial',
    })],
  });
}

export function heading1(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_1,
    spacing: { before: 360, after: 180 },
    children: [new TextRun({ text, bold: true, size: 32, font: 'Arial', color: C.navy })],
  });
}

export function heading2(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, bold: true, size: 26, font: 'Arial', color: C.blue })],
  });
}

export function heading3(text: string): Paragraph {
  return new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 200, after: 100 },
    children: [new TextRun({ text, bold: true, size: 22, font: 'Arial', color: C.navy })],
  });
}

export function divider(): Paragraph {
  return new Paragraph({
    spacing: { before: 60, after: 60 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: C.blue, space: 1 } },
    children: [],
  });
}

export function pageBreak(): Paragraph {
  return new Paragraph({ children: [new PageBreak()] });
}

export function bullet(text: string, boldPrefix: string | null = null): Paragraph {
  const runs: TextRun[] = [];
  if (boldPrefix) {
    runs.push(new TextRun({ text: boldPrefix + ' ', bold: true, font: 'Arial', size: 22 }));
  }
  runs.push(new TextRun({ text, font: 'Arial', size: 22 }));
  return new Paragraph({
    numbering: { reference: 'bullets', level: 0 },
    spacing: { after: 80 },
    children: runs,
  });
}

// ─── COLORED BOX HELPERS ──────────────────────────────────────────────────────

function colorBox(
  label: string,
  labelColor: string,
  bgColor: string,
  borderColor: string,
  lines: string[]
): Table {
  const rows: TableRow[] = [
    new TableRow({
      children: [new TableCell({
        borders: allBorders,
        shading: { fill: bgColor, type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 60, left: 160, right: 160 },
        width: { size: 9360, type: WidthType.DXA },
        children: [new Paragraph({
          spacing: { after: 60 },
          children: [new TextRun({
            text: label,
            bold: true,
            color: labelColor,
            font: 'Arial',
            size: 20,
          })],
        })],
      })],
    }),
    ...lines.map(line => new TableRow({
      children: [new TableCell({
        borders: allBorders,
        shading: { fill: bgColor, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 40, left: 160, right: 160 },
        width: { size: 9360, type: WidthType.DXA },
        children: [new Paragraph({
          spacing: { after: 60 },
          children: [new TextRun({ text: '• ' + line, font: 'Arial', size: 20, color: '000000' })],
        })],
      })],
    })),
  ];
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: {
      top: { style: BorderStyle.SINGLE, size: 4, color: borderColor },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: borderColor },
      left: { style: BorderStyle.SINGLE, size: 8, color: borderColor },
      right: { style: BorderStyle.SINGLE, size: 4, color: borderColor },
    },
    rows,
  });
}

export function guidanceBox(title: string, lines: string[]): Table {
  return colorBox(`⚙ GUIDANCE — ${title}`, C.blue, C.lightBlue, C.blue, lines);
}

export function actionBox(title: string, lines: string[]): Table {
  return colorBox(`⚡ ACTION REQUIRED — ${title}`, 'C07000', C.amberBg, C.amber, lines);
}

export function templateBox(text: string): Table {
  const rows: TableRow[] = [
    new TableRow({
      children: [new TableCell({
        borders: allBorders,
        shading: { fill: C.greenBg, type: ShadingType.CLEAR },
        margins: { top: 80, bottom: 60, left: 160, right: 160 },
        width: { size: 9360, type: WidthType.DXA },
        children: [new Paragraph({
          spacing: { after: 40 },
          children: [new TextRun({ text: '📝 TEMPLATE LANGUAGE — edit to suit your site:', bold: true, font: 'Arial', size: 18, color: C.green })],
        })],
      })],
    }),
    new TableRow({
      children: [new TableCell({
        borders: allBorders,
        shading: { fill: C.greenBg, type: ShadingType.CLEAR },
        margins: { top: 60, bottom: 80, left: 160, right: 160 },
        width: { size: 9360, type: WidthType.DXA },
        children: [new Paragraph({
          spacing: { after: 60 },
          children: [new TextRun({ text, font: 'Arial', size: 20, italics: true, color: C.green })],
        })],
      })],
    }),
  ];
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 4, color: C.green },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: C.green },
      left:   { style: BorderStyle.SINGLE, size: 8, color: C.green },
      right:  { style: BorderStyle.SINGLE, size: 4, color: C.green },
    },
    rows,
  });
}

// ─── META TABLE ───────────────────────────────────────────────────────────────

export function metaTable(rows_data: [string, string, string][], d?: GlobalData): Table {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [3000, 3000, 3360],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: allBorders,
            shading: { fill: C.navy, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Field', bold: true, font: 'Arial', size: 18, color: C.white })] })],
          }),
          new TableCell({
            borders: allBorders,
            shading: { fill: C.navy, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Default / Example', bold: true, font: 'Arial', size: 18, color: C.white })] })],
          }),
          new TableCell({
            borders: allBorders,
            shading: { fill: C.navy, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 120, right: 120 },
            children: [new Paragraph({ children: [new TextRun({ text: 'Entered Value', bold: true, font: 'Arial', size: 18, color: C.white })] })],
          }),
        ],
      }),
      ...rows_data.map(([label, defaultVal, fieldKey]) => {
        const enteredValue = d ? (d[fieldKey as keyof GlobalData] || '') : '';
        return new TableRow({
          children: [
            new TableCell({
              borders: allBorders,
              shading: { fill: C.lightGray, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: label, font: 'Arial', size: 18, bold: true })] })],
            }),
            new TableCell({
              borders: allBorders,
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: defaultVal, font: 'Arial', size: 18, color: C.gray, italics: true })] })],
            }),
            new TableCell({
              borders: allBorders,
              shading: { fill: enteredValue ? C.lightBlue : C.white, type: ShadingType.CLEAR },
              margins: { top: 60, bottom: 60, left: 120, right: 120 },
              children: [new Paragraph({ children: [new TextRun({ text: enteredValue, font: 'Arial', size: 18, color: enteredValue ? C.navy : C.gray })] })],
            }),
          ],
        });
      }),
    ],
  });
}

// ─── SECTION HEADER ───────────────────────────────────────────────────────────

export function sectionHeader(
  num: string,
  title: string,
  applicability: string,
  crossRefs: string
): (Paragraph | Table)[] {
  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 280, after: 80 },
      children: [
        new TextRun({ text: `${num}  ${title}`, bold: true, size: 26, font: 'Arial', color: C.blue }),
      ],
    }),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      columnWidths: [4680, 4680],
      rows: [new TableRow({
        children: [
          new TableCell({
            borders: allBorders,
            shading: { fill: C.lightBlue, type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [
              new Paragraph({ children: [new TextRun({ text: 'Applicability: ', bold: true, font: 'Arial', size: 18, color: C.blue }), new TextRun({ text: applicability, font: 'Arial', size: 18 })] }),
            ],
          }),
          new TableCell({
            borders: allBorders,
            shading: { fill: C.lightBlue, type: ShadingType.CLEAR },
            margins: { top: 60, bottom: 60, left: 120, right: 120 },
            children: [
              new Paragraph({ children: [new TextRun({ text: 'Cross-References: ', bold: true, font: 'Arial', size: 18, color: C.blue }), new TextRun({ text: crossRefs, font: 'Arial', size: 18 })] }),
            ],
          }),
        ],
      })],
    }),
    para(''),
  ];
}

// ─── PART HEADING ─────────────────────────────────────────────────────────────

export function partHeading(num: string, title: string, subtitle: string): (Paragraph | Table)[] {
  return [
    pageBreak(),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      rows: [new TableRow({
        children: [new TableCell({
          borders: allBorders,
          shading: { fill: C.navy, type: ShadingType.CLEAR },
          margins: { top: 200, bottom: 200, left: 300, right: 300 },
          width: { size: 9360, type: WidthType.DXA },
          children: [
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
              children: [new TextRun({ text: `PART ${num}`, bold: true, font: 'Arial', size: 20, color: '7AA0CC', allCaps: true })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
              children: [new TextRun({ text: title, bold: true, font: 'Arial', size: 32, color: C.white })] }),
            new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 60 },
              children: [new TextRun({ text: subtitle, font: 'Arial', size: 20, color: '7AA0CC', italics: true })] }),
          ],
        })],
      })],
    }),
    para(''),
  ];
}

// ─── PRIORITY BADGE ───────────────────────────────────────────────────────────

export function priorityBadge(reason: string): Table {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 6, color: C.red },
      bottom: { style: BorderStyle.SINGLE, size: 6, color: C.red },
      left:   { style: BorderStyle.SINGLE, size: 12, color: C.red },
      right:  { style: BorderStyle.SINGLE, size: 6, color: C.red },
    },
    rows: [new TableRow({
      children: [new TableCell({
        borders: allBorders,
        shading: { fill: 'FDF0EF', type: ShadingType.CLEAR },
        margins: { top: 100, bottom: 100, left: 200, right: 200 },
        children: [new Paragraph({
          children: [
            new TextRun({ text: '★ PRIORITY SECTION — ', bold: true, font: 'Arial', size: 20, color: C.red }),
            new TextRun({ text: reason, font: 'Arial', size: 20, color: C.red }),
          ],
        })],
      })],
    })],
  });
}

// ─── CHECKLIST BOX ────────────────────────────────────────────────────────────

export function checklistBox(title: string, items: string[]): Table {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 4, color: C.amber },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: C.amber },
      left:   { style: BorderStyle.SINGLE, size: 8, color: C.amber },
      right:  { style: BorderStyle.SINGLE, size: 4, color: C.amber },
    },
    rows: [
      new TableRow({
        children: [new TableCell({
          borders: allBorders,
          shading: { fill: C.amberBg, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 60, left: 160, right: 160 },
          children: [new Paragraph({ children: [new TextRun({ text: `✓ VALIDATION CHECKLIST — ${title}`, bold: true, font: 'Arial', size: 20, color: 'C07000' })] })],
        })],
      }),
      ...items.map((item, i) => new TableRow({
        children: [new TableCell({
          borders: allBorders,
          shading: { fill: C.amberBg, type: ShadingType.CLEAR },
          margins: { top: 50, bottom: 50, left: 160, right: 160 },
          children: [new Paragraph({ children: [new TextRun({ text: `${i + 1}.  ☐  ${item}`, font: 'Arial', size: 19 })] })],
        })],
      })),
    ],
  });
}

// ─── INFRA CHOICE BOX ─────────────────────────────────────────────────────────

export function infraChoiceBox(infraType: string): Table {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    columnWidths: [4680, 4680],
    rows: [
      new TableRow({
        children: [
          new TableCell({
            borders: allBorders,
            shading: { fill: C.lightBlue, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 200, right: 200 },
            children: [
              new Paragraph({ children: [new TextRun({ text: 'OPTION A', bold: true, font: 'Arial', size: 20, color: C.blue })] }),
              new Paragraph({ children: [new TextRun({ text: 'Manage within this GCMP', font: 'Arial', size: 20, bold: true })] }),
              para(`Select if ${infraType} stability management is to be documented in full within this GCMP. The application will add a complete chapter for this infrastructure type.`),
            ],
          }),
          new TableCell({
            borders: allBorders,
            shading: { fill: C.lightGray, type: ShadingType.CLEAR },
            margins: { top: 80, bottom: 80, left: 200, right: 200 },
            children: [
              new Paragraph({ children: [new TextRun({ text: 'OPTION B', bold: true, font: 'Arial', size: 20, color: C.gray })] }),
              new Paragraph({ children: [new TextRun({ text: 'Separate management plan (cross-reference)', font: 'Arial', size: 20, bold: true })] }),
              para(`Select if ${infraType} is managed under a separate dedicated plan. This section becomes a one-paragraph cross-reference stub.`),
            ],
          }),
        ],
      }),
    ],
  });
}

// ─── LOOKUP BOX ──────────────────────────────────────────────────────────────

export function lookupBox(fields: { label: string; url: string; description: string }[]): Table {
  return new Table({
    width: { size: 9360, type: WidthType.DXA },
    borders: {
      top:    { style: BorderStyle.SINGLE, size: 4, color: C.green },
      bottom: { style: BorderStyle.SINGLE, size: 4, color: C.green },
      left:   { style: BorderStyle.SINGLE, size: 8, color: C.green },
      right:  { style: BorderStyle.SINGLE, size: 4, color: C.green },
    },
    rows: [
      new TableRow({
        children: [new TableCell({
          borders: allBorders,
          shading: { fill: C.greenBg, type: ShadingType.CLEAR },
          margins: { top: 80, bottom: 60, left: 160, right: 160 },
          children: [new Paragraph({ children: [new TextRun({ text: '🔍 PUBLIC DATA LOOK-UP REFERENCES', bold: true, font: 'Arial', size: 18, color: C.green })] })],
        })],
      }),
      ...fields.map(f => new TableRow({
        children: [new TableCell({
          borders: allBorders,
          shading: { fill: C.greenBg, type: ShadingType.CLEAR },
          margins: { top: 50, bottom: 50, left: 160, right: 160 },
          children: [
            new Paragraph({ children: [new TextRun({ text: f.label + ' — ', bold: true, font: 'Arial', size: 18, color: C.blue }), new TextRun({ text: f.url, font: 'Arial', size: 16, color: C.blue })] }),
            new Paragraph({ spacing: { after: 40 }, children: [new TextRun({ text: f.description, font: 'Arial', size: 18, italics: true, color: C.gray })] }),
          ],
        })],
      })),
    ],
  });
}

// ─── OMISSION STUB ────────────────────────────────────────────────────────────
// Replaces full section content when section is skipped.

export function omissionStub(sectionId: string, sectionTitle: string, reason?: string): (Paragraph | Table)[] {
  return [
    new Paragraph({
      heading: HeadingLevel.HEADING_2,
      spacing: { before: 280, after: 80 },
      children: [new TextRun({ text: `${sectionId}  ${sectionTitle}  [OMITTED]`, bold: true, size: 26, font: 'Arial', color: C.gray })],
    }),
    new Table({
      width: { size: 9360, type: WidthType.DXA },
      borders: {
        top:    { style: BorderStyle.SINGLE, size: 4, color: C.amber },
        bottom: { style: BorderStyle.SINGLE, size: 4, color: C.amber },
        left:   { style: BorderStyle.SINGLE, size: 8, color: C.amber },
        right:  { style: BorderStyle.SINGLE, size: 4, color: C.amber },
      },
      rows: [new TableRow({
        children: [new TableCell({
          borders: allBorders,
          shading: { fill: C.amberBg, type: ShadingType.CLEAR },
          margins: { top: 100, bottom: 100, left: 200, right: 200 },
          children: [new Paragraph({
            children: [
              new TextRun({ text: `⚠ SECTION OMITTED — ${sectionId} ${sectionTitle}. `, bold: true, font: 'Arial', size: 20, color: 'C07000' }),
              new TextRun({ text: reason || 'This section was marked as not applicable to this operation.', font: 'Arial', size: 20, italics: true }),
              new TextRun({ text: ' If this section is subsequently required, the GCMP must be revised accordingly and re-approved.', font: 'Arial', size: 20, color: C.gray }),
            ],
          })],
        })],
      })],
    }),
    para(''),
    divider(),
  ];
}

// ─── TYPE ALIAS ───────────────────────────────────────────────────────────────

export type DocNode = Paragraph | Table;
