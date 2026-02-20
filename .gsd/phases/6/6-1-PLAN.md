---
phase: 6
plan: 1
wave: 1
depends_on: []
files_modified: ["package.json", "src/app/tools/code-to-pdf/page.tsx", "src/app/tools/code-to-image/page.tsx", "src/lib/constants.ts", "src/app/page.tsx"]
autonomous: true
must_haves:
  truths:
    - "User can input code, apply Dark Theme, add Line Numbers, and export beautiful PDF"
    - "User can input code and export beautiful Image (PNG)"
---

# Plan 6.1: Code Converters

<objective>
Install DOM extraction libraries and build the visual syntax-highlighted code exporters.
</objective>

<tasks>

<task type="auto">
  <name>Install Visual Libraries</name>
  <action>Run `npm install html2canvas jspdf`.</action>
</task>

<task type="auto">
  <name>Build Code to Image/PDF</name>
  <files>src/app/tools/code-to-pdf/page.tsx, src/app/tools/code-to-image/page.tsx</files>
  <action>
    - **Code to PDF**: Build a UI letting users paste code or upload `.py`/`.java`/`.cpp`/`.c`. Display the code inside a beautiful preformatted `<pre>` box. Offer toggles for "Dark Theme" and "Line Numbers". Use `html2canvas` to rasterize the box, then push to `jsPDF` and download locally.
    - **Code to Image**: Share exact same logic but just run `canvas.toDataURL("image/png")` and download.
  </action>
</task>

<task type="auto">
  <name>Update Registry</name>
  <files>src/lib/constants.ts</files>
  <action>Register the tools into a new category for "Developer Utilities".</action>
</task>

</tasks>

<success_criteria>
- [ ] Code to PDF renders.
</success_criteria>
