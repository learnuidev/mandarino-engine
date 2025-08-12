const { mandarinoClient } = require("./test.client");

// mandarinoClient
//   .genSentences({ content: "想要更上一层楼的话 那你得努力挣扎" })
//   .then((resp) => {
//     console.log("RESP", resp);
//   });

const exampleResp = [
  {
    hanzi: "想要更上一层楼的话，那你得努力挣扎。",
    pinyin: "Xiǎng yào gèng shàng yī céng lóu de huà, nà nǐ děi nǔlì zhēngzhá.",
    en: "If you want to reach a higher level, then you have to struggle hard.",
    explanation:
      "In this sentence, 想要 means 'want to', 更上一层楼 means 'reach a higher level', and 努力挣扎 means 'struggle hard'. Combined, it means 'If you want to reach a higher level, then you have to struggle hard.'",
    lang: "zh",
    zh: undefined,
    component: "想要更上一层楼的话 那你得努力挣扎",
    model: "deepseek-chat",
  },
  {
    hanzi: "他想要更上一层楼，所以每天都在努力挣扎。",
    pinyin:
      "Tā xiǎng yào gèng shàng yī céng lóu, suǒyǐ měitiān dōu zài nǔlì zhēngzhá.",
    en: "He wants to reach a higher level, so he struggles hard every day.",
    explanation:
      "Here, 他 means 'he', 想要更上一层楼 means 'wants to reach a higher level', and 每天都在努力挣扎 means 'struggles hard every day'. Combined, it means 'He wants to reach a higher level, so he struggles hard every day.'",
    lang: "zh",
    zh: undefined,
    component: "想要更上一层楼的话 那你得努力挣扎",
    model: "deepseek-chat",
  },
  {
    hanzi: "如果你想要更上一层楼，就必须努力挣扎。",
    pinyin:
      "Rúguǒ nǐ xiǎng yào gèng shàng yī céng lóu, jiù bìxū nǔlì zhēngzhá.",
    en: "If you want to reach a higher level, you must struggle hard.",
    explanation:
      "In this sentence, 如果 means 'if', 想要更上一层楼 means 'want to reach a higher level', and 必须努力挣扎 means 'must struggle hard'. Combined, it means 'If you want to reach a higher level, you must struggle hard.'",
    lang: "zh",
    zh: undefined,
    component: "想要更上一层楼的话 那你得努力挣扎",
    model: "deepseek-chat",
  },
  {
    hanzi: "想要更上一层楼，努力挣扎是必要的。",
    pinyin: "Xiǎng yào gèng shàng yī céng lóu, nǔlì zhēngzhá shì bìyào de.",
    en: "To reach a higher level, struggling hard is necessary.",
    explanation:
      "Here, 想要更上一层楼 means 'to reach a higher level', and 努力挣扎是必要的 means 'struggling hard is necessary'. Combined, it means 'To reach a higher level, struggling hard is necessary.'",
    lang: "zh",
    zh: undefined,
    component: "想要更上一层楼的话 那你得努力挣扎",
    model: "deepseek-chat",
  },
  {
    hanzi: "她想要更上一层楼，所以一直在努力挣扎。",
    pinyin:
      "Tā xiǎng yào gèng shàng yī céng lóu, suǒyǐ yīzhí zài nǔlì zhēngzhá.",
    en: "She wants to reach a higher level, so she has been struggling hard.",
    explanation:
      "In this sentence, 她 means 'she', 想要更上一层楼 means 'wants to reach a higher level', and 一直在努力挣扎 means 'has been struggling hard'. Combined, it means 'She wants to reach a higher level, so she has been struggling hard.'",
    lang: "zh",
    zh: undefined,
    component: "想要更上一层楼的话 那你得努力挣扎",
    model: "deepseek-chat",
  },
];

mandarinoClient
  .genSentences({
    content: "Es esa mi fortuna, es ese mi castigo",
    lang: "es",
  })
  .then((resp) => {
    console.log("RESP", resp);
  });

const resp = [
  {
    input: "Je ne sais pas dont tu parles.",
    en: "I don't know what you're talking about.",
    explanation:
      "In this sentence, 'dont' is a relative pronoun meaning 'of which' or 'about which' in English.",
    lang: "fr-FR",
    component: "dont",
    model: "deepseek-chat",
  },
  {
    input: "C'est la personne dont j'ai besoin.",
    en: "This is the person I need.",
    explanation:
      "Here, 'dont' is used to mean 'whom' or 'that' in English, referring to the person needed.",
    lang: "fr-FR",
    component: "dont",
    model: "deepseek-chat",
  },
  {
    input: "Voici le livre dont je t'ai parlé.",
    en: "Here is the book I told you about.",
    explanation:
      "In this sentence, 'dont' is used to mean 'about which' or 'that' in English, referring to the book.",
    lang: "fr-FR",
    component: "dont",
    model: "deepseek-chat",
  },
  {
    input: "C'est l'idée dont je suis fier.",
    en: "This is the idea I am proud of.",
    explanation:
      "Here, 'dont' is used to mean 'of which' in English, referring to the idea.",
    lang: "fr-FR",
    component: "dont",
    model: "deepseek-chat",
  },
  {
    input: "Il y a des choses dont on ne parle pas.",
    en: "There are things we don't talk about.",
    explanation:
      "In this sentence, 'dont' is used to mean 'about which' in English, referring to the things not discussed.",
    lang: "fr-FR",
    component: "dont",
    model: "deepseek-chat",
  },
];
