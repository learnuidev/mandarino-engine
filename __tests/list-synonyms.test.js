const { mandarinoClient } = require("./test.client");

// mandarinoClient
//   .listSynonyms({
//     content: "除了",
//     lang: "zh",
//   })
//   .then((sentences) => {
//     console.log("synonyms", JSON.stringify(sentences, null, 4));
//   });
const resp1 = [
  {
    input: "除了",
    roman: "chú le",
    en: "except for, besides, apart from, other than, excluding",
    lang: "zh",
  },
  {
    input: "除开",
    roman: "chú kāi",
    en: "excluding, apart from, other than, besides, except for",
    lang: "zh",
  },
  {
    input: "除去",
    roman: "chú qù",
    en: "excluding, apart from, other than, besides, except for",
    lang: "zh",
  },
  {
    input: "除却",
    roman: "chú què",
    en: "excluding, apart from, other than, besides, except for",
    lang: "zh",
  },
  {
    input: "除...以外",
    roman: "chú...yǐ wài",
    en: "except for, besides, apart from, other than, excluding",
    lang: "zh",
  },
];
// mandarinoClient
//   .listSynonyms({
//     content: "除了我们都听过的多说多听",
//     lang: "zh",
//   })
//   .then((sentences) => {
//     console.log("synonyms", JSON.stringify(sentences, null, 4));
//   });

const resp2 = [
  {
    input: "除了我们常说的多听多说",
    roman: "chú le wǒ men cháng shuō de duō tīng duō shuō",
    en: "Apart from the often-mentioned listening and speaking more",
    lang: "zh",
  },
  {
    input: "除了大家熟知的多听多说",
    roman: "chú le dà jiā shú zhī de duō tīng duō shuō",
    en: "Apart from the well-known advice of listening and speaking more",
    lang: "zh",
  },
  {
    input: "除了我们常提到的多听多说",
    roman: "chú le wǒ men cháng tí dào de duō tīng duō shuō",
    en: "Apart from the frequently mentioned listening and speaking more",
    lang: "zh",
  },
  {
    input: "除了我们常说的多听多讲",
    roman: "chú le wǒ men cháng shuō de duō tīng duō jiǎng",
    en: "Apart from the often-mentioned listening and speaking more",
    lang: "zh",
  },
  {
    input: "除了我们常说的多听多练",
    roman: "chú le wǒ men cháng shuō de duō tīng duō liàn",
    en: "Apart from the often-mentioned listening and practicing more",
    lang: "zh",
  },
];
