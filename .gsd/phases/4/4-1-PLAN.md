---
phase: 4
plan: 1
wave: 1
depends_on: []
files_modified: ["package.json", "src/app/tools/excel-to-csv/page.tsx", "src/app/tools/excel-to-json/page.tsx", "src/app/tools/csv-to-excel/page.tsx", "src/lib/constants.ts", "src/app/page.tsx"]
autonomous: true
must_haves:
  truths:
    - "User can parse .xlsx into .csv and .json"
    - "User can pack .csv into .xlsx"
---

# Plan 4.1: Spreadsheet Converters

<objective>
Install SheetJS and develop the Office spreadsheet conversion trio.
</objective>

<tasks>

<task type="auto">
  <name>Install SheetJS</name>
  <action>Run `npm install xlsx`</action>
</task>

<task type="auto">
  <name>Build Spreadsheets Tools</name>
  <files>src/app/tools/excel-to-csv/page.tsx, src/app/tools/excel-to-json/page.tsx, src/app/tools/csv-to-excel/page.tsx</files>
  <action>
    - **Excel to CSV**: Read ArrayBuffer, extract first sheet, export to CSV Blob, download.
    - **Excel to JSON**: Read ArrayBuffer, extract first sheet, export `sheet_to_json()`, `JSON.stringify`, download Blob.
    - **CSV to Excel**: Load CSV text, parse `aoa_to_sheet()`, append to book, `writeFileXLSX()`.
    - Note: if the user uploads multiple files, generate a `.zip` using our existing `JSZip` dependency, or just download individually. Let's stick to iterating and downloading individually for simplicity (or Zip them if easy).
  </action>
</task>

<task type="auto">
  <name>Update Constants & Hub UI</name>
  <files>src/lib/constants.ts, src/app/page.tsx</files>
  <action>Register the 3 new tools and create an "Office Utilities" category in the grid via filtering by id.</action>
</task>

</tasks>

<success_criteria>
- [ ] Tools render successfully.
</success_criteria>
