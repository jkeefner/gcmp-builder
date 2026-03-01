// ─── PARTS II & III — Technical Basis + Design ───────────────────────────────
// Sections 5.1–6.7
import type { GlobalData, SectionStates } from '../../types';
import {
  para, heading1, divider, pageBreak, partHeading,
  sectionHeader, guidanceBox, actionBox, metaTable, lookupBox,
  priorityBadge, checklistBox, omissionStub, fill,
  type DocNode,
} from '../docHelpers';

function isSkipped(id: string, ss: SectionStates): boolean {
  return ss[id]?.status === 'skipped';
}

export function buildPartII(d: GlobalData, ss: SectionStates): DocNode[] {
  return [
    ...partHeading('II', 'Technical Basis',
      'Chapter 5  ·  The geotechnical model and all data that underpins slope design and operational decisions'),

    heading1('CHAPTER 5 — GEOTECHNICAL MODEL'),
    para('Purpose: Documents the integrated geotechnical model that underpins all slope design. CSIRO LOP dedicates six chapters (3–8) to the inputs that build this model.'),
    divider(),

    // 5.1
    ...(isSkipped('5.1', ss)
      ? omissionStub('5.1', 'Geotechnical Model Overview and Data Confidence')
      : [
          ...sectionHeader('5.1', 'Geotechnical Model Overview and Data Confidence',
            '[REQUIRED] — All operations', 'Sections 5.2–5.6, Chapter 6'),
          guidanceBox('Why This Section Matters', [
            'The geotechnical model must be described as an evolving, living database — not a static report — continuously updated as mining progresses.',
            'CSIRO LOP Table 8.1 defines five levels of data confidence by project stage (Level 1 Conceptual through Level 5 Operations). The current data confidence level directly determines acceptable design methods and factors of safety.',
            'WA DMIRS Table 3.1 sets target data confidence levels: at operations stage, geology >90%, structural >75%, rock mass >80%.',
          ]),
          metaTable([
            ['CSIRO LOP Data Confidence Level (1–5)', '', 'data_confidence_level'],
            ['Classification Systems Used', '', 'classification_systems'],
          ], d),
          para(''),
          divider(),
        ]),

    // 5.2
    ...(isSkipped('5.2', ss)
      ? omissionStub('5.2', 'Regional and Site Geology')
      : [
          ...sectionHeader('5.2', 'Regional and Site Geology',
            '[REQUIRED] — All operations', 'Sections 5.3, 5.4, 5.5, Chapter 6'),
          guidanceBox('Why This Section Matters', [
            'Geology controls the type, location, and mechanism of potential slope failures. A sound geological model is the foundation of every other section in this chapter.',
            'This section should describe lithological units, their spatial distribution, relative competence, and geotechnical significance.',
            'Regional and local structure (faults, fold axes, unconformities) control large-scale failure mechanisms.',
          ]),
          para(''),
          divider(),
        ]),

    // 5.3
    ...(isSkipped('5.3', ss)
      ? omissionStub('5.3', 'Structural Geology and Discontinuity Characterization')
      : [
          ...sectionHeader('5.3', 'Structural Geology and Discontinuity Characterization',
            '[REQUIRED] — All operations', 'Sections 5.4, 6.2, 6.3'),
          priorityBadge('Structure is the primary control on failure mechanism in most hard rock pits. Gaps here propagate through every downstream design and monitoring decision.'),
          para(''),
          checklistBox('Structural Geology', [
            'All primary joint sets are described with orientation (dip/dip direction), persistence, spacing, roughness, aperture, and infilling — not just a stereonet plot.',
            'Major faults and shear zones that intersect or are proximal to pit walls are individually described, not grouped.',
            'Structural data collection methods are documented (core logging standards, scanline/window mapping protocol, photogrammetry use).',
            'A kinematic analysis has been performed for each design sector — planar, wedge, and toppling failure potential are assessed.',
            'Structural domains have been defined and their boundaries mapped — domain boundaries align with geotechnical domain boundaries in Section 6.2.',
            'The structural model has been validated against exposures from ongoing mining (not based only on pre-mining drillhole data).',
            'Shear strength parameters for critical discontinuities are documented and referenced to laboratory or tilt test data.',
            'CSIRO LOP Chapter 4 data confidence requirements for the current project stage are met for structural characterization.',
          ]),
          para(''),
          guidanceBox('Why This Section Matters', [
            'Structure is the primary control on failure mechanism in most hard rock open pits. CSIRO LOP Chapter 4 treats structural geology as the most critical input to slope design.',
            'This section should describe joint sets, faults, shear zones with their orientations, persistence, spacing, roughness, infilling, and strength.',
            'A structural model — defining structural domains — is the basis for geotechnical domain boundaries in Section 6.2.',
          ]),
          para(''),
          actionBox('Joint Set and Fault Descriptions — Table in Document Body', [
            'Joint set orientations, faults, and shear zones are site-specific multi-row data that cannot be captured as single global values.',
            'Complete the discontinuity description table below — one row per joint set or major structure.',
            'Fields: Designation, Dip/Dip Direction, Persistence, Spacing, Roughness, Infilling, Shear Strength (φ/c), Notes.',
          ]),
          para(''),
          // Empty table for engineer to fill in
          para('[DISCONTINUITY DESCRIPTION TABLE — Complete directly in this document]',
            { italic: true, color: '595959' }),
          para(''),
          divider(),
        ]),

    // 5.4
    ...(isSkipped('5.4', ss)
      ? omissionStub('5.4', 'Rock Mass Characterization')
      : [
          ...sectionHeader('5.4', 'Rock Mass Characterization',
            '[REQUIRED] — All operations', 'Sections 5.3, 6.2, 6.3'),
          priorityBadge('Rock mass parameters are the direct inputs to stability analysis. Poorly documented or inappropriate parameters undermine the validity of every FoS calculation in the GCMP.'),
          para(''),
          checklistBox('Rock Mass Characterization', [
            'The classification system(s) selected are appropriate for the rock type and the analysis method used in Chapter 6 (e.g., GSI is appropriate for Hoek-Brown criterion).',
            'Classification ratings are documented by geotechnical domain — not a single mine-wide value.',
            'A sufficient number of rating observations are available to characterize variability — statistical summary by domain is present.',
            'Intact rock strength (UCS) data is from representative laboratory testing — sample selection bias toward competent core is acknowledged and addressed if present.',
            'Hoek-Brown constants (mi, D factor) are documented with their source and rationale.',
            'Equivalent Mohr-Coulomb parameters (c\', φ\') derived for the design stress range are documented for each domain.',
            'Rock mass classification of weathered/altered zones is addressed separately from fresh rock.',
            'CSIRO LOP Table 8.1 data confidence targets at the current project stage are met.',
          ]),
          para(''),
          guidanceBox('Why This Section Matters', [
            'Rock mass classification provides the link between field observations and engineering parameters used in slope stability analysis.',
            'Standard classification systems used in open pit mining: Rock Mass Rating (RMR89), GSI, and Slope Mass Rating (SMR).',
            'Different geotechnical domains will have different rock mass classifications — document ranges by domain.',
          ]),
          metaTable([
            ['Classification System(s) Used', '', 'classification_systems'],
            ['Intact Rock UCS Range (MPa)', '', 'ucs_range'],
          ], d),
          para(''),
          actionBox('Domain-Specific Parameters — Table in Document Body', [
            'GSI ranges, RMR values, cohesion, friction angle, and Hoek-Brown constants vary by domain.',
            'Complete the parameter table below — one row per geotechnical domain.',
            'Parameters by domain: GSI (min/mean/max), mi, UCS (mean), c\' (kPa), φ\' (degrees).',
          ]),
          para('[ROCK MASS PARAMETER TABLE BY DOMAIN — Complete directly in this document]',
            { italic: true, color: '595959' }),
          para(''),
          divider(),
        ]),

    // 5.5
    ...(isSkipped('5.5', ss)
      ? omissionStub('5.5', 'Hydrogeological Model and Groundwater Conditions')
      : [
          ...sectionHeader('5.5', 'Hydrogeological Model and Groundwater Conditions',
            '[REQUIRED] — All operations', 'Sections 9.1, 9.2, 8.6'),
          guidanceBox('Why This Section Matters', [
            'Pore pressure is often the most significant operational variable affecting slope stability — yet also the most directly controllable through depressurization programs.',
            'CSIRO LOP dedicates an entire chapter (Chapter 6) to hydrogeology. Failure to characterize groundwater conditions is a common gap in GCMPs.',
            'Even arid sites need a hydrogeological section — perched aquifers and storm events still generate pore pressure effects.',
          ]),
          metaTable([
            ['Active Dewatering Program', '', 'active_dewatering'],
          ], d),
          para(''),
          divider(),
        ]),

    // 5.6
    ...(isSkipped('5.6', ss)
      ? omissionStub('5.6', 'In Situ Stress')
      : [
          ...sectionHeader('5.6', 'In Situ Stress',
            '[CONDITIONAL] — Required for deep pits (>400m), weak rock, or stress-driven failure mechanisms', 'Sections 5.4, 6.3'),
          guidanceBox('Why This Section Matters', [
            'For most open pit slopes, gravitational stress dominates and in situ stress measurement is not required.',
            'However, for deep pits (>400m) or where toppling/buckling failure modes are suspected, stress characterization is important.',
            'If no stress data is available, document the assumption made and the basis for it (e.g., gravitational only, k0=0.5).',
          ]),
          para(''),
          pageBreak(),
        ]),
  ];
}

