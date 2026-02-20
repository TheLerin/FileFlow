---
phase: 2
plan: 2
wave: 2
depends_on: ["2-1"]
files_modified: ["src/app/tools/merge-pdf/page.tsx", "src/app/tools/split-pdf/page.tsx"]
autonomous: true
must_haves:
  truths:
    - "Users can merge multiple PDFs into a single file"
    - "Users can split a PDF into separate pages"
  artifacts:
    - "src/app/tools/merge-pdf/page.tsx"
    - "src/app/tools/split-pdf/page.tsx"
---

# Plan 2.2: PDF Merge & Split Implementations

<objective>
Implement the Merge PDF and Split PDF tools using pdf-lib.
Purpose: Core functionality of the app.
Output: Two functional tool pages.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- src/components/ui/FileUploadArea.tsx
- src/lib/pdf-utils.ts
</context>

<tasks>

<task type="auto">
  <name>Implement Merge PDF</name>
  <files>src/app/tools/merge-pdf/page.tsx</files>
  <action>
    Create a client component (`"use client";`).
    Use the `<FileUploadArea multiple accept=".pdf" />` component.
    Upon file selection, load all PDFs using `PDFDocument.load(await file.arrayBuffer())`.
    Create a new `PDFDocument`.
    Copy all pages from loaded documents into the new document using `copyPages`.
    Save the merged document and trigger download using `downloadBlob`.
    AVOID: Freezing the UI. Use a loading state (e.g., "Processing...") while generating.
  </action>
  <verify>Test-Path src/app/tools/merge-pdf/page.tsx</verify>
  <done>Merge PDF page exists and handles file merging logic</done>
</task>

<task type="auto">
  <name>Implement Split PDF</name>
  <files>src/app/tools/split-pdf/page.tsx</files>
  <action>
    Create a client component (`"use client";`).
    Use the `<FileUploadArea accept=".pdf" />` component (single file).
    Upon file selection, load the PDF.
    Extract each page into a NEW `PDFDocument`.
    Save each single-page document.
    To avoid downloading 50 separate files individually, use `jszip` (install it if necessary via `npm install jszip`) to zip the files and download one `.zip` folder.
    AVOID: Complex page-range selection UI for now. Just split EVERY page into its own file in a ZIP.
  </action>
  <verify>Test-Path src/app/tools/split-pdf/page.tsx</verify>
  <done>Split PDF page exists and zips extracted pages</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Both Merge and Split pages are successfully created
</verification>

<success_criteria>
- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
