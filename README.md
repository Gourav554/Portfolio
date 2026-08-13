# Gourav Jaiswal — Portfolio Website

A premium, fully responsive personal portfolio built with plain **HTML5,
CSS3, and vanilla JavaScript** — no frameworks, no build step. Just open
[`index.html`](index.html) in a browser.

## Folder structure

```
portfolio/
├── index.html
├── css/
│   ├── style.css        # variables, reset, layout, all component styles
│   ├── animations.css   # keyframes + scroll-reveal utility classes
│   └── responsive.css   # mobile-first breakpoint overrides
├── js/
│   ├── typing.js          # hero typing/erasing effect
│   ├── counter.js         # animated achievement counters
│   ├── project-filter.js  # project filtering, search, details modal
│   ├── contact.js         # contact form validation + success state
│   ├── animation.js       # scroll reveal, particles, cursor glow,
│   │                       progress bar, ripple, navbar, back-to-top
│   └── script.js          # mobile menu + small glue logic
├── images/               # SVG hero avatar + project preview graphics
├── icons/                # (icons are inlined as <svg> in index.html)
├── resume/                # put your resume.pdf here
└── assets/                # misc. static files
```

## Before you publish — personalize these placeholders

This template was generated with **placeholder content** you should
replace with your real details:

| What | Where |
|---|---|
| GitHub / LinkedIn URLs | `index.html` — hero, contact, and footer social links (`github.com/yourusername`, `linkedin.com/in/yourusername`) |
| Email / phone / location | `index.html` — hero socials + Contact section |
| Resume PDF | Add a real `resume.pdf` to `resume/` (see `resume/README.md`) |
| Experience & Education history | `index.html` — marked with `<!-- TODO -->` comments in the Experience/Education/About sections |
| Certifications | `index.html` — Certifications section (currently placeholder issuers) |
| Project links (Live Demo / GitHub) | `index.html` — each `.project-card`'s `data-demo` / `data-github` attributes and the visible buttons |
| Achievement counter numbers | `index.html` — `data-target` attributes in the Achievements section |
| Contact form backend | `js/contact.js` — currently simulates a submission client-side only; wire up Formspree/EmailJS/your own API where marked `TODO` |

## Features

Sticky glass navbar with scroll-spy active state · animated typing hero ·
floating white particle background · custom cursor glow · scroll progress
bar · scroll-reveal animations on every section · animated skill progress
bars · filterable + searchable project grid with a details popup modal ·
animated vertical timelines for Experience & Education · animated
achievement counters · ripple-effect buttons · accessible mobile hamburger
menu · client-side validated contact form · custom scrollbar · back-to-top
button · fully responsive (mobile-first) layout.

## Browser support

Built with standard, widely supported CSS/JS (Flexbox, Grid, CSS
variables, `IntersectionObserver`, Canvas 2D). Works in all current
evergreen browsers (Chrome, Edge, Firefox, Safari).