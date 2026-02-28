# Flowko Automation Site - AI Assistant Guidelines

## 1. Project Overview & Tech Stack
- **Framework:** Next.js 16.1.1 (App Router)
- **UI Library:** React 19
- **Styling:** Tailwind CSS v4 (`@tailwindcss/postcss`) with Next Themes for dark/light mode
- **Components:** shadcn/ui (Radix UI primitives, `lucide-react` icons)
- **Language:** TypeScript (Strict mode)
- **Internationalization:** `next-intl`
- **Tooling:** ESLint, Turbopack (dev)

## 2. Directory Structure
- `app/` - Next.js App Router structure. Contains `[locale]` for i18n and `api` for API routes.
- `components/` - React components. Shared components sit at the root, while shadcn/ui specific ones are in `components/ui/`.
- `lib/` - Shared utilities, e.g., `utils.ts` for the `cn` function (Tailwind merge + clsx).
- `messages/` - Localization JSON files used by `next-intl`.
- `public/` - Static assets, images, SVGs.

## 3. Code Style Preferences
- **Components:** Use functional components (`export function ComponentName({ ... }: Props) { ... }`).
- **Interfaces:** Define a TypeScript `interface ComponentNameProps` or `type ComponentNameProps` directly above the component declaration.
- **Styling Execution:** 
  - Utilize tailwind utility classes for all styling.
  - Dynamically concatenate class names with the `cn()` utility from `@/lib/utils` (especially for components that accept a `className` prop).
- **Absolute Imports:** Rely on `@/` path aliases for importing internal files (e.g., `@/components/ui/button`, `@/lib/utils`).

## 4. Internationalization (next-intl)
- **Hardcoded Strings:** NEVER hardcode user-facing strings in components. Always use the `t()` or scoped translation functions provided by `next-intl`.
- **Links/Navigation:** Use `Link` from the `next-intl` setup or `next/navigation` wrapper to ensure the locale is preserved in URLs. Avoid raw `<a>` tags for internal links.

## 5. Testing Guidelines
- The `package.json` references custom validation scripts (`test:seo`, `test:components`, `test:performance`), however, a unified testing framework (e.g., Vitest, Playwright) is not prominent.
- When writing tests (if required):
  - Prioritize checking UI components for accessibility and responsiveness.
  - Verify SEO attributes (meta tags, openGraph structure as seen in `app/layout.tsx`).

## 6. Common Pitfalls & Best Practices
- **Tailwind v4 Setup:** The project runs on Tailwind v4 which has differences from v3 (no complex `tailwind.config.js` required depending on setup, relies heavily on PostCSS and `@import "tailwindcss"`). Ensure custom classes are correctly injected via `cn()`.
- **Next.js Caching/Client Boundaries:** 
  - Explicitly use `"use client"` at the very top of files only for components requiring interactivity (hooks, state, event listeners). Default to Server Components.
- **Performance:** 
  - Use `next/image` (`<Image />`) for all media to benefit from automatic WebP/AVIF conversions and sizing optimizations defined in `next.config.ts`.
  - Ensure any third-party script loading (e.g., analytics) uses `next/script` with appropriate strategies.
