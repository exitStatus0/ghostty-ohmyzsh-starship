# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static website for the "DevOpus" project — a bilingual (English/Russian) guide and mentoring offer site about building a terminal setup with Ghostty, Oh My Zsh, and Starship. Hosted on GitHub Pages.

## Architecture

No build system, no package manager — plain static HTML/CSS/JS served directly.

**Client-side markdown rendering**: Guide and offer pages (`en/`, `other/`, `mentoring-offer/`) use a custom pattern where `<html data-markdown-source="filename.md">` tells `site.js` to fetch and render the corresponding markdown file into the page at runtime. The renderer lives in `assets/site.js` as `renderMarkdown()` — it handles headings, lists, code blocks, blockquotes, inline formatting, and auto-generates a table of contents. The first H1 in each markdown file is intentionally skipped (the page provides its own title).

**Shared assets**: All pages share `assets/site.css` (design system with CSS custom properties) and `assets/site.js` (scroll-reveal animations via IntersectionObserver + the markdown renderer). Sub-pages reference these via `../assets/`.

**Page layout**: Root `index.html` is a standalone landing page. Sub-pages (`en/index.html`, `other/index.html`, `mentoring-offer/index.html`) follow a consistent two-column guide layout with a sticky sidebar TOC.

## Development

Open `index.html` in a browser or use any local static server:

```
python3 -m http.server 8000
```

Markdown rendering requires serving via HTTP (fetch won't work from `file://`).

## Content editing

To update guide or offer content, edit the markdown files directly — they are rendered client-side:
- `en/ghostty-ohmyzsh-starship-dev-setup.md` — English guide
- `other/ghostty-ohmyzsh-starship-dev-setup-other.md` — Russian guide
- `mentoring-offer/DevOps-Mentoring-Offer.md` — Mentoring offer

## Conventions

- `.nojekyll` file disables Jekyll processing on GitHub Pages
- Dark terminal-inspired design (Ghostty/Starship aesthetic)
- CSS uses custom properties defined in `:root` of `site.css` for colors, fonts, spacing
- Font stack: system sans-serif (body), SFMono/Consolas (code)
- Code blocks in guide pages have copy-to-clipboard buttons (added by `site.js`)
- Sticky sidebar TOC with scroll-based active heading tracking
