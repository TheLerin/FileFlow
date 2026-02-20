---
phase: 5
plan: 1
wave: 1
depends_on: []
files_modified: ["next.config.ts", "public/manifest.json", "src/app/layout.tsx"]
autonomous: true
must_haves:
  truths:
    - "Application is ready for strict true-static export deployment"
    - "Application registers a PWA manifest"
---

# Plan 5.1: Performance & PWA

<objective>
Configure Next.js to spit out a pure static HTML/JS/CSS bundle and enable offline installation via PWA manifest.
</objective>

<tasks>

<task type="auto">
  <name>Static Export</name>
  <files>next.config.ts</files>
  <action>Open `next.config.ts` and set `output: "export"`. Check for `images: { unoptimized: true }` so static builds don't fail looking for a Vercel image optimizing server.</action>
</task>

<task type="auto">
  <name>PWA Manifest</name>
  <files>public/manifest.json, src/app/layout.tsx</files>
  <action>
    Create a highly basic `manifest.json` pointing to standard fields. Add a `<link rel="manifest" href="/manifest.json" />` string inside the RootLayout metadata or `<head>` alongside a `theme-color`.
  </action>
</task>

</tasks>

<success_criteria>
- [ ] `next.config.ts` modified successfully.
</success_criteria>
