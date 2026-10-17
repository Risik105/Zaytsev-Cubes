import { COLORS, FACE_KEYS, FACE_TARGET_ROTATION, SIZE_DIMS } from "./constants.js";
import { faceGeometry, faceContentHtml, fitFaceText } from "./geometry.js";
import { addWordTile } from "./shelf.js";

let activeCube = null;
let selectedFace = null;
let selectedFaceData = null;
let activeCubeControls = null; // set by setupDrag(); exposes snapToFace()

export function getActiveCube() {
    return activeCube;
}

export function getSelectedFace() {
    return selectedFace;
}

export function openCube(cube, btnEl) {
  activeCube = cube;
  selectedFace = null;
  selectedFaceData = null;

  document
    .querySelectorAll(".p-item.active")
    .forEach((el) => el.classList.remove("active"));
    if (btnEl) {
        btnEl.classList.add("active");
    }

  const stagePanel = document.getElementById("stagePanel");
if (!stagePanel) return;

  const colors = COLORS[cube.color];
  const dims = SIZE_DIMS[cube.size] || SIZE_DIMS.big;
  const stageSize = Math.max(dims.w, dims.h, dims.d) + 60;
  const fontSize = dims.font;

  const facesHtml = FACE_KEYS.map((k, i) => {
    const g = faceGeometry(k, dims);
    return `
      <div class="face f-${k}"
      style="background:${colors.face}; color:${colors.dark};
      width:${g.width}px; height:${g.height}px; left:${g.left}px; top:${g.top}px;
      font-size:${fontSize}px; transform:${g.transform}">
      ${faceContentHtml(cube.faces[i])}
      </div>`;
  }).join("");

  stagePanel.innerHTML = `
        <div class="stage-header">
            <span>Кубик «${cube.label}» - ${cube.type}</span>
            <button class="btn-close" id="closeBtn" title="Закрыть">X</button>
        </div>
        <div class="stage" id="cubeStage" style="width:${stageSize}px; height:${stageSize}px;">
            <div class="cube" id="cube3d" style="width:${dims.w}px; height:${dims.h}px; margin:-${dims.h / 2}px 0 0 -${dims.w / 2}px;">
                ${facesHtml}
            </div>
        </div>
        <div class="drag-hint">
            Зажми и тяни, чтобы прокрутить. Двойной клик - сбросить
        </div>
        <div class="stage-footer">
            <div class="selected-hint" id="selHint">
                Выбрано: <b>-</b>
            </div>
            <button class="btn-add" id="addBtn" disabled>
                Добавить к слову
            </button>
        </div>
    `;

  document.getElementById("closeBtn").addEventListener("click", closeCube);
  document.getElementById("addBtn").addEventListener("click", addSelectedToWord);
  document.querySelectorAll("#cube3d .face").forEach((faceEl) => fitFaceText(faceEl, cube.size));
  document.querySelectorAll("#cube3d .face-text").forEach((textEl) => {
    if (textEl.classList.contains("face-text-placeholder")) return;
    textEl.addEventListener("click", (e) => {
      e.stopPropagation();
      selectFace(textEl);
    });
  });

  setupDrag();
}

export function closeCube() {
  activeCube = null;
  selectedFace = null;
  selectedFaceData = null;
  document
    .querySelectorAll(".p-item.active")
    .forEach((el) => el.classList.remove("active"));
    const stagePanel = document.getElementById("stagePanel");
    if (stagePanel) {
        stagePanel.innerHTML = 
            '<div class="stage-placeholder" id="placeholder">Тут появится кубик, когда ты выберешь его снизу ↓</div>';
    }
}

