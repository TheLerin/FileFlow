# Phase 2 Research: Client-Side PDF Manipulation

**Topic:** Using `pdf-lib` for client-side PDF operations (Merge, Split, Rotate, Watermark, Security).

## Key Discoveries
1. **Compatibility:** `pdf-lib` works perfectly in modern browsers without any server-side dependencies. It uses standard `ArrayBuffer` and `Uint8Array`.
2. **Performance:** For typical documents (1-50 pages), it processes almost instantaneously. We won't introduce Web Workers yet to keep the architecture simple, but we should handle state asynchronously (using `async/await` and loading spinners).
3. **Security Constraints:**
   - Adding a password is fully supported.
   - Removing a password requires the user to input the correct password to unlock the document first (`PDFDocument.load(bytes, { password: '...' })`).
4. **Shared UI Need:** Every single tool requires the user to drop a file, see a list of selected files, click an action button, and download the result. A shared `FileUploadArea` component is critical to prevent code duplication.

## Architecture Decision
- Implement a reusable `<FileUploadArea />` component that accepts multiple files (for merging) or a single file (for others).
- Use `URL.createObjectURL(blob)` to trigger downloads directly in the browser after manipulation.
