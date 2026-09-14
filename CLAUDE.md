# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a bilingual portfolio website for Alexis de Lécluse, featuring both English (`index.html`) and French (`index-fr.html`) versions. The site is built with vanilla HTML/CSS/JavaScript and uses Tailwind CSS for styling.

## Build Commands

```bash
# Development mode - watch CSS for changes
npm run dev

# Production build - compile and minify CSS
npm run build
```

The build process compiles `src/input.css` into `assets/output.css`.

**Development workflow**:
1. Run `npm run dev` to start the CSS watcher
2. Open `index.html` in a browser using one of these methods:
   - **Live Server extension** (VS Code/JetBrains) - recommended for auto-refresh
   - Simple Python server: `python -m http.server 3000`
   - Direct file open: Double-click `index.html` (manual refresh needed)

The CSS watcher (`watch-build.js`) monitors `src/input.css` and `tailwind.config.js` only. HTML files are not watched to avoid reload loops. Tailwind automatically reads the HTML files during each CSS build via the `content` configuration in `tailwind.config.js`.

**Note**: A custom polling-based watcher is used instead of Tailwind's native `--watch` due to OneDrive interference with filesystem events.

## Project Structure

- `index.html` - English version of the portfolio
- `index-fr.html` - French version of the portfolio
- `src/input.css` - Tailwind source with custom styles (animations, mobile menu)
- `assets/` - Compiled CSS, images, CV PDFs, and other static files
- `tailwind.config.js` - Tailwind configuration (scans both HTML files)

## Bilingual Architecture

**Critical**: Both language versions must be kept in sync structurally. When modifying content or layout:

1. Make equivalent changes in both `index.html` and `index-fr.html`
2. Preserve section order and HTML structure across both files
3. Keep CSS classes and JavaScript IDs identical between versions
4. Translate only text content, not technical elements (classes, IDs, data attributes)

The French version uses `index-fr.html` and has a language toggle link pointing to `index.html`, and vice versa.

## Key Components

### Modal System
Role model cards use a modal dialog system triggered by `.role-model-card` buttons. Modal data is stored in `data-*` attributes on the cards:
- `data-title` - Modal heading
- `data-profile` - Person's background
- `data-interest` - Why they're inspiring
- `data-image` - Profile photo path

### Animations
- `.fade-in-section` - Scroll-triggered fade-in using IntersectionObserver
- Mobile menu uses CSS grid animation (see `src/input.css`)

### Navigation
- Sticky header with anchor links to page sections
- Mobile hamburger menu (hidden on desktop)
- Language switcher in top navigation

## Icon System

Icons use Lucide (loaded via CDN). Initialize with `lucide.createIcons()` after the DOM loads. Icon markup: `<i data-lucide="icon-name"></i>`

## Asset Management

- Project images: `assets/projet_*.png|jpg`
- Profile photos: `assets/*.jpeg`
- CVs: `assets/CV_Alexis_de_Lecluse_EN.pdf` and `CV_Alexis_de_Lecluse_FR.pdf`

Update CV links in both HTML files when replacing PDFs.

## Development Workflow

1. Run `npm run dev` to watch for changes during development
2. Edit `src/input.css` for custom styles (Tailwind utilities are auto-generated)
3. Run `npm run build` before committing to ensure minified production CSS is current
4. Test both language versions after making changes
5. Verify mobile responsiveness (breakpoints: md, lg)

## Content Sections

Both HTML files follow this structure:
1. Welcome - Hero with photo and intro
2. Engineering - Skills grid + project cards
3. Mobility - Language skills and international plans
4. Engagement - Civic activities (scouting, climate, etc.)
5. Activities - Music and hobbies
6. Career - CV downloads, role models, past experiences
7. Contact - Email, phone, LinkedIn

## Styling Conventions

- Primary brand color: `red-600` (#DC2626)
- Alternating section backgrounds: white and `gray-50`
- Card hover: `hover:shadow-lg hover:border-red-400`
- Inter font family (loaded from Google Fonts)
- Mobile-first responsive design
