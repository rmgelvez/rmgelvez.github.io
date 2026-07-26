# rmgelvez-portfolio

Angular 20 developer portfolio with blog and interactive projects.

## Tech Stack

- **Framework**: Angular 20 (standalone components, no NgModules)
- **Language**: TypeScript (strict mode)
- **Styles**: SCSS with CSS custom properties (no CSS framework)
- **State**: Angular Signals + RxJS
- **Routing**: Angular Router with `withHashLocation()` (GitHub Pages compatible)
- **Content**: Markdown files parsed with `marked`, loaded at runtime via HttpClient
- **i18n**: Custom `I18nService` with EN/ES JSON files
- **Theme**: Dark/light via `data-theme` attribute on `<html>`, toggled by `ThemeService`

## Project Structure

```
src/
├── app/
│   ├── app.ts / app.html / app.scss  # Root component
│   ├── app.routes.ts                 # Route definitions
│   ├── app.config.ts                 # ApplicationConfig (providers, router)
│   ├── components/                   # Shared layout components
│   │   ├── navbar/  footer/  hero/   skills/  experience/  education/
│   ├── pages/                        # Route-level page components
│   │   ├── home/                     # Landing page
│   │   ├── blog/                     # Blog post list
│   │   ├── projects/                 # Projects list + interactive sub-pages
│   │   │   └── calculadora-consumo/  # Interactive electricity calculator
│   │   └── content-detail/           # Markdown renderer (blog + projects)
│   ├── services/
│   │   ├── content.service.ts        # Loads Markdown files via HttpClient
│   │   ├── i18n.service.ts           # Translation key lookup (signal-based)
│   │   └── theme.service.ts          # Dark/light theme toggle
│   ├── data/                         # Profile data objects (EN + ES)
│   ├── models/                       # TypeScript interfaces
│   └── i18n/                         # en.json, es.json
├── styles/                           # SCSS partials
│   ├── _variables.scss               # CSS custom property tokens
│   ├── _reset.scss  _typography.scss  _animations.scss  _mixins.scss
└── styles.scss                       # Global entry point

public/                               # Static assets served at root
└── appliances/
    ├── appliances.json               # Appliance config for calculator
    └── *.svg                         # SVG icons per appliance

src/content/                          # Markdown content (served at /content/)
    ├── posts/                        # Blog posts
    └── projects/                     # Project write-ups
```

## Design System Tokens (`src/styles/_variables.scss`)

| Token | Dark theme | Light theme |
|-------|-----------|------------|
| `--bg-primary` | `#050816` | `#f6f8ff` |
| `--bg-secondary` | `#0b1120` | `#ffffff` |
| `--bg-tertiary` | `#101a32` | — |
| `--accent-primary` | `#47f0ff` (cyan) | `#00bad1` |
| `--accent-secondary` | `#8b5cf6` (violet) | `#7c3aed` |
| `--accent-gradient` | `linear-gradient(135deg, #47f0ff, #8b5cf6)` | — |
| `--text-primary` | `#f4f7ff` | dark |
| `--text-secondary` | `#a7b4d0` | — |
| `--border-color` | `rgba(124,145,191,0.22)` | — |

Font stacks: `--font-body` (Manrope), `--font-display` (Inter), `--font-label` (JetBrains Mono).
Z-index scale: `$z-navbar: 100`, `$z-menu: 99`, `$z-modal: 200`.

## Key Architectural Patterns

### Routing
All routes use `loadComponent` for lazy loading. Hash strategy (`/#/path`) is active.
Specific routes must come **before** dynamic `:slug` segments:

```typescript
{ path: 'projects/CalculadoraDeConsumo', loadComponent: () => ... },
{ path: 'projects/:slug', loadComponent: () => ... },  // after
```

### Content System
`ContentService` (`src/app/services/content.service.ts`) loads `.md` files via HttpClient.
File names are hardcoded arrays (`postFileNames`, `projectFileNames`).
To add Markdown content: register the filename in the service, put the file in `src/content/`.

### Interactive Projects
Custom interactive components live under `src/app/pages/projects/<name>/`.
Added to the projects list via the `interactiveProjects` array in `projects.component.ts`.
Registered as a named route in `app.routes.ts` (before the generic `:slug` route).

### Signals Pattern
Services and components use `signal()` + `computed()`. Never mutate signal values directly;
always use `.set()` or `.update()`. `effect()` for side effects in injection context only.

## Development

```bash
npm install
npm start     # dev server → http://localhost:4200 (navigate to /#/ for hash routing)
ng build      # production build
```

## Deployment
GitHub Pages. `CNAME` and `.nojekyll` are included in the build via `angular.json` assets config.
