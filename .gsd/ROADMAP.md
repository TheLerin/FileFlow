# ROADMAP.md

> **Current Phase**: Not started
> **Milestone**: v1.0

## Must-Haves (from SPEC)
- [ ] 100% Client-side processing (Privacy First)
- [ ] Comprehensive suite for PDF, Image, and Spreadsheet tools
- [ ] Clean, professional, modern UI (Next.js + Tailwind)

## Phases

### Phase 1: Foundation & Project Setup
**Status**: ✅ Complete
**Objective**: Scaffold the Next.js application, setup Tailwind CSS, configure the routing structure for the tool categories, and build the main landing/hub page. Establish the core UI components (buttons, drag-and-drop zones, cards).

### Phase 2: Core PDF Operations (pdf-lib)
**Status**: ✅ Complete
**Objective**: Implement tools for manipulating existing PDFs using `pdf-lib`. Includes: Merge PDF, Split PDF, Rotate PDF, Add Watermark, Protect PDF, and Remove Password (requires knowing original password).

### Phase 3: Image Operations & Conversion
**Status**: ✅ Complete
**Objective**: Implement Canvas API tools for image manipulation and conversion. Includes: Image to PDF, PDF to Image, WebP to JPG, Image Compressor, Resize, Crop, HEIC to JPG (`heic2any`).bP ↔ JPG, and PDF to JPG/PNG (using pdf.js to render).

### Phase 4: Office/Data Document Conversion (SheetJS / Mammoth)
**Status**: ✅ Complete
**Objective**: Implement Excel ↔ CSV, Excel ↔ JSON, XLS → XLSX, and Word (DOCX) → TXT/HTML.

### Phase 5: Polish, Optimization & Launch
**Status**: ⬜ Not Started
**Objective**: Final UI polish, implement web workers for heavy processing if necessary to prevent UI freezing, ensure mobile responsiveness, and clean up any edge-case browser memory leaks.
