# Phase 3 Research: Client-Side Image Operations

**Topic:** Canvas APIs, `heic2any`, and `pdfjs-dist` for browser-based image conversions.

## Key Discoveries
1. **Canvas API:** We can use a hidden `<canvas>` element to load an image, manipulate it (resize, compress), and output a Blob via `canvas.toBlob()`. This natively supports PNG, JPG, and WebP, making format conversion seamless.
2. **HEIC Support:** Browsers do not natively render HEIC (mostly from iPhones). We must import `heic2any`, which uses a WASM decoder under the hood to convert HEIC blobs into JPG/PNG blobs.
3. **pdf.js (pdfjs-dist):** To extract a PDF page to an image, `pdf-lib` is insufficient. We need Mozilla's `pdf.js` to literally draw the PDF viewport onto a canvas.
4. **Cropping:** Writing a custom React cropper is complex. `react-image-crop` is lightweight, client-side only, and perfectly handles the UI dragging. We just apply the crop coordinates to a canvas.

## Architecture Decision
- Write a shared `image-utils.ts` to house functions like `fileToImageElement()`, `resizeImageCanvas()`, etc.
- Wave 1: Install dependencies and set up utility.
- Wave 2: Converters (`image-to-pdf`, `pdf-to-image`, `heic-to-jpg`, `webp-to-jpg`).
- Wave 3: Optimizers (`compress-image`, `resize-image`, `crop-image`).
