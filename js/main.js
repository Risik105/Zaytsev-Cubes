import { CUBES } from "./data/cubes.js";
import { SPECIAL_SYMBOLS } from "./data/special-symbols.js";
import { initShelf, addWordTile, toggleCapital, toggleStressMode } from "./shelf.js";
import { renderPalette, renderSpecialPalette } from "./palette.js";
import { openCube, showToast } from "./stage.js";

function initApp() {
    // Initialize shelf state and reset listener
    initShelf();

    // Render main cube palette
    const paletteEl = document.getElementById("palette");
    if (paletteEl) {
        renderPalette(CUBES, paletteEl, (cube, btn) => {
            openCube(cube, btn);
        });
    }

    // Render special symbols palette
    const specialPaletteEl = document.getElementById("specialPalette");
    if (specialPaletteEl) {
        renderSpecialPalette(SPECIAL_SYMBOLS, specialPaletteEl, (sym) => {
            if (sym.label === "Зб" || sym.title === "Заглавная буква") {
                toggleCapital();
            } else if (sym.title === "Ударение") {
                toggleStressMode();
            } else {
                addWordTile({ text: sym.label, color: "green", icon: sym.icon, size: "single" });
                if (navigator.vibrate) {
                    try { navigator.vibrate(40); } catch (_) {}
                }
                showToast(sym.label, "green", sym.icon);
            }
        });
    }
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initApp);
} else {
    initApp();
}
