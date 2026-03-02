import type { LookupRef } from '../types';

// ─── FIELD TYPES ──────────────────────────────────────────────────────────────

export type FieldType =
  | 'text'
  | 'textarea'
  | 'select'
  | 'date'
  | 'number'
  | 'email'
  | 'coordinates';

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  placeholder?: string;
  options?: FieldOption[];
  unit?: string;
  hint?: string;
  lookups?: LookupRef[];
  required?: boolean;
  cfr?: string;           // MSHA CFR reference if applicable
  sectionRef?: string;    // GCMP section where this field appears
}

export interface FieldGroup {
  id: string;
  label: string;
  icon: string;
  description: string;
  fields: FieldDef[];
}

// ─── FIELD GROUP DEFINITIONS ──────────────────────────────────────────────────

export const FIELD_GROUPS: FieldGroup[] = [

  // ── 1. MINE IDENTITY ───────────────────────────────────────────────────────
  {
    id: 'identity',
    label: 'Mine Identity',
    icon: '⛏',
    description: 'Core identifiers that appear throughout the document — on the cover page, headers, and in all regulatory references.',
    fields: [
      {
        key: 'mine_name',
        label: 'Mine Name',
        type: 'text',
        placeholder: 'e.g. Bingham Canyon Mine',
        required: true,
        hint: 'Use the full official name as it appears in permits and regulatory submissions.',
        sectionRef: '1.1, 2.2',
      },
      {
        key: 'company_name',
        label: 'Operating Company',
        type: 'text',
        placeholder: 'e.g. Kennecott Utah Copper LLC',
        required: true,
        sectionRef: '1.1',
      },
      {
        key: 'parent_company',
        label: 'Parent Company (if different)',
        type: 'text',
        placeholder: 'e.g. Rio Tinto plc',
        sectionRef: '1.1',
      },
      {
        key: 'site_location',
        label: 'Site Location / Address',
        type: 'text',
        placeholder: 'e.g. Salt Lake County, Utah, USA',
        required: true,
        sectionRef: '3.1',
      },
      {
        key: 'site_latitude',
        label: 'Site Latitude',
        type: 'text',
        placeholder: 'e.g. 44.3521° N',
        hint: 'Used for seismic hazard and precipitation look-ups.',
        sectionRef: '3.1',
        lookups: [
          { label: 'Google Maps — find coordinates', url: 'https://maps.google.com', description: 'Right-click on the map → "What\'s here?" to get lat/long' },
          { label: 'USGS National Map Viewer', url: 'https://apps.nationalmap.gov/viewer/', description: 'Right-click on topographic map for coordinates' },
        ],
      },
      {
        key: 'site_longitude',
        label: 'Site Longitude',
        type: 'text',
        placeholder: 'e.g. 114.5678° W',
        sectionRef: '3.1',
      },
      {
        key: 'commodity',
        label: 'Primary Commodity / Mineral',
        type: 'text',
        placeholder: 'e.g. Molybdenum, Gold, Copper',
        required: true,
        sectionRef: '3.1',
      },
    ],
  },

  // ── 2. DOCUMENT CONTROL ────────────────────────────────────────────────────
  {
    id: 'doccontrol',
    label: 'Document Control',
    icon: '📋',
    description: 'Version control and approval metadata. Populates the cover page, revision table, and distribution list.',
    fields: [
      {
        key: 'doc_number',
        label: 'Document Number',
        type: 'text',
        placeholder: 'e.g. TCM-GEO-GCMP-001',
        required: true,
        hint: 'Follow your document management system convention.',
        sectionRef: '1.1, 1.2',
      },
      {
        key: 'revision_number',
        label: 'Current Revision',
        type: 'text',
        placeholder: 'e.g. Rev 3.0',
        required: true,
        sectionRef: '1.2',
      },
      {
        key: 'revision_date',
        label: 'Revision Date',
        type: 'date',
        required: true,
        sectionRef: '1.2',
      },
      {
        key: 'next_review_date',
        label: 'Next Scheduled Review Date',
        type: 'date',
        hint: 'CSIRO LOP and WA DMIRS recommend annual review minimum; after any significant ground movement event.',
        sectionRef: '13.1',
      },
      {
        key: 'prepared_by_name',
        label: 'Prepared By — Name',
        type: 'text',
        placeholder: 'Geotechnical Engineer',
        required: true,
        sectionRef: '1.1',
      },
      {
        key: 'prepared_by_title',
        label: 'Prepared By — Title / Registration',
        type: 'text',
        placeholder: 'e.g. P.E. #12345, Utah',
        sectionRef: '1.1',
      },
      {
        key: 'approved_by_name',
        label: 'Approved By — Name',
        type: 'text',
        required: true,
        sectionRef: '1.1',
      },
      {
        key: 'approved_by_title',
        label: 'Approved By — Title',
        type: 'text',
        placeholder: 'e.g. Mine Manager',
        sectionRef: '1.1',
      },
    ],
  },

  // ── 3. KEY PERSONNEL ───────────────────────────────────────────────────────
  {
    id: 'personnel',
    label: 'Key Personnel',
    icon: '👷',
    description: 'Named individuals for roles referenced throughout the GCMP — especially in Section 4.1 (Roles & Responsibilities) and TARP notification trees.',
    fields: [
      {
        key: 'mine_manager',
        label: 'Mine Manager',
        type: 'text',
        placeholder: 'Name, Title',
        required: true,
        cfr: '30 CFR 56.18002 — responsible party for self-inspection program',
        sectionRef: '4.1',
      },
      {
        key: 'geotech_engineer',
        label: 'Responsible Geotechnical Engineer (RGE)',
        type: 'text',
        placeholder: 'Name, P.E.',
        required: true,
        hint: 'The RGE must be a named individual (not just a job title) with documented stop-work authority for ground control hazards.',
        cfr: '30 CFR 56.3130 — competent person requirement',
        sectionRef: '4.1',
      },
      {
        key: 'geotech_engineer_reg',
        label: 'RGE Professional Registration',
        type: 'text',
        placeholder: 'e.g. P.E. #54321, State of Utah',
        required: true,
        sectionRef: '4.1, 4.2',
      },
      {
        key: 'geotech_consultant',
        label: 'Geotechnical Consultant (if external)',
        type: 'text',
        placeholder: 'Name',
        sectionRef: '4.1',
      },
      {
        key: 'consultant_firm',
        label: 'Consulting Firm',
        type: 'text',
        placeholder: 'e.g. Call & Nicholas, Piteau Associates',
        sectionRef: '4.1',
      },
      {
        key: 'training_records_system',
        label: 'Training Records System (Safety Dept)',
        type: 'text',
        placeholder: 'e.g. Site HRIS — contact Safety Manager for records',
        hint: 'Training records are held by the Safety department. This field identifies where to find them, not the records themselves.',
        sectionRef: '11.2',
      },
    ],
  },

  // ── 4. MINE SCOPE & STAGE ──────────────────────────────────────────────────
  {
    id: 'scope',
    label: 'Mine Scope & Stage',
    icon: '🗺',
    description: 'Defines what is covered by this GCMP and drives which conditional sections are included.',
    fields: [
      {
        key: 'mine_stage',
        label: 'Current Mine Stage',
        type: 'select',
        required: true,
        options: [
          { value: '', label: '— Select —' },
          { value: 'Exploration', label: 'Exploration' },
          { value: 'Pre-Feasibility', label: 'Pre-Feasibility' },
          { value: 'Feasibility', label: 'Feasibility' },
          { value: 'Construction', label: 'Construction' },
          { value: 'Operations', label: 'Operations' },
          { value: 'Care & Maintenance', label: 'Care & Maintenance' },
          { value: 'Closure', label: 'Closure' },
          { value: 'Post-Closure', label: 'Post-Closure' },
        ],
        hint: 'Mine stage determines the CSIRO LOP data confidence level required and which sections are mandatory vs conditional.',
        sectionRef: '3.3',
      },
      {
        key: 'mine_start_year',
        label: 'Mine Start Year',
        type: 'text',
        placeholder: 'e.g. 1983',
        sectionRef: '3.3',
      },
      {
        key: 'mine_life',
        label: 'Estimated Remaining Mine Life',
        type: 'text',
        placeholder: 'e.g. 8 years (to 2032)',
        sectionRef: '2.2',
      },
      {
        key: 'pits_in_scope',
        label: 'Pit(s) in Scope',
        type: 'textarea',
        placeholder: 'List all pits covered by this GCMP — e.g. Main Pit, Stage 4 Extension, North Satellite',
        required: true,
        hint: 'Must match the infrastructure scope defined in Chapter 4A.',
        sectionRef: '2.2, 4A.1',
      },
      {
        key: 'total_pit_depth',
        label: 'Maximum Pit Depth (m)',
        type: 'text',
        placeholder: 'e.g. 380 m',
        hint: 'Depths >400m trigger conditional In Situ Stress section (5.6). Note units — use metres.',
        sectionRef: '5.6',
      },
      {
        key: 'mine_area_ha',
        label: 'Total Mine Disturbance Area (ha)',
        type: 'text',
        placeholder: 'e.g. 850 ha',
        sectionRef: '2.2',
      },
    ],
  },

  // ── 5. REGULATORY FRAMEWORK ────────────────────────────────────────────────
  {
    id: 'regulatory',
    label: 'Regulatory Framework',
    icon: '⚖',
    description: 'The regulatory framework selected here controls which sections are flagged as MSHA-required vs best-practice throughout the app. US operations show 30 CFR citations alongside each applicable plan item.',
    fields: [
      {
        key: 'regulatory_framework',
        label: 'Primary Regulatory Framework',
        lookups: [
          { label: 'MSHA 30 CFR Part 56 — Surface Metal/Nonmetal', url: 'https://www.ecfr.gov/current/title-30/chapter-I/subchapter-O/part-56', description: 'Federal safety standards for surface metal and nonmetal mines' },
          { label: 'WA DMIRS Ground Control Guideline', url: 'https://www.dmp.wa.gov.au/Safety/Ground-control-5337.aspx', description: 'Western Australia DMIRS open pit ground control guideline' },
          { label: 'CSIRO Large Open Pit (LOP) Guidelines', url: 'https://www.csiro.au/en/research/natural-environment/land/open-pit-slope-design', description: 'CSIRO LOP Guidelines — slope design and ground control reference' },
        ],
        type: 'select',
        required: true,
        options: [
          { value: '', label: '— Select —' },
          { value: 'US-Federal-MSHA', label: 'US Federal — MSHA (30 CFR Parts 55–57)' },
          { value: 'US-Federal-MSHA-State', label: 'US Federal + State Requirements' },
          { value: 'Australia-WA', label: 'Australia — Western Australia (WA DMIRS)' },
          { value: 'Australia-NT', label: 'Australia — Northern Territory' },
          { value: 'Australia-QLD', label: 'Australia — Queensland' },
          { value: 'Canada-BC', label: 'Canada — British Columbia' },
          { value: 'Canada-YK', label: 'Canada — Yukon' },
          { value: 'Corporate-Standard', label: 'Corporate Standard (no single jurisdiction)' },
        ],
        hint: 'This drives CFR citations shown throughout the app. Most US operations select US-Federal-MSHA-State.',
        sectionRef: '2.3',
      },
      {
        key: 'federal_regulation',
        label: 'Federal Regulatory Standard(s)',
        type: 'text',
        placeholder: 'e.g. 30 CFR Part 56 — Metal/Nonmetal Surface Mines',
        required: true,
        hint: 'US: MSHA 30 CFR Part 56 (surface) or Part 57 (underground). List specific subparts applicable to this operation.',
        cfr: 'Primary: 30 CFR 56.3130–56.3201 (ground stability), 56.3401 (berms), 30 CFR Part 50 (incident reporting)',
        sectionRef: '2.3',
      },
      {
        key: 'state_regulation',
        label: 'State / Territory Regulatory Standard(s)',
        type: 'text',
        placeholder: 'e.g. Nevada NAC Chapter 512; Operating Permit No. NEV-2019-001',
        hint: 'Include operating permit number — permit conditions often impose geotechnical requirements beyond the base standard.',
        sectionRef: '2.3',
      },
      {
        key: 'operating_permit',
        label: 'Mine Operating Permit Number',
        type: 'text',
        placeholder: 'e.g. OP-2018-0042',
        sectionRef: '2.3',
      },
      {
        key: 'msha_id',
        label: 'MSHA Mine ID',
        lookups: [
          { label: 'MSHA Mine Data Retrieval System', url: 'https://arlweb.msha.gov/drs/drshome.htm', description: 'Find your MSHA mine ID and compliance history' },
          { label: 'MSHA Mine Locator Map', url: 'https://www.msha.gov/data-and-reports/mine-data-retrieval-system', description: 'Search mines by name, state, or commodity' },
        ],
        type: 'text',
        placeholder: 'e.g. 1000025',
        hint: 'MSHA Mine ID is required for 30 CFR Part 50 incident reporting submissions.',
        cfr: '30 CFR Part 50 — incident reporting',
        sectionRef: '12.1',
      },
    ],
  },

  // ── 6. CLIMATE & SEISMIC ───────────────────────────────────────────────────
  {
    id: 'climate',
    label: 'Climate & Seismic',
    icon: '🌦',
    description: 'Hydroclimatic and seismic parameters. Look-up buttons link directly to NOAA Atlas 14 and USGS tools — enter site coordinates first for accurate lookups.',
    fields: [
      {
        key: 'mean_annual_precip',
        label: 'Mean Annual Precipitation',
        type: 'text',
        unit: 'mm / in',
        placeholder: 'e.g. 620 mm (24.4 in)',
        hint: 'Enter both metric and imperial for bilingual document output.',
        lookups: [
          {
            label: 'NOAA Atlas 14 — Precipitation Frequency',
            url: 'https://hdsc.nws.noaa.gov/pfds/',
            description: 'Enter site coordinates for annual precipitation and storm frequency data (1-yr through 1000-yr return periods).',
          },
          {
            label: 'NOAA Climate Normals',
            url: 'https://www.ncei.noaa.gov/products/land-based-station/us-climate-normals',
            description: '30-year normal precipitation, temperature, and freeze-thaw data by nearest station.',
          },
        ],
        sectionRef: '3.2',
      },
      {
        key: 'pmp',
        label: 'Probable Maximum Precipitation (PMP)',
        type: 'text',
        unit: 'mm / in',
        placeholder: 'e.g. 280 mm in 24 hr',
        hint: 'From NOAA HMR 57/58 or site-specific hydrometeorological study.',
        lookups: [
          {
            label: 'NOAA Atlas 14 — Extreme Precipitation',
            url: 'https://hdsc.nws.noaa.gov/pfds/',
            description: 'Use for design storm ARI; PMP requires site-specific HMR study.',
          },
        ],
        sectionRef: '3.2',
      },
      {
        key: 'design_storm',
        label: 'Design Storm Event (ARI)',
        type: 'text',
        placeholder: 'e.g. 100-year, 24-hr: 95 mm',
        hint: 'Annual Recurrence Interval storm used for slope drainage and surface water design.',
        sectionRef: '3.2',
      },
      {
        key: 'freeze_thaw',
        label: 'Freeze-Thaw Cycles Significant?',
        type: 'select',
        options: [
          { value: '', label: '— Select —' },
          { value: 'Yes — significant seasonal freeze', label: 'Yes — significant seasonal freeze' },
          { value: 'Yes — freeze-thaw cycling common', label: 'Yes — freeze-thaw cycling common' },
          { value: 'Minor — occasional frost only', label: 'Minor — occasional frost only' },
          { value: 'No — frost-free site', label: 'No — frost-free site' },
        ],
        sectionRef: '3.2',
      },
      {
        key: 'frost_depth',
        label: 'Design Frost Penetration Depth',
        type: 'text',
        unit: 'm',
        placeholder: 'e.g. 1.5 m',
        sectionRef: '3.2',
      },
      {
        key: 'wind_monitoring',
        label: 'Wind Monitoring Requirements',
        type: 'text',
        placeholder: 'e.g. Anemometer on SSR radar mast; alert at >60 km/h sustained',
        hint: 'High winds affect SSR accuracy and blasting operations — document any site-specific wind thresholds.',
        sectionRef: '3.2, 7.2',
      },
      {
        key: 'seismic_zone',
        label: 'Seismic Zone / Region',
        type: 'text',
        placeholder: 'e.g. ASCE 7 Site Class C, Zone 2B',
        lookups: [
          {
            label: 'USGS Unified Hazard Tool',
            url: 'https://earthquake.usgs.gov/hazards/interactive/',
            description: 'Enter site coordinates for PGA at 2% and 10% probability of exceedance in 50 years.',
          },
        ],
        sectionRef: '3.2, 6.6',
      },
      {
        key: 'pga_475',
        label: 'PGA at Bedrock — 475-year return (10% in 50 yr)',
        type: 'text',
        unit: 'g',
        placeholder: 'e.g. 0.18g',
        lookups: [
          {
            label: 'USGS Unified Hazard Tool',
            url: 'https://earthquake.usgs.gov/hazards/interactive/',
            description: 'PGA values at 2% and 10% probability of exceedance in 50 years by site coordinates.',
          },
          {
            label: 'ASCE 7 Seismic Parameters',
            url: 'https://asce7hazardtool.online/',
            description: 'Ss, S1, and derived seismic design parameters by latitude/longitude for ASCE 7 compliance.',
          },
          {
            label: 'USGS Historical Earthquakes',
            url: 'https://earthquake.usgs.gov/earthquakes/search/',
            description: 'Search historical seismicity catalog by location and magnitude to characterize regional seismic environment.',
          },
        ],
        sectionRef: '6.6',
      },
      {
        key: 'pga_2475',
        label: 'PGA at Bedrock — 2,475-year return (2% in 50 yr)',
        type: 'text',
        unit: 'g',
        placeholder: 'e.g. 0.34g',
        sectionRef: '6.6',
      },
      {
        key: 'pseudo_static_coeff',
        label: 'Pseudo-Static Coefficient Used in Design',
        type: 'text',
        placeholder: 'e.g. k = 0.10 (½ × PGA₄₇₅)',
        hint: 'Typically 0.5 × PGA for slope design; document basis and reference.',
        sectionRef: '6.6',
      },
      {
        key: 'seismic_design_basis',
        label: 'Seismic Design Basis / Standard',
        type: 'text',
        placeholder: 'e.g. ASCE 7-22 / PSHA study by [firm] (2023)',
        sectionRef: '6.6',
      },
      {
        key: 'seismic_hazard_ref',
        label: 'Seismic Hazard Assessment Reference',
        type: 'text',
        placeholder: 'e.g. Golder Associates, 2022, Seismic Hazard Assessment, Report No. X',
        sectionRef: '6.6',
      },
    ],
  },

  // ── 7. SLOPE DESIGN PARAMETERS ─────────────────────────────────────────────
  {
    id: 'design',
    label: 'Slope Design Parameters',
    icon: '📐',
    description: 'Global design parameters — mine-wide defaults and acceptance criteria. Domain-specific values (GSI by domain, sector-by-sector angles) are documented in structured tables within the output document body, not in these global fields.',
    fields: [
      {
        key: 'data_confidence_level',
        label: 'CSIRO LOP Data Confidence Level',
        type: 'select',
        required: true,
        options: [
          { value: '', label: '— Select —' },
          { value: 'Level 1 — Conceptual', label: 'Level 1 — Conceptual (exploration / pre-scoping)' },
          { value: 'Level 2 — Pre-Feasibility', label: 'Level 2 — Pre-Feasibility' },
          { value: 'Level 3 — Feasibility', label: 'Level 3 — Feasibility' },
          { value: 'Level 4 — Design', label: 'Level 4 — Design (detailed engineering)' },
          { value: 'Level 5 — Operations', label: 'Level 5 — Operations (current mine stage)' },
        ],
        hint: 'CSIRO LOP Table 8.1. Data confidence level determines acceptable design methods and acceptance criteria. At Level 5 (Operations): geology >90%, structural >75%, rock mass >80% confidence targets.',
        sectionRef: '5.1',
      },
      {
        key: 'design_approach',
        label: 'Design Analysis Approach',
        type: 'select',
        options: [
          { value: '', label: '— Select —' },
          { value: 'Deterministic only', label: 'Deterministic only (FoS)' },
          { value: 'Probabilistic only', label: 'Probabilistic only (PoF)' },
          { value: 'Both — deterministic and probabilistic', label: 'Both — deterministic and probabilistic (recommended for Level 4+)' },
        ],
        hint: 'CSIRO LOP recommends both deterministic and probabilistic approaches at feasibility stage and above. CSIRO LOP Table 9.3 (deterministic) and Table 9.4 (probabilistic) provide industry-standard acceptance criteria.',
        sectionRef: '6.1, 6.3',
      },
      {
        key: 'stability_software',
        label: 'Slope Stability Analysis Software',
        lookups: [
          { label: 'Rocscience — Slide2/3, RS2, Dips, SWedge', url: 'https://www.rocscience.com', description: 'Rocscience geotechnical software suite' },
          { label: 'Itasca — FLAC3D, UDEC', url: 'https://www.itascacg.com', description: 'Continuum and discontinuum modelling software' },
        ],
        type: 'text',
        placeholder: 'e.g. Rocscience Slide2, FLAC3D, Dips, SWedge',
        hint: 'List all software used — both limit equilibrium and numerical methods if applicable.',
        sectionRef: '6.1',
      },
      {
        key: 'classification_systems',
        label: 'Rock Mass Classification System(s)',
        type: 'text',
        placeholder: 'e.g. GSI (primary), RMR89, SMR for kinematic',
        sectionRef: '5.4',
      },
      {
        key: 'ucs_range',
        label: 'Intact Rock UCS Range (site-wide)',
        type: 'text',
        unit: 'MPa',
        placeholder: 'e.g. 35–220 MPa (varies by domain)',
        hint: 'Domain-specific UCS values are in the rock mass characterization table in the document body — this is a site-wide descriptor only.',
        sectionRef: '5.4',
      },
      // Design criteria — tabular by scale
      {
        key: 'bench_height',
        label: 'Nominal Bench Height',
        type: 'text',
        unit: 'm',
        placeholder: 'e.g. 12 m (double-bench: 24 m)',
        hint: 'Document both single- and double-bench configurations if used. Sector-specific heights go in the Slope Design table.',
        sectionRef: '6.4',
      },
      {
        key: 'bench_face_angle',
        label: 'Design Bench Face Angle (typical)',
        type: 'text',
        unit: '° from horiz.',
        placeholder: 'e.g. 65–75° (varies by domain)',
        sectionRef: '6.4',
      },
      {
        key: 'bench_fos_static',
        label: 'Bench FoS — Static (acceptance criterion)',
        type: 'text',
        placeholder: 'e.g. ≥ 1.1',
        hint: 'CSIRO LOP Table 9.3: bench FoS ≥1.1 for low-consequence; ≥1.2 for mine infrastructure.',
        sectionRef: '6.3',
      },
      {
        key: 'bench_pof',
        label: 'Bench PoF — Acceptance Criterion',
        type: 'text',
        placeholder: 'e.g. < 25–50%',
        hint: 'CSIRO LOP Table 9.4: bench PoF <25% (low consequence) to <50% (very low consequence).',
        sectionRef: '6.3',
      },
      {
        key: 'interramp_angle',
        label: 'Design Inter-Ramp Angle (typical)',
        type: 'text',
        unit: '° from horiz.',
        placeholder: 'e.g. 42–48° (varies by sector)',
        hint: 'State as angle from horizontal. Sector-specific values are in the slope design parameter table.',
        sectionRef: '6.4',
      },
      {
        key: 'interramp_fos_static',
        label: 'Inter-Ramp FoS — Static',
        type: 'text',
        placeholder: 'e.g. ≥ 1.2',
        hint: 'CSIRO LOP Table 9.3: inter-ramp FoS ≥1.2 (non-infrastructure) to ≥1.3 (infrastructure consequence).',
        sectionRef: '6.3',
      },
      {
        key: 'interramp_pof',
        label: 'Inter-Ramp PoF — Acceptance Criterion',
        type: 'text',
        placeholder: 'e.g. < 15–20%',
        hint: 'CSIRO LOP Table 9.4: inter-ramp PoF <15% (non-critical).',
        sectionRef: '6.3',
      },
      {
        key: 'overall_slope_angle',
        label: 'Design Overall Slope Angle (typical)',
        type: 'text',
        unit: '° from horiz.',
        placeholder: 'e.g. 35–40° (varies by sector)',
        sectionRef: '6.4',
      },
      {
        key: 'overall_fos_static',
        label: 'Overall FoS — Static',
        type: 'text',
        placeholder: 'e.g. ≥ 1.3',
        hint: 'CSIRO LOP Table 9.3: overall FoS ≥1.3 (non-infrastructure) to ≥1.5 (infrastructure consequence / closure).',
        sectionRef: '6.3',
      },
      {
        key: 'overall_pof',
        label: 'Overall PoF — Acceptance Criterion',
        type: 'text',
        placeholder: 'e.g. < 5–10%',
        hint: 'CSIRO LOP Table 9.4: overall PoF <5% (low consequence) to <10% (very low consequence).',
        sectionRef: '6.3',
      },
    ],
  },

  // ── 8. GEOTECHNICAL INFRASTRUCTURE ────────────────────────────────────────
  {
    id: 'infrastructure',
    label: 'Geotechnical Infrastructure',
    icon: '🏗',
    description: 'Identifies non-pit geotechnical infrastructure and whether each is managed within this GCMP or cross-referenced to a separate plan. Drives which optional chapters are included in the output document.',
    fields: [
      // Waste Dumps
      {
        key: 'waste_dumps_present',
        label: 'Waste Rock Dumps Present?',
        type: 'select',
        options: [
          { value: '', label: '— Select —' },
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
          { value: 'Planned', label: 'Planned (not yet constructed)' },
        ],
        sectionRef: '4A.2',
      },
      {
        key: 'waste_dump_management',
        label: 'Waste Dump — Management Approach',
        type: 'select',
        options: [
          { value: '', label: '— Not applicable —' },
          { value: 'Managed within this GCMP', label: 'Option A — Managed within this GCMP (adds Chapter)' },
          { value: 'Separate plan — cross-reference only', label: 'Option B — Separate plan (cross-reference stub only)' },
        ],
        hint: 'Option B inserts a one-paragraph cross-reference stub. Option A adds a full waste dump chapter.',
        sectionRef: '4A.2',
      },
      {
        key: 'waste_dump_plan_title',
        label: 'Waste Dump Plan Title (if separate)',
        type: 'text',
        placeholder: 'e.g. West Dump Geotechnical Management Plan',
        sectionRef: '4A.2',
      },
      {
        key: 'waste_dump_plan_custodian',
        label: 'Waste Dump Plan Custodian',
        type: 'text',
        placeholder: 'Name, Title',
        sectionRef: '4A.2',
      },
      // Heap Leach
      {
        key: 'hlf_present',
        label: 'Heap Leach Facility Present?',
        type: 'select',
        options: [
          { value: '', label: '— Select —' },
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
          { value: 'Planned', label: 'Planned' },
        ],
        sectionRef: '4A.3',
      },
      {
        key: 'hlf_management',
        label: 'HLF — Management Approach',
        type: 'select',
        options: [
          { value: '', label: '— Not applicable —' },
          { value: 'Managed within this GCMP', label: 'Option A — Managed within this GCMP' },
          { value: 'Separate plan — cross-reference only', label: 'Option B — Separate HLF management plan (cross-reference)' },
        ],
        hint: 'Option B is most common — HLF stability combines geotechnical and process engineering functions best handled in a dedicated plan.',
        sectionRef: '4A.3',
      },
      {
        key: 'hlf_plan_title',
        label: 'HLF Plan Title (if separate)',
        type: 'text',
        sectionRef: '4A.3',
      },
      {
        key: 'hlf_permit_ref',
        label: 'HLF Regulatory Permit Reference',
        type: 'text',
        placeholder: 'e.g. Cyanide Management Permit No. NEV-CM-0042',
        cfr: '43 CFR Part 3809 (BLM — federal lands); State cyanide management permit',
        sectionRef: '4A.3',
      },
      // TSF
      {
        key: 'tsf_present',
        label: 'Tailings Storage Facility (TSF) Present?',
        type: 'select',
        options: [
          { value: '', label: '— Select —' },
          { value: 'Yes', label: 'Yes' },
          { value: 'No', label: 'No' },
          { value: 'Planned', label: 'Planned' },
          { value: 'Closed / historic', label: 'Closed / historic only' },
        ],
        hint: 'TSFs warrant a dedicated management plan — Option B (cross-reference) is strongly recommended per GISTM 2020.',
        sectionRef: '4A.4',
      },
      {
        key: 'tsf_management',
        label: 'TSF — Management Approach',
        type: 'select',
        options: [
          { value: '', label: '— Not applicable —' },
          { value: 'Managed within this GCMP', label: 'Option A — Managed within this GCMP' },
          { value: 'Separate TSF management plan (recommended)', label: 'Option B — Separate TSF management plan (GISTM recommended)' },
        ],
        sectionRef: '4A.4',
      },
      {
        key: 'tsf_engineer_of_record',
        label: 'TSF Engineer of Record',
        type: 'text',
        placeholder: 'Name, P.E. — Firm',
        hint: 'Many regulators and GISTM require a named Engineer of Record responsible for the TSF design and management.',
        sectionRef: '4A.4',
      },
      {
        key: 'tsf_plan_title',
        label: 'TSF Management Plan Title',
        type: 'text',
        sectionRef: '4A.4',
      },
      {
        key: 'tsf_plan_number',
        label: 'TSF Plan Document Number',
        type: 'text',
        sectionRef: '4A.4',
      },
      {
        key: 'tsf_annual_review',
        label: 'TSF Annual Review Date',
        type: 'date',
        sectionRef: '4A.4',
      },
      {
        key: 'tsf_standard',
        label: 'Applicable TSF Standard',
        lookups: [
          { label: 'Global Industry Standard on Tailings Management (GISTM)', url: 'https://globaltailingsreview.org/global-industry-standard/', description: 'GISTM 2020 — international tailings standard' },
          { label: 'MAC Tailings Guide (Canada)', url: 'https://mining.ca/resources/guides-manuals/mac-tailings-guide/', description: 'Mining Association of Canada tailings management guide' },
        ],
        type: 'text',
        placeholder: 'e.g. GISTM 2020; MAC 2019 (Canada); ICMM',
        sectionRef: '4A.4',
      },
    ],
  },

  // ── 9. OPERATIONS & REPORTING ──────────────────────────────────────────────
  {
    id: 'operations',
    label: 'Operations & Reporting',
    icon: '📡',
    description: 'Operating parameters that populate TARP sections, reporting schedules, and closure placeholders throughout the document.',
    fields: [
      {
        key: 'active_dewatering',
        label: 'Active Pit Dewatering in Place?',
        type: 'select',
        options: [
          { value: '', label: '— Select —' },
          { value: 'Yes — active dewatering wells / sumps', label: 'Yes — active dewatering wells / sumps' },
          { value: 'Yes — horizontal drains only', label: 'Yes — horizontal drains only' },
          { value: 'Passive — natural drainage', label: 'Passive — natural drainage' },
          { value: 'No — arid site', label: 'No — arid / dry site' },
        ],
        hint: 'Determines whether Chapter 9 (Groundwater Management) sections are Required or Conditional.',
        sectionRef: '9.1',
      },
      {
        key: 'routine_report_freq',
        label: 'Routine Geotechnical Report Frequency',
        type: 'select',
        options: [
          { value: '', label: '— Select —' },
          { value: 'Daily', label: 'Daily' },
          { value: 'Weekly', label: 'Weekly' },
          { value: 'Fortnightly', label: 'Fortnightly' },
          { value: 'Monthly', label: 'Monthly' },
          { value: 'Quarterly', label: 'Quarterly' },
        ],
        sectionRef: '11.1',
      },
      {
        key: 'scheduled_review_freq',
        label: 'GCMP Scheduled Review Frequency',
        type: 'select',
        options: [
          { value: '', label: '— Select —' },
          { value: 'Every 6 months', label: 'Every 6 months' },
          { value: 'Annual', label: 'Annual (recommended minimum)' },
          { value: 'Every 2 years', label: 'Every 2 years' },
          { value: 'As triggered', label: 'As triggered only' },
        ],
        hint: 'WA DMIRS and CSIRO LOP recommend annual review minimum. Must also be reviewed after any significant ground movement event.',
        sectionRef: '13.1',
      },
      {
        key: 'external_review_freq',
        label: 'External / Third-Party Review Frequency',
        type: 'text',
        placeholder: 'e.g. Every 3 years, or as required by permit',
        sectionRef: '13.3',
      },
      {
        key: 'tarp_alert_levels',
        label: 'Number of TARP Alert Levels',
        type: 'select',
        options: [
          { value: '', label: '— Select —' },
          { value: '3', label: '3 levels (Alert 1 / 2 / 3)' },
          { value: '4', label: '4 levels (Alert 1 / 2 / 3 / 4) — standard' },
          { value: '5', label: '5 levels (site-specific)' },
        ],
        hint: 'Standard practice: 4 levels — Alert 1 (increased monitoring), Alert 2 (restricted access), Alert 3 (evacuation), Alert 4 (full emergency). CSIRO LOP recommends numerical thresholds at each level.',
        sectionRef: '10.3',
      },
      {
        key: 'tarp_communication',
        label: 'TARP Primary Communication Method',
        type: 'text',
        placeholder: 'e.g. Radio (Channel 4 geotechnical) + SMS to duty list',
        hint: 'Document the primary method for TARP alert notification — this populates the TARP section communication protocols.',
        cfr: '30 CFR 56.18009 — communications required during emergencies',
        sectionRef: '10.3, 10.5',
      },
      {
        key: 'assembly_points',
        label: 'Emergency Assembly Points',
        type: 'textarea',
        placeholder: 'e.g. Primary: Main Portal Laydown Area (Grid N1200, E2400). Secondary: Administration Parking Lot.',
        hint: 'Assembly points must be pre-designated, signed in the field, and communicated during site induction — not decided at the time of an event.',
        cfr: '30 CFR 56.18013 — escape and evacuation plans',
        sectionRef: '10.5',
      },
      {
        key: 'closure_slope_criteria',
        label: 'Closure Slope FoS Criterion (if known)',
        type: 'text',
        placeholder: 'e.g. Overall FoS ≥ 1.5 for public access areas; PoF < 1%',
        hint: 'Closure criteria are typically more conservative than operating criteria — no ongoing maintenance assumption. CSIRO LOP Chapter 13.',
        sectionRef: '14.1',
      },
      {
        key: 'post_closure_party',
        label: 'Post-Closure Responsible Party',
        type: 'text',
        placeholder: 'e.g. [State Agency] per Reclamation Permit No. X',
        hint: 'Who is responsible for monitoring and maintenance after mine closure? This may be a regulatory body, bonded contractor, or the operating company.',
        sectionRef: '14.2',
      },
    ],
  },

];

export const TOTAL_FIELDS = FIELD_GROUPS.reduce((sum, g) => sum + g.fields.length, 0);

// ─── FIELD LOOKUP BY KEY ──────────────────────────────────────────────────────

const _fieldMap: Record<string, FieldDef> = {};
for (const group of FIELD_GROUPS) {
  for (const field of group.fields) {
    _fieldMap[field.key] = field;
  }
}
export const FIELD_MAP = _fieldMap;
