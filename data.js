/*
  data.js — the shared "save / load" layer for RP Dynastree.

  Both pages use this file:
    - index.html            (the tree view)
    - edit-character.html   (the character editor)

  Keeping all the storage code in ONE place means the two pages can never
  disagree about how data is shaped or where it lives. For now everything
  is kept in the browser's localStorage. When we move to Supabase (cloud
  storage) later, mostly just THIS file changes — the pages keep calling
  the same functions.
*/

// The single storage "drawer" that holds the whole app (every tree).
const APP_KEY = "familyTreeApp";

// Older single-tree storage keys. They are only read once, to carry an
// existing tree over the first time this multi-tree version runs.
const CHARACTERS_KEY    = "familyTreeCharacters";
const RELATIONSHIPS_KEY = "familyTreeRelationships";
const ZOOM_KEY          = "familyTreeZoom";
const TITLE_KEY         = "familyTreeTitle";

// loadAppState: reads every tree out of storage, returning the whole app
// as { trees, currentTreeId }. The first time this version runs it carries
// over a tree saved by the older single-tree version, so nothing is lost.
function loadAppState() {
  const savedText = localStorage.getItem(APP_KEY);
  if (savedText) {
    return JSON.parse(savedText);
  }
  const oldCharacters    = localStorage.getItem(CHARACTERS_KEY);
  const oldRelationships = localStorage.getItem(RELATIONSHIPS_KEY);
  const oldZoom          = localStorage.getItem(ZOOM_KEY);
  const firstTree = {
    id: 1,
    name: "Tree 1",
    title: localStorage.getItem(TITLE_KEY) || "",
    characters:    oldCharacters    ? JSON.parse(oldCharacters)    : [],
    relationships: oldRelationships ? JSON.parse(oldRelationships) : [],
    zoom:          oldZoom          ? Number(oldZoom)              : 1
  };
  return { trees: [firstTree], currentTreeId: 1 };
}

// saveAppState: writes the whole app (every tree) back to storage as text.
function saveAppState(trees, currentTreeId) {
  localStorage.setItem(APP_KEY, JSON.stringify({
    trees: trees,
    currentTreeId: currentTreeId
  }));
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
