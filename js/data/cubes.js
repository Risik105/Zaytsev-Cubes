// Data model
// Every consonant with both a hard and soft variant gets TWO separate cube entries.

export const CUBES = [
  {
    id: "У",
    label: "У",
    type: "Гласный",
    size: "big",
    color: "gold",
    faces: ["У", "О", "А", "Э", "Ы", "🍓"],
  },

  {
    id: "Ю",
    label: "Ю",
    type: "Гласный",
    size: "small",
    color: "gold",
    faces: ["Ю", "Ё", "Я", "Е", "И", "🍓"],
  },

  {
    id: "Й",
    label: "Й",
    type: "Звонкий мягкий согласный",
    size: "small-rect",
    color: "grey",
    faces: [{ main: "Й", flip: "" }, { main: "ЙЯ", flip: "ЙА" }, { main: "", flip: "ЙО" }, { main: "ЙИ", flip: "" }, "ЙЮ", "ЙЕ"],
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
    id: "ЛЬ",
    label: "ЛЬ",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["ЛЮ", "ЛЁ", "ЛЯ", "ЛЕ", "ЛИ", "ЛЬ"],
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
    id: "МЬ",
    label: "МЬ",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["МЮ", "МЁ", "МЯ", "МЕ", "МИ", "МЬ"],
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
    id: "НЬ",
    label: "НЬ",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["НЮ", "НЁ", "НЯ", "НЕ", "НИ", "НЬ"],
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
    id: "РЬ",
    label: "РЬ",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["РЮ", "РЁ", "РЯ", "РЕ", "РИ", "РЬ"],
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
    id: "ВЬ",
    label: "ВЬ",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["ВЮ", "ВЁ", "ВЯ", "ВЕ", "ВИ", "ВЬ"],
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
    id: "ЗЬ",
    label: "ЗЬ",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["ЗЮ", "ЗЁ", "ЗЯ", "ЗЕ", "ЗИ", "ЗЬ"],
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
    id: "БЬ",
    label: "БЬ",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["БЮ", "БЁ", "БЯ", "БЕ", "БИ", "БЬ"],
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
    id: "ДЬ",
    label: "ДЬ",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["ДЮ", "ДЁ", "ДЯ", "ДЕ", "ДИ", "ДЬ"],
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
    id: "ГЬ",
    label: "ГЬ",
    type: "Звонкий мягкий согласный",
    size: "small",
    color: "grey",
    faces: ["ГЮ", "ГЁ", "ГЯ", "ГЕ", "ГИ", "ГЬ"],
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
    id: "ФЬ",
    label: "ФЬ",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["ФЮ", "ФЁ", "ФЯ", "ФЕ", "ФИ", "ФЬ"],
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
    id: "СЬ",
    label: "СЬ",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["СЮ", "СЁ", "СЯ", "СЕ", "СИ", "СЬ"],
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
    id: "ПЬ",
    label: "ПЬ",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["ПЮ", "ПЁ", "ПЯ", "ПЕ", "ПИ", "ПЬ"],
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
    id: "ТЬ",
    label: "ТЬ",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["ТЮ", "ТЁ", "ТЯ", "ТЕ", "ТИ", "ТЬ"],
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
    id: "КЬ",
    label: "КЬ",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["КЮ", "КЁ", "КЯ", "КЕ", "КИ", "КЬ"],
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
    id: "ХЬ",
    label: "ХЬ",
    type: "Глухой мягкий согласный",
    size: "small",
    color: "wood",
    faces: ["ХЮ", "ХЁ", "ХЯ", "ХЕ", "ХИ", "ХЬ"],
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
    id: "Ч",
    label: "Ч",
    type: "Глухой мягкий согласный",
    size: "small-rect",
    color: "wood",
    faces: [{ main: "Ч", flip: "ЧЬ" }, { main: "ЧО", flip: "ЧЁ" }, { main: "ЧЕ", flip: "" }, { main: "ЧИ", flip: "" }, "ЧУ", "ЧА"],
  },

  {
    id: "Щ",
    label: "Щ",
    type: "Глухой мягкий согласный",
    size: "small-rect",
    color: "wood",
    faces: [{ main: "Щ", flip: "ЩЬ" }, { main: "ЩО", flip: "ЩЁ" }, { main: "ЩЕ", flip: "" }, { main: "ЩИ", flip: "" }, "ЩУ", "ЩА"],
  }
];
