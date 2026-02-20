# Plan 2.2 Summary

**Objective:** Implement the Merge PDF and Split PDF tools using pdf-lib.

**Completed Tasks:**
- Designed and implemented Merge PDF: copies all pages from multiple documents into a single new document and downloads it natively.
- Designed and implemented Split PDF: extracts each page of a given PDF into separate files, zips them together using `jszip`, and downloads as a single `.zip` file.

**Files Created/Modified:**
- `src/app/tools/merge-pdf/page.tsx`
- `src/app/tools/split-pdf/page.tsx`
- `package.json` (jszip added)
