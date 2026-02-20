---
phase: 6
plan: 2
wave: 2
depends_on: ["6-1"]
files_modified: ["src/app/tools/ipynb-to-pdf/page.tsx", "src/app/tools/ipynb-to-html/page.tsx", "src/app/tools/ipynb-to-md/page.tsx", "src/app/tools/ipynb-to-py/page.tsx", "src/app/tools/merge-ipynb/page.tsx", "src/lib/constants.ts"]
autonomous: true
must_haves:
  truths:
    - "User can unpack IPYNB to core elements safely"
---

# Plan 6.2: Jupyter Notebook Extractions

<objective>
Implement JSON parsers to natively construct Data Science exports inside the browser.
</objective>

<tasks>

<task type="auto">
  <name>Build Format Exporters</name>
  <files>src/app/tools/ipynb-to-pdf/page.tsx, src/app/tools/ipynb-to-html/page.tsx, src/app/tools/ipynb-to-md/page.tsx, src/app/tools/ipynb-to-py/page.tsx</files>
  <action>
    Each is a highly optimized JSON mapping logic loop:
    - **To Py**: Filter `cell_type == 'code'`, `.join('\n')`
    - **To MD**: Render everything down into native Markdown files `.md`
    - **To HTML**: Same JSON traversal, generating `<p>` and `<pre>` blocks, then dumping strings to `.html`.
    - **To PDF**: Same as HTML pipeline, but passing DOM to `html2canvas` and `jsPDF`.
  </action>
</task>

<task type="auto">
  <name>Build Merger</name>
  <files>src/app/tools/merge-ipynb/page.tsx</files>
  <action>
    - Upload multiple arrays of files. Parse their `cells`. Push `cells` recursively onto `notebook[0].cells`. Execute `JSON.stringify`, and export updated `.ipynb`.
  </action>
</task>

<task type="auto">
  <name>Update Constants</name>
  <files>src/lib/constants.ts</files>
  <action>Register Data Science tools inside the Hub.</action>
</task>

</tasks>

<success_criteria>
- [ ] IPYNB to Python `.py` works accurately.
</success_criteria>
