# Dynastree — Project Plan

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
| Code             | Vanilla HTML / CSS / JavaScript (single-file prototype; may split later) |
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
| 2       | Next     | Set up Supabase account + project. Modify save/load to use Supabase (cloud) instead of browser local storage. |
| 3       | Pending  | Add share-link generation (separate edit + view links)                                              |
| 4       | Pending  | Deploy to Cloudflare Pages, test with community                                                     |
| v1.5    | Future   | Auto-refresh-on-save real-time updates (Level 1)                                                    |

## Future modules (post-v1)

Dynastree is meant to grow into a broader RP community hub. Family-tree
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

End of Session 1. Tooling installed (VS Code, Git, Node.js, Claude Code
extension), repo cloned and synced, branch renamed to
`claude/rp-dynastree-live-J7Yal`. Existing prototype (`family-tree.html`)
verified to work locally. Project renamed from "Family Tree Creator" to
**Dynastree** — file renames and title updates pending. **Next session
goal:** get Supabase wired in (replacing browser local storage with cloud
storage).
