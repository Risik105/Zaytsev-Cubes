import { COLORS } from "./constants.js";
import { CUBE_TABLE_COLUMNS } from "./data/table-columns.js";

// Builds HTML for a table column hint
function buildColumnHintHtml(cube) {
  const columnData = CUBE_TABLE_COLUMNS[cube.id] || CUBE_TABLE_COLUMNS[cube.label];
  if (!columnData) return "";

  const rowsHtml = columnData
  .map((row) => {
    if (Array.isArray(row)) {
      const cellsHtml = row
      .map((cell) => `<span class="hint-cell">${cell}</span>`)
      .join("");
      return `<div class="hint-row hint-row-dual">${cellsHtml}</div>`;
    }
    return `<div class="hint-row hint-row-single"><span class="hint-cell">${row}</span></div>`;
  })
  .join("");

  return `<div class="p-item-hint" style="background:${COLORS[cube.color].face}; color:${COLORS[cube.color].dark};">
    ${rowsHtml}
  </div>`;
}

// Renders the main alphabet palette
export function renderPalette(cubes, containerEl, onCubeClick) {
  if (!containerEl) return;
  containerEl.innerHTML = "";
  cubes.forEach((cube) => {
    const btn = document.createElement("button");
    btn.className = `p-item size-${cube.size}`;
    btn.style.background = COLORS[cube.color].face;
    btn.style.color = COLORS[cube.color].dark;
    btn.title = cube.type;

    const labelSpan = document.createElement("span");
    labelSpan.className = "p-item-label";
    labelSpan.textContent = cube.label;
    btn.appendChild(labelSpan);

    const hintHtml = buildColumnHintHtml(cube);
    if (hintHtml) {
      btn.insertAdjacentHTML("beforeend", hintHtml);
    }

    btn.addEventListener("click", () => onCubeClick(cube, btn));

    // Mobile / touch support: long touch or tap to preview hint
    btn.addEventListener(
      "touchstart",
      () => {
        document.querySelectorAll(".p-item.show-hint").forEach((el) => {
          if (el !== btn) el.classList.remove("show-hint");
        });
        btn.classList.toggle("show-hint");
      },
      { passive: true }
    );

    containerEl.appendChild(btn);
  });

  // Hide mobile hint when tabbing elsewhere
  document.addEventListener("touchstart", (e) => {
    if (!e.target.closest(".p-item")) {
      document.querySelectorAll(".p-item.show-hint").forEach((el) => {
        el.classList.remove("show-hint");
      });
    }
  }, { passive: true });
}

// Special symbols are plain buttons - no 3D stage, no selection step.
export function renderSpecialPalette(symbols, containerEl, onSymbolClick) {
  if (!containerEl) return;
  containerEl.innerHTML = "";
  symbols.forEach((sym) => {
    const btn = document.createElement("button");
    btn.className = "p-item size-single";
    btn.style.background = COLORS.green.face;
    btn.style.color = COLORS.green.dark;
    btn.title = sym.title;

    if (sym.label === "Зб" || sym.title === "Заглавная буква") {
      btn.id = "btnSpecialCapital";
      btn.dataset.action = "capital";
    } else if (sym.title === "Ударение") {
      btn.id = "btnSpecialStress";
      btn.dataset.action = "stress";
      btn.draggable = true;
      btn.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("application/x-cubes-stress", true);
        e.dataTransfer.setData("text/plain", "STRESS");
        e.dataTransfer.effectAllowed = "copy";
      });
    }

    if (sym.icon) {
      const img = document.createElement("img");
      img.src = sym.icon;
      img.alt = sym.title;
      img.className = "p-item-icon";

      btn.appendChild(img);
    } else {
      btn.textContent = sym.label;
    }

    btn.addEventListener("click", () => onSymbolClick(sym, btn));
    containerEl.appendChild(btn);
  });
}
