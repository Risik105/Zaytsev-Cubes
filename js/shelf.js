import { COLORS } from "./constants.js";

let word = [];
let isCapitalMode = false;
let isStressMode = false;
let draggedIndex = null;
let touchDraggedIndex = null;
let touchMoved = false;
let touchCurrentTarget = null;
let touchIsAfter = false;
let stressDraggedFromIdx = null;
let touchStressDraggedFromIdx = null;
let touchStressMoved = false;
let touchStressTarget = null;
let capitalDraggedFromIdx = null;
let touchCapitalDraggedFromIdx = null;
let touchCapitalMoved = false;
let touchCapitalTarget = null;

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
    isCapitalMode = false;
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

export function clearWord() {
  word = [];
  isCapitalMode = false;
  isStressMode = false;
  updateSpecialButtonsState();
  renderShelf();
}

export function toggleCapital() {
  isCapitalMode = !isCapitalMode;
  if (isCapitalMode) {
    isStressMode = false;
  }
  updateSpecialButtonsState();
  renderShelf();
}

export function setCapital(val) {
  isCapitalMode = Boolean(val);
  if (isCapitalMode) {
    isStressMode = false;
  }
  updateSpecialButtonsState();
  renderShelf();
}

export function getCapital() {
  return isCapitalMode;
}

export function toggleStressMode() {
  isStressMode = !isStressMode;
  if (isStressMode) {
    isCapitalMode = false;
  }
  updateSpecialButtonsState();
  renderShelf();
}

