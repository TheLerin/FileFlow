# Plan 4.2 Summary

**Objective:** Implement Text Document Context Extractors (DOCX to TXT, DOCX to HTML).

**Completed Tasks:**
- Added `docx-to-txt`: extracts raw plaintext natively skipping all formatting overhead.
- Added `docx-to-html`: pulls core structural models (headers, bolds, paragraphs) out of Word into an HTML string and natively wraps it in a valid offline-capable `<!DOCTYPE html>` template payload before downloading.
- Registered extensions with the internal registry. 

**Files Created/Modified:**
- `src/app/tools/docx-to-txt/page.tsx`
- `src/app/tools/docx-to-html/page.tsx`
- `src/lib/constants.ts`
