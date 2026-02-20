---
phase: 4
plan: 2
wave: 2
depends_on: ["4-1"]
files_modified: ["package.json", "src/app/tools/docx-to-txt/page.tsx", "src/app/tools/docx-to-html/page.tsx", "src/lib/constants.ts"]
autonomous: true
must_haves:
  truths:
    - "User can pull raw text strings out of DOCX"
    - "User can pull HTML strings out of DOCX"
---

# Plan 4.2: Text Document Extractors

<objective>
Install Mammoth.js and establish tools for extracting clean text/HTML from Microsoft Word documents.
</objective>

<tasks>

<task type="auto">
  <name>Install Mammoth</name>
  <action>Run `npm install mammoth`</action>
</task>

<task type="auto">
  <name>Build Text Extractors</name>
  <files>src/app/tools/docx-to-txt/page.tsx, src/app/tools/docx-to-html/page.tsx</files>
  <action>
    - **DOCX to TXT**: Pass array buffer to `mammoth.extractRawText()`. Export raw string buffer as `.txt` download.
    - **DOCX to HTML**: Pass array buffer to `mammoth.convertToHtml()`. Export raw string HTML structure as `.html` download.
  </action>
</task>

<task type="auto">
  <name>Update Constants</name>
  <files>src/lib/constants.ts</files>
  <action>Register tools so they hit the "Office Utilities" view on the Hub.</action>
</task>

</tasks>

<success_criteria>
- [ ] Tools render successfully.
</success_criteria>
