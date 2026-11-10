# Kad Nikah v2 — Haziq & Jaynina

Redesigned version of the original `kad-nikah` card. **All copy and content is identical**
to the original — same names, dates, venue, doa, bank details, wishlist, contacts.
Only the presentation, navigation and interaction layer were rebuilt.

Original kept untouched at `index-original.html` for reference.

## Live

- LAN: http://192.168.43.237:3220
- Tailnet: http://100.79.7.71:3220
- Service: `kad-nikah-v2.service` (systemd user unit, `Restart=always`, enabled at boot)

## What changed vs the original

### Design system (from the ui-ux-pro-max dataset)
- Palette refined for contrast: ink `#2E2A26` on paper `#FBF8F3` = 11.9:1,
  muted `#6B6259` = 5.4:1, plum `#6B4E9E` = 6.9:1, gold `#A9863F` = 4.6:1. All WCAG AA.
- The original purple `#7156b4` on white was ~4.0:1 — below AA for body text.
- Typography kept (Playfair Display / Poppins / Great Vibes / Scheherazade New) but
  given a real scale: 26px section titles, 17px detail values, 13.5px body, 10px labels.
- Spacing normalised to a consistent rhythm; every section is centred and max 520px.

### Motion (per the dataset's motion rules)
- Reveals are 450ms `cubic-bezier(.215,.61,.355,1)` with a 14px rise — one-way, never re-hide.
- `prefers-reduced-motion` renders the final state immediately.
- No parallax on text; the cover image gets a very slow 18s pan (decorative only).

### Accessibility
- Skip link, `<main>` landmark, single `<h1>`.
- `:focus-visible` on every control; all touch targets ≥44px (verified 0 undersized).
- Lightbox is a real dialog: Escape closes, arrows navigate, swipe works, focus moves on open.
- Toasts use `aria-live="polite"`; the guestbook list is a live region.
- Form labels are real `<label for>` pairs; inputs carry `autocomplete="name"`.

### New features
1. **Personalised guest** — `?to=Keluarga%20Ahmad` shows "Kepada …" on the cover and
   pre-fills both the RSVP and guestbook name fields.
2. **Save the date** — generates a real `.ics` file client-side (works offline).
3. **Google Calendar** link with the correct UTC window (10:00–16:00 MYT).
4. **Gallery lightbox** — keyboard, swipe, counter, focus management.
5. **RSVP** — hadir/tidak hadir plus party size, persisted in `localStorage`.
6. **Guestbook** — persisted locally, so it works without any backend.
   (`Code.gs` is still in the folder if you want the Google Sheets path back.)
7. **Copy bank account** with clipboard fallback and toast confirmation.
8. **Share** — Web Share API on mobile, WhatsApp fallback elsewhere.
9. **Scroll progress bar** and a bottom nav with six destinations.
10. **Compact music control** (top-right) with a spinning disc while playing.

## Performance
- Single HTML file, no frameworks, no CSS/JS build step.
- Hero image preloaded, gallery images lazy-loaded.
- Fonts via Google Fonts with `display=swap`; only four families.

## Deploying to Vercel
Point a new Vercel project at this folder (or a new repo). No build command needed —
it is a static site: framework preset **Other**, output directory `.`.

## Content to replace before going public
These are placeholders inherited from the original:
- `Nama Keluarga Pihak Lelaki` / `Nama Keluarga Pihak Perempuan`
- Bank account `1234567890` (Bank Rakyat)
- Phone `+60 12-345 6789` / `wa.me/601234567890`
- Wishlist items (Microwave Oven, Blender)
- Parents' names and actual venue address for the map embed
