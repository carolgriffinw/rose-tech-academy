# AGENTS.md — ROSE Tech Academy

## Repository Overview

This repository contains the source code for the **ROSE Tech Academy** website — a static website that helps learners pursue technology careers through curated learning paths, industry-recognized certifications, and trusted education partners.

The site is a **plain HTML/CSS/JavaScript static web application** with no build step. It is deployed to **Azure Static Web Apps** via a GitHub Actions workflow on every push to `main`.

---

## Repository Structure

```
rose-tech-academy/
├── .github/
│   └── workflows/
│       └── azure-static-web-apps.yml   # CI/CD: deploy to Azure Static Web Apps
├── components/
│   └── nav.html                        # Shared navigation snippet (reference only)
├── css/
│   ├── tokens.css                      # Design tokens (colors, spacing, typography)
│   ├── base.css                        # Global resets and base styles
│   ├── nav.css                         # Navigation component styles
│   ├── home.css                        # Home page–specific styles
│   ├── pages.css                       # Interior page styles (shared)
│   └── footer.css                      # Footer styles
├── js/
│   └── main.js                         # Site-wide JavaScript (theme, nav, animations)
├── images/                             # Static image assets
├── index.html                          # Home page
├── about.html                          # About page
├── learning-paths.html                 # Learning paths overview
├── path-artificial-intelligence.html   # AI learning path
├── path-cloud-computing.html           # Cloud computing learning path
├── path-cybersecurity.html             # Cybersecurity learning path
├── path-data-analytics.html            # Data analytics learning path
├── path-generative-ai.html             # Generative AI learning path
├── path-project-management.html        # Project management learning path
├── blog.html                           # Blog listing page
├── career-resources.html               # Career resources page
├── partners.html                       # Partners page
├── contact.html                        # Contact page
├── faq.html                            # FAQ page
├── accessibility.html                  # Accessibility statement
├── affiliate-disclosure.html           # Affiliate disclosure
├── privacy-policy.html                 # Privacy policy
├── terms-of-use.html                   # Terms of use
└── 404.html                            # Custom 404 error page
```

---

## Technology Stack

| Layer       | Technology                              |
|-------------|------------------------------------------|
| Markup      | HTML5 (semantic, accessible)            |
| Styles      | Plain CSS with custom properties (vars) |
| Scripts     | Vanilla JavaScript (ES6+, no framework) |
| Fonts       | Google Fonts (Plus Jakarta Sans, Inter) |
| Deployment  | Azure Static Web Apps                   |
| CI/CD       | GitHub Actions                          |

---

## Key Conventions

### HTML
- All pages share the same `<nav>` and `<footer>` markup (inline; `components/nav.html` is a reference snippet).
- Each page includes CSS in this order: `tokens.css` → `base.css` → `nav.css` → (page-specific) → `footer.css`.
- `js/main.js` is loaded on every page via `<script src="js/main.js" defer>`.
- Structured data (`application/ld+json`) is added to pages where appropriate.

### CSS
- All design tokens (colors, spacing, font sizes, radii) live in `css/tokens.css`. Always use CSS custom properties (`var(--...)`) rather than hardcoded values.
- Dark/light mode is driven by the `data-theme` attribute on `<html>` (values: `"light"` or `"dark"`).

### JavaScript (`js/main.js`)
- Dark/light mode toggle: reads `prefers-color-scheme`, sets `data-theme` on `<html>`, and updates `[data-theme-toggle]` buttons.
- Sticky nav: adds `.site-nav--scrolled` and `.site-nav--hidden` classes based on scroll position.
- Mobile menu: toggles `.is-open` on `[data-mobile-menu]` and `aria-expanded` on `[data-menu-toggle]`.
- Scroll-reveal animations: uses `IntersectionObserver` on elements with `data-reveal` attribute; adds `.revealed` class.
- Newsletter form: intercepts `[data-newsletter-form]` submissions and shows a confirmation state.
- Active nav link: highlights the current page's `<a class="nav-link">` by comparing `window.location.pathname`.

---

## CI/CD

The `.github/workflows/azure-static-web-apps.yml` workflow:
- **Deploys** on every push to `main` and on `workflow_dispatch`.
- Creates a **staging environment** for every pull request targeting `main`.
- **Closes** the staging environment when a pull request is closed.

`skip_app_build: true` is set because there is no build step — the site is deployed as-is.

The workflow requires the `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to be set in the repository.

---

## Guidelines for Agents

1. **No build required.** There is no `npm install`, `npm run build`, or compilation step. Changes take effect by editing files directly.
2. **No linting or test tooling is configured.** Do not add new linting, testing, or build tools unless explicitly instructed.
3. **Validate HTML changes** by reviewing the file after editing. Ensure every page includes the standard CSS/JS includes and a matching `<nav>` and `<footer>`.
4. **Use design tokens.** Never hardcode color or spacing values in CSS. Reference `css/tokens.css` and use `var(--...)` properties.
5. **Keep JavaScript vanilla.** Do not introduce external JavaScript libraries or frameworks unless explicitly requested.
6. **Accessibility matters.** Maintain `aria-*` attributes, semantic HTML elements, and sufficient color contrast when making changes.
7. **Deployment is automatic.** Merging to `main` triggers a deploy. There is no manual deployment step needed.
8. **Secrets.** The only secret in use is `AZURE_STATIC_WEB_APPS_API_TOKEN`. Do not commit any API keys, tokens, or credentials to the repository.
