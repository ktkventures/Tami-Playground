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
| 2       | Next     | Set up Supabase account + project. Move save/load (data.js) to Supabase instead of browser local storage. |
| 3       | Pending  | Add share-link generation (separate edit + view links)                                              |
| 4       | Pending  | Deploy to Cloudflare Pages, test with community                                                     |
| v1.5    | Future   | Auto-refresh-on-save real-time updates (Level 1)                                                    |

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
