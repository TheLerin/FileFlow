# Phase 5 Research: Optimization and Deployment

**Topic:** Static Exports, PWA, and Final Polish in Next.js

## Key Discoveries
1. **Static Export:** Since everything is 100% client-side, we can (and should) modify `next.config.ts` to include `output: 'export'`. This allows the entire application to be hosted on any static web server (GitHub Pages, S3, Netlify) without a Node.js runtime.
2. **PWA Support:** We can add a simple `manifest.json` and `<meta name="theme-color">` to make the application installable as a Progressive Web App, enabling true offline desktop-like functionality.
3. **Lazy Loading:** `react-image-crop`, `pdf-lib`, and `heic2any` are heavy modules. We can dynamically import some of these tools utilizing Next.js `next/dynamic` to drastically reduce initial bundle load time. However, since the tools are rendered on individual `/tools/[id]` pages anyway, Next.js code splitting already handles the chunking natively! We don't need manual dynamic imports on the tools themselves unless they import heavy components immediately on the hub page (which they don't, the hub only uses `lucide-react` icons).

## Architecture Decision
- Wave 1 (Performance & Export): Configure `next.config.ts` for static export. Provide a generic `manifest.json`.
- Wave 2 (Polish): Add a professional global `Footer` emphasizing "100% Secure & Client-Side". Validate `globals.css` structure. Run final global tests.
