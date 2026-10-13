import { COLORS } from "./constants.js";

let word = [];
let hasCapital = false;
let isStressMode = false;
let draggedIndex = null;
let touchDraggedIndex = null;
let touchMoved = false;
let touchCurrentTarget = null;
let touchIsAfter = false;

export function getWord() {
  return [...word];
}

export function addWordTile(tile) {
  word.push(tile);
  renderShelf();
}

export function removeWordTile(index) {
  word.splice(index, 1);
  if (word.length === 0) {
    hasCapital = false;
    isStressMode = false;
    updateSpecialButtonsState();
  }
  renderShelf();
}

export function moveWordTile(fromIndex, toIndex) {
  if (
    fromIndex === toIndex ||
    fromIndex < 0 ||
    toIndex < 0 ||
    fromIndex >= word.length ||
    toIndex >= word.length
  ) {
    return;
  }
  const [tile] = word.splice(fromIndex, 1);
  word.splice(toIndex, 0, tile);
  renderShelf();
}

// Alias for backwards compability
export const moveWorldTile = moveWordTile;

export function clearWord() {
  word = [];
  hasCapital = false;
  isStressMode = false;
  updateSpecialButtonsState();
  renderShelf();
}

export function toggleCapital() {
  hasCapital = !hasCapital;
  updateSpecialButtonsState();
  renderShelf();
}

export function setCapital(val) {
  hasCapital = Boolean(val);
  updateSpecialButtonsState();
  renderShelf();
}

export function getCapital() {
  return hasCapital;
}

export function toggleStressMode() {
  isStressMode = !isStressMode;
  updateSpecialButtonsState();
  renderShelf();
}

export function setStressMode(val) {
  isStressMode = Boolean(val);
  updateSpecialButtonsState();
  renderShelf();
}

export function toggleTileStress(index, forceVal) {
  if (index < 0 || index >= word.length) return;
  if (typeof forceVal === "boolean") {
    word[index].hasStress = forceVal;
  } else {
    word[index].hasStress = !word[index].hasStress;
  }
  renderShelf();
}

export function updateSpecialButtonsState() {
  const capBtn = document.getElementById("btnSpecialCapital");
  if (capBtn) {
    capBtn.classList.toggle("capital-active", hasCapital);
    capBtn.classList.toggle("active", hasCapital);
  }
  const stressBtn = document.getElementById("btnSpecialStress");
  if (stressBtn) {
    stressBtn.classList.toggle("stress-active", isStressMode);
    stressBtn.classList.toggle("active", isStressMode);
  }
}

export function getFirstLetterTileIndex() {
  if (word.length === 0) return -1;
  const idx = word.findIndex(
    (tile) =>
      tile.text !== "Кс" &&
    tile.text !== " " &&
    tile.text !== "—" &&
    tile.text !== "-"
  );
  return idx !== -1 ? idx : 0;
}

function clearDropIndicators(wrap) {
  if (!wrap) return;
  wrap.querySelectorAll(".shelf-column").forEach((col) => {
    col.classList.remove("drop-before", "drop-after", "stress-drop-hover");
  });
}

