const { mandarinoClient } = require("./test.client");

mandarinoClient
  .generateSynonymSentences({
    content: "除了我们都听过的多说多听",
  })
  .then((sentences) => {
    console.log("SENTS", JSON.stringify(sentences, null, 4));
  });

const resp1 = [
  {
    input: "除了我们都听过的多说多听",
    roman: "chú le wǒ men dōu tīng guò de duō shuō duō tīng",
    en: "Apart from the commonly heard advice of speaking and listening more",
    zh: "除了我们都听过的多说多听",
  },
  {
    input: "除了我们都听过的多说多听",
    roman: "chú le wǒ men dōu tīng guò de duō shuō duō tīng",
    en: "In addition to the well-known suggestion of speaking and listening more",
    zh: "除了我们都听过的多说多听",
  },
  {
    input: "除了我们都听过的多说多听",
    roman: "chú le wǒ men dōu tīng guò de duō shuō duō tīng",
    en: "Beyond the familiar advice of speaking and listening more",
    zh: "除了我们都听过的多说多听",
  },
  {
    input: "除了我们都听过的多说多听",
    roman: "chú le wǒ men dōu tīng guò de duō shuō duō tīng",
    en: "Aside from the often-heard recommendation to speak and listen more",
    zh: "除了我们都听过的多说多听",
  },
  {
    input: "除了我们都听过的多说多听",
    roman: "chú le wǒ men dōu tīng guò de duō shuō duō tīng",
    en: "Other than the frequently mentioned advice of speaking and listening more",
    zh: "除了我们都听过的多说多听",
  },
  {
    input: "除了我们都听过的多说多听",
    roman: "chú le wǒ men dōu tīng guò de duō shuō duō tīng",
    en: "Apart from the widely known tip of speaking and listening more",
    zh: "除了我们都听过的多说多听",
  },
];

const resp2 = [
  {
    input: "除了我们常说的多听多说",
    roman: "chú le wǒ men cháng shuō de duō tīng duō shuō",
    en: "In addition to the often-mentioned listening and speaking more",
    zh: "除了我们常说的多听多说",
  },
  {
    input: "除了大家熟知的多听多说",
    roman: "chú le dà jiā shú zhī de duō tīng duō shuō",
    en: "Apart from the well-known advice of listening and speaking more",
    zh: "除了大家熟知的多听多说",
  },
  {
    input: "除了我们常听到的多听多说",
    roman: "chú le wǒ men cháng tīng dào de duō tīng duō shuō",
    en: "Besides the frequently heard advice of listening and speaking more",
    zh: "除了我们常听到的多听多说",
  },
  {
    input: "除了众所周知的多听多说",
    roman: "chú le zhòng suǒ zhōu zhī de duō tīng duō shuō",
    en: "In addition to the widely known practice of listening and speaking more",
    zh: "除了众所周知的多听多说",
  },
  {
    input: "除了我们常被教导的多听多说",
    roman: "chú le wǒ men cháng bèi jiào dǎo de duō tīng duō shuō",
    en: "Aside from the common teaching of listening and speaking more",
    zh: "除了我们常被教导的多听多说",
  },
  {
    input: "除了我们常被建议的多听多说",
    roman: "chú le wǒ men cháng bèi jiàn yì de duō tīng duō shuō",
    en: "In addition to the frequent advice of listening and speaking more",
    zh: "除了我们常被建议的多听多说",
  },
];
