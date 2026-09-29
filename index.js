// Data model
// Every consonant with both a hard and soft variant gets TWO separate cube entries.

const CUBES = [
  {
    id: "У",
    label: "У",
    type: "Гласный",
    size: "big",
    color: "gold",
    faces: ["У", "О", "А", "Э", "Ы", "🍓"],
  },

  {
    id: "ю",
    label: "ю",
    type: "Гласный",
    size: "small",
    color: "gold",
    faces: ["ю", "ё", "я", "е", "и", "🍓"],
  },

  {
    id: "й",
    label: "й",
    type: "Звонкий мягкий согласный",
    size: "small-rect",
    color: "grey",
    faces: [{ main: "й", flip: "" }, { main: "йя", flip: "йа" }, { main: "", flip: "йо" }, { main: "йи", flip: "" }, "йю", "йе"],
  },

  {
    id: "Л",
    label: "Л",
    type: "Звонкий твёрдый согласный",
    size: "big",
    color: "grey",
    faces: ["ЛУ", "ЛО", "ЛА", "ЛЭ", "ЛЫ", "Л"],
  },

  {
    id: "ль",
    label: "ль",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["лю", "лё", "ля", "ле", "ли", "ль"],
  },

  {
    id: "М",
    label: "М",
    type: "Звонкий твёрдый согласный",
    size: "big",
    color: "grey",
    faces: ["МУ", "МО", "МА", "МЭ", "МЫ", "М"],
  },

  {
    id: "мь",
    label: "мь",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["мю", "мё", "мя", "ме", "ми", "мь"],
  },

  {
    id: "Н",
    label: "Н",
    type: "Звонкий твёрдый согласный",
    size: "big",
    color: "grey",
    faces: ["НУ", "НО", "НА", "НЭ", "НЫ", "Н"],
  },

  {
    id: "нь",
    label: "нь",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["ню", "нё", "ня", "не", "ни", "нь"],
  },

  {
    id: "Р",
    label: "Р",
    type: "Звонкий твёрдый согласный",
    size: "big",
    color: "grey",
    faces: ["РУ", "РО", "РА", "РЭ", "РЫ", "Р"],
  },

  {
    id: "рь",
    label: "рь",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["рю", "рё", "ря", "ре", "ри", "рь"],
  },

  {
    id: "В",
    label: "В",
    type: "Звонкий твёрдый согласный",
    size: "big",
    color: "grey",
    faces: ["ВУ", "ВО", "ВА", "ВЭ", "ВЫ", "В"],
  },

  {
    id: "вь",
    label: "вь",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["вю", "вё", "вя", "ве", "ви", "вь"],
  },

  {
    id: "З",
    label: "З",
    type: "Звонкий твёрдый согласный",
    size: "big",
    color: "grey",
    faces: ["ЗУ", "ЗО", "ЗА", "ЗЭ", "ЗЫ", "З"],
  },

  {
    id: "зь",
    label: "зь",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["зю", "зё", "зя", "зе", "зи", "зь"],
  },

  {
    id: "Б",
    label: "Б",
    type: "Звонкий твёрдый согласный",
    size: "big",
    color: "grey",
    faces: ["БУ", "БО", "БА", "БЭ", "БЫ", "Б"],
  },

  {
    id: "бь",
    label: "бь",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["бю", "бё", "бя", "бе", "би", "бь"],
  },

  {
    id: "Д",
    label: "Д",
    type: "Звонкий твёрдый согласный",
    size: "big",
    color: "grey",
    faces: ["ДУ", "ДО", "ДА", "ДЭ", "ДЫ", "Д"],
  },

  {
    id: "дь",
    label: "дь",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["дю", "дё", "дя", "де", "ди", "дь"],
  },

  {
    id: "Г",
    label: "Г",
    type: "Звонкий твёрдый согласный",
    size: "big",
    color: "grey",
    faces: ["ГУ", "ГО", "ГА", "ГЭ", "ГЫ", "Г"],
  },

  {
    id: "гь",
    label: "гь",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["гю", "гё", "гя", "ге", "ги", "гь"],
  },

  {
    id: "Ж",
    label: "Ж",
    type: "Звонкий твёрдый согласный",
    size: "big-rect",
    color: "grey",
    faces: [{ main: "Ж", flip: "ЖЬ" }, { main: "ЖО", flip: "ЖЁ" }, { main: "ЖЕ", flip: "" }, { main: "ЖИ", flip: "" }, "ЖУ", "ЖА"],
  },

  {
    id: "Ф",
    label: "Ф",
    type: "Глухой твёрдый согласный",
    size: "big",
    color: "wood",
    faces: ["ФУ", "ФО", "ФА", "ФЭ", "ФЫ", "Ф"],
  },

  {
    id: "фь",
    label: "фь",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["фю", "фё", "фя", "фе", "фи", "фь"],
  },

  {
    id: "С",
    label: "С",
    type: "Глухой твёрдый согласный",
    size: "big",
    color: "wood",
    faces: ["СУ", "СО", "СА", "СЭ", "СЫ", "С"],
  },

  {
    id: "сь",
    label: "сь",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["сю", "сё", "ся", "се", "си", "сь"],
  },

  {
    id: "П",
    label: "П",
    type: "Глухой твёрдый согласный",
    size: "big",
    color: "wood",
    faces: ["ПУ", "ПО", "ПА", "ПЭ", "ПЫ", "П"],
  },

  {
    id: "пь",
    label: "пь",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["пю", "пё", "пя", "пе", "пи", "пь"],
  },

  {
    id: "Т",
    label: "Т",
    type: "Глухой твёрдый согласный",
    size: "big",
    color: "wood",
    faces: ["ТУ", "ТО", "ТА", "ТЭ", "ТЫ", "Т"],
  },

  {
    id: "ть",
    label: "ть",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["тю", "тё", "тя", "те", "ти", "ть"],
  },

  {
    id: "К",
    label: "К",
    type: "Глухой твёрдый согласный",
    size: "big",
    color: "wood",
    faces: ["КУ", "КО", "КА", "КЭ", "КЫ", "К"],
  },

  {
    id: "кь",
    label: "кь",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["кю", "кё", "кя", "ке", "ки", "кь"],
  },

  {
    id: "Х",
    label: "Х",
    type: "Глухой твёрдый согласный",
    size: "big",
    color: "wood",
    faces: ["ХУ", "ХО", "ХА", "ХЭ", "ХЫ", "Х"],
  },

  {
    id: "хь",
    label: "хь",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["хю", "хё", "хя", "хе", "хи", "хь"],
  },

  {
    id: "Ш",
    label: "Ш",
    type: "Глухой твёрдый согласный",
    size: "big-rect",
    color: "wood",
    faces: [{ main: "Ш", flip: "ШЬ" }, { main: "ШО", flip: "ШЁ" }, { main: "ШЕ", flip: "" }, { main: "ШИ", flip: "" }, "ШУ", "ША"],
  },

  {
    id: "Ц",
    label: "Ц",
    type: "Глухой твёрдый согласный",
    size: "big-rect",
    color: "wood",
    faces: [{ main: "ЦО", flip: "" }, { main: "ЦА", flip: "" }, { main: "ЦЕ", flip: "" }, { main: "ЦЫ", flip: "ЦИ" }, "Ц", "ЦУ"],
  },

  {
    id: "ч",
    label: "ч",
    type: "Глухой мягкий согласный",
    size: "small-rect",
    color: "wood",
    faces: [{ main: "ч", flip: "чь" }, { main: "чо", flip: "чё" }, { main: "че", flip: "" }, { main: "чи", flip: "" }, "чу", "ча"],
  },

  {
    id: "щ",
    label: "щ",
    type: "Глухой мягкий согласный",
    size: "small-rect",
    color: "wood",
    faces: [{ main: "щ", flip: "щь" }, { main: "що", flip: "щё" }, { main: "ще", flip: "" }, { main: "щи", flip: "" }, "щу", "ща"],
  }
];