export function renderShelf() {
  const wrap = document.getElementById("shelfWrap");
  if (!wrap) return;

  updateSpecialButtonsState();

  if (word.length === 0) {
    wrap.classList.add("empty");
    wrap.classList.remove("stress-mode");
    wrap.innerHTML =
      '<span class="shelf-empty-msg" id="shelfEmptyMsg">Тут пока что ничего нет. Начни снизу</span>';
    return;
  }

  wrap.classList.remove("empty");
  wrap.classList.toggle("stress-mode", isStressMode);

  const capitalIdx = hasCapital ? getFirstLetterTileIndex() : -1;

  wrap.innerHTML = word
    .map((w, i) => {
      const c = COLORS[w.color];
      const content = w.icon
      ? `<img src="${w.icon}" class="shelf-tile-icon" alt="${w.text}">`
      : `<span class="shelf-tile-text">${w.text}</span>`;

      const isCapitalTile = i === capitalIdx;
      const isStressedTile = Boolean(w.hasStress);

      let marksHtml = "";
      if (isCapitalTile || isStressedTile) {
        marksHtml = `<div class="shelf-column-marks">
        ${
          isStressedTile
            ? `<div class="shelf-tile shelf-mark-tile shelf-mark-stress" data-index="${i}" title="Ударение (кликни, чтобы снять)">
            <img src="img/emphasis.svg" class="shelf-tile-icon" alt="Ударение">
            <button class="shelf-tile-remove" data-index="${i}" data-remove="stress" title="Удалить">x</button>
            </div>`
            : ""
        }
        ${
          isCapitalTile
          ? `<div class="shelf-tile shelf-mark-tile shelf-mark-stress" data-index="${i}" title="Заглавная буква (кликни, чтобы снять)">
          <span class="shelf-tile-text">Зб</span>
          <button class="shelf-tile-remove" data-remove="capital" title="Удалить">x</button>
          </div>`
          : ""
        }
        </div>`;
      }

      const tileAttr = isStressMode
      ? ' title="Кликни, чтобы поставить/снять ударение"'
      : ' title="Потяни, чтобы переместить"';

      return `<div class="shelf-column" draggable="true" data-index="${i}"${tileAttr}>
      ${marksHtml}
      <div class="shelf-tile" style="background:${c.face};color:${c.dark}">
        ${content}
        <button class="shelf-tile-remove" data-index="${i}" data-remove="tile" title="Удалить">x</button>
      </div>
      </div>`;
    })
    .join("");

    // Remove buttons
  wrap.querySelectorAll(".shelf-tile-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const removeType = btn.dataset.remove;
      const idx = Number(btn.dataset.index);
      if (removeType === "capital") {
        toggleCapital();
      } else if (removeType === "stress") {
        toggleTileStress(idx, false);
      } else {
        removeWordTile(idx);
      }
    });
});

// Capital letter badge click (to remove / toggle off)
wrap.querySelectorAll(".shelf-mark-capital").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleCapital();
  });
});

// Stress mark click (to remove / toggle off)
wrap.querySelectorAll(".shelf-mark-stress").forEach((el) => {
  el.addEventListener("click", (e) => {
    e.stopPropagation();
    const idx = Number(el.dataset.index);
    toggleTileStress(idx);
  });
});

