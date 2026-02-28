# GCMP Builder

A structured engineering application for building **Ground Control Management Plan** documents aligned to CSIRO LOP guidelines and US regulatory requirements (MSHA 30 CFR).

Built and maintained by [Keefner Mining & Geotech LLC](https://keefnermining.com) — open for use by the broader mining geotechnical community.

---

## What It Does

GCMP Builder guides geotechnical engineers through the full structure of a Ground Control Management Plan for open pit mining operations. Rather than starting from a blank document, the engineer works through a structured app that:

- Stores all **global data fields** (mine identity, personnel, regulatory framework, design parameters, climate/seismic data) in one place — values auto-populate throughout the output document
- Presents a **complete section library** organized by life-of-mine sequence across 6 Parts and 15 Chapters
- Allows the engineer to **include, skip, or mark sections conditional** for their specific operation
- Generates a **formatted Word document** from entered data and selected sections

The section library is grounded in:
- **CSIRO LOP Guidelines for Open Pit Slope Design** (Read & Stacey 2009)
- **WA DMIRS Ground Control Management in Western Australian Mining Operations** (2019)
- **MSHA 30 CFR Parts 55–57** — US federal metal/nonmetal mine safety standards
- Public GCMPs from Wolverine Mine, Tom's Gully, and Minto Mine for benchmarking

---

## Current Status — Phase 2 of 6

| Phase | Deliverable | Status |
|-------|-------------|--------|
| 1 | Section library document — 78 sections across 14 chapters | ✅ Complete |
| 2 | App shell, project management, global data entry, section navigator | ✅ Complete |
| 3 | Section content forms, include/skip workflow, Word export | 🔲 In development |
| 4 | Guidance notes, template language, field-level metadata per section | 🔲 Planned |
| 5 | Priority section validation checklists (TARP, Emergency Response, Roles...) | 🔲 Planned |
| 6 | Full export, public data look-up integrations, offline PWA | 🔲 Planned |

---

## Getting Started

```bash
git clone https://github.com/YOUR_USERNAME/gcmp-builder.git
cd gcmp-builder
npm install
npm run dev
```

Opens at `http://localhost:5173`

**Requirements:** Node.js 18+

---

## Features (Phase 2)

### Project Management
- Create multiple GCMP projects — each stores all data independently
- Auto-saves to `localStorage` on every change — no server required, works offline
- Completion tracking per project

### Global Data Entry
Nine organized field groups covering ~65 fields:

| Group | Contents |
|-------|----------|
| Mine Identity | Name, company, location, commodity, coordinates |
| Document Control | Number, revision, dates, prepared/approved by |
| Key Personnel | Mine Manager, RGE (with stop-work authority note), consultant, training records system |
| Mine Scope & Stage | CSIRO LOP project stage, pits in scope, depth, area |
| Regulatory Framework | MSHA 30 CFR framework selector, state permit, MSHA ID |
| Climate & Seismic | Precipitation, PMP, design storm, freeze-thaw, PGA |
| Slope Design Parameters | Data confidence level, FoS/PoF acceptance criteria by scale |
| Geotechnical Infrastructure | Waste dumps, heap leach facilities, TSF — each with manage-here vs. cross-reference choice |
| Operations & Reporting | Dewatering, TARP configuration, reporting frequency, assembly points |

**MSHA CFR citations** appear inline under applicable fields.

**Public data look-up links** open directly in the browser for:
- NOAA Atlas 14 — precipitation frequency
- USGS Unified Hazard Tool — PGA values
- USGS Earthquake Catalog — historical seismicity
- NOAA Climate Normals — temperature and freeze-thaw

### Section Library Navigator
- All 6 Parts, 15 Chapters, ~80 sections with full hierarchy display
- Include / Skip toggles on every section — any section can be skipped at the engineer's discretion
- Priority sections flagged (★) — receive enhanced validation checklists in Phase 5
- Applicability badges: Recommended / Conditional / Optional
- MSHA CFR references shown per section

---

## Architecture

```
src/
  types/index.ts              TypeScript interfaces — Project, GlobalData, AppState
  data/
    globalFields.ts           Field definitions with groups, hints, CFR refs, look-up links
    sections.ts               Complete section library — Parts I–VI, all chapters and sections
  context/
    ProjectContext.tsx        React Context + useReducer, localStorage persistence
  components/
    Layout/                   Sidebar, Header
    ProjectManager/           Home screen, project CRUD
    GlobalDataForm/           Nine-group data entry form with look-up boxes
    SectionNav/               Section hierarchy browser with include/skip toggles
  styles/index.css            Design system — CSS custom properties, no UI framework
```

**Stack:** React 18 + TypeScript + Vite · No external UI library · IBM Plex Sans / Mono typography · `docx` library pre-installed for Phase 3 export

---

## Design Decisions

A few key decisions made during Phase 1 engineer review that shape the application:

**All sections are skippable.** "Recommended" is a best-practice designation, not a lock. Skipping a recommended section generates a flagged omission note in the output document. The engineer is always in control.

**Multi-value fields are not in the global store.** Values like GSI by domain, joint set orientations, and sector-by-sector slope angles vary per domain and can't be meaningfully captured as single global keys. The app generates structured table shells in the output document body that the engineer fills in directly.

**MSHA CFR mapping is explicit.** Every section with a US regulatory dimension shows the specific CFR citation alongside the plan item — not just a general reference section.

**Geotechnical infrastructure beyond pit slopes** (waste dumps, heap leach facilities, TSFs) is handled with a choice at project setup: manage within this GCMP, or cross-reference to a separate dedicated plan. TSFs default to the cross-reference option, consistent with GISTM 2020.

**Priority sections** (Roles & Responsibilities, Structural Geology, Rock Mass Characterization, Design Sectors, TARP Framework, Emergency Response) receive validation checklists in Phase 5 — checks that ask whether each item meets the relevant standard, not just whether it's been filled in.

---

## Contributing

This project is developed primarily for Keefner Mining & Geotech LLC consulting use. Issues and pull requests from the broader mining geotechnical community are welcome — particularly:

- Additional regulatory frameworks (Canadian provinces, additional Australian states)
- Validation checklist items for priority sections
- Corrections to CSIRO LOP or regulatory citations

---

## License

MIT — free to use, adapt, and distribute. Attribution appreciated but not required.

---

*Keefner Mining & Geotech LLC · Independent geotechnical consulting for western US mining operations*
