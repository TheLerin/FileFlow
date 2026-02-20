# Phase 6 Research: Developer & Data Science Utilities

**Topic:** Parsing code strictly client-side, generating code pictures/PDFs, and unpacking Jupyter Notebooks natively.

## Key Discoveries
1. **Code Snippets to PDF/Image:**
   - Rendering structured, syntax-highlighted code inside PDF files natively using `pdf-lib` is agonizingly tedious due to font limitations and absolute positioning of every colored word.
   - A vastly superior approach is to render the code natively in the DOM using standard HTML/CSS. We can build a beautiful Apple/Mac styled window or Dark Theme IDE box.
   - We then leverage `html2canvas` to screenshot that specific HTML element into a canvas array natively. This array can be saved directly (Snippet to Image) or dumped synchronously inside a `jsPDF` vector structure (Code to PDF).
2. **Jupyter Notebooks (.ipynb):**
   - `.ipynb` files are literally just JSON strings utilizing a strict schema of `cells`.
   - Each cell has a `cell_type` (`"code"` or `"markdown"`) and a `source` array of strings.
   - Converting IPYNB to Python `.py` mathematically just requires filtering by `"code"` cells and joining the source strings natively.
   - Converting IPYNB to Markdown requires dumping Markdown cells dynamically and wrapping Code cells within triple-backtick markdown blocks (` ```python `).
   - Merging Notebooks requires appending the `cells` arrays iteratively into the structure of the first uploaded notebook.
3. **UI Reskin:**
   - The user requested Google colors.
   - Google Brand Elements: Blue (`#4285F4`), Red (`#EA4335`), Yellow (`#FBBC05`), Green (`#34A853`).

## Architecture Decision
- Implement `html2canvas` and `jspdf` for visual DOM-to-binary extractions.
- Implement pure JavaScript JSON walkers for Notebook manipulation. No heavy backend required.
