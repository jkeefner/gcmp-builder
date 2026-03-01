// ─── SECTION CONTENT DATA ─────────────────────────────────────────────────────
// Per-section writing hints and template prompts for Phase 4 content forms.
// hint: what the engineer should write in this section (1–2 sentences)
// placeholder: textarea placeholder text
// templatePrompt: optional starting text to guide the narrative

export interface SectionContent {
  id: string;
  hint: string;
  placeholder: string;
  templatePrompt?: string;
}

export const sectionContent: Record<string, SectionContent> = {

  // ── CHAPTER 1 ──────────────────────────────────────────────────────────────

  '1.1': {
    id: '1.1',
    hint: 'Describe the document identification system used — how the document number is structured, what the revision numbering convention means, and how the cover page information is maintained and updated.',
    placeholder: 'Describe the document identification and cover page conventions for this GCMP...',
    templatePrompt: 'This document is assigned the unique identifier [DOCUMENT_NUMBER] and is maintained under [COMPANY_NAME] document control procedures. The revision number reflects the sequential update history of this plan. The cover page shall be updated each time the document is revised and re-approved.',
  },

  '1.2': {
    id: '1.2',
    hint: 'State the scheduled review frequency, list the trigger conditions that require an unscheduled review, and describe the document control process for revisions — who initiates, who reviews, who approves.',
    placeholder: 'Describe the revision history and document control process for this GCMP...',
    templatePrompt: 'This GCMP shall be reviewed at a minimum annually by the Responsible Geotechnical Engineer. Unscheduled reviews shall be triggered by: significant ground movement events; changes to mine design or production areas; changes in geotechnical conditions that affect slope performance; regulatory changes; and personnel changes affecting key roles defined in Chapter 4. All superseded revisions shall be retained in the document archive.',
  },

  '1.3': {
    id: '1.3',
    hint: 'List the roles and positions that must receive this document, describe how distribution is tracked, and note the acknowledgment requirement for key personnel.',
    placeholder: 'Describe the distribution list and acknowledgment requirements...',
    templatePrompt: 'This GCMP shall be distributed to the following roles upon each revision: Mine Manager, Responsible Geotechnical Engineer, Senior Geologist, Mine Planning Engineer, Drill and Blast Engineer, and Health and Safety Manager. A distribution and acknowledgment record shall be maintained confirming that each recipient has received and reviewed the current revision.',
  },

  // ── CHAPTER 2 ──────────────────────────────────────────────────────────────

  '2.1': {
    id: '2.1',
    hint: 'State the purpose of this GCMP in your own words — what it is intended to achieve for this specific operation, and how it fits within the broader safety management system at the mine.',
    placeholder: 'State the purpose and objectives of this GCMP for this specific operation...',
    templatePrompt: 'This Ground Control Management Plan establishes the geotechnical management framework for [MINE_NAME]. The objectives of this plan are to: (1) define the roles and responsibilities for slope management; (2) document the geotechnical model and slope design basis; (3) establish monitoring programs to detect early indications of instability; (4) define Trigger Action Response Plans for managing ground movement events; and (5) ensure ongoing regulatory compliance.',
  },

  '2.2': {
    id: '2.2',
    hint: 'Define the physical and operational scope — which pits, areas, and infrastructure types are covered by this plan. Explicitly note anything that is excluded and the reason.',
    placeholder: 'Define the scope of this GCMP — which pits, areas, and structures are covered...',
    templatePrompt: 'This GCMP applies to all pit slopes, bench faces, inter-ramp slopes, haul ramps, and in-pit access roads within [PITS_IN_SCOPE]. The plan covers the operational period from [MINE_START_YEAR] through the end of the current mine life of [MINE_LIFE]. Infrastructure types managed under separate plans are identified in Chapter 4A.',
  },

  '2.3': {
    id: '2.3',
    hint: 'Describe the applicable regulatory framework for this operation — which federal and state regulations apply, and how this GCMP satisfies or addresses those requirements.',
    placeholder: 'Describe the regulatory requirements applicable to this operation and how this GCMP addresses them...',
    templatePrompt: 'This operation is governed by [FEDERAL_REGULATION] at the federal level and [STATE_REGULATION] at the state level. Key regulatory obligations addressed in this plan include ground examination requirements (30 CFR 56.3130), catch berm adequacy (30 CFR 56.3401), self-inspection programs (30 CFR 56.18002), and incident reporting (30 CFR Part 50). This GCMP is maintained as a living document consistent with these obligations.',
  },

  '2.4': {
    id: '2.4',
    hint: 'List the primary references, standards, and related management plans that support this GCMP — geotechnical reports, design reports, regulatory standards, and cross-referenced plans.',
    placeholder: 'List references, standards, and related documents referenced in this GCMP...',
    templatePrompt: 'The following documents are referenced in this GCMP and shall be available at site: CSIRO LOP Guidelines for Open Pit Slope Design (Read & Stacey, 2009); WA DMIRS Ground Control Management in Western Australian Mining Operations (2019); 30 CFR Parts 56/57 (MSHA Metal/Nonmetal Mine Safety Standards); and site-specific geotechnical investigation reports and slope design reports listed in the section reference tables below.',
  },

  // ── CHAPTER 3 ──────────────────────────────────────────────────────────────

  '3.1': {
    id: '3.1',
    hint: 'Describe the mine location, regional setting, physiographic context (valley, plateau, mountain terrain), elevation range, access, and land tenure. This section provides geographic and logistical context for all downstream sections.',
    placeholder: 'Describe the mine location, setting, elevation, access, and physiographic context...',
  },

  '3.2': {
    id: '3.2',
    hint: 'Summarize the climate relevant to slope management — precipitation regime, design storms, freeze-thaw frequency, seasonal snow and runoff patterns, and seismic setting. Reference NOAA and USGS data sources used.',
    placeholder: 'Describe the climate, hydrology, and seismic setting relevant to slope management...',
    templatePrompt: 'Mean annual precipitation at [MINE_NAME] is [MEAN_ANNUAL_PRECIP]. The site experiences [FREEZE_THAW] freeze-thaw cycling, with frost penetration to approximately [FROST_DEPTH]. The probabilistic seismic hazard at the site is [SEISMIC_ZONE] with a peak ground acceleration of [PGA_475] at the 10% probability of exceedance in 50 years level. The probable maximum precipitation (PMP) and design storm are documented in the geotechnical investigation reports.',
  },

  '3.3': {
    id: '3.3',
    hint: 'Summarize the mine history relevant to geotechnical performance — when the mine opened, key operational phases, any documented slope instability events, and previous geotechnical studies. Institutional knowledge captured here is particularly valuable for reopened or acquired mines.',
    placeholder: 'Summarize mine history, operational phases, previous geotechnical events, and prior studies...',
  },

  // ── CHAPTER 4 ──────────────────────────────────────────────────────────────

  '4.1': {
    id: '4.1',
    hint: 'Define the organizational structure for ground control — who is responsible for what, the chain of authority, stop-work authority, sign-off protocols, and contractor accountability. This is one of the most audit-scrutinized sections.',
    placeholder: 'Describe roles, responsibilities, authority levels, and organizational structure for ground control...',
    templatePrompt: 'The Responsible Geotechnical Engineer (RGE) for this GCMP is [GEOTECH_ENGINEER]. The RGE holds stop-work authority for ground control hazards and reports to [MINE_MANAGER]. The RGE is responsible for: maintaining this GCMP; conducting and overseeing slope design; managing the slope monitoring program; implementing TARPs; and communicating geotechnical hazards to mine management. Contractor ground control responsibilities are defined in contractor-specific management plans consistent with this GCMP.',
  },

  '4.2': {
    id: '4.2',
    hint: 'Define minimum competency requirements for the RGE, geotechnical technicians, and operational supervisors who make daily ground control decisions. Specify qualifications, experience, and any required training.',
    placeholder: 'Define minimum qualifications and competency requirements for geotechnical roles...',
    templatePrompt: 'The Responsible Geotechnical Engineer shall be a licensed Professional Engineer (PE) or equivalent registration with demonstrated experience in open pit geotechnical engineering. Geotechnical technicians shall have completed site-specific ground control orientation and hold relevant technical qualifications. All personnel working in active pit areas shall complete the site ground control induction module as part of site induction.',
  },

  // ── CHAPTER 4A ─────────────────────────────────────────────────────────────

  '4A.1': {
    id: '4A.1',
    hint: 'Confirm the scope of pit slopes covered by this GCMP — list the pits, phases, and associated structures (ramps, roads, portals) that are managed under this plan.',
    placeholder: 'Confirm which pit slopes and associated structures are covered by this GCMP...',
    templatePrompt: 'All pit slopes, bench faces, inter-ramp slopes, overall slopes, haul ramps, and in-pit access roads within [PITS_IN_SCOPE] are managed under this GCMP. Slope design criteria, monitoring requirements, TARPs, and closure obligations for these structures are documented in Parts II through VI of this plan.',
  },

  '4A.2': {
    id: '4A.2',
    hint: 'State whether waste dumps are present, which management option is selected (within this GCMP or separate plan), and provide the key reference details. If managed separately, name the plan and its custodian.',
    placeholder: 'Describe the waste dump management approach — within this GCMP or separate plan...',
  },

  '4A.3': {
    id: '4A.3',
    hint: 'State whether a heap leach facility is present, the management approach selected, and key reference details. If managed separately, identify the separate plan and regulatory permit references.',
    placeholder: 'Describe the heap leach facility management approach and cross-references...',
  },

  '4A.4': {
    id: '4A.4',
    hint: 'State whether a TSF is present, confirm that a separate TSF management plan is maintained (recommended per GISTM 2020), and provide the plan name, document number, Engineer of Record, and last review date.',
    placeholder: 'Describe the TSF management approach and cross-reference to the TSF management plan...',
    templatePrompt: 'A tailings storage facility is [TSF_PRESENT] at [MINE_NAME]. In accordance with the Global Industry Standard on Tailings Management (GISTM 2020), TSF geotechnical management is addressed in a separate Tailings Storage Facility Management Plan maintained by the Engineer of Record, [TSF_ENGINEER_OF_RECORD]. That plan is document number [TSF_PLAN_NUMBER] and is reviewed annually.',
  },

  // ── CHAPTER 5 ──────────────────────────────────────────────────────────────

  '5.1': {
    id: '5.1',
    hint: 'Describe the current state of the geotechnical database — what data exists, how confident you are in it relative to the CSIRO LOP confidence level scale, what gaps remain, and what the data improvement program looks like going forward.',
    placeholder: 'Describe the geotechnical model status, data confidence level, and improvement program...',
    templatePrompt: 'The geotechnical model for [MINE_NAME] is assessed at CSIRO LOP Data Confidence Level [DATA_CONFIDENCE_LEVEL]. The model is based on [describe data sources — drillhole logging, surface mapping, laboratory testing, etc.]. Data improvement priorities include [describe gaps and planned investigations]. The geotechnical database is maintained in [describe software/system] and is updated as new data is collected during mining.',
  },

  '5.2': {
    id: '5.2',
    hint: 'Describe the geological setting — regional context, lithological units present in the pit walls, ore zone geometry, alteration zones and their geotechnical significance, and the weathering profile. Focus on what matters for slope stability rather than mineralogy.',
    placeholder: 'Describe the regional and site geology relevant to slope stability...',
  },

  '5.3': {
    id: '5.3',
    hint: 'Describe the structural geology program and findings — what data collection methods are used, the major structural domains defined, key joint sets and faults identified with their orientations and properties, and the kinematic analysis results. Reference the discontinuity description table.',
    placeholder: 'Describe the structural geology program, structural domains, joint sets, major structures, and kinematic analysis results...',
  },

  '5.4': {
    id: '5.4',
    hint: 'Describe the rock mass characterization program — classification systems used, laboratory testing program, how parameters vary by geotechnical domain, and key rock mass quality observations. Reference the domain parameter table.',
    placeholder: 'Describe the rock mass characterization program, classification results, and strength parameters by domain...',
  },

  '5.5': {
    id: '5.5',
    hint: 'Describe the hydrogeological model — aquifer systems, groundwater levels, seasonal variation, pore pressure conditions in the pit walls, and how hydrogeological data was collected. State the pore pressure parameters used in stability analyses.',
    placeholder: 'Describe the hydrogeological model, groundwater conditions, pore pressures, and dewatering status...',
  },

  '5.6': {
    id: '5.6',
    hint: 'Describe the in situ stress regime — whether measurements have been made, the assumed stress tensor, and the basis for the assumption. If no measurements exist, document the assumption and its justification.',
    placeholder: 'Describe in situ stress conditions, measurements available, and assumptions used in design...',
  },

  // ── CHAPTER 6 ──────────────────────────────────────────────────────────────

  '6.1': {
    id: '6.1',
    hint: 'State the design philosophy adopted for this operation — whether deterministic, probabilistic, or combined; the basis for selecting the approach; the data confidence level that supports it; and the primary analysis software used.',
    placeholder: 'Describe the slope design philosophy, analytical approach, and software used...',
    templatePrompt: 'Slope stability at [MINE_NAME] is assessed using a [DESIGN_APPROACH] approach using [STABILITY_SOFTWARE]. The design methodology is consistent with CSIRO LOP Guidelines for Open Pit Slope Design at the [DATA_CONFIDENCE_LEVEL] data confidence level. Slope design addresses three scales: individual bench, inter-ramp, and overall slope.',
  },

  '6.2': {
    id: '6.2',
    hint: 'Describe the geotechnical domains defined for this pit — how many, what defines their boundaries, and which pit walls or sectors correspond to each domain. Reference the domain maps in appendices.',
    placeholder: 'Describe the geotechnical domains defined for this pit — boundaries, basis, and spatial distribution...',
  },

  '6.3': {
    id: '6.3',
    hint: 'State the slope design acceptance criteria for this operation — the minimum FoS and/or maximum PoF for bench, inter-ramp, and overall slope scales, under static and seismic loading. Reference the standard used (CSIRO LOP Table 9.3/9.4 or company standard).',
    placeholder: 'State the slope design acceptance criteria — FoS and PoF thresholds by scale and loading condition...',
    templatePrompt: 'Slope design acceptance criteria for [MINE_NAME] are established in accordance with CSIRO LOP Table 9.3 (deterministic) and Table 9.4 (probabilistic). Static criteria: bench FoS ≥ [BENCH_FOS_STATIC], inter-ramp FoS ≥ [INTERRAMP_FOS_STATIC], overall FoS ≥ [OVERALL_FOS_STATIC]. Probabilistic criteria: bench PoF ≤ [BENCH_POF], inter-ramp PoF ≤ [INTERRAMP_POF], overall PoF ≤ [OVERALL_POF]. These criteria apply to normal operating conditions.',
  },

  '6.4': {
    id: '6.4',
    hint: 'Describe the design sectors defined for this pit, the slope angles and dimensions assigned to each sector, the design reports that support those angles, and the as-built compliance program. Reference the design sectors table.',
    placeholder: 'Describe the design sectors, assigned slope angles, catch berm requirements, and as-built compliance program...',
    templatePrompt: 'Pit slope design parameters for [MINE_NAME] are summarized in the Design Sectors Table below and detailed in the slope design report referenced in Appendix C. Bench height is [BENCH_HEIGHT] with bench face angles of [BENCH_FACE_ANGLE]. Inter-ramp angles of [INTERRAMP_ANGLE] and overall slope angles of [OVERALL_SLOPE_ANGLE] apply across the sectors defined. Catch berm widths are designed to meet 30 CFR 56.3401 requirements. As-built survey compliance is assessed [describe frequency and method].',
  },

  '6.5': {
    id: '6.5',
    hint: 'Identify the primary failure modes for each design sector or pit wall — planar, wedge, toppling, rotational, or complex — and describe the structural controls and triggering factors. This links directly to the monitoring design in Chapter 8.',
    placeholder: 'Describe the primary failure modes identified for each pit wall or sector and their controlling factors...',
  },

  '6.6': {
    id: '6.6',
    hint: 'Describe the seismic hazard assessment for this site — the PGA values used, their return period basis, the pseudo-static coefficient adopted, and how seismic loading is incorporated into stability analyses.',
    placeholder: 'Describe the seismic hazard characterization and how seismic loading is addressed in slope design...',
    templatePrompt: 'Seismic hazard at [MINE_NAME] has been assessed using [SEISMIC_HAZARD_REF]. The design peak ground acceleration is [PGA_475] g at the 475-year return period (10% probability of exceedance in 50 years). A pseudo-static seismic coefficient of [PSEUDO_STATIC_COEFF] is applied in stability analyses consistent with [SEISMIC_DESIGN_BASIS].',
  },

  '6.7': {
    id: '6.7',
    hint: 'Describe the extent and characteristics of weathered, oxidized, or weak rock zones in the pit walls, their different failure modes and design approach, and any special monitoring requirements for these zones.',
    placeholder: 'Describe weathered and weak rock zones in the pit walls, their properties, and design approach...',
  },

  // ── CHAPTER 7 ──────────────────────────────────────────────────────────────

  '7.1': {
    id: '7.1',
    hint: 'Describe the design review and approval process — what triggers a formal review, who must sign off at each level, what documentation is required, and how expedited review works for urgent field decisions.',
    placeholder: 'Describe the design review and sign-off process for routine and major design changes...',
    templatePrompt: 'Formal slope design review is required when: mining into a new geotechnical domain; modifying design parameters from the approved GCMP; encountering unexpected geotechnical conditions; or responding to significant ground movement events. Routine design changes require approval by [describe sign-off authority]. Major design changes require approval by [describe authority] with documented justification.',
  },

  '7.2': {
    id: '7.2',
    hint: 'Describe the blast design standards for slope management — pre-split and trim blast requirements, buffer blast standards, blast vibration limits for slope stability, and the approval process for blast designs in geotechnically sensitive areas.',
    placeholder: 'Describe blast management requirements for slope stability — pre-split standards, vibration limits, approval process...',
  },

  '7.3': {
    id: '7.3',
    hint: 'Describe the as-built survey program — how often slopes are surveyed, what parameters are measured (catch berm width, bench face angle, crest position), who reviews the results, and what action is taken when non-compliance is identified.',
    placeholder: 'Describe the as-built survey program, compliance monitoring, and non-compliance response...',
  },

  '7.4': {
    id: '7.4',
    hint: 'Describe the scaling and loose material management program — when scaling is required, who is qualified to perform it, catch berm maintenance standards, and access restrictions following scaling operations.',
    placeholder: 'Describe slope scaling requirements, loose material management, and catch berm maintenance standards...',
    templatePrompt: 'All bench faces and catch berms shall be scaled following blasting and before equipment access. Scaling shall be performed by qualified personnel using [describe equipment]. Catch berms shall be maintained free of accumulated material to preserve effective rollback catch width. Access restrictions following scaling are managed in accordance with the geotechnical hazard map requirements in Section 10.2.',
  },

  '7.5': {
    id: '7.5',
    hint: 'Describe the geotechnical data collection program during active mining — mapping frequency, logging standards, any specific data requirements when mining into new domains, and how data feeds back into the geotechnical model.',
    placeholder: 'Describe the geotechnical data collection program during mining operations...',
  },

  // ── CHAPTER 8 ──────────────────────────────────────────────────────────────

  '8.1': {
    id: '8.1',
    hint: 'Describe the overall monitoring strategy — how monitoring methods were selected relative to identified failure modes, how the pit is zoned into monitoring intensity areas, and how the strategy gets reviewed and updated as conditions change.',
    placeholder: 'Describe the monitoring strategy, zoning, objectives for each method, and strategy review process...',
    templatePrompt: 'The slope monitoring program at [MINE_NAME] is designed to detect the failure modes identified in Section 6.5 and provide sufficient advance warning to implement TARPs defined in Chapter 10. Monitoring intensity zones have been defined based on consequence of failure, failure mode, and historic slope performance. The monitoring program is reviewed [MONITORING_REVIEW_FREQUENCY] and updated following significant ground movement events.',
  },

  '8.2': {
    id: '8.2',
    hint: 'Describe the visual inspection program — who conducts inspections, at what frequency, what a standard inspection covers, the documentation format, and what indicators trigger escalation.',
    placeholder: 'Describe the visual inspection program — roles, frequency, scope, documentation, and escalation triggers...',
    templatePrompt: 'Visual inspections of all active pit areas are conducted daily by geotechnical personnel and shift supervisors. Inspection routes and checklists are maintained in [describe system]. Key indicators reviewed include: new or widening tension cracks, changes in seepage, rockfall or ravelling, berm deformation, and subsidence behind the crest. Any new indicators are immediately reported to the RGE.',
  },

  '8.3': {
    id: '8.3',
    hint: 'Describe the prism monitoring network — number of instruments, survey equipment used, standard measurement frequency, data management system, and how the network has been designed relative to failure modes and monitoring zones.',
    placeholder: 'Describe the prism/reflector network — instruments, equipment, frequency, data system, and coverage...',
  },

  '8.4': {
    id: '8.4',
    hint: 'Describe the slope stability radar system deployed — equipment type, sectors covered, displacement thresholds, operating hours, and how radar alarms integrate with TARP activation.',
    placeholder: 'Describe the slope stability radar system — equipment, coverage, thresholds, and TARP integration...',
  },

  '8.5': {
    id: '8.5',
    hint: 'Describe the InSAR monitoring program — provider, coverage area, revisit period, how results are processed and reviewed, and how InSAR data integrates with ground-based monitoring.',
    placeholder: 'Describe the InSAR program — provider, coverage, revisit period, and integration with ground monitoring...',
  },

  '8.6': {
    id: '8.6',
    hint: 'Describe the piezometer network — types of instruments installed, locations, measurement frequency, data logging system, and how piezometric trigger levels link to the TARPs in Chapter 10.',
    placeholder: 'Describe the piezometer network — instruments, locations, frequency, logging, and TARP trigger links...',
  },

  '8.7': {
    id: '8.7',
    hint: 'Describe the inclinometer program — where instruments are installed, what failure modes they are monitoring, measurement frequency, and how inclinometer data feeds into TARP decisions.',
    placeholder: 'Describe the inclinometer program — locations, failure modes monitored, frequency, and TARP integration...',
  },

  '8.8': {
    id: '8.8',
    hint: 'Describe the seismic monitoring program — passive micro-seismic network, blast monitoring seismographs, coverage, event notification thresholds, and how seismic data is interpreted and reported.',
    placeholder: 'Describe the seismic monitoring program — sensors, coverage, thresholds, and reporting...',
  },

  '8.9': {
    id: '8.9',
    hint: 'Describe the crack monitoring program — where cracks are being monitored, what instruments are used, measurement frequency, and how crack measurements feed into TARP threshold decisions.',
    placeholder: 'Describe crack monitoring locations, instruments, measurement frequency, and TARP links...',
  },

  '8.10': {
    id: '8.10',
    hint: 'Describe the monitoring data management system — where data is stored, how frequently it is updated and reviewed, who receives reports, how historical data is archived, and what triggers an out-of-cycle escalation.',
    placeholder: 'Describe the monitoring data management system, reporting frequency, distribution, and escalation protocol...',
    templatePrompt: 'Monitoring data from all instruments is consolidated in [describe system]. Standard monitoring reports are produced [ROUTINE_REPORT_FREQ] and distributed to [describe distribution list]. Real-time alerts from automated instruments are directed to [describe recipients]. All monitoring data is archived in accordance with [describe retention policy] to preserve the long-term slope performance record.',
  },

  // ── CHAPTER 9 ──────────────────────────────────────────────────────────────

  '9.1': {
    id: '9.1',
    hint: 'Describe the dewatering strategy for this operation — the approach used (wells, in-pit sumps, horizontal drains, or combination), target pore pressure conditions for each sector, and how dewatering adequacy is verified.',
    placeholder: 'Describe the mine dewatering strategy, target conditions, and verification approach...',
    templatePrompt: '[MINE_NAME] [ACTIVE_DEWATERING] an active dewatering program. The dewatering strategy employs [describe approach] to manage pit inflows and maintain pore pressures consistent with design parameters. Target pore pressure conditions by sector are documented in the slope design report and linked to piezometric trigger levels in Section 10.4.',
  },

  '9.2': {
    id: '9.2',
    hint: 'Describe the horizontal drain program — where drains are installed, the depressurization targets they are designed to achieve, installation standards, flow monitoring requirements, and the maintenance program.',
    placeholder: 'Describe the horizontal drain program — locations, design targets, monitoring, and maintenance...',
  },

  '9.3': {
    id: '9.3',
    hint: 'Describe surface water management measures for the pit — catch berm gradients, drainage ditches and sumps, storm water diversion, berm inspection requirements, and the response to significant storm events.',
    placeholder: 'Describe surface water management — berm gradients, drainage infrastructure, storm response...',
    templatePrompt: 'Surface water management at [MINE_NAME] is designed to prevent ponding on catch berms and minimize infiltration into pit walls. Minimum catch berm gradient is maintained at [describe gradient requirement] away from the slope face. Storm water sumps are maintained at [describe locations] and pumped as required. Berm drainage is inspected [describe frequency].',
  },

  // ── CHAPTER 10 ─────────────────────────────────────────────────────────────

  '10.1': {
    id: '10.1',
    hint: 'Describe the hazard register maintained for this operation — the format used, the risk matrix applied, how frequently it is reviewed, and how it is linked to the monitoring program and TARP framework.',
    placeholder: 'Describe the hazard register — format, risk matrix, review frequency, and link to monitoring and TARPs...',
    templatePrompt: 'The geotechnical hazard register for [MINE_NAME] is maintained in [HAZARD_REGISTER_FORMAT] and uses a [RISK_MATRIX_STANDARD] consequence-likelihood matrix. The register is reviewed at each scheduled GCMP review and updated following significant ground movement events. Current hazards and their controls are summarized in the register referenced in Appendix D.',
  },

  '10.2': {
    id: '10.2',
    hint: 'Describe how geotechnical hazard maps are maintained and distributed — the format, update frequency, what information they show, and how they are communicated to operational personnel.',
    placeholder: 'Describe hazard map format, content, update frequency, and distribution to operational personnel...',
    templatePrompt: 'Geotechnical hazard maps for [MINE_NAME] are maintained in [HAZARD_MAP_FORMAT] and updated [HAZARD_MAP_UPDATE_FREQ]. Maps show current restricted access zones, elevated hazard areas, fall-of-ground zones, and TARP alert zone boundaries. Current hazard maps are distributed to [describe recipients] and are available at [describe locations in pit area].',
  },

  '10.3': {
    id: '10.3',
    hint: 'Describe the TARP framework for this operation — the number of alert levels, what each level means operationally, who has authority to declare each level, and how the TARP documents are made accessible in the field.',
    placeholder: 'Describe the TARP framework — alert levels, their meaning, declaration authority, and field accessibility...',
    templatePrompt: '[MINE_NAME] uses a [TARP_ALERT_LEVELS] alert level TARP framework. Alert 1 — Increased monitoring: Initiated by the RGE or geotechnical supervisor. Increased monitoring frequency and investigation initiated. Alert 2 — Access restriction: Initiated by the RGE. Equipment and personnel excluded from defined zone. Alert 3 — Evacuation: Initiated by the RGE or Mine Manager. Full evacuation of affected area. All alert declarations and clearances are communicated via [TARP_COMMUNICATION] and logged. TARP documents are posted at [describe field locations].',
  },

  '10.4': {
    id: '10.4',
    hint: 'Describe how TARP trigger thresholds were determined for each monitoring parameter — the basis for displacement rate thresholds, how background noise levels were accounted for, and how thresholds have been calibrated against site conditions. Reference the trigger threshold table.',
    placeholder: 'Describe the basis for TARP trigger thresholds and how they were determined for this site...',
  },

  '10.5': {
    id: '10.5',
    hint: 'Describe the emergency response plan for slope failures — exclusion zones, evacuation routes, assembly points, the notification list, incident command structure, and drill program. These must be pre-defined, not improvised.',
    placeholder: 'Describe the emergency response plan — exclusion zones, evacuation routes, assembly points, notification, and drills...',
    templatePrompt: 'Emergency response for slope failure events at [MINE_NAME] is managed under the [MINE_NAME] Emergency Response Plan, consistent with this GCMP. Assembly points are located at [ASSEMBLY_POINTS]. Evacuation routes from each active pit area are shown on the current hazard maps. The emergency notification list is maintained by [describe responsibility] and is verified quarterly. TARP emergency response drills are conducted [describe frequency].',
  },

  // ── CHAPTER 11 ─────────────────────────────────────────────────────────────

  '11.1': {
    id: '11.1',
    hint: 'Describe the geotechnical reporting structure — what routine reports are produced, how frequently, who receives them, and what the escalation protocol is for communicating significant findings to mine management.',
    placeholder: 'Describe the geotechnical reporting structure, frequency, recipients, and escalation protocol...',
    templatePrompt: 'Geotechnical reports are produced [ROUTINE_REPORT_FREQ] by the RGE and distributed to [describe recipients]. Reports summarize monitoring data, ground movement events, TARP status, and any changes to ground control requirements. Significant findings are escalated to [MINE_MANAGER] immediately. Ground control status is included in shift change briefings for all active pit areas.',
  },

  '11.2': {
    id: '11.2',
    hint: 'Describe the ground control training requirements for each role — site induction requirements, operator awareness training frequency, and specialist training for geotechnical personnel. Note that records are held by the Safety department.',
    placeholder: 'Describe ground control training requirements by role — induction, operator training, specialist training...',
    templatePrompt: 'Ground control training at [MINE_NAME] is conducted at three levels: (1) All personnel complete a ground control module as part of site induction; (2) Equipment operators and supervisors complete [describe] ground control awareness training [describe frequency]; (3) Geotechnical personnel meet specialist qualification requirements defined in Section 4.2. Training records are maintained by the Safety department in [TRAINING_RECORDS_SYSTEM].',
  },

  '11.3': {
    id: '11.3',
    hint: 'Describe the pre-start inspection requirements — who conducts them, what they check, how they are documented, and what the process is when a hazard is found during an inspection.',
    placeholder: 'Describe pre-start inspection requirements — roles, scope, documentation, and hazard response process...',
    templatePrompt: 'Equipment operators shall conduct a pre-start geotechnical inspection before entering any active mining area. Inspections check for: new cracking, changes in seepage, rockfall accumulation on berms, berm deformation, and any changes from the previous shift. Results are documented using the inspection log format in Appendix H. Any new hazard identified triggers immediate notification to the shift supervisor and RGE.',
  },

  // ── CHAPTER 12 ─────────────────────────────────────────────────────────────

  '12.1': {
    id: '12.1',
    hint: 'Define what constitutes a reportable ground movement event at this operation, the internal and regulatory reporting timeframes, the format used, and how near-misses are reported even when no injury or equipment loss occurred.',
    placeholder: 'Define reportable events, internal and regulatory reporting timeframes, and reporting format...',
    templatePrompt: 'All ground movement events — including rockfalls, bench failures, significant crack development, TARP activations at Level 2 or above, and near-miss events — are reportable. Internal reporting to the RGE occurs immediately. Events meeting MSHA reporting thresholds (30 CFR Part 50) are notified to MSHA within the required timeframe. Incident reporting uses [INCIDENT_REPORTING_SYSTEM].',
  },

  '12.2': {
    id: '12.2',
    hint: 'Describe the investigation process for ground movement events — who leads the investigation, the timeline, the root cause analysis method used, how findings are incorporated into the GCMP, and how lessons learned are shared.',
    placeholder: 'Describe the investigation process, team composition, timeline, root cause method, and follow-up actions...',
  },

  // ── CHAPTER 13 ─────────────────────────────────────────────────────────────

  '13.1': {
    id: '13.1',
    hint: 'State the scheduled review frequency and list the event-based triggers that require an unscheduled review. Describe the review process and how findings are incorporated into GCMP updates.',
    placeholder: 'Describe the review schedule, event-based triggers, and review and update process...',
    templatePrompt: 'This GCMP is reviewed on a [SCHEDULED_REVIEW_FREQ] basis by the RGE. Unscheduled reviews are triggered by: ground movement events at TARP Level 2 or above; changes to the mine plan affecting pit geometry; significant changes in geotechnical conditions; regulatory changes; or changes in key personnel. Review findings are documented and incorporated into the next GCMP revision.',
  },

  '13.2': {
    id: '13.2',
    hint: 'Describe the internal audit program — scope, frequency, who conducts audits (should be independent of day-to-day operations), what is assessed, and how findings are tracked through to resolution.',
    placeholder: 'Describe the internal audit program — scope, frequency, auditor independence, and finding close-out process...',
  },

  '13.3': {
    id: '13.3',
    hint: 'Describe the external review program — frequency, reviewer qualifications, scope of review, how findings are reported, and whether any permit conditions require external review.',
    placeholder: 'Describe the external review program — frequency, reviewer qualifications, scope, and permit requirements...',
    templatePrompt: 'External geotechnical review of [MINE_NAME] slope design and GCMP is conducted [EXTERNAL_REVIEW_FREQ]. The external reviewer shall be an independent Professional Engineer with demonstrated experience in open pit geotechnical engineering. Review scope includes: slope design basis, monitoring program adequacy, TARP framework, and GCMP completeness. Review findings are documented and incorporated into the GCMP revision schedule.',
  },

  // ── CHAPTER 14 ─────────────────────────────────────────────────────────────

  '14.1': {
    id: '14.1',
    hint: 'Describe the closure slope design philosophy — the more conservative FoS and PoF criteria applied to closure slopes, any regulatory reclamation requirements, and how closure design differs from operating slope design.',
    placeholder: 'Describe the closure slope design philosophy, acceptance criteria, and regulatory requirements...',
    templatePrompt: 'Closure slope design at [MINE_NAME] is governed by [describe regulatory requirement] and applies more conservative acceptance criteria than operating slopes. The closure slope FoS criterion is [CLOSURE_SLOPE_CRITERIA] for static loading without ongoing maintenance. Closure slopes are designed for the post-mining condition including anticipated groundwater recovery. The geotechnical basis for closure slope design is documented in [describe reference].',
  },

  '14.2': {
    id: '14.2',
    hint: 'Describe the post-closure monitoring obligations — duration, responsible party, monitoring methods selected for long-term sustainability, and the response framework if post-closure monitoring detects instability.',
    placeholder: 'Describe post-closure monitoring duration, responsible party, methods, and response framework...',
    templatePrompt: 'Post-closure geotechnical monitoring at [MINE_NAME] is the responsibility of [POST_CLOSURE_PARTY] and is required for [describe duration and regulatory basis]. Monitoring methods selected for post-closure application prioritize low-maintenance, long-term approaches including [describe methods — InSAR, periodic visual inspection, automated instruments where justified]. The post-closure monitoring plan is documented in Appendix Q.',
  },
};

// ─── FLAT SECTION LIST ────────────────────────────────────────────────────────
// Ordered list of all section IDs for prev/next navigation.

export const orderedSectionIds: string[] = [
  '1.1', '1.2', '1.3',
  '2.1', '2.2', '2.3', '2.4',
  '3.1', '3.2', '3.3',
  '4.1', '4.2',
  '4A.1', '4A.2', '4A.3', '4A.4',
  '5.1', '5.2', '5.3', '5.4', '5.5', '5.6',
  '6.1', '6.2', '6.3', '6.4', '6.5', '6.6', '6.7',
  '7.1', '7.2', '7.3', '7.4', '7.5',
  '8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7', '8.8', '8.9', '8.10',
  '9.1', '9.2', '9.3',
  '10.1', '10.2', '10.3', '10.4', '10.5',
  '11.1', '11.2', '11.3',
  '12.1', '12.2',
  '13.1', '13.2', '13.3',
  '14.1', '14.2',
];
