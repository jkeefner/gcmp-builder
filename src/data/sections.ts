// ─── SECTION LIBRARY DATA ────────────────────────────────────────────────────
// The complete GCMP section hierarchy from Phase 1.
// Each section drives: navigation, include/skip, validation, and document output.

export type SectionApplicability = 'recommended' | 'conditional' | 'optional';

export interface Section {
  id: string;                     // e.g. "5.3"
  title: string;
  applicability: SectionApplicability;
  applicabilityNote: string;
  isPriority: boolean;            // Phase 5 priority sections get validation checklists
  crossRefs: string[];
  mshaCfr?: string;
}

export interface Chapter {
  id: string;                     // e.g. "5"
  title: string;
  purpose: string;
  sections: Section[];
}

export interface Part {
  num: string;                    // "I" through "VI"
  title: string;
  subtitle: string;
  chapters: Chapter[];
}

// ─── SECTION LIBRARY ─────────────────────────────────────────────────────────

export const SECTION_LIBRARY: Part[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // PART I — DOCUMENT ADMINISTRATION AND SITE CONTEXT
  // ═══════════════════════════════════════════════════════════════════════════
  {
    num: 'I',
    title: 'Document Administration & Site Context',
    subtitle: 'Who, what, where, and why — the foundation that frames everything that follows',
    chapters: [
      {
        id: '1',
        title: 'Document Administration',
        purpose: 'Establishes document identity, version control, and distribution. All fields populate from the global data store.',
        sections: [
          { id: '1.1', title: 'Cover Page and Document Identification', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['1.2', '2.1'] },
          { id: '1.2', title: 'Revision History and Document Control', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['1.1', '13.1'], mshaCfr: '30 CFR 56.18002 — record keeping' },
          { id: '1.3', title: 'Distribution List and Acknowledgment', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['4.1'] },
        ],
      },
      {
        id: '2',
        title: 'Purpose, Scope and References',
        purpose: 'Defines what the GCMP covers, the regulatory context, and all standards and documents it draws on.',
        sections: [
          { id: '2.1', title: 'Purpose and Objectives', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['2.2', '2.3'] },
          { id: '2.2', title: 'Scope', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['4A.1', '4A.2', '4A.3', '4A.4'] },
          { id: '2.3', title: 'Regulatory Framework and Compliance', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['2.4'], mshaCfr: '30 CFR 56.3130–56.3201, 30 CFR Part 50' },
          { id: '2.4', title: 'References and Related Documents', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['2.3'] },
        ],
      },
      {
        id: '3',
        title: 'Site Description and Mine Background',
        purpose: 'Documents the physical and operational context — location, climate, history, and previous investigations.',
        sections: [
          { id: '3.1', title: 'Mine Location and Site Setting', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['3.2', '6.2', '6.4', '6.5'] },
          { id: '3.2', title: 'Climate and Hydrology Overview', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['6.4', '6.5', '7.1', '9.1', '10.2'] },
          { id: '3.3', title: 'Mine History and Previous Geotechnical Studies', applicability: 'recommended', applicabilityNote: 'Required — existing operations; Conditional — greenfields', isPriority: false, crossRefs: ['6.1'] },
        ],
      },
      {
        id: '4',
        title: 'Roles, Responsibilities and Competency',
        purpose: 'Defines who is responsible for ground control — sign-off authorities, stop-work authority, contractor accountability, and competency requirements.',
        sections: [
          { id: '4.1', title: 'Organizational Structure and Ground Control Responsibilities', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: true, crossRefs: ['4.2', '13.1', '14.1'], mshaCfr: '30 CFR 56.3130 — competent person; 30 CFR 56.18002 — self-inspection authority' },
          { id: '4.2', title: 'Competency Requirements', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['4.1', '13.3'] },
        ],
      },
      {
        id: '4A',
        title: 'Geotechnical Infrastructure In Scope',
        purpose: 'Identifies all geotechnical infrastructure at the mine site and establishes whether each type is managed within this GCMP or by a separate plan.',
        sections: [
          { id: '4A.1', title: 'Pit Slopes and Associated Structures', applicability: 'recommended', applicabilityNote: 'All operations — primary subject of this GCMP', isPriority: false, crossRefs: ['2.2', 'Chapters 5–11', '14'] },
          { id: '4A.2', title: 'Waste Rock Dumps and Overburden Stockpiles', applicability: 'conditional', applicabilityNote: 'Include if waste dumps are present at the operation', isPriority: false, crossRefs: ['4A.1'], mshaCfr: '30 CFR 56.3200 — stability of waste piles' },
          { id: '4A.3', title: 'Heap Leach Facilities', applicability: 'conditional', applicabilityNote: 'Include if heap leach pad or valley-fill facility is present or planned', isPriority: false, crossRefs: ['4A.1'], mshaCfr: '43 CFR Part 3809 (BLM — federal lands)' },
          { id: '4A.4', title: 'Tailings Storage Facilities', applicability: 'conditional', applicabilityNote: 'Include if TSF is present or planned — separate plan strongly recommended per GISTM 2020', isPriority: false, crossRefs: ['4A.1'], mshaCfr: '30 CFR 77 / 57 — tailings impoundments; state environmental agency' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART II — TECHNICAL BASIS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    num: 'II',
    title: 'Technical Basis',
    subtitle: 'The geotechnical model and all data that underpins slope design and operational decisions',
    chapters: [
      {
        id: '5',
        title: 'Geotechnical Model',
        purpose: 'Documents the integrated geotechnical model — the technical core of the GCMP. CSIRO LOP dedicates six chapters (3–8) to the inputs that build this model.',
        sections: [
          { id: '5.1', title: 'Geotechnical Model Overview and Data Confidence', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['5.2', '5.3', '5.4', '5.5', 'Chapter 6'] },
          { id: '5.2', title: 'Regional and Site Geology', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['5.3', '5.4', '5.5', 'Chapter 6'] },
          { id: '5.3', title: 'Structural Geology and Discontinuity Characterization', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: true, crossRefs: ['5.4', '6.2', '6.3'] },
          { id: '5.4', title: 'Rock Mass Characterization', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: true, crossRefs: ['5.3', '6.2', '6.3'] },
          { id: '5.5', title: 'Hydrogeological Model and Groundwater Conditions', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['9.1', '9.2', '8.6'] },
          { id: '5.6', title: 'In Situ Stress', applicability: 'conditional', applicabilityNote: 'Required for deep pits (>400m), weak rock, or stress-driven failure mechanisms; Recommended for all operations', isPriority: false, crossRefs: ['5.4', '6.3'] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART III — DESIGN
  // ═══════════════════════════════════════════════════════════════════════════
  {
    num: 'III',
    title: 'Design',
    subtitle: 'Slope design philosophy, criteria, failure modes, and design for ancillary geotechnical infrastructure',
    chapters: [
      {
        id: '6',
        title: 'Slope Design',
        purpose: 'Documents the slope design methodology, acceptance criteria, and design outputs. This is where data becomes design decisions.',
        sections: [
          { id: '6.1', title: 'Design Philosophy and Approach', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['5.1', '6.3'] },
          { id: '6.2', title: 'Geotechnical Domains', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['5.2', '5.3', '5.4', '5.5', '6.3', '6.4'] },
          { id: '6.3', title: 'Slope Design Criteria and Acceptance Criteria', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['6.1', '6.2', '6.4'] },
          { id: '6.4', title: 'Design Sectors and Slope Angles', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: true, crossRefs: ['6.2', '6.3'], mshaCfr: '30 CFR 56.3401 — catch berms must be adequate to catch rollback' },
          { id: '6.5', title: 'Failure Modes and Mechanisms', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['5.3', '6.3', '10.1'] },
          { id: '6.6', title: 'Seismic Hazard and Earthquake Design Loads', applicability: 'conditional', applicabilityNote: 'Required for seismically active regions (PGA >0.05g); Recommended for all operations', isPriority: false, crossRefs: ['3.2', '6.3'] },
          { id: '6.7', title: 'Weak Rock and Weathering Considerations', applicability: 'conditional', applicabilityNote: 'Required where weathered, oxidized, or weak rock zones exist in pit walls', isPriority: false, crossRefs: ['5.2', '5.4', '6.3', '6.4'] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART IV — IMPLEMENTATION AND OPERATIONS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    num: 'IV',
    title: 'Implementation & Operations',
    subtitle: 'Design implementation, monitoring, dewatering, hazard management, TARPs, and communication',
    chapters: [
      {
        id: '7',
        title: 'Slope Design Implementation',
        purpose: 'Translates design into field practice — blasting, survey control, scaling, and ongoing data collection.',
        sections: [
          { id: '7.1', title: 'Design Review and Approval Processes', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['4.1', '4.2', '6.4'] },
          { id: '7.2', title: 'Blast Management for Slope Stability', applicability: 'recommended', applicabilityNote: 'Required — all blasting operations; Conditional — non-blasting mines', isPriority: false, crossRefs: ['6.4', '7.3'], mshaCfr: '30 CFR 56 Subpart E — blasting' },
          { id: '7.3', title: 'Survey Control, Slope As-Built Documentation, and Design Compliance', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['6.4', '8.1'] },
          { id: '7.4', title: 'Slope Preparation, Scaling and Loose Material Management', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['8.2', '10.1'], mshaCfr: '30 CFR 56.3130–56.3201 — scaling and ground examination' },
          { id: '7.5', title: 'Geotechnical Data Collection During Mining', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['5.3', '5.4', '8.1'] },
        ],
      },
      {
        id: '8',
        title: 'Slope Monitoring Program',
        purpose: 'Defines the monitoring program strategy, instruments, data management, and reporting. Feeds directly into TARP triggers.',
        sections: [
          { id: '8.1', title: 'Monitoring Strategy and Objectives', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['10.3', '10.4'] },
          { id: '8.2', title: 'Visual Inspection Program', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['10.3'], mshaCfr: '30 CFR 56.3130 — ground examination before work begins' },
          { id: '8.3', title: 'Prism / Reflector Monitoring Network', applicability: 'recommended', applicabilityNote: 'Required — most operations; Conditional — very small/low-consequence pits only', isPriority: false, crossRefs: ['8.1', '10.3', '10.4'] },
          { id: '8.4', title: 'Slope Stability Radar (SSR)', applicability: 'conditional', applicabilityNote: 'Include if SSR is deployed or planned at this operation', isPriority: false, crossRefs: ['8.1', '8.3', '10.3', '10.4'] },
          { id: '8.5', title: 'InSAR / Satellite Radar Monitoring', applicability: 'conditional', applicabilityNote: 'Include if InSAR is used', isPriority: false, crossRefs: ['8.1', '8.3', '8.4', '10.3'] },
          { id: '8.6', title: 'Piezometer Network', applicability: 'recommended', applicabilityNote: 'Required where groundwater is above pit floor; Conditional — very dry/arid sites', isPriority: false, crossRefs: ['5.5', '9.1', '10.4'] },
          { id: '8.7', title: 'Inclinometers', applicability: 'conditional', applicabilityNote: 'Include where deep-seated deformation is a concern', isPriority: false, crossRefs: ['8.1', '8.3', '10.4'] },
          { id: '8.8', title: 'Seismic Monitoring', applicability: 'conditional', applicabilityNote: 'Include where seismicity or blast vibration design concern is documented', isPriority: false, crossRefs: ['6.6', '8.1', '10.4'] },
          { id: '8.9', title: 'Crack Monitoring', applicability: 'conditional', applicabilityNote: 'Include where tension cracks have been observed', isPriority: false, crossRefs: ['8.1', '8.3', '10.3', '10.4'] },
          { id: '8.10', title: 'Monitoring Data Management and Reporting', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['11.1', '13.1'] },
        ],
      },
      {
        id: '9',
        title: 'Groundwater Management and Slope Depressurization',
        purpose: 'Documents the dewatering strategy, horizontal drain program, and surface water management — all of which directly affect pore pressure and slope stability.',
        sections: [
          { id: '9.1', title: 'Dewatering Strategy and Objectives', applicability: 'recommended', applicabilityNote: 'Required — wet operations; Conditional — arid sites', isPriority: false, crossRefs: ['5.5', '8.6', '10.1'] },
          { id: '9.2', title: 'Horizontal Drain Program', applicability: 'conditional', applicabilityNote: 'Include if horizontal drains are installed or planned', isPriority: false, crossRefs: ['9.1', '8.6'] },
          { id: '9.3', title: 'Surface Water Management', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['3.2', '6.4'] },
        ],
      },
      {
        id: '10',
        title: 'Hazard Management and Trigger Action Response Plans',
        purpose: 'The hazard register, TARPs, and emergency response plans. These are the operational ground control risk controls that protect people.',
        sections: [
          { id: '10.1', title: 'Geotechnical Hazard Register', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['4.1', '6.5', 'Chapter 8'] },
          { id: '10.2', title: 'Geotechnical Hazard Maps', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['10.1', '10.3'] },
          { id: '10.3', title: 'TARP Framework — Overview and Alert Level Definitions', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: true, crossRefs: ['8.1–8.10', '10.4', '10.5'], mshaCfr: '30 CFR 56.18009 — communications; 30 CFR 56.18013 — escape plans' },
          { id: '10.4', title: 'TARP Trigger Thresholds by Monitoring Parameter', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['8.2–8.10', '10.3'] },
          { id: '10.5', title: 'Evacuation and Emergency Response for Slope Failures', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: true, crossRefs: ['10.3', '10.4', 'Chapter 14'], mshaCfr: '30 CFR 56.18013 — escape and evacuation plans; 30 CFR Part 50 — incident reporting' },
        ],
      },
      {
        id: '11',
        title: 'Communication, Training and Supervision',
        purpose: 'Reporting cadence, training requirements, and pre-start inspection protocols.',
        sections: [
          { id: '11.1', title: 'Geotechnical Reporting and Communication', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['8.10', '4.1'] },
          { id: '11.2', title: 'Training Program', applicability: 'recommended', applicabilityNote: 'All operations — training records held by Safety department, not documented in this GCMP', isPriority: false, crossRefs: ['4.2', '11.3'] },
          { id: '11.3', title: 'Geotechnical Hazard Pre-Start Inspections', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['8.2', '10.1'], mshaCfr: '30 CFR 56.3130 — daily examination of working places' },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART V — GOVERNANCE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    num: 'V',
    title: 'Governance',
    subtitle: 'Incident reporting, investigation, audits, reviews, and document control',
    chapters: [
      {
        id: '12',
        title: 'Incident Reporting and Investigation',
        purpose: 'Defines the process for reporting and investigating ground movement events — from minor cracking to significant failures.',
        sections: [
          { id: '12.1', title: 'Ground Movement Event Reporting', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['10.3', '11.1'], mshaCfr: '30 CFR Part 50 — accident/injury reporting; immediate notification for certain events' },
          { id: '12.2', title: 'Ground Movement Investigation Procedure', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['12.1', '13.1'], mshaCfr: '30 CFR 50.11 — investigation of accidents' },
        ],
      },
      {
        id: '13',
        title: 'Audits, Reviews and Document Control',
        purpose: 'Ensures the GCMP remains current and effective — internal audit program, external review, and document management.',
        sections: [
          { id: '13.1', title: 'GCMP Review Schedule and Update Triggers', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['1.2', '12.2'] },
          { id: '13.2', title: 'Internal Geotechnical Audits', applicability: 'recommended', applicabilityNote: 'All operations', isPriority: false, crossRefs: ['4.1', '13.1'], mshaCfr: '30 CFR 56.18002 — self-inspection program' },
          { id: '13.3', title: 'External / Third-Party Geotechnical Review', applicability: 'optional', applicabilityNote: 'Recommended — major operations; Conditional — small operations may not require formal external review', isPriority: false, crossRefs: ['4.1', '6.1', '13.2'] },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // PART VI — CLOSURE
  // ═══════════════════════════════════════════════════════════════════════════
  {
    num: 'VI',
    title: 'Closure',
    subtitle: 'Long-term post-closure slope stability, reclamation design criteria, and post-closure monitoring obligations',
    chapters: [
      {
        id: '14',
        title: 'Mine Closure Slope Considerations',
        purpose: 'Closure slopes must achieve long-term stability without ongoing maintenance — design criteria are fundamentally different from operating slopes.',
        sections: [
          { id: '14.1', title: 'Closure Slope Design Philosophy', applicability: 'recommended', applicabilityNote: 'Required — operations in closure planning; Conditional — early-stage operations (include placeholder)', isPriority: false, crossRefs: ['6.1', '6.3'] },
          { id: '14.2', title: 'Long-Term Monitoring and Post-Closure Obligations', applicability: 'conditional', applicabilityNote: 'Include where post-closure monitoring is required by permit or regulation', isPriority: false, crossRefs: ['14.1', '8.1'] },
        ],
      },
    ],
  },

];

// ─── FLAT SECTION LIST ────────────────────────────────────────────────────────

export interface FlatSection extends Section {
  chapterId: string;
  chapterTitle: string;
  partNum: string;
  partTitle: string;
}

export const FLAT_SECTIONS: FlatSection[] = [];
for (const part of SECTION_LIBRARY) {
  for (const chapter of part.chapters) {
    for (const section of chapter.sections) {
      FLAT_SECTIONS.push({
        ...section,
        chapterId: chapter.id,
        chapterTitle: chapter.title,
        partNum: part.num,
        partTitle: part.title,
      });
    }
  }
}

export const TOTAL_SECTIONS = FLAT_SECTIONS.length;
export const PRIORITY_SECTIONS = FLAT_SECTIONS.filter(s => s.isPriority).map(s => s.id);
