---
phase: 2
plan: 3
wave: 2
depends_on: ["2-1"]
files_modified: ["src/app/tools/rotate-pdf/page.tsx", "src/app/tools/add-watermark/page.tsx"]
autonomous: true
must_haves:
  truths:
    - "Users can rotate a PDF by 90 degrees"
    - "Users can add a text watermark to every page of a PDF"
  artifacts:
    - "src/app/tools/rotate-pdf/page.tsx"
    - "src/app/tools/add-watermark/page.tsx"
---

# Plan 2.3: PDF Rotate & Watermark Implementations

<objective>
Implement the Rotate PDF and Add Watermark tools.
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
  <name>Implement Rotate PDF</name>
  <files>src/app/tools/rotate-pdf/page.tsx</files>
  <action>
    Create a client component (`"use client";`).
    Use the `<FileUploadArea accept=".pdf" />`.
    Once a file is selected, show a UI with "Rotate Clockwise" and "Rotate Counter-Clockwise" buttons.
    When spinning, iterate through all pages (`doc.getPages()`) and use `page.setRotation(degrees)`.
    Download the rotated file.
    AVOID: Complex exact-angle inputs. 90-degree increments are fine.
  </action>
  <verify>Test-Path src/app/tools/rotate-pdf/page.tsx</verify>
  <done>Rotate PDF page exists and alters page rotation</done>
</task>

<task type="auto">
  <name>Implement Add Watermark</name>
  <files>src/app/tools/add-watermark/page.tsx</files>
  <action>
    Create a client component (`"use client";`).
    Use the `<FileUploadArea accept=".pdf" />`.
    Provide a text input for the watermark text.
    On submit, iterate every page and use `page.drawText()` diagonally across the center with 50% opacity (e.g., rgb(0,0,0) and opacity 0.5).
    Download the watermarked file.
    AVOID: Full control over coordinates right now. Center diagonally by default.
  </action>
  <verify>Test-Path src/app/tools/add-watermark/page.tsx</verify>
  <done>Watermark PDF page exists and draws text on PDF pages</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Both Rotate and Watermark pages are successfully created
</verification>

<success_criteria>
- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
