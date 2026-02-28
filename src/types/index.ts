// ─── GLOBAL DATA STORE ───────────────────────────────────────────────────────
// All ~55 scalar fields that auto-populate throughout the GCMP document.
// Multi-value data (joint sets, domain parameters, etc.) is NOT here —
// those generate structured tables in the output document body.

export interface GlobalData {
  // Mine Identity
  mine_name: string;
  company_name: string;
  parent_company: string;
  site_location: string;
  site_latitude: string;
  site_longitude: string;
  commodity: string;

  // Document Control
  doc_number: string;
  revision_number: string;
  revision_date: string;
  prepared_by_name: string;
  prepared_by_title: string;
  approved_by_name: string;
  approved_by_title: string;
  next_review_date: string;

  // Key Personnel
  mine_manager: string;
  geotech_engineer: string;       // Responsible Geotechnical Engineer (RGE)
  geotech_engineer_reg: string;   // RGE PE/PEng registration number
  geotech_consultant: string;
  consultant_firm: string;

  // Mine Scope & Stage
  mine_stage: string;
  mine_life: string;
  mine_start_year: string;
  pits_in_scope: string;
  total_pit_depth: string;
  mine_area_ha: string;

  // Regulatory Framework
  regulatory_framework: string;   // US / Australia / Canada / Corporate
  federal_regulation: string;
  state_regulation: string;
  operating_permit: string;
  msha_id: string;

  // Climate & Hydrology
  mean_annual_precip: string;
  pmp: string;
  design_storm: string;
  freeze_thaw: string;
  frost_depth: string;
  wind_monitoring: string;

  // Seismic
  seismic_zone: string;
  pga_475: string;
  pga_2475: string;
  pseudo_static_coeff: string;
  seismic_design_basis: string;
  seismic_hazard_ref: string;

  // Slope Design Parameters
  data_confidence_level: string;
  design_approach: string;        // Deterministic / Probabilistic / Both
  stability_software: string;
  bench_height: string;
  bench_face_angle: string;
  bench_fos_static: string;
  bench_pof: string;
  interramp_angle: string;
  interramp_fos_static: string;
  interramp_pof: string;
  overall_slope_angle: string;
  overall_fos_static: string;
  overall_pof: string;
  classification_systems: string;
  ucs_range: string;

  // Geotechnical Infrastructure
  waste_dumps_present: string;
  waste_dump_management: string;
  waste_dump_plan_title: string;
  waste_dump_plan_custodian: string;
  hlf_present: string;
  hlf_management: string;
  hlf_plan_title: string;
  hlf_permit_ref: string;
  tsf_present: string;
  tsf_management: string;
  tsf_engineer_of_record: string;
  tsf_plan_title: string;
  tsf_plan_number: string;
  tsf_annual_review: string;
  tsf_standard: string;

  // Operations & Reporting
  active_dewatering: string;
  routine_report_freq: string;
  scheduled_review_freq: string;
  external_review_freq: string;
  tarp_alert_levels: string;
  tarp_communication: string;
  assembly_points: string;

  // Closure
  closure_slope_criteria: string;
  post_closure_party: string;
  training_records_system: string;
}

export function emptyGlobalData(): GlobalData {
  return createEmptyGlobalData();
}

// ─── SECTION STATUS ───────────────────────────────────────────────────────────

export type SectionStatus = 'included' | 'skipped' | 'not-applicable';

export interface SectionState {
  status: SectionStatus;
  skipReason?: string;
  completionPercent?: number;     // Phase 3+
}

export type SectionStates = Record<string, SectionState>;

// ─── PROJECT ──────────────────────────────────────────────────────────────────

export interface Project {
  id: string;
  created: string;
  modified: string;
  globalData: GlobalData;
  sectionStates: SectionStates;
  notes: string;                  // Engineer's working notes
}

export function createProject(mineName: string): Project {
  const id = `proj_${Date.now()}`;
  const now = new Date().toISOString();
  const globalData = createEmptyGlobalData();
  globalData.mine_name = mineName;
  globalData.revision_date = new Date().toLocaleDateString('en-US');
  globalData.revision_number = '0.1';
  return {
    id,
    created: now,
    modified: now,
    globalData,
    sectionStates: {},
    notes: '',
  };
}

export function createEmptyGlobalData(): GlobalData {
  return {
    mine_name: '', company_name: '', parent_company: '', site_location: '',
    site_latitude: '', site_longitude: '', commodity: '',
    doc_number: '', revision_number: '', revision_date: '', prepared_by_name: '',
    prepared_by_title: '', approved_by_name: '', approved_by_title: '', next_review_date: '',
    mine_manager: '', geotech_engineer: '', geotech_engineer_reg: '',
    geotech_consultant: '', consultant_firm: '',
    mine_stage: '', mine_life: '', mine_start_year: '', pits_in_scope: '',
    total_pit_depth: '', mine_area_ha: '',
    regulatory_framework: '', federal_regulation: '', state_regulation: '',
    operating_permit: '', msha_id: '',
    mean_annual_precip: '', pmp: '', design_storm: '', freeze_thaw: '',
    frost_depth: '', wind_monitoring: '',
    seismic_zone: '', pga_475: '', pga_2475: '', pseudo_static_coeff: '',
    seismic_design_basis: '', seismic_hazard_ref: '',
    data_confidence_level: '', design_approach: '', stability_software: '',
    bench_height: '', bench_face_angle: '', bench_fos_static: '', bench_pof: '',
    interramp_angle: '', interramp_fos_static: '', interramp_pof: '',
    overall_slope_angle: '', overall_fos_static: '', overall_pof: '',
    classification_systems: '', ucs_range: '',
    waste_dumps_present: '', waste_dump_management: '', waste_dump_plan_title: '',
    waste_dump_plan_custodian: '', hlf_present: '', hlf_management: '',
    hlf_plan_title: '', hlf_permit_ref: '', tsf_present: '', tsf_management: '',
    tsf_engineer_of_record: '', tsf_plan_title: '', tsf_plan_number: '',
    tsf_annual_review: '', tsf_standard: '',
    active_dewatering: '', routine_report_freq: '', scheduled_review_freq: '',
    external_review_freq: '', tarp_alert_levels: '', tarp_communication: '',
    assembly_points: '',
    closure_slope_criteria: '', post_closure_party: '', training_records_system: '',
  };
}

// ─── APP STATE ────────────────────────────────────────────────────────────────

export type AppView = 'home' | 'global-data' | 'sections' | 'export';

export interface AppState {
  projects: Project[];
  activeProjectId: string | null;
  view: AppView;
  globalDataGroup: string;        // which form group is visible
  isDirty: boolean;               // unsaved changes
}

// ─── LOOKUP REFERENCES ────────────────────────────────────────────────────────

export interface LookupRef {
  label: string;
  url: string;
  description: string;
}
