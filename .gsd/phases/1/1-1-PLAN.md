---
phase: 1
plan: 1
wave: 1
depends_on: []
files_modified: ["package.json", "tailwind.config.ts", "src/app/layout.tsx", "src/app/page.tsx", "src/app/globals.css"]
autonomous: true
must_haves:
  truths:
    - "Next.js application is initialized with Tailwind CSS and TypeScript"
    - "Application runs successfully on port 3000"
  artifacts:
    - "package.json exists with next, react, react-dom, and tailwind dependency"
---

# Plan 1.1: Scaffold Next.js Foundation

<objective>
Initialize the Next.js application with Tailwind CSS and establish the absolute structural foundation.
Purpose: We need the base framework running before building any UI components.
Output: A fresh Next.js App Router codebase ready for development.
</objective>

<context>
Load for context:
- .gsd/SPEC.md
- .gsd/ROADMAP.md
</context>

<tasks>

<task type="auto">
  <name>Initialize Next.js App</name>
  <files>package.json, tailwind.config.ts, tsconfig.json</files>
  <action>
    Run `npx -y create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --import-alias "@/*" --use-npm` in the root directory.
    AVOID: Running this interactively. Ensure all flags are provided so it executes autonomously.
    If the directory is not empty and create-next-app fails, initialize it in a temp folder and move the files over.
  </action>
  <verify>Test-Path package.json</verify>
  <done>package.json exists and dependencies are installed</done>
</task>

<task type="auto">
  <name>Clean Default Boilerplate</name>
  <files>src/app/page.tsx, src/app/globals.css, src/app/layout.tsx</files>
  <action>
    Modify `src/app/globals.css` to only include Tailwind directives (`@tailwind base; @tailwind components; @tailwind utilities;`) and high-level body styling (e.g., bg-gray-50, text-gray-900).
    Modify `src/app/layout.tsx` to set the title to "FileFlow - Secure Client-Side Tools" and description.
    Modify `src/app/page.tsx` to be a simple empty `main` tag with a "Welcome" h1, ready for the next plan to build out.
    AVOID: Keeping the Next.js default Vercel logos and complex starter CSS.
  </action>
  <verify>npm run build</verify>
  <done>App builds successfully without the default boilerplate</done>
</task>

</tasks>

<verification>
After all tasks, verify:
- [ ] Application is successfully initialized
- [ ] Default boilerplate is removed
- [ ] Build succeeds
</verification>

<success_criteria>
- [ ] All tasks verified
- [ ] Must-haves confirmed
</success_criteria>
