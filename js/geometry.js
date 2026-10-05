import { FACE_TEXT_FILL, EMOJI_RE, EMOJI_MAX_AXIS_RATIO } from "./constants.js";

// Given a face key and box's dimensions, returns the inline geometry
// (width/height/offset/3D transform) needed for that face to sit flush on that particular box - not just a uniform cube.
export function faceGeometry(key, { w, h, d }) {
  switch (key) {
    case "front":
      return {
        width: w,
        height: h,
        left: 0,
        top: 0,
        transform: `rotateY(0deg) translateZ(${d / 2}px)`,
      };
    case "back":
      return {
        width: w,
        height: h,
        left: 0,
        top: 0,
        transform: `rotateY(180deg) translateZ(${d / 2}px)`,
      };
    case "right":
      return {
        width: d,
        height: h,
        left: (w - d) / 2,
        top: 0,
        transform: `rotateY(90deg) translateZ(${w / 2}px)`,
      };
    case "left":
      return {
        width: d,
        height: h,
        left: (w - d) / 2,
        top: 0,
        transform: `rotateY(-90deg) translateZ(${w / 2}px)`,
      };
    case "top":
      return {
        width: w,
        height: d,
        left: 0,
        top: (h - d) / 2,
        transform: `rotateX(90deg) translateZ(${h / 2}px)`,
      };
    case "bottom":
      return {
        width: w,
        height: d,
        left: 0,
        top: (h - d) / 2,
        transform: `rotateX(-90deg) translateZ(${h / 2}px)`,
      };
  }
}

// A face entry is either a plain string (one syllable, the common case)
// or { main, flip } for faces that carry a second syllable printed
// upside-down - you flip the whole cube 180deg to read it right-side up.
// Renders one or two clickable <span data-text> elements accordingly.
export function faceContentHtml(entry) {
  if (typeof entry === "string") {
    return `<span class="face-text" data-text="${entry}">${entry}</span>`;
  }
  const flipHtml = entry.flip
  ? `<span class="face-text face-text-flip" data-text="${entry.flip}">${entry.flip}</span>`
  : `<span class="face-text face-text-flip face-text-placeholder"><&nbsp;</span>`;
  return `
    ${flipHtml}
    <span class="face-text face-text-main" data-text="${entry.main}">${entry.main}</span>
  `;
}

// Measures the syllable(s) on a face at their natural (unscaled) size,
// then stretches EACH TEXT SPAN (never the .face itself) with
// transform: scale(x, y) so it fills its slot as fully as possible -
// like the real printed cubes, where letters run edge-to-edge.
export function fitFaceText(faceEl, cubeSize) {
  const allSlots = Array.from(faceEl.querySelectorAll(".face-text"));
  if (!allSlots.length) return;
  const spans = allSlots.filter((s) => !s.classList.contains("face-text-placeholder"));
  if (!spans.length) return;

  const cs = getComputedStyle(faceEl);
  const borderW = parseFloat(cs.borderLeftWidth) + parseFloat(cs.borderRightWidth);
  const borderH = parseFloat(cs.borderTopWidth) + parseFloat(cs.borderBottomWidth);
  const gap = parseFloat(cs.rowGap || cs.gap) || 0;

  const availW = faceEl.clientWidth - borderW;
  const availH = (faceEl.clientHeight - borderH - gap * (allSlots.length - 1)) / allSlots.length;

  spans.forEach((span) => {
    const isFlip = span.classList.contains("face-text-flip");
    span.style.transform = isFlip ? "rotate(180deg)" : "none"; // reset before measuring

    const isEmoji = EMOJI_RE.test(span.textContent);
    if (isEmoji && cubeSize !== "big") return; // keep emoji natural-size on small cubes

    const naturalW = span.offsetWidth;
    const naturalH = span.offsetHeight;
    if (!naturalW || !naturalH) return;
    let scaleX = (availW / naturalW) * FACE_TEXT_FILL;
    let scaleY = (availH / naturalH) * FACE_TEXT_FILL;

    if (isEmoji) {
      if (scaleY > scaleX * EMOJI_MAX_AXIS_RATIO) scaleY = scaleX * EMOJI_MAX_AXIS_RATIO;
      else if (scaleX > scaleY * EMOJI_MAX_AXIS_RATIO) scaleX = scaleY * EMOJI_MAX_AXIS_RATIO;
    }

    span.style.transform = isFlip
    ? `rotate(180deg) scale(${scaleX}, ${scaleY})`
    : `scale(${scaleX}, ${scaleY})`;
  });
}
