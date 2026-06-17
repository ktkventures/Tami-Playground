# RP Dynastree — Project Plan

An RP family tree app that will serve as a central hub for Tami's
community, organizing our OCs' lineages, clans, art, maps, events and
profiles. A key feature is that members can share family trees with each
other either as view-only or with edit permissions.

## Users

- ~20-30 people in a close RP community
- 2-3 staff editors who actively curate trees and other content
- Everyone else mostly views and contributes occasionally
- No accounts — sharing is link-based

## Stack

| Layer            | Choice                                                                  |
| ---------------- | ----------------------------------------------------------------------- |
| Code             | Vanilla HTML / CSS / JavaScript, split into files (index.html, edit-character.html, shared data.js) |
| Local dev        | VS Code Live Server — serves the app at http://localhost with auto-reload (needed for multi-page + Supabase) |
| Cloud storage    | Supabase (free tier)                                                    |
| Privacy          | Supabase Row Level Security + HTTPS + hard-to-guess link IDs            |
| Sharing          | Link-based: separate "edit" and "view" URLs per tree                    |
| Hosting          | Cloudflare Pages (free)                                                 |
| Source control   | GitHub (this repo)                                                      |
| Editor           | VS Code with the Claude Code extension                                  |

## Architecture

```
Tami's computer (VS Code)
   ↓ git push
GitHub (source code)
   ↓ auto-deploy
Cloudflare Pages (static hosting, free)
   ↓ browser loads the app
Community members' browsers
   ↓ talk directly to
Supabase (trees, profiles, art metadata, etc. — no accounts)
```

## Key decisions and why

**Why vanilla JS, not React.** The repo already had a ~2,200-line working
prototype with beginner-friendly comments. Rebuilding in React would have
added ~3 weeks before any shareable v1. Vanilla works fine until a single
file gets unwieldy (~5,000-7,000 lines of well-organized code). As
additional modules (profiles, gallery, maps, events) are added, we'll
revisit the framework choice — likely sooner rather than later given the
broader scope.

**Why Supabase, not Firebase.** Open source, built on Postgres (industry-
standard SQL skills transfer), independent company (vs Google), better
long-term privacy story.

**Why we're skipping zero-knowledge encryption.** Earlier discussion
considered encrypting all data client-side so even Supabase couldn't read
it. Decision: skip it. Reasoning — Dynastree is for fun (fictional RP
characters), not sensitive personal data. Supabase's and Cloudflare's
standard security (HTTPS, Row Level Security, encrypted-at-rest storage)
is sufficient. Skipping encryption also unblocks more advanced real-time
features later if we want them.

**Why Cloudflare Pages, not Vercel/Netlify.** Unlimited bandwidth on the
free tier (no surprise bills if the community grows), Cloudflare's
privacy stance, equally easy to set up.

**Why link-based sharing, not accounts.** No friction for the community.
Matches Google Docs' "anyone with the link" model. For 20-30 trusted
people, this is genuinely sufficient and removes a huge amount of
complexity (no auth flows, no password resets, no user management).

**Real-time: Level 1 (refresh-on-save) for v1.5.** Another viewer sees
changes within ~½ second after the editor releases the mouse — plenty for
2-3 staff who rarely edit the same tree simultaneously. Without
encryption in the way, Levels 2 (live dragging) and 3 (multi-cursor)
remain on the table as future possibilities.

## Roadmap

