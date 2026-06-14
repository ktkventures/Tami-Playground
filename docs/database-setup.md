# RP Dynastree — Database setup (Supabase)

This file records the **SQL that builds the Supabase database** behind RP
Dynastree, so it can be rebuilt from scratch if ever needed. The live database
lives in the Supabase console; this is the written record of it.

> **Accuracy note.** `get_tree` below is the exact, current version (we ran it
> when adding the Share button). `create_tree`, `save_tree`, and `delete_tree`
> are reproduced **from their design** — if you want to be 100% certain they
> match what's live, open Supabase → **Database → Functions**, click each one,
> and compare. They're small, so it's a quick check.

## Project settings used
- **Data API:** ON
- **Auto-expose new tables:** OFF — so we grant the public (`anon`) role access
  explicitly, table by table, instead of everything being open by default.
- **Automatic RLS (Row Level Security):** ON

The app connects with the **publishable** key (public, safe to share — it maps
to the `anon` role and is gated by the rules below). The URL and key live in
`data.js`:
- URL: `https://nwsrrsiiplesdkdjgiru.supabase.co`
- Key: `sb_publishable_JUlgfaNFzDUEDYjrk0tYAg_fLfiEi5k`

## How the security model works (plain language)
Each tree is **one row** in the `trees` table. The table is **locked** — no one
can read or write it directly. Every row carries two secret tokens: a
**`view_key`** and an **`edit_key`**, which are the codes baked into the share
links (`index.html?t=THE_TOKEN`).

All access goes through four small **functions** that run with elevated
permission (`security definer`) but only after **checking the token you
supplied**:
- A **view token** can *read* a tree but not save it, and can't even learn the
  edit token.
- An **edit token** can read, save, and delete the tree, and can fetch both
  links (for the Share pop-up).

This is the "anyone with the link" idea (like Google Docs), enforced by the
database itself rather than by the web page.

---

## 1. The `trees` table

```sql
-- One row per family tree.
create table trees (
  id          uuid primary key default gen_random_uuid(),
  data        jsonb not null default '{}'::jsonb,   -- the whole tree: name, title, characters, relationships, zoom
  view_key    text not null unique default replace(gen_random_uuid()::text, '-', ''),
  edit_key    text not null unique default replace(gen_random_uuid()::text, '-', ''),
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Lock the table: turn on Row Level Security and remove all direct access.
-- From here on, the only way in is through the functions below.
alter table trees enable row level security;
revoke all on table trees from anon, authenticated;
```

## 2. `get_tree` — read a tree by a token (current/verified version)

```sql
-- Returns the tree if the token matches its view OR edit key.
-- can_edit is true only for the edit token. The edit_key is handed back
-- ONLY to an edit-token caller, so a view link can never discover it.
create or replace function get_tree(p_token text)
returns table (id uuid, data jsonb, can_edit boolean, view_key text, edit_key text)
language sql
security definer
set search_path = public
as $$
  select
    t.id,
    t.data,
    (t.edit_key = p_token) as can_edit,
    t.view_key,
    case when t.edit_key = p_token then t.edit_key else null end as edit_key
  from trees t
  where t.view_key = p_token
     or t.edit_key = p_token;
$$;

grant execute on function get_tree(text) to anon;
```

## 3. `save_tree` — save a tree (edit token only)

```sql
-- Writes new contents to the tree. Only works for the edit token; a view
-- token matches no row here, so it silently changes nothing.
create or replace function save_tree(p_token text, p_data jsonb)
returns void
language sql
security definer
set search_path = public
as $$
  update trees
  set data = p_data,
      updated_at = now()
  where edit_key = p_token;
$$;

grant execute on function save_tree(text, jsonb) to anon;
```

## 4. `create_tree` — make a new tree

```sql
-- Inserts a fresh tree (Postgres auto-generates the id and both keys) and
-- returns its id + both share keys. The web app immediately saves the tree's
-- starting contents afterwards, so the stored name here is just a sensible
-- default.
create or replace function create_tree(p_name text)
returns table (id uuid, view_key text, edit_key text)
language sql
security definer
set search_path = public
as $$
  insert into trees (data)
  values (jsonb_build_object('name', p_name))
  returning id, view_key, edit_key;
$$;

grant execute on function create_tree(text) to anon;
```

## 5. `delete_tree` — delete a tree (edit token only)

```sql
-- Removes the tree. Only the edit token matches a row, so a view token can't
-- delete anything.
create or replace function delete_tree(p_token text)
returns void
language sql
security definer
set search_path = public
as $$
  delete from trees where edit_key = p_token;
$$;

grant execute on function delete_tree(text) to anon;
```

---

## Legacy table: `app_state`

Session 2 stored the **whole app in a single JSON row** in a table called
`app_state` (id = 1). Session 3 moved to the per-tree `trees` table above. The
old `app_state` table is **kept for now** because the app reads it once, on a
browser's first load, to **import** any pre-existing trees
(`loadLegacyAppState` in `data.js`). Once everyone's data has been imported, it
can be dropped:

```sql
-- Only after confirming every member's old data has been migrated.
-- drop table app_state;
```
