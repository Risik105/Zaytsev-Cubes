// Color palette mappings matching CSS variables

export const COLORS = {
  gold: {
    face: "var(--gold-face)",
    dark: "var(--gold-dark)",
  },
  grey: {
    face: "var(--grey-face)",
    dark: "var(--grey-dark)",
  },
  wood: {
    face: "var(--wood-face)",
    dark: "var(--wood-dark)",
  },
  green: {
    face: "var(--green-face)",
    dark: "var(--green-dark)",
  },
};

export const FACE_KEYS = ["front", "right", "back", "left", "top", "bottom"];

// The angles that bring each face to point straight at the viewer.
// right-side up (the exact inverse of that face's own placement
// rotation in faceGeometry). Used to auto-orient the cube when a
// syllable is clicked.
export const FACE_TARGET_ROTATION = {
  front: { rotX: 0, rotY: 0 },
  back: { rotX: 0, rotY: 180 },
  right: { rotX: 0, rotY: -90 },
  left: { rotX: 0, rotY: 90 },
  top: { rotX: -90, rotY: 0 },
  bottom: { rotX: 90, rotY: 0 },
};

// Real Zaitsev cubes are not all the same shape: hard-consonant cubes are physically bigger than soft-consonant ones, and Ж/Ш/Ц (hard-only) /
// й/ч/щ (soft-only) are rectangular blocks rather than cubes. Each size here maps to its own width x height x depth in px.

export const SIZE_DIMS = {
  single: { w: 130, h: 130, d: 130, font: 30 },
  big: { w: 200, h: 200, d: 200, font: 46 },
  small: { w: 140, h: 140, d: 140, font: 32 },
  "big-rect": { w: 130, h: 240, d: 130, font: 30 },
  "small-rect": { w: 95, h: 170, d: 95, font: 32 },
};

// How much of the available slot the text is allowed to fill. 1 = touch
// the border exactly; slightly under 1 leaves breathing room
// so nothing looks clipped.
export const FACE_TEXT_FILL = 0.94;

// Emoji detection & axis ratio capping
export const EMOJI_RE = /\p{Extended_Pictographic}/u;
export const EMOJI_MAX_AXIS_RATIO = 1.15; // how far scaleY may exceed scaleX (or vice versa)
