/*
  data.js — the shared cloud layer for RP Dynastree.

  Each tree is now its OWN row in the Supabase `trees` table, reached only
  through secret tokens (the keys baked into your share links). The table is
  locked down; all access goes through database functions that check the
  token:
    - getTree(token)         -> read a tree (a view OR edit token works)
    - saveTree(token, data)  -> save a tree (edit token only)
    - createTree(name)       -> make a new tree; returns its id + secrets
    - deleteTree(token)      -> delete a tree (edit token only)

  Plus a small LOCAL "my trees" list (this browser only, never shared) so you
  have a personal menu of the trees you've made, and helpers to build share
  links. `loadLegacyAppState` reads the OLD single-blob data once, for
  migrating it into the new per-tree system.

  The `supabase` global comes from the library loaded before this file.
*/

const SUPABASE_URL = "https://nwsrrsiiplesdkdjgiru.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_JUlgfaNFzDUEDYjrk0tYAg_fLfiEi5k";
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// ===== Talking to the cloud (one tree at a time, via its secret token) =====

// getTree: fetch a tree by a share token. Returns { id, data, canEdit }, or
// null if the token matches no tree.
async function getTree(token) {
  const { data, error } = await sb.rpc("get_tree", { p_token: token });
  if (error) { console.error("getTree failed:", error); throw error; }
  if (!data || data.length === 0) { return null; }
  const row = data[0];
  // view_key/edit_key come back so the Share pop-up can build both links.
  // edit_key is only filled in for an edit token (null for a view token), so
  // a view-only visitor can never discover the edit link.
  return {
    id: row.id,
    data: row.data,
    canEdit: row.can_edit,
    viewKey: row.view_key || null,
    editKey: row.edit_key || null
  };
}

// saveTree: save a tree's contents. The database only honours this for an
// EDIT token (a view token silently changes nothing).
async function saveTree(token, treeData) {
  const { error } = await sb.rpc("save_tree", { p_token: token, p_data: treeData });
  if (error) { console.error("saveTree failed:", error); throw error; }
}

// createTree: make a brand-new tree. Returns { id, viewKey, editKey }.
async function createTree(name) {
  const { data, error } = await sb.rpc("create_tree", { p_name: name || "Untitled tree" });
  if (error) { console.error("createTree failed:", error); throw error; }
  const row = data[0];
  return { id: row.id, viewKey: row.view_key, editKey: row.edit_key };
}

// deleteTree: delete a tree (EDIT token only).
async function deleteTree(token) {
  const { error } = await sb.rpc("delete_tree", { p_token: token });
  if (error) { console.error("deleteTree failed:", error); throw error; }
}

// ===== The local "my trees" list (this browser only) =====
// Each entry: { name, editKey, viewKey }. A personal menu — never shared.

const MY_TREES_KEY = "dynastreeMyTrees";

function loadMyTrees() {
  try {
    const saved = localStorage.getItem(MY_TREES_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch (e) { return []; }
}
function saveMyTrees(list) {
  localStorage.setItem(MY_TREES_KEY, JSON.stringify(list));
}
// rememberTree: add/update an entry (matched by editKey), newest first.
function rememberTree(entry) {
  const list = loadMyTrees().filter(function (t) { return t.editKey !== entry.editKey; });
  list.unshift(entry);
  saveMyTrees(list);
}
function forgetTree(editKey) {
  saveMyTrees(loadMyTrees().filter(function (t) { return t.editKey !== editKey; }));
}

// ===== Share links =====
// One link shape; the token decides view vs edit. Resolves to this site's
// index.html regardless of which page builds the link.
function shareLink(token) {
  return new URL("index.html?t=" + token, location.href).href;
}

// ===== One-time migration helper =====
// Reads the OLD single-blob app_state row (from the previous version), so we
// can copy each tree into its own row. Returns { trees: [...] } or null.
async function loadLegacyAppState() {
  const { data, error } = await sb
    .from("app_state")
    .select("data")
    .eq("id", 1)
    .maybeSingle();
  if (error) { console.error("loadLegacyAppState failed:", error); return null; }
  return (data && data.data && data.data.trees) ? data.data : null;
}

// ===== Small lookup helper (used by the editor page) =====
function findCharacterById(characters, charId) {
  return characters.find(function (character) {
    return character.id === charId;
  });
}
