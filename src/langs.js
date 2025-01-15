const humanLangs = {
  ne: "Nepali",
  hi: "Hindi",
  nepali: "Nepali",
  hindi: "Hindi",
  hi_IN: "Hindi",
  zh: "Mandarin Chinese (Simple)",
  ml: "Malayalam",
  fr: "French",
  es: "Spanish",
  mo: "Romanian (Moldova)",
  ["fr-FR"]: "French",
  ["es-ES"]: "Spanish",
  ["it-IT"]: "Italian",
  ["zh-CN"]: "Mandarin Chinese (Simple)",
};

const resolveHumanLangs = (lang) => humanLangs[lang] || lang;

module.exports.humanLangs = humanLangs;
module.exports.resolveHumanLangs = resolveHumanLangs;

const langs = {
  ne: "ne",
  hi: "hi",
  nepali: "ne",
  hindi: "hi",
  hi_IN: "hi",
  zh: "zh",
  ml: "ml",
  fr: "fr",
  es: "es",
  mo: "mo",
};

module.exports.langs = langs;