// Drap and Drop (Mouse / HTML5 DnD)
const columns = wrap.querySelectorAll(".shelf-column");
columns.forEach((colEl) => {
  const idx = Number(colEl.dataset.index);

  // Clicking tile when in stress-picking mode
  colEl.addEventListener("click", (e) => {
    if (
      e.target.closest(".shelf-tile-remove") ||
      e.target.closest(".shelf-mark-tile")
    ) {
      return;
    }
    if (isStressMode) {
      e.stopPropagation();
      toggleTileStress(idx);
      setStressMode(false);
    }
  });

  colEl.addEventListener("dragstart", (e) => {
    if (e.target.closest(".shelf-tile-remove")) {
      e.preventDefault();
      return;
    }
    draggedIndex = idx;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));
    requestAnimationFrame(() => {
      colEl.classList.add("dragging");
    });
  });

  colEl.addEventListener("dragend", () => {
    colEl.classList.remove("dragging");
    draggedIndex = null;
    clearDropIndicators(wrap);
  });

  colEl.addEventListener("dragover", (e) => {
    // Check if dragging stress symbol from palette
    if (e.dataTransfer.types.includes("application/x-cubes-stress")) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
      colEl.classList.add("stress-drop-hover");
      return;
    }

    if (draggedIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const rect = colEl.getBoundingClientRect();
    const isAfter = e.clientX - rect.left > rect.width / 2;

    clearDropIndicators(wrap);
    if (isAfter) {
      colEl.classList.add("drop-after");
    } else {
      colEl.classList.add("drop-before");
    }
  });

  colEl.addEventListener("dragleave", () => {
    colEl.classList.remove("stress-drop-hover");
  });

  colEl.addEventListener("drop", (e) => {
    colEl.classList.remove("stress-drop-hover");

    // Handle dropping stress symbol from palette
    if (e.dataTransfer.getData("application/x-cubes-stress") === "true") {
      e.preventDefault();
      e.stopPropagation();
      toggleTileStress(idx, true);
      setStressMode(false);
      return;
    }

    if (draggedIndex === null) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = colEl.getBoundingClientRect();
    const isAfter = e.clientX - rect.left > rect.width / 2;
    const targetIndex = Number(colEl.dataset.index);

    const adjustedTargetIdx = 
    targetIndex > draggedIndex ? targetIndex - 1 : targetIndex;
    const insertIdx = isAfter ? adjustedTargetIdx + 1 : adjustedTargetIdx;

    const fromIdx = draggedIndex;
    draggedIndex = null;
    clearDropIndicators(wrap);
    moveWordTile(fromIdx, insertIdx);
  });

  // Touch events for mobile/tablet drag-and-drop
  colEl.addEventListener(
    "touchstart",
    (e) => {
      if (
        e.target.closest(".shelf-tile-remove") ||
        e.target.closest(".shelf-mark-tile")
      )
      return;
      touchDraggedIndex = idx;
      touchMoved = false;
      touchCurrentTarget = null;
    },
    { passive: true }
  );

  colEl.addEventListener(
    "touchmove",
    (e) => {
      if (touchDraggedIndex === null) return;
      touchMoved = true;
      if (e.cancelable) {
        e.preventDefault();
      }

      colEl.classList.add("dragging");
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetCol = element ? element.closest(".shelf-column") : null;

      clearDropIndicators(wrap);
      if (targetCol && targetCol !== colEl) {
        const rect = targetCol.getBoundingClientRect();
        const isAfter = touch.clientX - rect.left > rect.width / 2;
        touchCurrentTarget = targetCol;
        touchIsAfter = isAfter;
        if (isAfter) {
          targetCol.classList.add("drop-after");
        } else {
          targetCol.classList.add("drop-before");
        }
      } else {
        touchCurrentTarget = null;
      }
    },
    { passive: false }
  );

  colEl.addEventListener("touchend", () => {
    if (touchDraggedIndex === null) return;
    const fromIdx = touchDraggedIndex;
    colEl.classList.remove("dragging");
    touchDraggedIndex = null;

    if (touchMoved && touchCurrentTarget) {
      const targetIndex = Number(touchCurrentTarget.dataset.index);
      const adjustedTargetIdx = 
      targetIndex > fromIdx ? targetIndex - 1 : targetIndex;
      const insertIdx = touchIsAfter
      ? adjustedTargetIdx + 1
      : adjustedTargetIdx;
      touchCurrentTarget = null;
      clearDropIndicators(wrap);
      moveWorldTile(fromIdx, insertIdx);
    } else {
      clearDropIndicators(wrap);
    }
  });

  colEl.addEventListener("touchcancel", () => {
    colEl.classList.remove("dragging");
    touchDraggedIndex = null;
    touchMoved = false;
    touchCurrentTarget = null;
    clearDropIndicators(wrap);
  });
});

// Handle dropping in the wrap container outside specific tiles
wrap.ondragover = (e) => {
  if (draggedIndex === null) return;
  e.preventDefault();
  e.dataTransfer.dropEffect = "move";
};

wrap.ondrop = (e) => {
  if (draggedIndex === null) return;
  e.preventDefault();
  const allCols = Array.from(wrap.querySelectorAll(".shelf-column"));
  if (allCols.length === 0) return;

  const firstRect = allCols[0].getBoundingClientRect();
  const lastRect = allCols[allCols.length - 1].getBoundingClientRect();

  let insertIdx = null;
  if (e.clientX < firstRect.left) {
    insertIdx = 0;
  } else if (e.clientX > lastRect.right) {
    insertIdx = word.length - 1;
  }

  if (insertIdx !== null) {
    const fromIdx = draggedIndex;
    draggedIndex = null;
    clearDropIndicators(wrap);
    moveWorldTile(fromIdx, insertIdx);
  }
};

}
export function initShelf() {
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", clearWord);
  }

  // Dismiss stress mode on outside click or Escape key
  document.addEventListener("click", (e) => {
    if (isStressMode) {
      const isShelf = e.target.closest("#shelfWrap");
      const isStressBtn = e.target.closest("#btnSpecialStress");
      if (!isShelf && !isStressBtn) {
        setStressMode(false);
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isStressMode) {
      setStressMode(false);
    }
  });

  renderShelf();
}
