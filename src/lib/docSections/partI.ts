// ─── PART I — Document Administration & Site Context ─────────────────────────
// Sections 1.1 – 4A.4
import type { GlobalData, SectionStates } from '../../types';
import {
  para, heading1, divider, pageBreak, bullet, partHeading,
  sectionHeader, guidanceBox, actionBox, templateBox, metaTable,
  priorityBadge, checklistBox, infraChoiceBox, omissionStub, fill,
  type DocNode,
} from '../docHelpers';

function isSkipped(id: string, ss: SectionStates): boolean {
  return ss[id]?.status === 'skipped';
}

export function buildPartI(d: GlobalData, ss: SectionStates): DocNode[] {
  const nodes: DocNode[] = [
    ...partHeading('I', 'Document Administration & Site Context',
      'Chapters 1–4  ·  Who, what, where, and why — the foundation that frames everything that follows'),

    // ── CH 1 ──────────────────────────────────────────────────────────────────
    heading1('CHAPTER 1 — DOCUMENT ADMINISTRATION'),
    para('Purpose: Establishes document identity, control, approval authority, and revision history.'),
    divider(),

    // 1.1
    ...(isSkipped('1.1', ss)
      ? omissionStub('1.1', 'Cover Page and Document Identification')
      : [
          ...sectionHeader('1.1', 'Cover Page and Document Identification',
            '[REQUIRED] — All operations', 'Sections 1.2, 1.3, 2.1, 2.2, 5.1'),
          guidanceBox('Why This Section Matters', [
            'Regulators and auditors use the cover page to confirm the document is current and properly authorized.',
            'A GCMP with an outdated revision date or missing approvals is commonly cited in audit findings.',
            'The Mine Name and Company Name entered here propagate to every section of the document — enter them carefully.',
          ]),
          actionBox('Global Data Fields — Entered Once, Used Throughout', []),
          metaTable([
            ['Mine Name', '', 'mine_name'],
            ['Operating Company', '', 'company_name'],
            ['Owner / Parent Company', '', 'parent_company'],
            ['Site Location (State/Province, Country)', '', 'site_location'],
            ['Mine Type', 'Open Pit', 'mine_type'],
            ['Commodity(ies)', '', 'commodity'],
            ['Document Number', '', 'doc_number'],
            ['Revision Number', '', 'revision_number'],
            ['Revision Date', '', 'revision_date'],
            ['Prepared By', '', 'prepared_by_name'],
            ['Prepared By Title / Registration', '', 'prepared_by_title'],
            ['Approved By', '', 'approved_by_name'],
            ['Approved By Title', '', 'approved_by_title'],
          ], d),
          para(''),
          templateBox(fill('[MINE_NAME] Ground Control Management Plan — [DOCUMENT_NUMBER] Rev. [REVISION_NUMBER] — [REVISION_DATE] — Prepared by [PREPARED_BY_NAME], [PREPARED_BY_TITLE] — Approved by [APPROVED_BY_NAME], [APPROVED_BY_TITLE].', d)),
          para(''),
          divider(),
        ]),

    // 1.2
    ...(isSkipped('1.2', ss)
      ? omissionStub('1.2', 'Revision History and Document Control')
      : [
          ...sectionHeader('1.2', 'Revision History and Document Control',
            '[REQUIRED] — All operations', 'Sections 1.1, 13.1'),
          guidanceBox('Why This Section Matters', [
            'Regulators require evidence that the GCMP is a living document reviewed at specified intervals.',
            'Version control is critical when multiple consultants or staff contribute. Document control failures are among the most common GCMP audit deficiencies.',
            'CSIRO LOP emphasizes that the GCMP must be updated after major ground movement events, changes to mine plan, or changes in geotechnical conditions.',
          ]),
          actionBox('Engineer Action Required', [
            'Define the review frequency (minimum annual review is standard; more frequently if conditions change rapidly).',
            'Identify the trigger conditions that require an unscheduled review.',
            'Confirm who holds approval authority for each revision level.',
          ]),
          metaTable([
            ['Document Review Frequency', '', 'scheduled_review_freq'],
            ['Next Review Date', '', 'next_review_date'],
          ], d),
          templateBox(fill('This [MINE_NAME] Ground Control Management Plan ([DOCUMENT_NUMBER]) shall be reviewed at a minimum on an [REVIEW_FREQUENCY] basis by the Responsible Geotechnical Engineer. Superseded revisions shall be retained in accordance with [COMPANY_NAME] document control procedures.', d)),
          para(''),
          divider(),
        ]),

    // 1.3
    ...(isSkipped('1.3', ss)
      ? omissionStub('1.3', 'Distribution List and Acknowledgment')
      : [
          ...sectionHeader('1.3', 'Distribution List and Acknowledgment',
            '[REQUIRED] — All operations', 'Section 1.1, Chapter 4'),
          guidanceBox('Why This Section Matters', [
            'Confirms that key personnel have received and acknowledged the GCMP — an important element of due diligence.',
            'Australian regulators (WA DMIRS) and auditors often check that the GCMP has been distributed to operational supervisors, not just filed on the engineer\'s computer.',
          ]),
          actionBox('Engineer Action Required', [
            'List all role titles who must receive this document.',
            'Include both mine operator personnel and key contractor supervisors who work in areas affected by ground control.',
          ]),
          para(''),
          pageBreak(),
        ]),

    // ── CH 2 ──────────────────────────────────────────────────────────────────
    heading1('CHAPTER 2 — PURPOSE, SCOPE AND REFERENCES'),
    divider(),

    // 2.1
    ...(isSkipped('2.1', ss)
      ? omissionStub('2.1', 'Purpose and Objectives')
      : [
          ...sectionHeader('2.1', 'Purpose and Objectives',
            '[REQUIRED] — All operations', 'All chapters'),
          guidanceBox('Why This Section Matters', [
            'Sets the intent of the document — the \'why\'. Auditors use this to test whether the GCMP is a genuine management tool or a compliance-only filing.',
            'CSIRO LOP states that a GCMP must address safety, ore recovery, and financial return — not safety alone.',
          ]),
          templateBox(fill('[MINE_NAME] operates an open pit [COMMODITY] mine in [SITE_LOCATION]. This Ground Control Management Plan (GCMP) establishes the geotechnical framework, design standards, monitoring protocols, and management procedures necessary to ensure the safe and economical operation of pit slopes throughout the life of mine. The GCMP is a living document maintained by a competent geotechnical engineer and reviewed at a minimum on an [REVIEW_FREQUENCY] basis.', d)),
          para(''),
          divider(),
        ]),

    // 2.2
    ...(isSkipped('2.2', ss)
      ? omissionStub('2.2', 'Scope')
      : [
          ...sectionHeader('2.2', 'Scope',
            '[REQUIRED] — All operations', 'Sections 4A.1–4A.4'),
          guidanceBox('Why This Section Matters', [
            'Defines physical and operational boundaries — what is and is not covered. This protects the engineer and company if a slope failure occurs in an area not addressed by the GCMP.',
            'Must explicitly list all geotechnical infrastructure covered: pit walls, waste dumps, haul roads, any in-pit structures.',
          ]),
          actionBox('Engineer Action Required', [
            'Specify which pits / phases / sectors are covered.',
            'List all geotechnical infrastructure types covered.',
            'Note any infrastructure types excluded and the reason (e.g., tailings storage facility covered by separate TSF management plan).',
          ]),
          metaTable([
            ['Pits / Areas in Scope', '', 'pits_in_scope'],
            ['Mine Life / Operating Period', '', 'mine_life'],
            ['Mine Area (ha)', '', 'mine_area_ha'],
            ['Maximum Pit Depth (m)', '', 'total_pit_depth'],
          ], d),
          para(''),
          divider(),
        ]),

    // 2.3
    ...(isSkipped('2.3', ss)
      ? omissionStub('2.3', 'Regulatory Framework and Compliance')
      : [
          ...sectionHeader('2.3', 'Regulatory Framework and Compliance',
            '[REQUIRED] — All operations', 'All chapters'),
          guidanceBox('Why This Section Matters', [
            'Demonstrates regulatory awareness and protects the mine against claims of non-compliance.',
            'For US operations: Primary federal standard is 30 CFR Part 56 (Surface Metal/Nonmetal Mines). Key sections: 56.3130–56.3201 (ground stability), 56.3401 (catch berms), 30 CFR Part 50 (incident reporting).',
            'State requirements may add site-specific obligations beyond federal baseline. Include any specific permit conditions that impose geotechnical requirements.',
          ]),
          metaTable([
            ['Primary Federal Regulation', '', 'federal_regulation'],
            ['State/Provincial Regulation', '', 'state_regulation'],
            ['Operating Permit Number', '', 'operating_permit'],
            ['MSHA Mine ID', '', 'msha_id'],
          ], d),
          para(''),
          divider(),
        ]),

    // 2.4
    ...(isSkipped('2.4', ss)
      ? omissionStub('2.4', 'References and Related Documents')
      : [
          ...sectionHeader('2.4', 'References and Related Documents',
            '[REQUIRED] — All operations', 'All chapters'),
          guidanceBox('Why This Section Matters', [
            'Creates a single reference list for all documents cited in the GCMP.',
            'Auditors check that referenced documents exist, are current, and are accessible at site.',
          ]),
          para(''),
          pageBreak(),
        ]),

    // ── CH 3 ──────────────────────────────────────────────────────────────────
    heading1('CHAPTER 3 — SITE DESCRIPTION AND MINE BACKGROUND'),
    para('Purpose: Provides site context — location, setting, history, and current status.'),
    divider(),

    // 3.1
    ...(isSkipped('3.1', ss)
      ? omissionStub('3.1', 'Mine Location and Site Setting')
      : [
          ...sectionHeader('3.1', 'Mine Location and Site Setting',
            '[REQUIRED] — All operations', 'Sections 3.2, 6.2, 6.4, 6.5'),
          guidanceBox('Why This Section Matters', [
            'Location and physiographic setting directly affect geotechnical conditions: elevation, topographic relief, climate, seismicity, and proximity to infrastructure.',
            'Remote locations affect response times in TARPs — emergency evacuation routes must be described here.',
            'Coordinates and datum should be defined here — used consistently across monitoring sections.',
          ]),
          metaTable([
            ['Site Latitude', '', 'site_latitude'],
            ['Site Longitude', '', 'site_longitude'],
            ['Site Location / Address', '', 'site_location'],
            ['Commodity', '', 'commodity'],
            ['Mine Stage', '', 'mine_stage'],
            ['Mine Start Year', '', 'mine_start_year'],
          ], d),
          para(''),
          divider(),
        ]),

    // 3.2
    ...(isSkipped('3.2', ss)
      ? omissionStub('3.2', 'Climate and Hydrology Overview')
      : [
          ...sectionHeader('3.2', 'Climate and Hydrology Overview',
            '[REQUIRED] — All operations', 'Sections 6.4, 7.1, 9.1, 10.2'),
          guidanceBox('Why This Section Matters', [
            'Climate controls pore pressures, freeze-thaw degradation of slopes, operational windows for monitoring access, and seasonal hazard cycles.',
            'Extreme precipitation events are a common trigger for slope failures — annual precipitation, probable maximum precipitation (PMP), and design storm events belong here.',
            'Seasonal considerations should link to the TARP — e.g., elevated monitoring frequency during spring snowmelt.',
          ]),
          metaTable([
            ['Mean Annual Precipitation', '', 'mean_annual_precip'],
            ['Probable Maximum Precipitation (PMP)', '', 'pmp'],
            ['Design Storm Event (ARI)', '', 'design_storm'],
            ['Freeze-Thaw Cycles', '', 'freeze_thaw'],
            ['Frost Penetration Depth', '', 'frost_depth'],
            ['Wind Monitoring Requirements', '', 'wind_monitoring'],
            ['Seismic Zone / Region', '', 'seismic_zone'],
          ], d),
          para(''),
          para(''),
          divider(),
        ]),

    // 3.3
    ...(isSkipped('3.3', ss)
      ? omissionStub('3.3', 'Mine History and Previous Geotechnical Studies')
      : [
          ...sectionHeader('3.3', 'Mine History and Previous Geotechnical Studies',
            '[REQUIRED] — Existing operations; [CONDITIONAL] — Greenfields', 'Sections 6.1–6.6'),
          guidanceBox('Why This Section Matters', [
            'Previous ground movement events, precursor slope behavior, and historic geotechnical investigations are among the most valuable data for understanding slope performance.',
            'At reopened mines, institutional knowledge is at risk of being lost — documenting the historical record here is critical.',
            'Include any notable geotechnical events: failures, large movement episodes, unexpected water inflows, and what was learned from them.',
          ]),
          metaTable([
            ['Mine Start / Discovery Year', '', 'mine_start_year'],
            ['Current Mine Stage', '', 'mine_stage'],
          ], d),
          para(''),
          pageBreak(),
        ]),

    // ── CH 4 ──────────────────────────────────────────────────────────────────
    heading1('CHAPTER 4 — ROLES, RESPONSIBILITIES AND COMPETENCY'),
    para('Purpose: Defines who is responsible for each ground control function — a regulatory requirement in most jurisdictions and a key audit focus area.'),
    divider(),

    // 4.1
    ...(isSkipped('4.1', ss)
      ? omissionStub('4.1', 'Organizational Structure and Ground Control Responsibilities')
      : [
          ...sectionHeader('4.1', 'Organizational Structure and Ground Control Responsibilities',
            '[REQUIRED] — All operations', 'Sections 4.2, 13.1, 14.1'),
          priorityBadge('Regulators and auditors scrutinize this section first. Stop-work authority, sign-off protocols, and contractor accountability must be explicitly defined.'),
          para(''),
          checklistBox('Roles and Responsibilities', [
            'A named individual (not just a job title) is identified as the Responsible Geotechnical Engineer (RGE) for this GCMP.',
            'The RGE\'s qualifications are documented and meet the minimum competency requirements defined in Section 4.2.',
            'The RGE has documented stop-work authority for ground control hazards, independent of production requirements.',
            'Sign-off protocols for slope designs are defined: who approves routine designs, who approves designs for new or changed geotechnical conditions.',
            'Contractor geotechnical responsibilities are explicitly addressed if contractors operate in any areas covered by this GCMP.',
            'A named alternate/backup is identified for the RGE role for periods of absence.',
            'The organizational chart shows where the geotechnical function reports within the mine structure.',
            'Reporting lines for TARP escalation — from field observer to RGE to Mine Manager — are explicitly defined.',
          ]),
          para(''),
          guidanceBox('Why This Section Matters', [
            'The WA DMIRS 2019 guideline explicitly states that the GCMP must include sign-off protocols for key design elements.',
            'For mining operations with contractors, contractor geotechnical responsibilities must be defined.',
            'The GCMP should establish that the Geotechnical Engineer has stop-work authority for ground control hazards, regardless of production pressure.',
            'US: 30 CFR 56.3130 requires ground examination by a competent person before work begins — define who that person is.',
          ]),
          metaTable([
            ['Mine Manager', '', 'mine_manager'],
            ['Responsible Geotechnical Engineer (RGE)', '', 'geotech_engineer'],
            ['RGE Professional Registration', '', 'geotech_engineer_reg'],
            ['Geotechnical Consultant (if external)', '', 'geotech_consultant'],
            ['Consulting Firm', '', 'consultant_firm'],
          ], d),
          para(''),
          templateBox(fill('The Responsible Geotechnical Engineer (RGE), [GEOTECH_ENGINEER], is responsible for: maintenance of the GCMP; geotechnical design and design review; slope monitoring program management; TARP implementation oversight; and communication of slope hazards to mine management. The RGE reports to [MINE_MANAGER] and has the authority to restrict or stop mining operations in any area where slope stability conditions warrant immediate action.', d)),
          para(''),
          divider(),
        ]),

    // 4.2
    ...(isSkipped('4.2', ss)
      ? omissionStub('4.2', 'Competency Requirements')
      : [
          ...sectionHeader('4.2', 'Competency Requirements',
            '[REQUIRED] — All operations', 'Sections 4.1, 13.3'),
          guidanceBox('Why This Section Matters', [
            'Specifying minimum competency requirements for geotechnical personnel protects the mine legally and ensures continuity of standards.',
            'CSIRO LOP and WA DMIRS both emphasize that GCMPs must be maintained by "competent persons" — what constitutes competency should be explicitly defined.',
            'Consider including competency requirements for operations supervisors who make daily access decisions.',
          ]),
          metaTable([
            ['RGE Minimum Qualifications', 'Registered P.E. or equivalent; minimum experience in open pit geotechnical engineering', 'geotech_engineer_reg'],
          ], d),
          para(''),
          pageBreak(),
        ]),

    // ── CH 4A ─────────────────────────────────────────────────────────────────
    heading1('CHAPTER 4A — GEOTECHNICAL INFRASTRUCTURE IN SCOPE'),
    para('Purpose: Identifies all geotechnical infrastructure at the mine site and establishes whether each type is managed within this GCMP or by a separate dedicated management plan.'),
    divider(),

    // 4A.1
    ...(isSkipped('4A.1', ss)
      ? omissionStub('4A.1', 'Pit Slopes and Associated Structures')
      : [
          ...sectionHeader('4A.1', 'Pit Slopes and Associated Structures',
            '[REQUIRED] — All operations', 'Chapters 5–11, 14'),
          guidanceBox('Why This Section Matters', [
            'Pit slopes — including bench faces, inter-ramp slopes, overall slopes, haul ramps, and in-pit roads — are the primary subject of this GCMP.',
            'This section confirms the pit scope entered in Section 2.2 and establishes the baseline assumption that all subsequent chapters apply to pit slopes unless otherwise noted.',
          ]),
          templateBox(fill('[MINE_NAME] pit slopes, including all bench faces, inter-ramp slopes, overall slopes, haul ramps, and in-pit access roads within [PITS_IN_SCOPE], are managed under this GCMP.', d)),
          para(''),
          divider(),
        ]),

    // 4A.2
    ...(isSkipped('4A.2', ss)
      ? omissionStub('4A.2', 'Waste Rock Dumps and Overburden Stockpiles')
      : [
          ...sectionHeader('4A.2', 'Waste Rock Dumps and Overburden Stockpiles',
            '[CONDITIONAL] — Include if waste dumps are present', 'Sections 2.2, 4A.1'),
          guidanceBox('Why This Section Matters', [
            'Waste rock dumps are geotechnical structures with failure modes distinct from pit slopes: mass sliding, liquefaction of base materials, piping, and underdrain failure.',
            'Large or high-consequence waste dumps often warrant a dedicated management plan.',
            'US regulatory note: 30 CFR Part 56.3200 requires surface mine operators to maintain stable waste piles.',
          ]),
          infraChoiceBox('Waste Rock Dump / Overburden Stockpile'),
          para(''),
          metaTable([
            ['Waste Dumps Present', '', 'waste_dumps_present'],
            ['Management Approach', '', 'waste_dump_management'],
            ['Separate Plan Title (if applicable)', '', 'waste_dump_plan_title'],
            ['Separate Plan Custodian', '', 'waste_dump_plan_custodian'],
          ], d),
          para(''),
          divider(),
        ]),

    // 4A.3
    ...(isSkipped('4A.3', ss)
      ? omissionStub('4A.3', 'Heap Leach Facilities')
      : [
          ...sectionHeader('4A.3', 'Heap Leach Facilities',
            '[CONDITIONAL] — Include if heap leach pad is present or planned', 'Sections 2.2, 4A.1'),
          guidanceBox('Why This Section Matters', [
            'Heap leach facilities combine geotechnical embankment engineering with process fluid management — a specialized function.',
            'Most operators maintain a separate Heap Leach Facility Management Plan — cross-reference is the most common approach.',
            'US regulatory note: Facilities on federal lands require BLM coordination under 43 CFR Part 3809.',
          ]),
          infraChoiceBox('Heap Leach Facility'),
          para(''),
          metaTable([
            ['HLF Present', '', 'hlf_present'],
            ['Management Approach', '', 'hlf_management'],
            ['HLF Plan Title (if separate)', '', 'hlf_plan_title'],
            ['Regulatory Permit Reference', '', 'hlf_permit_ref'],
          ], d),
          para(''),
          divider(),
        ]),

    // 4A.4
    ...(isSkipped('4A.4', ss)
      ? omissionStub('4A.4', 'Tailings Storage Facilities')
      : [
          ...sectionHeader('4A.4', 'Tailings Storage Facilities',
            '[CONDITIONAL] — Include if TSF is present or planned; separate plan strongly recommended per GISTM 2020', 'Sections 2.2, 4A.1'),
          guidanceBox('Why This Section Matters', [
            'TSFs are among the highest-consequence geotechnical structures in mining. The global industry has moved strongly toward requiring standalone TSF management plans since Brumadinho.',
            'GISTM 2020 recommends dedicated tailings management documentation separate from the GCMP.',
            'US: TSFs regulated under MSHA (30 CFR Parts 77 and 57), EPA, and state environmental agencies.',
            'A cross-reference approach is strongly recommended for TSFs — include the TSF Engineer of Record, plan document number, and annual review date.',
          ]),
          infraChoiceBox('Tailings Storage Facility (TSF)'),
          para(''),
          metaTable([
            ['TSF Present', '', 'tsf_present'],
            ['Management Approach', '', 'tsf_management'],
            ['TSF Engineer of Record', '', 'tsf_engineer_of_record'],
            ['TSF Plan Title', '', 'tsf_plan_title'],
            ['TSF Plan Document Number', '', 'tsf_plan_number'],
            ['Applicable Standard (GISTM / MAC / ICMM)', '', 'tsf_standard'],
          ], d),
          para(''),
          pageBreak(),
        ]),
  ];

  return nodes;
}