| Session | Status   | Goal                                                                                                |
| ------- | -------- | --------------------------------------------------------------------------------------------------- |
| 1       | ✅ Done   | Tools installed, repo synced, plan documented                                                       |
| 1.5     | ✅ Done   | Hand-drawn graphics (title, frame, bold pass, status stickers, all symbols) + custom profile sections |
| 1.6     | ✅ Done   | Split editor into its own page (edit-character.html) + shared data.js; run via Live Server (http://localhost) |
| 2       | ✅ Done   | Supabase set up; save/load (data.js) moved to a Supabase cloud `app_state` row instead of localStorage |
| 3       | ✅ Done   | Per-tree records + share-link generation (separate edit + view links), with RLS locked to link IDs  |
| 4       | ✅ Done   | Deployed to Cloudflare Pages (rp-dynastree.pages.dev), tested live with community                   |
| v1.5    | Next     | Auto-refresh-on-save real-time updates (Level 1)                                                    |

## Future modules (post-v1)

RP Dynastree is meant to grow into a broader community hub. Family-tree
sharing is v1. Planned future modules, each its own mini-project:

- **Character profiles** — individual pages per character with details, traits, story
- **Lineages** — extended ancestry views across trees
- **Clans** — groupings of characters
- **Art gallery** — uploaded character art
- **Maps** — world maps for the RP setting
- **Events** — community / RP event calendar

We'll tackle these one at a time after v1 is shareable. The framework
decision (vanilla vs. React/Svelte) should be revisited before starting
the second module.

## Constraints to remember

- **No AI-generated art.** Tami provides her own scanned drawings for any
  decorative graphics. (See CLAUDE.md hard rule.)
- **Beginner-friendly code & comments.** Code doubles as a learning
  resource for Tami.
- **Confirm before file changes.** Per CLAUDE.md — describe what's about
  to change and wait for explicit approval before editing or creating files.

## Current status

**End of session 7 (2026-06-16) — UX polish pass ✅ (all deployed live).**
A broad round of usability/feature polish on the live app, shipped to
rp-dynastree.pages.dev.
- **Tree tabs:** hover **Edit** (rename via a modal) + **Remove** (confirm;
  removes from this browser's list only) buttons; removing the last tab returns
  to the welcome page. The canvas title and tab name are now one synced value.
- **Navigation:** a **Home** button (saves, then to the welcome page); "Create
  a new tree" is instant (no name prompt); Share moved to the left.
- **Canvas dragging:** smoother eased auto-scroll at the edges; releasing a
  drag fits the canvas to its boxes (trims wasted space) without snapping small
  trees.
- **View-only links:** can't drag boxes or marquee-select; editing tip hidden;
  title shows no editable outline.
- **Character editor:** new **Species/Race/etc.** field (dropdown + value);
  **Gender** gains Non-Binary + a Custom combo box; **Status** gains Missing +
  N/A. Symbol/image toolbar moved above the action buttons (right-aligned,
  recents on the left, picker opens upward). Editing card widens on roomy
  windows; top fields capped/centered/edge-aligned while sections stay
  full-width. Preview shows species as a subheader + gender/status info lines.
  (Non-standard genders/statuses have no hand-drawn card symbol by design.)

**Next (v1.5):** auto-refresh-on-save real-time updates (Level 1).

---

**End of session 6 (2026-06-15) — Deployed live ✅ (Roadmap Session 4).**
RP Dynastree is now public on the internet and confirmed working from other
people's devices.
- **Hosting:** Cloudflare Pages, Git-connected to the GitHub repo. **`main` is
  the production branch** — every push to main auto-deploys in ~1 minute. Build
  settings: framework None, no build command, output directory `public`.
- **Repo layout:** the app lives in **`public/`** (index.html,
  edit-character.html, data.js, images/); internal notes (CLAUDE.md, PLAN.md,
  docs/) stay at the root, out of the public site (verified not served).
- **Live URL:** https://rp-dynastree.pages.dev
- **No Supabase change needed** — its Data API already accepts any origin.
- **Welcome home screen:** the bare URL now shows a welcome (this browser's
  tree list + a "Create a new tree" button + a share-link note) instead of
  auto-opening a tree or running the old legacy import. Share links (`?t=...`)
  still open a specific tree directly.

**Next (v1.5):** auto-refresh-on-save real-time updates (Level 1) — another
viewer sees changes shortly after the editor releases the mouse. Optional
later: a custom domain, a proper 404 page, and retiring the old `app_state`
table (plus the now-unused `loadLegacyAppState`).

---

**End of session 5 (2026-06-13) — Share links ✅ (Roadmap Session 3).**
RP Dynastree is now share-ready: every tree is its own cloud record reached
through secret links — the "Google Docs model".
- **Per-tree rows:** replaced the single `app_state` blob with one row per
  tree in a new `trees` table (id, data, view_key, edit_key, timestamps).
- **Locked down:** the table has Row Level Security on and direct access
  revoked; ALL access goes through four `security definer` functions that
  check the token — `get_tree`, `save_tree`, `create_tree`, `delete_tree`. A
  view token can read but not save, and can't even discover the edit token.
- **Two links per tree:** separate view-only and edit URLs (`index.html?t=…`),
  each carrying a secret token. A **Share** button beside the title copies
  either link; opening a view link hides the editing controls.
- **"My trees" menu:** a personal, browser-local list replaced the old global
  tabs. Existing data is imported automatically on a browser's first load.
- **Database setup recorded** in `docs/database-setup.md` (so the Supabase
  schema + functions can be rebuilt if ever needed).

**Next (Roadmap Session 4):** deploy to Cloudflare Pages so the share links
work on the real internet — today they only work on the local Live Server
(`127.0.0.1`) — then test with the community.

---

**End of session 4 (2026-06-13) — Supabase / cloud storage ✅.**
RP Dynastree now stores its data in the cloud (Supabase Postgres) instead of
the browser, so it's the same on every device and member.
- **Database:** one `app_state` table holding a single JSON row (the whole
  app — all trees). Created via SQL; Row Level Security ON with open
  read/insert/update policies for now (fine for a trusted group with
  fictional data — locked down per share-link in Session 3). Project security
  settings used: Data API ON, auto-expose OFF (so we `grant` the `anon` role
  explicitly), automatic RLS ON.
- **Keys:** uses the new **publishable** key (`sb_publishable_…`, the
  replacement for the anon key) — public/safe, maps to the `anon` Postgres
  role, gated by RLS. URL + key live in `data.js` (intentionally public).
- **Code:** `data.js` rewritten — `loadAppState` / `saveAppState` are now
  **async** Supabase calls (one shared `sb` client; the Supabase library is
  loaded via CDN before `data.js` on both pages). First load **migrates** any
  existing `localStorage` data into the cloud so nothing is lost. Both pages
  **await** the load before drawing; the editor awaits the save before
  navigating back.
- Optional polish noted: a brief empty-canvas flash on load (the cloud
  round-trip) — could add a "Loading…" indicator.

**Session 3 plan:** ✅ Done in session 5 (see above) — split the single
`app_state` blob into **per-tree rows**, generated **edit + view share links**
per tree, and tightened **RLS** so a link only unlocks its own tree.

---

**End of session 3 (2026-06-12).** Finished wiring the hand-drawn icons,
added custom character info, and split the app into multiple files running
on a local dev server — the groundwork for Supabase and profiles.

Done this session:
- **All remaining symbols wired to Tami's art:** gender (♂♀⚧), the edit
  pencil, the zoom +/- magnifiers, and the add-relationship "+" — each with
  a muted→bold hover "pop". The plus/edit corner buttons are aligned.
- **Custom profile info on each character:** named **sections** (e.g.
  "Basic Information"), each holding label/answer **detail** rows. Answers
  are unlimited multi-line textareas (for biographies). Saved on the
  character as `character.sections` (migrates the older flat `specs`).
- **Path B — the character editor is now its own page.** Three files:
    - `index.html` — the tree view
    - `edit-character.html` — the editor page (reads `?tree=&id=` from the
      URL, edits name/gender/status/sections, saves, returns to the tree)
    - `data.js` — the shared localStorage load/save layer
      (`loadAppState` / `saveAppState`), used by both pages
  The pencil button now navigates to the editor page; the old in-page edit
  pop-up (its HTML/CSS/JS) was removed from `index.html`.
- **Local dev server set up:** the VS Code **Live Server** extension. The
  app now runs at `http://127.0.0.1:5500/` (not `file://`), which is what
  lets separate pages share data and is required for Supabase. Auto-reloads
  on save. To run: open the project in VS Code, click **Go Live**.
- **Character-editor polish (edit-character.html):** inline **edit pencil**
  on each section/detail (Remove lives inside the edit form); two-line
  "Edit / Name" heading; bigger fonts; the hand-drawn frame on the card.
- **Symbol toolbar:** insert Unicode symbols at the cursor — a 16-category
  picker plus a recently-used row persisted in localStorage.
- **Profile pictures:** upload + drag/zoom **crop** → a small square
  thumbnail stored on `character.image` (JPEG ~256px; kept small for
  localStorage, moves to Supabase file storage later). Shown as a tab
  tucked behind the name card in the tree. The box is now an outer
  container + inner `.character-card` so the picture can sit *behind* it;
  offspring lines connect to the top of the picture so the clickable
  vertical drop stays visible above it.

Pick up next time:
- **Session 2 — Supabase.** The dev server is ready. Plan: swap the
  *internals* of `data.js` (loadAppState/saveAppState) from localStorage to
  Supabase, leaving the two pages mostly untouched.
- **Optional graphics polish:** the dispersed sticker is still see-through;
  Tami may redo a few symbols that look weak at small size.

Housekeeping (image tools — graphics work is essentially done):
- Conversion tools live in `C:\Users\Kevin\dynastree-img-tools\` (MuPDF +
  `pdf-to-png.mjs`, `convert-all.sh`, `apply-bold.sh`,
  `process-deceased-skull.sh`). ⚠️ Re-running `convert-all.sh`/`apply-bold.sh`
  reverts the deceased skull — re-run `process-deceased-skull.sh` after.
- **Uninstall ImageMagick** (winget) + delete the tools folder once Tami is
  done tweaking symbols, to leave her system as found. Ghostscript never
  installed; Chocolatey pre-existed.
