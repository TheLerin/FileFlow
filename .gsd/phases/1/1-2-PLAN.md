---
phase: 1
plan: 2
wave: 2
depends_on: ["1-1"]
files_modified: ["src/components/layout/Navbar.tsx", "src/components/ui/ToolCard.tsx", "src/app/page.tsx", "src/lib/constants.ts"]
autonomous: true
must_haves:
  truths:
    - "Users can see a clean grid of available tools on the landing page"
    - "Navigation header is present across the app"
  artifacts:
    - "src/components/layout/Navbar.tsx"
    - "src/components/ui/ToolCard.tsx"
---

# Plan 1.2: Core UI Components & Hub Page

<objective>
Build the fundamental UI components and the main landing "hub" page that links to individual tools.
Purpose: Users need a visually premium, clean interface to navigate between different conversion tools.
Output: A polished home page with a grid of tool cards and a navigation bar.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- src/app/layout.tsx
- src/app/page.tsx
</context>

<tasks>

<task type="auto">
  <name>Create Core Components</name>
  <files>src/components/layout/Navbar.tsx, src/components/ui/ToolCard.tsx, src/lib/constants.ts</files>
  <action>
    Create `src/lib/constants.ts` to hold an array of tool objects (e.g., id, title, description, href, iconType). Populate it with the tools defined in ROADMAP.md Phase 2, 3, 4.
    Create `src/components/layout/Navbar.tsx` as a sleek, minimal header with a logo/name on the left.
    Create `src/components/ui/ToolCard.tsx` as a clickable card (using Next/Link) that takes props `{title, description, href, icon}`. Use Tailwind for hover effects (e.g., `hover:shadow-lg transition-all`).
    AVOID: Hardcoding tool data directly in the UI components. Use `constants.ts`.
  </action>
  <verify>Test-Path src/components/ui/ToolCard.tsx</verify>
  <done>Components are created and typed properly</done>
</task>

<task type="auto">
  <name>Implement Hub Landing Page</name>
  <files>src/app/layout.tsx, src/app/page.tsx</files>
  <action>
    Update `src/app/layout.tsx` to include the `Navbar` component above the `{children}`.
    Update `src/app/page.tsx` to import the tools list from `constants.ts` and map over them, rendering a responsive grid (e.g., `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`) of `ToolCard` components.
    Add a Hero section above the grid explaining the value prop ("100% Secure, Client-Side Conversions").
    AVOID: Cluttered UI. Stick to clean whitespaces and professional typography.
  </action>
  <verify>npm run build</verify>
  <done>The home page builds successfully with the new grid and Navbar</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Navbar exists and is integrated into layout
- [ ] Tool grid renders based on a constant data source
- [ ] Build succeeds
</verification>

<success_criteria>
- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
