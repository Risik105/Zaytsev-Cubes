import { COLORS } from "./constants.js";

let word = [];

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

export function clearWord() {
    word = [];
    renderShelf();
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
      return `<div class="shelf-tile" style="background:${c.face};color:${c.dark}"><span class="shelf-tile-text">${w.text}</span>
      <button class="shelf-tile-remove" data-index="${i}" title="Удалить">x</button>
      </div>`;
    })
    .join("");

    wrap.querySelectorAll(".shelf-tile-remove").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.index);
        removeWordTile(idx);
      });
    });
}

export function initShelf() {
    const resetBtn = document.getElementById("resetBtn");
    if (resetBtn) {
        resetBtn.addEventListener("click", clearWord);
    }
    renderShelf();
}