const SPECIAL_SYMBOLS = [
  {
    label: "Кс",
    title: "Красная строка"
  },

  {
    label: "Зб",
    title: "Заглавная буква"
  },

  {
    label: "Ъ",
    title: "Твёрдый знак"
  },

  {
    label: "Ь",
    title: "Мягкий знак"
  },

  {
    label: " ",
    title: "Пробел"
  },

  {
    label: ",",
    title: "Запятая"
  },

  {
    label: ";",
    title: "Точка с запятой"
  },

  {
    label: "„",
    title: "Открывающие кавычки-лапки"
  },

  {
    label: "”",
    title: "Закрывающие кавычки-лапки"
  },

  {
    label: "’",
    title: "Запятая сверху"
  },

  {
    label: "…",
    title: "Троеточие"
  },

  {
    label: ":",
    title: "Двоеточие"
  },

  {
    label: ";",
    title: "Точка с запятой"
  },

  {
    label: "?",
    title: "Вопросительный знак"
  },

  {
    label: "!",
    title: "Восклицательный знак"
  },

  {
    label: ".",
    title: "Точка"
  },

  {
    label: "-",
    title: "Дефис"
  },

  {
    label: "—",
    title: "Тире"
  },

  {
    label: "/",
    title: "Косая черта"
  },

  {
    label: "[",
    title: "Открывающая квадратная скобка"
  },

  {
    label: "]",
    title: "Закрывающая квадратная скобка"
  },

  {
    label: "«",
    title: "Открывающие кавычки-ёлочки"
  },

  {
    label: "»",
    title: "Закрывающие кавычки-ёлочки"
  },

  {
    label: "(",
    title: "Открывающая скобка"
  },

  {
    label: ")",
    title: "Закрывающая скобка"
  },

  {
    label: "*",
    title: "Звёздочка"
  },

  {
    label: "`",
    title: "Ударение"
  },
];