export function setStressMode(val) {
  isStressMode = Boolean(val);
  if (isStressMode) {
    isCapitalMode = false;
  }
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

export function toggleTileCapital(index, forceVal) {
  if (index < 0 || index >= word.length) return;
  if (typeof forceVal === "boolean") {
    word[index].hasCapital = forceVal;
  } else {
    word[index].hasCapital = !word[index].hasCapital;
  }
  renderShelf();
}

export function updateSpecialButtonsState() {
  const capBtn = document.getElementById("btnSpecialCapital");
  if (capBtn) {
    capBtn.classList.toggle("capital-active", isCapitalMode);
    capBtn.classList.toggle("active", isCapitalMode);
  }
  const stressBtn = document.getElementById("btnSpecialStress");
  if (stressBtn) {
    stressBtn.classList.toggle("stress-active", isStressMode);
    stressBtn.classList.toggle("active", isStressMode);
  }
}

function clearDropIndicators(wrap) {
  if (!wrap) return;
  wrap.querySelectorAll(".shelf-column").forEach((col) => {
    col.classList.remove(
      "drop-before",
      "drop-after",
      "stress-drop-hover",
      "capital-drop-hover"
    );
  });
}

export function renderShelf() {
  const wrap = document.getElementById("shelfWrap");
  if (!wrap) return;

  updateSpecialButtonsState();

  if (word.length === 0) {
    wrap.classList.add("empty");
    wrap.classList.remove("stress-mode", "capital-mode");
    wrap.innerHTML =
      '<span class="shelf-empty-msg" id="shelfEmptyMsg">Тут пока что ничего нет. Начни снизу</span>';
    return;
  }

  wrap.classList.remove("empty");
  wrap.classList.toggle("stress-mode", isStressMode);
  wrap.classList.toggle("capital-mode", isCapitalMode);

  wrap.innerHTML = word
    .map((w, i) => {
      const c = COLORS[w.color];
      const sizeClass = w.size ? ` size-${w.size}` : " size-big";
      const isRect = w.size === "big-rect" || w.size === "small-rect";
      let content = "";
      if (w.icon) {
        content = `<img src="${w.icon}" class="shelf-tile-icon" draggable="false" alt="${w.text}">`;
      } else if (isRect || (w.secondaryText !== undefined && w.secondaryText !== null)) {
        content = `<div class="shelf-tile-rect-content">
          <span class="shelf-tile-secondary">${w.secondaryText ? w.secondaryText : "&nbsp"}</span>
          <span class="shelf-tile-primary">${w.text}</span>
        </div>`;
      } else {
        content = `<span class="shelf-tile-text">${w.text}</span>`;
      }

      const isCapitalTile = Boolean(w.hasCapital);
      const isStressedTile = Boolean(w.hasStress);

      let marksHtml = "";
      if (isCapitalTile || isStressedTile) {
        marksHtml = `<div class="shelf-column-marks">
        ${
          isStressedTile
            ? `<div class="shelf-tile shelf-mark-tile shelf-mark-stress" draggable="true" data-index="${i}" title="Ударение (потяни, чтобы перенести, или кликни, чтобы снять)">
            <img src="img/emphasis.svg" class="shelf-tile-icon" draggable="false" alt="Ударение">
            <button class="shelf-tile-remove" data-index="${i}" data-remove="stress" title="Удалить">x</button>
            </div>`
            : ""
        }
        ${
          isCapitalTile
          ? `<div class="shelf-tile shelf-mark-tile shelf-mark-capital" draggable="true" data-index="${i}" title="Заглавная буква (потяни, чтобы перенести, или кликни, чтобы снять)">
          <span class="shelf-tile-text">Зб</span>
          <button class="shelf-tile-remove" data-index="${i}" data-remove="capital" title="Удалить">x</button>
          </div>`
          : ""
        }
        </div>`;
      }

      let titleAttr = ' title="Потяни, чтобы переместить"';
      if (isStressMode) {
        titleAttr = ' title="Кликни, чтобы поставить/снять удаление"';
      } else if (isCapitalMode) {
        titleAttr = ' title="Кликни, чтобы поставить/снять заглавную букву"';
      }

      return `<div class="shelf-column" draggable="true" data-index="${i}"${titleAttr}>
      ${marksHtml}
      <div class="shelf-tile${sizeClass}" style="background:${c.face};color:${c.dark}">
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
        toggleTileCapital(idx, false);
      } else if (removeType === "stress") {
        toggleTileStress(idx, false);
      } else {
        removeWordTile(idx);
      }
    });
  });

// Capital mark click & drag handlers (allows moving capital to another syllable or clicking to remove)
wrap.querySelectorAll(".shelf-mark-capital").forEach((capitalEl) => {
  const idx = Number(capitalEl.dataset.index);

  capitalEl.addEventListener("click", (e) => {
    if (touchCapitalMoved) return;
    e.stopPropagation();
    toggleTileCapital(idx, false);
  });

  // Desktop Drag and Drop for capital only
  capitalEl.addEventListener("dragstart", (e) => {
    if (e.target.closest(".shelf-tile-remove")) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    capitalDraggedFromIdx = idx;
    draggedIndex = null;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/x-cubes-move-capital", String(idx));
    e.dataTransfer.setData("text/plain", "CAPITAL_MOVE");

    const rect = capitalEl.getBoundingClientRect();
    const ghost = capitalEl.cloneNode(true);
    ghost.querySelectorAll(".shelf-tile-remove").forEach((btn) => btn.remove());
    ghost.style.outline = "none";
    ghost.style.boxShadow = "0 4px 10px rgba(0,0,0,0.24)";
    ghost.style.position = "fixed";
    ghost.style.top = "-9999px";
    ghost.style.left = "-9999px";
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.transform = "none";
    ghost.style.pointerEvents = "none";
    ghost.style.background = "transparent";
    document.body.appendChild(ghost);

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    if (e.dataTransfer.setDragImage) {
      e.dataTransfer.setDragImage(ghost, offsetX, offsetY);
    }

    setTimeout(() => {
      ghost.remove();
    }, 0);

    requestAnimationFrame(() => {
      capitalEl.classList.add("dragging");
    });
  });

  capitalEl.addEventListener("dragend", () => {
    capitalEl.classList.remove("dragging");
    capitalDraggedFromIdx = null;
    clearDropIndicators(wrap);
  });

  // Touch Drag and Drop for capital only
  capitalEl.addEventListener(
    "touchstart",
    (e) => {
      if (e.target.closest(".shelf-tile-remove")) return;
      touchCapitalDraggedFromIdx = idx;
      touchCapitalMoved = false;
      touchCapitalTarget = null;
    },
    { passive: true }
  );

  capitalEl.addEventListener(
    "touchmove",
    (e) => {
      if (touchCapitalDraggedFromIdx === null) return;
      touchCapitalMoved = true;
      if (e.cancelable) {
        e.preventDefault();
      }

      capitalEl.classList.add("dragging");
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetCol = element ? element.closest(".shelf-column") : null;

      clearDropIndicators(wrap);
      if (targetCol) {
        targetCol.classList.add("capital-drop-hover");
        touchCapitalTarget = targetCol;
      } else {
        touchCapitalTarget = null;
      }
    },
    { passive: false }
  );

  capitalEl.addEventListener("touchend", () => {
    if (touchCapitalDraggedFromIdx === null) return;
    const fromIdx = touchCapitalDraggedFromIdx;
    capitalEl.classList.remove("dragging");
    touchCapitalDraggedFromIdx = null;
    clearDropIndicators(wrap);

    if (touchCapitalMoved && touchCapitalTarget) {
      const targetIdx = Number(touchCapitalTarget.dataset.index);
      touchCapitalTarget = null;
      if (targetIdx !== fromIdx) {
        word[fromIdx].hasStress = false;
        word[targetIdx].hasStress = true;
        renderShelf();
      }
    }
  });

  capitalEl.addEventListener("touchcancel", () => {
    capitalEl.classList.remove("dragging");
    touchCapitalDraggedFromIdx = null;
    touchCapitalMoved = false;
    touchCapitalTarget = null;
    clearDropIndicators(wrap);
  });
});

// Stress mark click & drag handlers (allows moving stress to another syllable or clicking to remove)
wrap.querySelectorAll(".shelf-mark-stress").forEach((stressEl) => {
  const idx = Number(stressEl.dataset.index);

  stressEl.addEventListener("click", (e) => {
    if (touchStressMoved) return;
    e.stopPropagation();
    toggleTileStress(idx);
  });

  // Desktop Drag and Drop for stress only
  stressEl.addEventListener("dragstart", (e) => {
    if (e.target.closest(".shelf-tile-remove")) {
      e.preventDefault();
      return;
    }
    e.stopPropagation();
    stressDraggedFromIdx = idx;
    draggedIndex = null;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("application/x-cubes-move-stress", String(idx));
    e.dataTransfer.setData("text/plain", "STRESS_MOVE");

    const rect = stressEl.getBoundingClientRect();
    const ghost = stressEl.cloneNode(true);
    ghost.querySelectorAll(".shelf-tile-remove").forEach((btn) => btn.remove());
    ghost.style.outline = "none";
    ghost.style.boxShadow = "0 4px 10px rgba(0,0,0,0.24)";
    ghost.style.position = "fixed";
    ghost.style.top = "-9999px";
    ghost.style.left = "-9999px";
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.transform = "none";
    ghost.style.pointerEvents = "none";
    ghost.style.background = "transparent";
    document.body.appendChild(ghost);

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    if (e.dataTransfer.setDragImage) {
      e.dataTransfer.setDragImage(ghost, offsetX, offsetY);
    }

    setTimeout(() => {
      ghost.remove();
    }, 0);

    requestAnimationFrame(() => {
      stressEl.classList.add("dragging");
    });
  });

  stressEl.addEventListener("dragend", () => {
    stressEl.classList.remove("dragging");
    stressDraggedFromIdx = null;
    clearDropIndicators(wrap);
  });

  // Touch Drag and Drop for stress only
  stressEl.addEventListener(
    "touchstart",
    (e) => {
      if (e.target.closest(".shelf-tile-remove")) return;
      touchStressDraggedFromIdx = idx;
      touchStressMoved = false;
      touchStressTarget = null;
    },
    { passive: true }
  );

  stressEl.addEventListener(
    "touchmove",
    (e) => {
      if (touchCapitalDraggedFromIdx === null) return;
      touchStressMoved = true;
      if (e.cancelable) {
        e.preventDefault();
      }

      stressEl.classList.add("dragging");
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      const targetCol = element ? element.closest(".shelf-column") : null;

      clearDropIndicators(wrap);
      if (targetCol) {
        targetCol.classList.add("stress-drop-hover");
        touchStressTarget = targetCol;
      } else {
        touchStressTarget = null;
      }
    },
    { passive: false }
  );

  stressEl.addEventListener("touchend", () => {
    if (touchStressDraggedFromIdx === null) return;
    const fromIdx = touchStressDraggedFromIdx;
    stressEl.classList.remove("dragging");
    touchStressDraggedFromIdx = null;
    clearDropIndicators(wrap);

    if (touchStressMoved && touchStressTarget) {
      const targetIdx = Number(touchStressTarget.dataset.index);
      touchStressTarget = null;
      if (targetIdx !== fromIdx) {
        word[fromIdx].hasStress = false;
        word[targetIdx].hasStress = true;
        renderShelf();
      }
    }
  });

  stressEl.addEventListener("touchcancel", () => {
    stressEl.classList.remove("dragging");
    touchStressDraggedFromIdx = null;
    touchStressMoved = false;
    touchStressTarget = null;
    clearDropIndicators(wrap);
  });
});

// Drap and Drop (Mouse / HTML5 DnD)
const columns = wrap.querySelectorAll(".shelf-column");
columns.forEach((colEl) => {
  const idx = Number(colEl.dataset.index);

  // Clicking tile when in capital-picking or stress-picking mode
  colEl.addEventListener("click", (e) => {
    if (
      e.target.closest(".shelf-tile-remove") ||
      e.target.closest(".shelf-mark-tile")
    ) {
      return;
    }
    if (isCapitalMode) {
      e.stopPropagation();
      toggleTileCapital(idx);
      setCapital(false);
      return;
    }
    if (isStressMode) {
      e.stopPropagation();
      toggleTileStress(idx);
      setStressMode(false);
      return;
    }
  });

  colEl.addEventListener("dragstart", (e) => {
    if (
      e.target.closest(".shelf-tile-remove") ||
      e.target.closest(".shelf-mark-tile") ||
      stressDraggedFromIdx !== null ||
      capitalDraggedFromIdx !== null
    ) {
      return;
    }
    draggedIndex = idx;
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", String(idx));

    // Create a clean drag ghost image without background artifacts or remove buttons
    const rect = colEl.getBoundingClientRect();
    const ghost = colEl.cloneNode(true);
    ghost.querySelectorAll(".shelf-tile-remove").forEach((btn) => btn.remove());
    ghost.querySelectorAll(".shelf-tile").forEach((tile) => {
      tile.style.outline = "none";
      tile.style.boxShadow = "0 4px 10px rgba(0,0,0,0.24)";
    });
    ghost.classList.remove("dragging");
    ghost.style.position = "fixed";
    ghost.style.top = "-9999px";
    ghost.style.left = "-9999px";
    ghost.style.width = `${rect.width}px`;
    ghost.style.height = `${rect.height}px`;
    ghost.style.transform = "none";
    ghost.style.pointerEvents = "none";
    ghost.style.background = "transparent";
    ghost.style.boxShadow = "none";
    document.body.appendChild(ghost);

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    if (e.dataTransfer.setDragImage) {
      e.dataTransfer.setDragImage(ghost, offsetX, offsetY);
    }

    setTimeout(() => {
      ghost.remove();
    }, 0);

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
    // Check if dragging stress symbol (from palette or from another syllable)
    if (
      e.dataTransfer.types.includes("application/x-cubes-move-stress") ||
      e.dataTransfer.types.includes("application/x-cubes-stress") ||
      stressDraggedFromIdx !== null
    ) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      clearDropIndicators(wrap);
      colEl.classList.add("stress-drop-hover");
      return;
    }

    // Check if dragging capital symbol (from palette or from another syllable)
    if (
      e.dataTransfer.types.includes("application/x-cubes-move-capital") ||
      e.dataTransfer.types.includes("application/x-cubes-capital") ||
      capitalDraggedFromIdx !== null
    ) {
      e.preventDefault();
      e.dataTransfer.dropEffect = "move";
      clearDropIndicators(wrap);
      colEl.classList.add("capital-drop-hover");
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
    colEl.classList.remove("stress-drop-hover", "capital-drop-hover");
  });

  colEl.addEventListener("drop", (e) => {
    colEl.classList.remove("stress-drop-hover", "capital-drop-hover");

    // Handle moving capital from another syllable
    const moveCapitalFrom = 
    e.dataTransfer.getData("application/x-cubes-move-capital") ||
    (capitalDraggedFromIdx !== null ? String(capitalDraggedFromIdx) : null);
    if (moveCapitalFrom !== null && moveCapitalFrom !== "") {
      e.preventDefault();
      e.stopPropagation();
      const fromIdx = Number(moveCapitalFrom);
      capitalDraggedFromIdx = null;
      clearDropIndicators(wrap);
      if (fromIdx !== idx) {
        word[fromIdx].hasCapital = false;
        word[idx].hasCapital = true;
        renderShelf();
      }
      return;
    }

    // Handle dropping capital symbol from palette
    if (e.dataTransfer.getData("application/x-cubes-capital") === "true") {
      e.preventDefault();
      e.stopPropagation();
      toggleTileStress(idx, true);
      setStressMode(false);
      return;
    }

    // Handle moving stress from another syllable
    const moveStressFrom = 
    e.dataTransfer.getData("application/x-cubes-move-stress") ||
    (stressDraggedFromIdx !== null ? String(stressDraggedFromIdx) : null);
    if (moveStressFrom !== null && moveStressFrom !== "") {
      e.preventDefault();
      e.stopPropagation();
      const fromIdx = Number(moveStressFrom);
      stressDraggedFromIdx = null;
      clearDropIndicators(wrap);
      if (fromIdx !== idx) {
        word[fromIdx].hasStress = false;
        word[idx].hasStress = true;
        renderShelf();
      }
      return;
    }

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

  // Touch events for mobile/tablet drag-and-drop or entire column
  colEl.addEventListener(
    "touchstart",
    (e) => {
      if (
        e.target.closest(".shelf-tile-remove") ||
        e.target.closest(".shelf-mark-stress") ||
        touchStressDraggedFromIdx !== null ||
        touchCapitalDraggedFromIdx !== null
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
      moveWordTile(fromIdx, insertIdx);
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
    moveWordTile(fromIdx, insertIdx);
  }
};

}
export function initShelf() {
  const resetBtn = document.getElementById("resetBtn");
  if (resetBtn) {
    resetBtn.addEventListener("click", clearWord);
  }

  // Dismiss stress or capital mode on outside click or Escape key
  document.addEventListener("click", (e) => {
    if (isStressMode) {
      const isShelf = e.target.closest("#shelfWrap");
      const isStressBtn = e.target.closest("#btnSpecialStress");
      if (!isShelf && !isStressBtn) {
        setStressMode(false);
      }
    }
    if (isCapitalMode) {
      const isShelf = e.target.closest("#shelfWrap");
      const isCapBtn = e.target.closest("#btnSpecialCapital");
      if (!isShelf && !isCapBtn) {
        setCapital(false);
      }
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (isStressMode) setStressMode(false);
      if (isCapitalMode) setCapital(false);
    }
  });

  renderShelf();
}
