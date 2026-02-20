---
phase: 3
plan: 1
wave: 1
depends_on: []
files_modified: ["package.json", "src/lib/image-utils.ts"]
autonomous: true
must_haves:
  truths:
    - "React Image Crop, HEIC2ANY, and PDF.js are installed"
    - "Shared image-utils available for canvas manipulations"
  artifacts:
    - "src/lib/image-utils.ts"
---

# Plan 3.1: Image Utilities & Dependencies

<objective>
Install core image libraries and build shared utility functions to interface with the DOM `<canvas>` for resizing and blob generation.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- src/components/ui/FileUploadArea.tsx
</context>

<tasks>

<task type="auto">
  <name>Install Packages</name>
  <files>package.json</files>
  <action>
    Run `npm install react-image-crop heic2any pdfjs-dist@legacy`. (Use legacy if standard has top-level await issues or stick to latest if Next.js handles it). Use `npm install react-image-crop heic2any pdfjs-dist`.
  </action>
  <verify>Check package.json for deps.</verify>
  <done>Dependencies installed</done>
</task>

<task type="auto">
  <name>Create Image Utilities</name>
  <files>src/lib/image-utils.ts</files>
  <action>
    Create functions: `fileToImage(file: File): Promise<HTMLImageElement>` and `imageToBlob(image: HTMLImageElement, mimeType: string, quality?: number): Promise<Blob>`.
  </action>
  <verify>Test-Path src/lib/image-utils.ts</verify>
  <done>Utility file created with canvas boilerplate.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Dependencies exist.
</verification>

<success_criteria>
- [ ] All tasks verified
</success_criteria>
