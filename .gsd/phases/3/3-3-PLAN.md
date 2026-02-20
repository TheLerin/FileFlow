---
phase: 3
plan: 3
wave: 3
depends_on: ["3-2"]
files_modified: ["src/app/tools/compress-image/page.tsx", "src/app/tools/resize-image/page.tsx", "src/app/tools/crop-image/page.tsx", "src/lib/constants.ts"]
autonomous: true
must_haves:
  truths:
    - "Users can compress, resize, and crop images"
  artifacts:
    - "src/app/tools/compress-image/page.tsx"
    - "src/app/tools/resize-image/page.tsx"
    - "src/app/tools/crop-image/page.tsx"
---

# Plan 3.3: Image Optimizers

<objective>
Implement Image Compression, Resizing, and Cropping tools.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- src/lib/image-utils.ts
- src/components/ui/FileUploadArea.tsx
</context>

<tasks>

<task type="auto">
  <name>Compress & Resize</name>
  <files>src/app/tools/compress-image/page.tsx, src/app/tools/resize-image/page.tsx</files>
  <action>
    **Compress**: Provide a quality slider (1-100). Use canvas `toBlob(cb, 'image/jpeg', quality/100)`.
    **Resize**: Provide Width/Height inputs. Draw image to a canvas of that exact size.
    Ensure both are added to `constants.ts` (`compress-image`, `resize-image`).
  </action>
  <verify>Pages created and constants updated.</verify>
  <done>Compress & Resize pages done.</done>
</task>

<task type="auto">
  <name>Crop Image</name>
  <files>src/app/tools/crop-image/page.tsx</files>
  <action>
    Use `react-image-crop`. Allow user to draw a crop box over an image preview.
    When done, extract just that bounding box via `ctx.drawImage` with source coordinates (sx, sy, sWidth, sHeight).
    Add `crop-image` to `constants.ts`.
  </action>
  <verify>Page created and constants updated.</verify>
  <done>Crop page done.</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Pages execute locally.
</verification>

<success_criteria>
- [ ] All tasks verified
</success_criteria>
