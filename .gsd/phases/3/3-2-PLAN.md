---
phase: 3
plan: 2
wave: 2
depends_on: ["3-1"]
files_modified: ["src/app/tools/image-to-pdf/page.tsx", "src/app/tools/pdf-to-image/page.tsx", "src/app/tools/heic-to-jpg/page.tsx", "src/app/tools/webp-converter/page.tsx", "src/lib/constants.ts"]
autonomous: true
must_haves:
  truths:
    - "Users can convert Images to PDF and vice versa"
    - "Users can convert HEIC and WebP files to JPGs"
  artifacts:
    - "src/app/tools/image-to-pdf/page.tsx"
    - "src/app/tools/pdf-to-image/page.tsx"
    - "src/app/tools/heic-to-jpg/page.tsx"
    - "src/app/tools/webp-converter/page.tsx"
---

# Plan 3.2: Format Converters

<objective>
Implement all image format converters.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- src/lib/image-utils.ts
- src/components/ui/FileUploadArea.tsx
</context>

<tasks>

<task type="auto">
  <name>Image to PDF & PDF to Image</name>
  <files>src/app/tools/image-to-pdf/page.tsx, src/app/tools/pdf-to-image/page.tsx</files>
  <action>
    **Image to PDF**: Use `pdf-lib`. Load images, read dimensions, add page to PDF matching dimensions, `page.drawImage`. Zip them or merge them into 1 PDF.
    **PDF to Image**: Use `pdfjs-dist`. Load PDF Document, iterate pages, `page.render({canvasContext})`, then `canvas.toDataURL('image/jpeg')`. Download via `JSZip`.
  </action>
  <verify>Test-path for both pages.</verify>
  <done>Pages exist.</done>
</task>

<task type="auto">
  <name>HEIC & WebP Converters</name>
  <files>src/app/tools/heic-to-jpg/page.tsx, src/app/tools/webp-converter/page.tsx, src/lib/constants.ts</files>
  <action>
    **HEIC**: Use `heic2any({ blob, toType: "image/jpeg" })`.
    **WebP**: Load into Canvas API (`fileToImage`), output via `canvas.toBlob` with `image/jpeg` or `image/png`.
    Ensure both are added to `constants.ts` (id: `heic-to-jpg`, `webp-convert`).
  </action>
  <verify>Test-path for both pages.</verify>
  <done>Pages exist and logic is purely client-side.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Pages execute locally.
</verification>

<success_criteria>
- [ ] All tasks verified
</success_criteria>
