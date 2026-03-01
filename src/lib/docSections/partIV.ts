// ─── PART IV — Implementation & Operations ───────────────────────────────────
// Sections 7.1–11.3
import type { GlobalData, SectionStates } from '../../types';
import {
  para, heading1, divider, pageBreak, partHeading,
  sectionHeader, guidanceBox, actionBox, metaTable,
  priorityBadge, checklistBox, omissionStub, fill,
  type DocNode,
} from '../docHelpers';

function isSkipped(id: string, ss: SectionStates): boolean {
  return ss[id]?.status === 'skipped';
}

export function buildPartIV(d: GlobalData, ss: SectionStates): DocNode[] {
  return [
    ...partHeading('IV', 'Implementation & Operations',
      'Chapters 7–11  ·  Design implementation, monitoring, dewatering, hazard management, TARPs, and communication'),

    // ── CH 7 ──────────────────────────────────────────────────────────────────
    heading1('CHAPTER 7 — SLOPE DESIGN IMPLEMENTATION'),
    para('Purpose: Describes how the slope design is translated from design parameters into physical excavation — blast design, operational controls, quality assurance, and design change management.'),
    divider(),

    ...(isSkipped('7.1', ss)
      ? omissionStub('7.1', 'Design Review and Approval Processes')
      : [
          ...sectionHeader('7.1', 'Design Review and Approval Processes',
            '[REQUIRED] — All operations', 'Sections 4.1, 4.2, 6.4'),
          guidanceBox('Why This Section Matters', [
            'WA DMIRS explicitly requires a sign-off protocol for key design elements as a GCMP requirement.',
            'Define when formal design review is required (new mining sectors, changed geotechnical conditions, design modifications), who must sign off, and what documentation is required.',
            'For geotechnical design changes triggered by unexpected ground conditions, the review and approval process must be quick enough to allow timely mining decisions.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('7.2', ss)
      ? omissionStub('7.2', 'Blast Management for Slope Stability')
      : [
          ...sectionHeader('7.2', 'Blast Management for Slope Stability',
            '[REQUIRED] — All blasting operations; [CONDITIONAL] — non-blasting mines', 'Sections 6.4, 7.3'),
          guidanceBox('Why This Section Matters', [
            'Controlled blasting (pre-split, trim blast) is critical for achieving design slope angles and maintaining bench face integrity.',
            'Over-blasting is a leading cause of bench instability, loss of catch berm width, and crest degradation — all of which erode the safety margin of the inter-ramp slope.',
            'GCMP should define: buffer blast design standards, pre-split/trim blast requirements by sector, minimum standoff distances, vibration limits, and who approves blast designs.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('7.3', ss)
      ? omissionStub('7.3', 'Survey Control and Design Compliance')
      : [
          ...sectionHeader('7.3', 'Survey Control, Slope As-Built Documentation, and Design Compliance',
            '[REQUIRED] — All operations', 'Sections 6.4, 8.1'),
          guidanceBox('Why This Section Matters', [
            'Design compliance monitoring — measuring actual slope geometry against the design — is a critical quality assurance function often neglected in practice.',
            'If as-built slopes are consistently steeper than design, the design factor of safety may not be achieved — the actual safety margin is unknown.',
            'Define: survey frequency, catch berm width measurement program, bench face angle measurement, reporting format, and action taken when design non-compliance is detected.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('7.4', ss)
      ? omissionStub('7.4', 'Slope Preparation, Scaling and Loose Material Management')
      : [
          ...sectionHeader('7.4', 'Slope Preparation, Scaling and Loose Material Management',
            '[REQUIRED] — All operations', 'Sections 7.2, 10.2'),
          guidanceBox('Why This Section Matters', [
            'Scaling (removal of loose material from bench faces and crests) is a critical daily operational ground control activity.',
            'US: 30 CFR 56.3130 requires that loose ground be scaled or otherwise made safe before personnel work beneath it.',
            'Loose material on catch berms reduces their effectiveness — berm maintenance requirements belong here.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('7.5', ss)
      ? omissionStub('7.5', 'Geotechnical Data Collection During Mining')
      : [
          ...sectionHeader('7.5', 'Geotechnical Data Collection During Mining',
            '[REQUIRED] — All operations', 'Section 5.1, Chapter 5'),
          guidanceBox('Why This Section Matters', [
            'Ongoing data collection during mining is how the geotechnical model is updated and refined — it closes the loop between model, design, and performance.',
            'Define: geotechnical mapping frequency and format, core logging standards, specific data collection required for new geotechnical domains encountered during mining.',
          ]),
          para(''),
          pageBreak(),
        ]),

    // ── CH 8 ──────────────────────────────────────────────────────────────────
    heading1('CHAPTER 8 — SLOPE MONITORING PROGRAM'),
    para('Purpose: Defines all monitoring systems used to detect slope movement and changes in groundwater conditions, with instrument specifications, measurement frequencies, data management, and reporting.'),
    divider(),

    ...(isSkipped('8.1', ss)
      ? omissionStub('8.1', 'Monitoring Strategy and Objectives')
      : [
          ...sectionHeader('8.1', 'Monitoring Strategy and Objectives',
            '[REQUIRED] — All operations', 'Sections 6.5, Chapter 10'),
          guidanceBox('Why This Section Matters', [
            'The monitoring strategy should be explicitly linked to the identified failure modes from Section 6.5 — each monitoring method should have a stated purpose.',
            'CSIRO LOP Chapter 12 frames monitoring in terms of: confirming design assumptions, detecting unexpected behavior, providing advance warning of instability, and generating data for TARP decisions.',
            'Define monitoring zones — areas requiring intensive monitoring vs. background monitoring — based on consequence, failure mode, and ground movement history.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('8.2', ss)
      ? omissionStub('8.2', 'Visual Inspection Program')
      : [
          ...sectionHeader('8.2', 'Visual Inspection Program',
            '[REQUIRED] — All operations', 'Sections 10.1, 11.3'),
          guidanceBox('Why This Section Matters', [
            'Visual inspection is the most fundamental monitoring tool and the first line of detection for many ground movement events.',
            'Define: daily inspection requirements by role, documentation format, and reporting chain.',
            'Key indicators to look for: new cracking, changes in seepage, rockfall/ravelling, berm deformation, subsidence behind crest.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('8.3', ss)
      ? omissionStub('8.3', 'Prism / Reflector Monitoring Network')
      : [
          ...sectionHeader('8.3', 'Prism / Reflector Monitoring Network',
            '[REQUIRED] — Most operations; [CONDITIONAL] — very small or low-consequence pits', 'Sections 8.1, 10.1'),
          guidanceBox('Why This Section Matters', [
            'Prism surveying provides precise 3D displacement vectors for specific points on a slope — the most spatially accurate movement data available.',
            'Measurement frequency: standard automated total station (ATS) networks typically measure every 1–4 hours; manual survey reduces to weekly or monthly during normal conditions.',
            'Network design should be tied to the failure modes and monitoring zones from Section 8.1.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('8.4', ss)
      ? omissionStub('8.4', 'Slope Stability Radar (SSR)')
      : [
          ...sectionHeader('8.4', 'Slope Stability Radar',
            '[CONDITIONAL] — Include if slope stability radar is deployed or planned', 'Sections 8.1, 8.3, 10.1'),
          guidanceBox('Why This Section Matters', [
            'Ground-based radar (GroundProbe SSR, Reutech RSM, IDS GeoRadar IBIS) provides continuous, high-density surface displacement mapping with millimeter sensitivity.',
            'Radar is particularly valuable for monitoring accelerating movements and providing rapid-onset warning — critical for TARP Level 3+ activations.',
            'Integration of radar alarms with TARP activation is a critical design element — define who receives the alert and what the response time requirement is.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('8.5', ss)
      ? omissionStub('8.5', 'InSAR / Satellite Radar Monitoring')
      : [
          ...sectionHeader('8.5', 'InSAR / Satellite Radar Monitoring',
            '[CONDITIONAL] — Include if InSAR or satellite radar monitoring is used', 'Sections 8.1, 8.3, 8.4'),
          guidanceBox('Why This Section Matters', [
            'Satellite InSAR provides wide-area deformation mapping at low cost, typically with revisit times of days to weeks.',
            'Best suited for detecting large-scale, slow-moving deformation behind the crest and establishing baseline conditions — not for rapid-onset warning.',
            'Increasingly used for post-closure monitoring at reasonable cost.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('8.6', ss)
      ? omissionStub('8.6', 'Piezometer Network')
      : [
          ...sectionHeader('8.6', 'Piezometer Network',
            '[REQUIRED] — Operations with groundwater above pit floor; [CONDITIONAL] — Very dry operations', 'Sections 5.5, Chapter 9'),
          guidanceBox('Why This Section Matters', [
            'Piezometric data provides direct measurement of the pore pressures used in stability analysis — without this, design parameters are assumed, not measured.',
            'Types: standpipe (Casagrande) piezometers, vibrating wire piezometers (VWPs), open standpipes. For real-time monitoring, VWPs with data loggers are preferred.',
            'Seasonal monitoring programs should capture the full annual piezometric cycle, especially spring/snowmelt peaks.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('8.7', ss)
      ? omissionStub('8.7', 'Inclinometers')
      : [
          ...sectionHeader('8.7', 'Inclinometers',
            '[CONDITIONAL] — Include if inclinometers are installed or planned; relevant where deep-seated deformation is a concern', 'Sections 8.1, 8.3'),
          guidanceBox('Why This Section Matters', [
            'Inclinometers measure subsurface deformation profiles and can locate the depth of a sliding surface — invaluable for understanding deep-seated failures.',
            'They provide early warning for developing failures before surface expression is visible.',
            'Note that inclinometers can shear off at the sliding surface once failure begins — they are an early-warning, not a continuous-monitoring tool in their manual form.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('8.8', ss)
      ? omissionStub('8.8', 'Seismic Monitoring')
      : [
          ...sectionHeader('8.8', 'Seismic Monitoring',
            '[CONDITIONAL] — Required where seismicity or blast-induced vibrations are a design concern', 'Sections 5.6, 6.6, 7.2'),
          guidanceBox('Why This Section Matters', [
            'Passive seismic monitoring can detect micro-seismic events associated with rock mass damage ahead of visible slope movement.',
            'Blast monitoring seismographs also provide PPV records for compliance with blast vibration limits from Section 7.2.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('8.9', ss)
      ? omissionStub('8.9', 'Crack Monitoring')
      : [
          ...sectionHeader('8.9', 'Crack Monitoring',
            '[CONDITIONAL] — Include if tension cracks or surface expression of deep-seated movement has been observed', 'Sections 8.1, 10.1'),
          guidanceBox('Why This Section Matters', [
            'Tension cracks behind the crest are a key early-warning indicator of developing slope instability.',
            'Crack monitoring methods: crack gauges, survey stakes, extensometers, photographic records.',
            'Crack monitoring results must feed directly into TARP trigger levels — a crack that widens from 5mm to 50mm is a different alert level than a crack that is stable.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('8.10', ss)
      ? omissionStub('8.10', 'Monitoring Data Management and Reporting')
      : [
          ...sectionHeader('8.10', 'Monitoring Data Management and Reporting',
            '[REQUIRED] — All operations', 'All Section 8 instruments, Chapter 10'),
          guidanceBox('Why This Section Matters', [
            'A monitoring program is only as good as the data management system behind it. Monitoring data that is collected but not reported in a timely manner has failed its purpose.',
            'Define: data storage system, update frequency, who sees the reports, and what triggers an escalation outside the normal reporting cycle.',
            'Historical monitoring data is critical for identifying trends and changes in behavior over time.',
          ]),
          metaTable([
            ['Routine Monitoring Report Frequency', '', 'routine_report_freq'],
          ], d),
          para(''),
          pageBreak(),
        ]),

    // ── CH 9 ──────────────────────────────────────────────────────────────────
    heading1('CHAPTER 9 — GROUNDWATER MANAGEMENT AND SLOPE DEPRESSURIZATION'),
    para('Purpose: Describes the active programs used to control groundwater and pore pressures in pit slopes.'),
    divider(),

    ...(isSkipped('9.1', ss)
      ? omissionStub('9.1', 'Dewatering Strategy and Objectives')
      : [
          ...sectionHeader('9.1', 'Dewatering Strategy and Objectives',
            '[REQUIRED] — Wet operations; [CONDITIONAL] — Arid operations', 'Sections 5.5, 6.3, 8.6'),
          guidanceBox('Why This Section Matters', [
            'Mine dewatering (lowering the water table) is distinct from slope depressurization (reducing pore pressures in pit walls) — both may be required.',
            'Define the target pore pressure conditions for each design sector — the design pore pressure must match the value used in the stability analysis from Chapter 6.',
            'Dewatering failure is one of the most common causes of slope underperformance.',
          ]),
          metaTable([
            ['Active Dewatering Program', '', 'active_dewatering'],
          ], d),
          para(''),
          divider(),
        ]),

    ...(isSkipped('9.2', ss)
      ? omissionStub('9.2', 'Horizontal Drain Program')
      : [
          ...sectionHeader('9.2', 'Horizontal Drain Program',
            '[CONDITIONAL] — Include where horizontal drains are or will be used', 'Sections 5.5, 8.6, 9.1'),
          guidanceBox('Why This Section Matters', [
            'Horizontal drains are one of the most cost-effective slope depressurization measures for open pit operations.',
            'Define: drain design basis, installation standards, maintenance, and flow monitoring.',
            'Declining drain flows may indicate drain clogging and loss of depressurization effect.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('9.3', ss)
      ? omissionStub('9.3', 'Surface Water Management')
      : [
          ...sectionHeader('9.3', 'Surface Water Management',
            '[REQUIRED] — All operations', 'Sections 3.2, 6.4'),
          guidanceBox('Why This Section Matters', [
            'Surface water management prevents rainfall from ponding on berms and infiltrating into slope faces — a direct contributor to instability.',
            'WA DMIRS notes that small volumes of water ponding on catch berms due to inadequate gradients can significantly affect ground control.',
            'Define: berm gradient requirements (typically >1–2% away from slope face), surface drainage design, storm response procedures.',
          ]),
          para(''),
          pageBreak(),
        ]),

    // ── CH 10 ─────────────────────────────────────────────────────────────────
    heading1('CHAPTER 10 — HAZARD MANAGEMENT AND TRIGGER ACTION RESPONSE PLANS (TARPs)'),
    para('Purpose: Defines the hazard identification process, risk register, and the TARP framework — the operational tool that translates monitoring data into management decisions.'),
    divider(),

    ...(isSkipped('10.1', ss)
      ? omissionStub('10.1', 'Geotechnical Hazard Register')
      : [
          ...sectionHeader('10.1', 'Geotechnical Hazard Register',
            '[REQUIRED] — All operations', 'Sections 4.1, 6.5, Chapter 8'),
          guidanceBox('Why This Section Matters', [
            'A Hazard Register is a living document that identifies each known geotechnical hazard, its likelihood and consequence, current controls, and residual risk.',
            'WA DMIRS specifically requires a hazard register as a GCMP component.',
            'The register should be reviewed after every significant ground movement event.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('10.2', ss)
      ? omissionStub('10.2', 'Geotechnical Hazard Maps')
      : [
          ...sectionHeader('10.2', 'Geotechnical Hazard Maps',
            '[REQUIRED] — All operations', 'Sections 6.2, 6.5, 10.1'),
          guidanceBox('Why This Section Matters', [
            'Geotechnical hazard maps translate the engineer\'s understanding of slope hazards into a form that operational supervisors and equipment operators can use.',
            'WA DMIRS requires geotechnical hazard maps as an element of the GCMP.',
            'Maps must be kept current — outdated hazard maps can give false confidence to personnel in areas where conditions have changed.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('10.3', ss)
      ? omissionStub('10.3', 'TARP Framework — Overview and Alert Level Definitions')
      : [
          ...sectionHeader('10.3', 'TARP Framework — Overview and Alert Level Definitions',
            '[REQUIRED] — All operations', 'Sections 8.1–8.10, 10.4, 10.5'),
          // Priority badge imported from docHelpers
          priorityBadge('TARPs are where geotechnical knowledge becomes operational action. A TARP that is vague, untested, or unknown to field personnel provides no protection.'),
          para(''),
          checklistBox('TARP Framework', [
              'Alert level definitions use specific, measurable triggers — not descriptive terms like "significant movement" that require real-time interpretation.',
              'Every monitoring instrument type deployed in Chapter 8 has a corresponding TARP trigger level in Section 10.4.',
              'Alert levels are defined for visual inspection findings as well as instrument readings — not all early warnings come from instruments.',
              'The authority to declare each TARP level is unambiguously assigned to a specific role (not a committee).',
              'Communication protocols for each alert level are explicit: who is called first, within what timeframe, and by what means.',
              'TARP documents are accessible in the field — posted at relevant locations, available on site vehicles.',
              'At least one TARP drill has been conducted in the last 12 months — drill records are maintained.',
              'TARP thresholds have been reviewed after any Level 2 or higher activation.',
              'Inverse velocity methodology (Fukuzono) is referenced as an analytical tool for accelerating displacement scenarios.',
              'The TARP distinguishes between different failure modes — different pit walls may have different triggers.',
          ]),
          para(''),
          guidanceBox('Why This Section Matters', [
            'TARPs convert monitoring data (displacement rates, piezometric levels, visual observations) into defined alert levels, each with specific required actions.',
            'Standard TARP framework uses 3–4 alert levels: Alert 1 (increased monitoring / notify), Alert 2 (access restriction / investigate), Alert 3 (evacuation), Alert 4 (full emergency response).',
            'CSIRO LOP recommends TARPs be designed with specific numerical thresholds — "slow movement" is not actionable; "5–10mm/day surface displacement" is.',
          ]),
          metaTable([
            ['TARP Alert Level System', '', 'tarp_alert_levels'],
            ['TARP Communication System', '', 'tarp_communication'],
          ], d),
          para(''),
          divider(),
        ]),

    ...(isSkipped('10.4', ss)
      ? omissionStub('10.4', 'TARP Trigger Thresholds by Monitoring Parameter')
      : [
          ...sectionHeader('10.4', 'TARP Trigger Thresholds by Monitoring Parameter',
            '[REQUIRED] — All operations', 'Sections 8.2–8.10, 10.3'),
          guidanceBox('Why This Section Matters', [
            'This section contains the actual numerical triggers used to escalate TARP alert levels — it is the most operationally critical section of the GCMP.',
            'Every monitoring parameter defined in Chapter 8 should have a corresponding TARP trigger level.',
            'Displacement rate thresholds should consider: background noise level of the instrument, current failure velocity, and critical failure velocity for the identified failure mode.',
            'Inverse velocity analysis (Fukuzono method) should be documented as an analytical tool for accelerating movement scenarios.',
          ]),
          para('[TARP TRIGGER TABLE — Complete directly in this document. Columns: Monitoring Parameter, Alert 1 Threshold, Alert 2 Threshold, Alert 3 Threshold, Alert 4 Threshold, Monitoring Frequency at Each Level]',
            { italic: true, color: '595959' }),
          para(''),
          divider(),
        ]),

    ...(isSkipped('10.5', ss)
      ? omissionStub('10.5', 'Evacuation and Emergency Response for Slope Failures')
      : [
          ...sectionHeader('10.5', 'Evacuation and Emergency Response for Slope Failures',
            '[REQUIRED] — All operations', 'Sections 10.3, 10.4'),
          priorityBadge('Every fatal slope failure where personnel were killed involves a breakdown in this section. Pre-defined exclusion zones, practiced evacuations, and clear command structures save lives.'),
          para(''),
          checklistBox('Emergency Response', [
              'Exclusion zones for each TARP alert level are defined geographically on the hazard map — personnel know the boundaries before an event occurs.',
              'Evacuation routes from every active mining area are mapped, signed in the field, and communicated during site inductions.',
              'Assembly points are designated and known to all personnel — not decided at the time of an event.',
              'The emergency notification list is current and tested — phone numbers verified within the last 3 months.',
              'MSHA emergency contact information (30 CFR Part 50) is included and current — MSHA District office number is on site.',
              'Responsibilities during an emergency are pre-assigned: incident commander, communications officer, headcount coordinator.',
              'Search and rescue procedures address the possibility that personnel may be trapped — not only evacuation.',
              'The emergency response plan integrates with the mine-wide emergency management plan.',
              'At least one emergency response drill specific to a slope failure scenario has been conducted in the past year.',
              'Exclusion zones automatically apply at TARP Level 3 activation — no additional authorization required for personnel exclusion.',
          ]),
          para(''),
          guidanceBox('Why This Section Matters', [
            'When a TARP Alert 3 or 4 is activated, the response must be immediate and practiced — not improvised.',
            'Exclusion zones should be defined geographically (on hazard maps) and pre-communicated to all personnel.',
            'TARPs should be exercised in practice drills — document drill frequency and records.',
          ]),
          metaTable([
            ['Assembly Points', '', 'assembly_points'],
          ], d),
          para(''),
          pageBreak(),
        ]),

    // ── CH 11 ─────────────────────────────────────────────────────────────────
    heading1('CHAPTER 11 — COMMUNICATION, TRAINING AND SUPERVISION'),
    para('Purpose: Defines how ground control information is communicated to all relevant personnel and what training and supervision is required.'),
    divider(),

    ...(isSkipped('11.1', ss)
      ? omissionStub('11.1', 'Geotechnical Reporting and Communication')
      : [
          ...sectionHeader('11.1', 'Geotechnical Reporting and Communication',
            '[REQUIRED] — All operations', 'Sections 8.10, 4.1'),
          guidanceBox('Why This Section Matters', [
            'Ground control communication fails most often not because monitoring detects nothing, but because what is detected is not communicated to those who need to act.',
            'Define a clear reporting hierarchy: geotechnical technician → RGE → Mine Manager → Corporate, with escalation triggers at each level.',
            'Shift change briefings should include ground control status for all active mining areas.',
          ]),
          metaTable([
            ['Routine Report Frequency', '', 'routine_report_freq'],
            ['Scheduled Review Frequency', '', 'scheduled_review_freq'],
          ], d),
          para(''),
          divider(),
        ]),

    ...(isSkipped('11.2', ss)
      ? omissionStub('11.2', 'Training Program')
      : [
          ...sectionHeader('11.2', 'Training Program',
            '[REQUIRED] — All operations', 'Sections 4.2, 11.3'),
          guidanceBox('Why This Section Matters', [
            'Training requirements vary by role: general site induction, ground control awareness for equipment operators and supervisors, and specialist training for geotechnical staff.',
            'Training records are maintained by the Safety department — this section documents requirements and references the Safety management system, not the records themselves.',
            'GCMP changes require training refreshers — define the training update trigger.',
          ]),
          metaTable([
            ['Training Records System (Safety Dept reference)', '', 'training_records_system'],
          ], d),
          para(''),
          divider(),
        ]),

    ...(isSkipped('11.3', ss)
      ? omissionStub('11.3', 'Geotechnical Hazard Pre-Start Inspections')
      : [
          ...sectionHeader('11.3', 'Geotechnical Hazard Pre-Start Inspections',
            '[REQUIRED] — All operations', 'Sections 8.2, 10.2, 11.1'),
          guidanceBox('Why This Section Matters', [
            'Pre-start inspections by equipment operators before entering a work area are a fundamental layer of ground control.',
            'Define: who performs pre-start inspections, what they check, how they document, and what to do if a hazard is found.',
            'Inspections must be documented — a verbal inspection that is not recorded provides no legal or safety value.',
          ]),
          para(''),
          pageBreak(),
        ]),
  ];
}