export function buildPartIII(d: GlobalData, ss: SectionStates): DocNode[] {
  return [
    ...partHeading('III', 'Design',
      'Chapter 6  ·  Slope design philosophy, criteria, failure modes, and design for ancillary geotechnical infrastructure'),

    heading1('CHAPTER 6 — SLOPE DESIGN'),
    para('Purpose: Documents the slope design philosophy, geotechnical domains, design parameters, acceptance criteria, and failure mechanisms for all pit slopes.'),
    divider(),

    // 6.1
    ...(isSkipped('6.1', ss)
      ? omissionStub('6.1', 'Design Philosophy and Approach')
      : [
          ...sectionHeader('6.1', 'Design Philosophy and Approach',
            '[REQUIRED] — All operations', 'All of Chapter 6'),
          guidanceBox('Why This Section Matters', [
            'Documents the engineering philosophy underlying slope design — this is what gets tested when a slope underperforms.',
            'Should state explicitly whether design is deterministic (FoS-based) or probabilistic (PoF-based), or a combination — and why.',
            'CSIRO LOP distinguishes three slope scales: bench, inter-ramp, and overall. Design criteria differ at each scale.',
          ]),
          metaTable([
            ['Design Approach', '', 'design_approach'],
            ['Primary Stability Analysis Software', '', 'stability_software'],
            ['Data Confidence Level', '', 'data_confidence_level'],
          ], d),
          para(''),
          divider(),
        ]),

    // 6.2
    ...(isSkipped('6.2', ss)
      ? omissionStub('6.2', 'Geotechnical Domains')
      : [
          ...sectionHeader('6.2', 'Geotechnical Domains',
            '[REQUIRED] — All operations', 'Sections 5.2–5.5, 6.3, 6.4'),
          guidanceBox('Why This Section Matters', [
            'Geotechnical domains are areas of the pit where geological, structural, and rock mass conditions are sufficiently similar that a single set of design parameters can be applied.',
            'Domain boundaries are defined by geological contacts, structural domain boundaries, weathering fronts, and rock mass transitions.',
            'At complex mines, domain boundary uncertainty is a significant source of design risk — document where boundaries are well-constrained vs. inferred.',
          ]),
          para(''),
          divider(),
        ]),

    // 6.3
    ...(isSkipped('6.3', ss)
      ? omissionStub('6.3', 'Slope Design Criteria and Acceptance Criteria')
      : [
          ...sectionHeader('6.3', 'Slope Design Criteria and Acceptance Criteria',
            '[REQUIRED] — All operations', 'Sections 6.1, 6.2, 6.4'),
          guidanceBox('Why This Section Matters', [
            'This is the most critical technical section of the GCMP. Slope design criteria define the minimum acceptable FoS or maximum acceptable PoF.',
            'CSIRO LOP Table 9.3: bench FoS ≥1.1, inter-ramp FoS ≥1.2–1.3, overall FoS ≥1.3–1.5, depending on consequence.',
            'CSIRO LOP Table 9.4: bench PoF <25–50%, inter-ramp PoF <15–20%, overall PoF <5–10% depending on consequence category.',
            'Criteria must be stated for each consequence category — not just one number for all slopes.',
          ]),
          metaTable([
            ['Bench FoS Minimum (Static)', '', 'bench_fos_static'],
            ['Bench PoF Maximum', '', 'bench_pof'],
            ['Inter-Ramp FoS Minimum (Static)', '', 'interramp_fos_static'],
            ['Inter-Ramp PoF Maximum', '', 'interramp_pof'],
            ['Overall FoS Minimum (Static)', '', 'overall_fos_static'],
            ['Overall PoF Maximum', '', 'overall_pof'],
          ], d),
          para(''),
          divider(),
        ]),

    // 6.4
    ...(isSkipped('6.4', ss)
      ? omissionStub('6.4', 'Design Sectors and Slope Angles')
      : [
          ...sectionHeader('6.4', 'Design Sectors and Slope Angles',
            '[REQUIRED] — All operations', 'Sections 6.2, 6.3'),
          priorityBadge('This section is what pit engineers and surveyors check against daily. Ambiguous or incomplete sector definitions are a direct operational ground control risk.'),
          para(''),
          checklistBox('Design Sectors and Slope Angles', [
            'Every active mining sector has an assigned geotechnical domain and corresponding design parameters — no active sectors are left as "TBD" without documented interim parameters.',
            'Bench height, bench face angle, catch berm width, and inter-ramp angle are explicitly stated for each sector — not presented as mine-wide defaults only.',
            'Design parameters are traceable to a formal slope stability analysis — the analysis report is cited and available.',
            'Minimum catch berm widths meet or exceed 30 CFR 56.3401 (US): "adequate to catch rollback" — with measured widths on file.',
            'Inter-ramp angles are stated as measured from horizontal — potential for confusion with face angles is addressed.',
            'Design changes from the previous GCMP revision are documented with the basis for the change and date of approval.',
            'As-built compliance program is defined — sector design parameters are periodically compared against surveyed geometry (Section 7.3).',
            'Sector boundaries are clearly mapped and correspond to geotechnical domain boundaries from Section 6.2.',
          ]),
          para(''),
          guidanceBox('Why This Section Matters', [
            'Design sectors are the operational implementation of geotechnical domains — each maps to a specific set of allowed bench angles, bench widths, inter-ramp angles, and catch berm dimensions.',
            'This section should reference the formal slope design report(s) for full analytical support — the GCMP summarizes and references, it doesn\'t replace the design report.',
            'Changes to design sectors require formal design review and GCMP revision — document the change control process.',
          ]),
          metaTable([
            ['Bench Height', '', 'bench_height'],
            ['Bench Face Angle Range (°)', '', 'bench_face_angle'],
            ['Inter-Ramp Angle Range (°)', '', 'interramp_angle'],
            ['Overall Slope Angle Range (°)', '', 'overall_slope_angle'],
          ], d),
          para('[DESIGN SECTORS TABLE — Complete directly in this document. Columns: Sector, Domain, BFA (°), BH (m), Berm Width (m), IRA (°), OSA (°), FoS, PoF, Analysis Reference]',
            { italic: true, color: '595959' }),
          para(''),
          divider(),
        ]),

    // 6.5
    ...(isSkipped('6.5', ss)
      ? omissionStub('6.5', 'Failure Modes and Mechanisms')
      : [
          ...sectionHeader('6.5', 'Failure Modes and Mechanisms',
            '[REQUIRED] — All operations', 'Sections 5.3, 6.3, 10.1'),
          guidanceBox('Why This Section Matters', [
            'Failure mode identification drives monitoring design, TARP thresholds, and emergency response planning.',
            'CSIRO LOP Chapter 9: primary failure modes — planar sliding, wedge sliding, toppling, rotational, complex multi-mechanism, and bench-scale ravelling.',
            'Each failure mode has different precursor signals — this section connects to monitoring design in Chapter 8.',
          ]),
          para(''),
          divider(),
        ]),

    // 6.6
    ...(isSkipped('6.6', ss)
      ? omissionStub('6.6', 'Seismic Hazard and Earthquake Design Loads')
      : [
          ...sectionHeader('6.6', 'Seismic Hazard and Earthquake Design Loads',
            '[CONDITIONAL] — Required if PGA >0.05g or if regulatory requirement exists', 'Sections 3.2, 6.3'),
          guidanceBox('Why This Section Matters', [
            'For operations in the western US (Idaho, Nevada, Montana, Utah), seismic design loads are often significant and may be required by state operating permits.',
            'Pseudo-static seismic coefficients used in stability analysis must be documented and their basis stated.',
            'CSIRO LOP and WA DMIRS both address seismic loading as a special condition.',
          ]),
          metaTable([
            ['Seismic Zone / Region', '', 'seismic_zone'],
            ['PGA at Bedrock (g) — 475-yr return (10% in 50 yr)', '', 'pga_475'],
            ['PGA at Bedrock (g) — 2,475-yr return (2% in 50 yr)', '', 'pga_2475'],
            ['Pseudo-Static Coefficient Used in Design', '', 'pseudo_static_coeff'],
            ['Seismic Design Basis / Standard', '', 'seismic_design_basis'],
            ['Seismic Hazard Assessment Reference', '', 'seismic_hazard_ref'],
          ], d),
          para(''),
          lookupBox([
            { label: 'Site-Specific PGA (US sites)', url: 'https://earthquake.usgs.gov/hazards/interactive/', description: 'USGS Unified Hazard Tool — enter site coordinates for PGA at 2% and 10% probability of exceedance in 50 years.' },
            { label: 'ASCE 7 Seismic Parameters', url: 'https://asce7hazardtool.online/', description: 'ASCE 7 online tool — Ss, S1, and derived design parameters by latitude/longitude.' },
          ]),
          para(''),
          divider(),
        ]),

    // 6.7
    ...(isSkipped('6.7', ss)
      ? omissionStub('6.7', 'Weak Rock and Weathering Considerations')
      : [
          ...sectionHeader('6.7', 'Weak Rock and Weathering Considerations',
            '[CONDITIONAL] — Required where weathered, oxidized, or weak rock zones exist', 'Sections 5.2, 5.4, 6.3, 6.4'),
          guidanceBox('Why This Section Matters', [
            'Weathered and oxidized zones commonly have degraded rock mass properties and different failure mechanisms than fresh rock.',
            'CSIRO LOP companion volume (Martin & Stacey 2018) dedicates an entire book to weak rock slope design.',
            'Many failures in operating pits initiate in the weathered zone — special monitoring attention should be given to these areas.',
          ]),
          para(''),
          pageBreak(),
        ]),
  ];
}
