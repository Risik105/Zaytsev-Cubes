import { COLORS } from "./constants.js";

let word = [];
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
  renderShelf();
}

export function moveWorldTile(fromIndex, toIndex) {
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

export function clearWord() {
  word = [];
  renderShelf();
}

function clearDropIndicators(wrap) {
  if (!wrap) return;
  wrap.querySelectorAll(".shelf-tile").forEach((tile) => {
    tile.classList.remove("drop-before", "drop-after");
  });
}

export function renderShelf() {
  const wrap = document.getElementById("shelfWrap");
  if (!wrap) return;

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
      const content = w.icon
      ? `<img src="${w.icon}" class="shelf-tile-icon" alt="${w.text}">`
      : `<span class="shelf-tile-text">${w.text}</span>`;
      return `<div class="shelf-tile" draggable="true" data-index="${i}" title="Потяни, чтобы переместить" style="background:${c.face};color:${c.dark}">${content}
      <button class="shelf-tile-remove" data-index="${i}" title="Удалить">x</button>
      </div>`;
    })
    .join("");

    // Remove buttons
  wrap.querySelectorAll(".shelf-tile-remove").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const idx = Number(btn.dataset.index);
      removeWordTile(idx);
    });
});


// Drap and Drop (Mouse / HTML5 DnD)
const tiles = wrap.querySelectorAll(".shelf-tile");
tiles.forEach((tileEl) => {
  const idx = Number(tileEl.dataset.index);

  tileEl.addEventListener("dragstart", (e) => {
    if (e.target.closest(".shelf-tile-remove")) {
      e.preventDefault();
      return;
    }
    draggedIndex = idx;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));
    requestAnimationFrame(() => {
      tileEl.classList.add("dragging");
    });
  });

  tileEl.addEventListener("dragend", () => {
    tileEl.classList.remove("dragging");
    draggedIndex = null;
    clearDropIndicators(wrap);
  });

  tileEl.addEventListener("dragover", (e) => {
    if (draggedIndex === null) return;
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    const rect = tileEl.getBoundingClientRect();
    const isAfter = e.clientX - rect.left > rect.width / 2;

    clearDropIndicators(wrap);
    if (isAfter) {
      tileEl.classList.add("drop-after");
    } else {
      tileEl.classList.add("drop-before");
    }
  });

  tileEl.addEventListener("drop", (e) => {
    if (draggedIndex === null) return;
    e.preventDefault();
    e.stopPropagation();

    const rect = tileEl.getBoundingClientRect();
    const isAfter = e.clientX - rect.left > rect.width / 2;
    const targetIndex = Number(tileEl.dataset.index);

    const adjustedTargetIdx = 
    targetIndex > draggedIndex ? targetIndex - 1 : targetIndex;
    const insertIdx = isAfter ? adjustedTargetIdx + 1 : adjustedTargetIdx;

    const fromIdx = draggedIndex;
    draggedIndex = null;
    clearDropIndicators(wrap);
    moveWorldTile(fromIdx, insertIdx);
  });

  // Touch events for mobile/table drag-and-drop
  tileEl.addEventListener(
    "touchstart",
    (e) => {
      if (e.target.closest(".shelf-tile-remove")) return;
      touchDraggedIndex = idx;
      touchMoved = false;
      touchCurrentTarget = null;
    },
    { passive: true }
  );

  tileEl.addEventListener(
    "touchmove",
    (e) => {
      if (touchDraggedIndex === null) return;
      touchMoved = true;
      if (e.cancelable) {
        e.preventDefault();
      }

      tileEl.classList.add("dragging");
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetTile = element ? element.closest(".shelf-tile") : null;

      clearDropIndicators(wrap);
      if (targetTile && targetTile !== tileEl) {
        const rect = targetTile.getBoundingClientRect();
        const isAfter = touch.clientX - rect.left > rect.width / 2;
        touchCurrentTarget = targetTile;
        touchIsAfter = isAfter;
        if (isAfter) {
          targetTile.classList.add("drop-after");
        } else {
          targetTile.classList.add("drop-before");
        }
      } else {
        touchCurrentTarget = null;
      }
    },
    { passive: false }
  );

  tileEl.addEventListener("touchend", () => {
    if (touchDraggedIndex === null) return;
    const fromIdx = touchDraggedIndex;
    tileEl.classList.remove("dragging");
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

  tileEl.addEventListener("touchcancel", () => {
    tileEl.classList.remove("dragging");
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
  const allTiles = Array.from(wrap.querySelectorAll(".shelf-tile"));
  if (allTiles.length === 0) return;

  const firstRect = allTiles[0].getBoundingClientRect();
  const lastRect = allTiles[allTiles.length - 1].getBoundingClientRect();

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
  renderShelf();
}

