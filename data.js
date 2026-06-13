/*
  data.js — the shared "save / load" layer for RP Dynastree.

  Both pages use this file:
    - index.html            (the tree view)
    - edit-character.html   (the character editor)

  Data now lives in the CLOUD, in a Supabase (PostgreSQL) database, so it is
  the same on every device and for every member. For now the whole app (all
  trees) is kept in a SINGLE database row; we'll split it into per-tree rows
  when we add share links.

  The `supabase` global comes from the Supabase library, loaded by a <script>
  tag just before this file on each page.
*/

// The project's address and PUBLIC key. These are safe to ship in the code:
// the publishable key only has limited "anon" access, and Row Level Security
// in the database controls what it is actually allowed to read and write.
const SUPABASE_URL = "https://nwsrrsiiplesdkdjgiru.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_JUlgfaNFzDUEDYjrk0tYAg_fLfiEi5k";

// The client we use to talk to the database.
const sb = supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

// We keep the whole app in one row, with this fixed id.
const APP_ROW_ID = 1;

// A brand-new, empty app: one blank tree.
function blankAppState() {
  return {
    trees: [
      { id: 1, name: "Tree 1", title: "", characters: [], relationships: [], zoom: 1 }
    ],
    currentTreeId: 1
  };
}

// loadAppState: reads the whole app ({ trees, currentTreeId }) from the cloud.
// It is "async" because talking to the cloud takes a moment — callers write
// `await loadAppState()`.
async function loadAppState() {
  const { data, error } = await sb
    .from("app_state")
    .select("data")
    .eq("id", APP_ROW_ID)
    .maybeSingle();

  if (error) {
    console.error("Could not load from Supabase:", error);
    throw error;
  }

  // Found saved data in the cloud — use it.
  if (data && data.data && data.data.trees) {
    return data.data;
  }

  // Nothing in the cloud yet. The first time this runs, carry over anything
  // this browser saved BEFORE the move to the cloud, so nothing is lost.
  const local = localStorage.getItem("familyTreeApp");
  if (local) {
    try {
      const parsed = JSON.parse(local);
      if (parsed && parsed.trees) { return parsed; }
    } catch (e) { /* ignore unreadable local data */ }
  }

  // Otherwise start fresh.
  return blankAppState();
}

// saveAppState: writes the whole app back to the cloud (one row, "upserted"
// — inserted the first time, updated after that). Async; throws on failure
// so the caller can react.
async function saveAppState(trees, currentTreeId) {
  const { error } = await sb
    .from("app_state")
    .upsert({
      id: APP_ROW_ID,
      data: { trees: trees, currentTreeId: currentTreeId },
      updated_at: new Date().toISOString()
    });

  if (error) {
    console.error("Could not save to Supabase:", error);
    throw error;
  }
}

// findTreeById: looks up one tree in the list by its id.
function findTreeById(trees, treeId) {
  return trees.find(function (tree) {
    return tree.id === treeId;
  });
}

// findCharacterById: looks up one character in a list by its id.
function findCharacterById(characters, charId) {
  return characters.find(function (character) {
    return character.id === charId;
  });
}
