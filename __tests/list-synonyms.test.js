const { mandarinoClient } = require("./test.client");

mandarinoClient
  .listSynonyms({
    content: "除了",
    lang: "zh",
  })
  .then((sentences) => {
    console.log("synonyms", JSON.stringify(sentences, null, 4));
  });

const resp1 = [
  {
    input: "除了",
    roman: "chú le",
    en: "besides",
    synonyms: [
      "apart from",
      "other than",
      "except for",
      "aside from",
      "excluding",
    ],
    lang: "zh",
  },
  {
    input: "除开",
    roman: "chú kāi",
    en: "excluding",
    synonyms: [
      "apart from",
      "other than",
      "except for",
      "aside from",
      "besides",
    ],
    lang: "zh",
  },
  {
    input: "除了之外",
    roman: "chú le zhī wài",
    en: "in addition to",
    synonyms: [
      "apart from",
      "other than",
      "except for",
      "aside from",
      "besides",
    ],
    lang: "zh",
  },
  {
    input: "除了以外",
    roman: "chú le yǐ wài",
    en: "other than",
    synonyms: [
      "apart from",
      "except for",
      "aside from",
      "besides",
      "excluding",
    ],
    lang: "zh",
  },
  {
    input: "除却",
    roman: "chú què",
    en: "except",
    synonyms: [
      "apart from",
      "other than",
      "aside from",
      "besides",
      "excluding",
    ],
    lang: "zh",
  },
];
