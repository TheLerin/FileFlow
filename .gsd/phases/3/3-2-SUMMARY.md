# Plan 3.2 Summary

**Objective:** Implement format converters (Image to PDF, PDF to Image, HEIC to JPG, WebP Converter).

**Completed Tasks:**
- **Image to PDF**: Added UI to upload standard images, scales them cleanly onto a canvas, and embeds them into `pdf-lib` generated pages.
- **PDF to Image**: Implemented `pdfjs-dist` to render pages onto a hidden canvas element, dump it to blobs, compile the blobs into a ZIP tree using `jszip`, and download them securely.
- **HEIC to JPG**: Used `heic2any` to safely strip iPhone encoding into JPEG format natively.
- **WebP Converter**: Pure `canvas.toBlob()` workflow mapping images over to JPG/PNG.

**Files Created/Modified:**
- `src/app/tools/image-to-pdf/page.tsx`
- `src/app/tools/pdf-to-image/page.tsx`
- `src/app/tools/heic-to-jpg/page.tsx`
- `src/app/tools/webp-converter/page.tsx`
- `src/lib/constants.ts`
- `src/app/page.tsx`
