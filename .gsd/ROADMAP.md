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
**Status**: ✅ Complete
**Objective**: Implement global error boundaries, lazy loading for heavy tools (like PDF.js), PWA support, accessibility improvements, and final testing. Deploy to a static host (e.g., Vercel, Netlify) or prepare the static export build.

### Phase 6: Developer & Data Science Utilities
**Status**: ✅ Complete
**Objective**: Implement Code to PDF/Image (Python, Java, C++) with Syntax Highlighting, Jupyter Notebook (IPYNB) Extraction & Merging, and a UI Google-Color refresh.ge-case browser memory leaks.
