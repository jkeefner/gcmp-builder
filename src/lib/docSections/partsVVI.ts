// ─── PARTS V & VI — Governance + Closure ─────────────────────────────────────
// Sections 12.1–14.2
import type { GlobalData, SectionStates } from '../../types';
import {
  para, heading1, divider, pageBreak, partHeading,
  sectionHeader, guidanceBox, metaTable,
  omissionStub, fill,
  type DocNode,
} from '../docHelpers';

function isSkipped(id: string, ss: SectionStates): boolean {
  return ss[id]?.status === 'skipped';
}

export function buildPartV(d: GlobalData, ss: SectionStates): DocNode[] {
  return [
    ...partHeading('V', 'Governance',
      'Chapters 12–13  ·  Incident reporting, investigation, audits, reviews, and document control'),

    // ── CH 12 ─────────────────────────────────────────────────────────────────
    heading1('CHAPTER 12 — INCIDENT REPORTING AND INVESTIGATION'),
    para('Purpose: Defines requirements for reporting, investigating, and learning from ground movement events and near-misses.'),
    divider(),

    ...(isSkipped('12.1', ss)
      ? omissionStub('12.1', 'Ground Movement Event Reporting')
      : [
          ...sectionHeader('12.1', 'Ground Movement Event Reporting',
            '[REQUIRED] — All operations', 'Sections 10.3, 11.1'),
          guidanceBox('Why This Section Matters', [
            'All ground movement events — from rockfalls to bench failures to significant monitoring exceedances — must be reported and documented.',
            'MSHA requires immediate notification for certain ground movement incidents (30 CFR Part 50). Australian State Acts have equivalent requirements.',
            'Internal reporting should be broader than regulatory reporting thresholds — near-misses and early warning indicators provide the most learning value.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('12.2', ss)
      ? omissionStub('12.2', 'Ground Movement Investigation Procedure')
      : [
          ...sectionHeader('12.2', 'Ground Movement Investigation Procedure',
            '[REQUIRED] — All operations', 'Sections 10.1, 12.1'),
          guidanceBox('Why This Section Matters', [
            'Investigation of ground movement events — even minor ones — generates the most valuable data for improving slope management.',
            'Define: investigation team composition, investigation timeline, root cause analysis method, and action follow-up.',
            'Investigation findings should be incorporated into the hazard register update and GCMP revision trigger evaluation.',
          ]),
          para(''),
          pageBreak(),
        ]),

    // ── CH 13 ─────────────────────────────────────────────────────────────────
    heading1('CHAPTER 13 — AUDITS, REVIEWS AND DOCUMENT CONTROL'),
    para('Purpose: Defines the review and audit program to verify GCMP implementation and the document control system that keeps it current.'),
    divider(),

    ...(isSkipped('13.1', ss)
      ? omissionStub('13.1', 'GCMP Review Schedule and Update Triggers')
      : [
          ...sectionHeader('13.1', 'GCMP Review Schedule and Update Triggers',
            '[REQUIRED] — All operations', 'Sections 1.2, 2.2'),
          guidanceBox('Why This Section Matters', [
            'A GCMP that is not reviewed and updated is a compliance document, not a management tool.',
            'WA DMIRS and CSIRO LOP both emphasize that the GCMP must be a living document — updated in response to new information, changed conditions, or significant events.',
            'Define minimum review frequency (typically annual) AND event-triggered review conditions.',
          ]),
          metaTable([
            ['Scheduled Review Frequency', 'Annual (minimum)', 'scheduled_review_freq'],
            ['External Review Frequency', '', 'external_review_freq'],
          ], d),
          para(''),
          divider(),
        ]),

    ...(isSkipped('13.2', ss)
      ? omissionStub('13.2', 'Internal Geotechnical Audits')
      : [
          ...sectionHeader('13.2', 'Internal Geotechnical Audits',
            '[REQUIRED] — All operations', 'Sections 4.1, 13.1'),
          guidanceBox('Why This Section Matters', [
            'Internal audits independently verify that the GCMP is being implemented as written — they identify gaps between documented procedures and actual practice.',
            'Common audit findings: monitoring not performed at specified frequency, training records incomplete, TARP thresholds not reviewed after events, hazard maps outdated.',
          ]),
          para(''),
          divider(),
        ]),

    ...(isSkipped('13.3', ss)
      ? omissionStub('13.3', 'External / Third-Party Geotechnical Review')
      : [
          ...sectionHeader('13.3', 'External / Third-Party Geotechnical Review',
            '[RECOMMENDED] — All major operations; [CONDITIONAL] — Small low-consequence operations', 'Sections 4.1, 6.1, 13.2'),
          guidanceBox('Why This Section Matters', [
            'Third-party reviews by independent geotechnical professionals provide an objective check on slope design and GCMP adequacy.',
            'For large, complex, or high-consequence operations, external reviews are best practice and increasingly required by lenders, insurers, and corporate governance.',
            'Idaho and Nevada operations: external geotechnical review may be required as a condition of operating permits — verify permit conditions.',
          ]),
          metaTable([
            ['External Review Frequency', '', 'external_review_freq'],
          ], d),
          para(''),
          pageBreak(),
        ]),
  ];
}

export function buildPartVI(d: GlobalData, ss: SectionStates): DocNode[] {
  return [
    ...partHeading('VI', 'Closure',
      'Chapter 14  ·  Long-term post-closure slope stability, reclamation design criteria, and post-closure monitoring obligations'),

    heading1('CHAPTER 14 — MINE CLOSURE SLOPE CONSIDERATIONS'),
    para('Purpose: Addresses long-term post-closure stability requirements for pit slopes, waste landforms, and other geotechnical infrastructure.'),
    divider(),

    ...(isSkipped('14.1', ss)
      ? omissionStub('14.1', 'Closure Slope Design Philosophy')
      : [
          ...sectionHeader('14.1', 'Closure Slope Design Philosophy',
            '[REQUIRED] — Operations in closure planning; [CONDITIONAL] — Early stage (include placeholder)', 'Sections 6.1, 6.3'),
          guidanceBox('Why This Section Matters', [
            'Closure slopes must achieve long-term stability without ongoing maintenance — the design criteria are fundamentally different from operating slopes.',
            'CSIRO LOP Chapter 13 specifically addresses closure slope design — the regulatory and social context fundamentally changes the acceptable risk framework.',
            'Closure slope design criteria are typically more conservative: overall FoS ≥1.5 for public access areas, PoF <1% for areas with public consequence.',
            'For US operations, state reclamation permits typically require a PE-stamped geotechnical analysis demonstrating long-term pit wall stability.',
          ]),
          metaTable([
            ['Closure Slope Criteria (FoS / PoF)', '', 'closure_slope_criteria'],
            ['Post-Closure Responsible Party', '', 'post_closure_party'],
          ], d),
          para(''),
          divider(),
        ]),

    ...(isSkipped('14.2', ss)
      ? omissionStub('14.2', 'Long-Term Monitoring and Post-Closure Obligations')
      : [
          ...sectionHeader('14.2', 'Long-Term Monitoring and Post-Closure Obligations',
            '[CONDITIONAL] — Required where post-closure monitoring is required by permit or corporate obligation', 'Sections 8.1, 13.3'),
          guidanceBox('Why This Section Matters', [
            'Post-closure monitoring plans are increasingly required by regulators, particularly for large open pits where pit lake formation or long-term slope movement is expected.',
            'Monitoring programs must be designed to be sustainable over decades with minimal ongoing maintenance — simpler technologies are preferred.',
            'InSAR and satellite-based monitoring are well-suited for post-closure applications given their low operational cost and large-area coverage.',
          ]),
          metaTable([
            ['Post-Closure Responsible Party', '', 'post_closure_party'],
          ], d),
          para(''),
          pageBreak(),
        ]),
  ];
}