export function selectFace(textEl) {
  document
    .querySelectorAll("#cube3d .face-text.selected")
    .forEach((f) => f.classList.remove("selected"));
  textEl.classList.add("selected");
  selectedFace = textEl.dataset.text;

  // Determine secondary syllable on this face if it is a dual-syllable rectangular face
  const faceEl = textEl.closest(".face");
  const faceKey = FACE_KEYS.find((k) => faceEl && faceEl.classList.contains(`f-${k}`));
  const isFlip = textEl.classList.contains("face-text-flip");

  let secondaryText = null;
  if (activeCube && faceKey) {
    const faceIndex = FACE_KEYS.indexOf(faceKey);
    const faceEntry = activeCube.faces[faceIndex];
    if (faceEntry && typeof faceEntry === "object") {
      const partner = isFlip ? faceEntry.main : faceEntry.flip;
      secondaryText = (partner !== undefined && partner !== null) ? partner : "";
    }
  }

  // Store detailed selection data
  selectedFaceData = {
    primaryText: selectFace,
    secondaryText: secondaryText,
    isFlipped: isFlip,
  };

  const selHint = document.getElementById("selHint");
  if (selHint) {
    selHint.innerHTML = `Выбран: <b>${selectedFace}</b>`;
  }
  const addBtn = document.getElementById("addBtn");
  if (addBtn) {
    addBtn.disabled = false;
  }

  // Turn the cube so the clicked face points straight at the viewer.
  // If the clicked syllable was the upside-down "flip" one, roll an
  // extra 180deg so it reads right-side up instead of the main syllable.
  if (activeCubeControls && faceKey) {
    activeCubeControls.snapToFace(faceKey, isFlip);
  }
}

function addSelectedToWord() {
  if (!selectedFace || !activeCube) return;
  addWordTile({
    text: selectedFace,
    secondaryText: selectedFaceData ? selectedFaceData.secondaryText : null,
    isFlipped: selectedFaceData ? selectedFaceData.isFlipped : false,
    color: activeCube.color,
    size: activeCube.size,
  });
}

function setupDrag() {
  const stage = document.getElementById("cubeStage");
  const cube = document.getElementById("cube3d");
    if (!stage || !cube) return;

  let rotX = -18,
    rotY = -28,
    rotZ = 0;
  let dragging = false,
    lastX = 0,
    lastY = 0;

  function setRotation() {
    cube.style.transform = `rotateZ(${rotZ}deg) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  }

  function pointerDown(x, y) {
    dragging = true;
    lastX = x;
    lastY = y;
    rotZ = 0; // free-dragging always resumes from the un-rolled view
    stage.classList.add("grabbing");
    cube.classList.remove("snapping");
  }

  function pointerMove(x, y) {
    if (!dragging) return;
    const dx = x - lastX,
      dy = y - lastY;
    rotY += dx * 0.4;
    rotX -= dy * 0.4;
    lastX = x;
    lastY = y;
    setRotation();
  }

  function pointerUp() {
    dragging = false;
    stage.classList.remove("grabbing");
  }

  stage.addEventListener("mousedown", (e) => pointerDown(e.clientX, e.clientY));
  window.addEventListener("mousemove", (e) =>
    pointerMove(e.clientX, e.clientY),
  );
  window.addEventListener("mouseup", pointerUp);
  stage.addEventListener(
    "touchstart",
    (e) => {
      const t = e.touches[0];
      pointerDown(t.clientX, t.clientY);
    },
    { passive: true },
  );
  window.addEventListener(
    "touchmove",
    (e) => {
      const t = e.touches[0];
      pointerMove(t.clientX, t.clientY);
    },
    { passive: true },
  );
  window.addEventListener("touchend", pointerUp);
  stage.addEventListener("dblclick", () => {
    cube.classList.add("snapping");
    rotX = -18;
    rotY = -28;
    rotZ = 0;
    setRotation();
  });

  // Rotate so `faceKey` faces the viewer. When `flip` is true, roll an
  // extra 180deg around the viewing axis so the upside-down syllable on
  // that face reads right-side up.
  function snapToFace(faceKey, flip) {
    const target = FACE_TARGET_ROTATION[faceKey];
    if (!target) return;
    cube.classList.add("snapping");
    rotX = target.rotX;
    rotY = target.rotY;
    rotZ = flip ? 180 : 0;
    setRotation();
  }

  activeCubeControls = { snapToFace };

  setRotation();
}
