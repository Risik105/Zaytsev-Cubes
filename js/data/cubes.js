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
