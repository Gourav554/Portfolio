# Icons folder

All UI icons in this project (social links, skill cards, contact details,
nav, buttons, etc.) are inlined as `<svg>` markup directly inside
[`index.html`](../index.html). This avoids extra HTTP requests and lets
icons inherit `currentColor` for hover states, and it sidesteps a
browser quirk where external SVG sprites (`<use href="icons/sprite.svg#…">`)
are blocked when a page is opened directly via `file://` instead of a server.

This folder is kept for any extra icon assets (e.g. a favicon PNG set, app
icons, etc.) you may want to add later.