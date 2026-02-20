---
phase: 2
plan: 1
wave: 1
depends_on: []
files_modified: ["package.json", "src/components/ui/FileUploadArea.tsx", "src/lib/pdf-utils.ts"]
autonomous: true
must_haves:
  truths:
    - "pdf-lib is installed"
    - "A reusable UI component exists for handling file drag-and-drop operations"
  artifacts:
    - "src/components/ui/FileUploadArea.tsx"
---

# Plan 2.1: PDF Tool Foundation & Shared UI

<objective>
Install core dependencies for PDF manipulation and build the shared UI components that every subsequent PDF tool will use.
Purpose: Prevents duplicating the drag-and-drop code 6 times.
Output: The `FileUploadArea` component and a helper utility file.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- src/lib/constants.ts
</context>

<tasks>

<task type="auto">
  <name>Install Dependencies & Create Utility Boilerplate</name>
  <files>package.json, src/lib/pdf-utils.ts</files>
  <action>
    Run `npm install pdf-lib`.
    Create `src/lib/pdf-utils.ts` and export a simple dummy async function `downloadBlob(data: Uint8Array, filename: string)` that creates an ObjectURL and triggers a download via a temporary `<a>` tag.
  </action>
  <verify>Test-Path src/lib/pdf-utils.ts</verify>
  <done>pdf-lib is in package.json and downloadBlob is implemented</done>
</task>

<task type="auto">
  <name>Create FileUploadArea Component</name>
  <files>src/components/ui/FileUploadArea.tsx</files>
  <action>
    Create a highly styled, reusable `FileUploadArea` component.
    It should accept props: `onFileSelect: (files: File[]) => void`, `multiple?: boolean`, `accept?: string`.
    Implement basic drag-and-drop visual states (using `onDragOver`, `onDragLeave`, `onDrop`).
    AVOID: Using heavy third-party drag-and-drop libraries. Keep it native React.
  </action>
  <verify>Test-Path src/components/ui/FileUploadArea.tsx</verify>
  <done>Component exists and supports native file selection and dropping</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] pdf-lib is installed
- [ ] FileUploadArea component is ready for integration
</verification>

<success_criteria>
- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