const COLORS = {
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

const FACE_KEYS = ["front", "right", "back", "left", "top", "bottom"];

// The angles that bring each face to point straight at the viewer.
// right-side up (the exact inverse of that face's own placement
// rotation in faceGeometry). Used to auto-orient the cube when a
// syllable is clicked.
const FACE_TARGET_ROTATION = {
  front: { rotX: 0, rotY: 0 },
  back: { rotX: 0, rotY: 180 },
  right: { rotX: 0, rotY: -90 },
  left: { rotX: 0, rotY: 90 },
  top: { rotX: -90, rotY: 0 },
  bottom: { rotX: 90, rotY: 0 },
};

// Real Zaitsev cubes are not all the same shape: hard-consonant cubes are physically bigger than soft-consonant ones, and Ж/Ш/Ц (hard-only) /
// й/ч/щ (soft-only) are rectangular block rather than cubes. Each size here maps to its own width x height x depth in px.

const SIZE_DIMS = {
  single: { w: 130, h: 130, d: 130, font: 30 },
  big: { w: 200, h: 200, d: 200, font: 46 },
  small: { w: 140, h: 140, d: 140, font: 32 },
  "big-rect": { w: 130, h: 240, d: 130, font: 30 },
  "small-rect": { w: 95, h: 170, d: 95, font: 32 },
};

// Given a face key and box's dimensions, returns the inline geometry
// (width/height/offset/3D transform) needed for that face to sit flush on that particular box - not just a uniform cube.

function faceGeometry(key, { w, h, d }) {
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
function faceContentHtml(entry) {
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

// State

let word = [];
let selectedFace = null;
let activeCube = null;
let activeCubeControls = null; // set by setupDrag(); exposes snapToFace()

// Palette render
function renderPalette(cubes, containerEl) {
  cubes.forEach((cube) => {
    const btn = document.createElement("button");
    btn.className = `p-item size-${cube.size}`;
    btn.style.background = COLORS[cube.color].face;
    btn.style.color = COLORS[cube.color].dark;
    btn.textContent = cube.label;
    btn.title = cube.type;
    btn.addEventListener("click", () => openCube(cube, btn));
    containerEl.appendChild(btn);
  });
}

const paletteEl = document.getElementById("palette");
renderPalette(CUBES, paletteEl);

// Special symbols are plain buttons - no 3D stage, no selection step.
// A click adds the symbol straight to the word shelf.
const specialPaletteEl = document.getElementById("specialPalette");
if (specialPaletteEl) {
  SPECIAL_SYMBOLS.forEach((sym) => {
    const btn = document.createElement("button");
    btn.className = "p-item size-single";
    btn.style.background = COLORS.green.face;
    btn.style.color = COLORS.green.dark;
    btn.textContent = sym.label;
    btn.title = sym.title;
    btn.addEventListener("click", () => {
      word.push({ text: sym.label, color: "green" });
      renderShelf();
    });
    specialPaletteEl.appendChild(btn);
  });
}

function openCube(cube, btnEl) {
  activeCube = cube;
  selectedFace = null;
  document
    .querySelectorAll(".p-item.active")
    .forEach((el) => el.classList.remove("active"));
  btnEl.classList.add("active");

  const stagePanel = document.getElementById("stagePanel");
  const colors = COLORS[cube.color];
  const dims = SIZE_DIMS[cube.size] || SIZE_DIMS.big;
  const stageSize = Math.max(dims.w, dims.h, dims.d) + 60;
  // Font scales with the smallest face dimension so small/rect cubes
  // don't overflow their own faces.
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
  document
    .getElementById("addBtn")
    .addEventListener("click", addSelectedToWord);
  document.querySelectorAll("#cube3d .face-text").forEach((textEl) => {
    if (textEl.classList.contains("face-text-placeholder")) return;
    textEl.addEventListener("click", (e) => {
      e.stopPropagation();
      selectFace(textEl);
    });
  });

  setupDrag();
}

function closeCube() {
  activeCube = null;
  selectedFace = null;
  document
    .querySelectorAll(".p-item.active")
    .forEach((el) => el.classList.remove("active"));
  document.getElementById("stagePanel").innerHTML =
    '<div class="stage-placeholder" id="placeholder">Тут появится кубик, когда ты выберешь его снизу ↓</div>';
}

function selectFace(textEl) {
  document
    .querySelectorAll("#cube3d .face-text.selected")
    .forEach((f) => f.classList.remove("selected"));
  textEl.classList.add("selected");
  selectedFace = textEl.dataset.text;
  document.getElementById("selHint").innerHTML =
    `Выбран: <b>${selectedFace}</b>`;
  document.getElementById("addBtn").disabled = false;

  // Turn the cube so the clicked face points straight at the viewer.
  // If the clicked syllable was the upside-down "flip" one, roll an
  // extra 180deg so it reads right-side up instead of the main syllable.
  const faceEl = textEl.closest(".face");
  const faceKey = FACE_KEYS.find((k) => faceEl.classList.contains(`f-${k}`));
  const isFlip = textEl.classList.contains("face-text-flip");
  if (activeCubeControls && faceKey) {
    activeCubeControls.snapToFace(faceKey, isFlip);
  }
}

function addSelectedToWord() {
  if (!selectedFace || !activeCube) return;
  word.push({ text: selectedFace, color: activeCube.color });
  renderShelf();
}

function renderShelf() {
  const wrap = document.getElementById("shelfWrap");
  if (word.length === 0) {
    wrap.classList.add("empty");
    wrap.innerHTML =
      '<span class="shelf-empty-msg" id="shelfEmptyMsg">Тут пока что ничего нет. Начни снизу</span>';
    return;
  }
  wrap.classList.remove("empty");
  wrap.innerHTML = word
    .map((w, i) => {
      const c = COLORS[w.color];
      return `<div class="shelf-tile" style="background:${c.face};color:${c.dark}"><span class="shelf-tile-text">${w.text}</span>
      <button class="shelf-tile-remove" data-index="${i}" title="Удалить">x</button>
      </div>`;
    })
    .join("");

    wrap.querySelectorAll(".shelf-tile-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.index);
        word.splice(idx, 1);
        renderShelf();
      });
    });
}

document.getElementById("resetBtn").addEventListener("click", () => {
  word = [];
  renderShelf();
});

// Drag rotation
function setupDrag() {
  const stage = document.getElementById("cubeStage");
  const cube = document.getElementById("cube3d");
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
  // that face reads right-side up (and the normal one flips instead).
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
