import { COLORS } from "./constants.js";

// Renders the main alphabet palette
export function renderPalette(cubes, containerEl, onCubeClick) {
  if (!containerEl) return;
  containerEl.innerHTML = "";
  cubes.forEach((cube) => {
    const btn = document.createElement("button");
    btn.className = `p-item size-${cube.size}`;
    btn.style.background = COLORS[cube.color].face;
    btn.style.color = COLORS[cube.color].dark;
    btn.textContent = cube.label;
    btn.title = cube.type;
    btn.addEventListener("click", () => onCubeClick(cube, btn));
    containerEl.appendChild(btn);
  });
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

    if (sym.icon) {
      const img = document.createElement("img");
      img.src = sym.icon;
      img.alt = sym.title;
      img.className = "p-item-icon";

      btn.appendChild(img);
    } else {
      btn.textContent = sym.label;
    }

    btn.addEventListener("click", () => onSymbolClick(sym));
    containerEl.appendChild(btn);
  });
}
