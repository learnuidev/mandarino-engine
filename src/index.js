const { models } = require("./data/models");
const { detectLanguage } = require("./detect-language");
const { discover } = require("./discover");
const { genConversation } = require("./gen-conversation");
const { genSentences } = require("./gen-sentences");
const { getSummary } = require("./get-summary");
const OpenAI = require("openai");
const { extractImage } = require("./image/extract-image/extract-image");
const {
  starBucksMenu,
} = require("./image/extract-image/responses/starbucks-menu");
const {
  starBucksMenuWithCoordinates,
} = require("./image/extract-image/responses/starbucks-menu-with-coordinates");

const { listComponents } = require("./list-components");
const { listGrammarAnaysis } = require("./list-grammar-analysis");
const { chineseConverter, isChinese } = require("./utils/chinese-converter");
const { listHskWords } = require("./list-hsk-words");
const { genSentencesV2 } = require("./gen-sentences.v2");

const mandarinoApi = (props) => {
  const { apiKey, variant = "deepseek" } = props;

  let openai;
  const model = variant === "openai" ? models.mini4o : models.deepSeekChat;

  if (variant === "openai") {
    openai = new OpenAI({
      apiKey: apiKey,
    });
  }

  if (variant === "deepseek") {
    openai = new OpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey: apiKey,
    });
  }

  return {
    discover: async ({ content, lang }) => {
      return discover({ content, lang, openai, model });
    },
    listGrammarAnaysis: async ({ content, lang }) => {
      return listGrammarAnaysis({ content, lang, openai, model });
    },
    detectLanguage: async ({ content }) => {
      return detectLanguage({ content, model, openai });
    },

    genSentences: async ({ content, lang }) => {
      return genSentencesV2({ lang, content, openai, model });
    },
    genConversation: async ({ topic, subtopic, lang }) => {
      return genConversation({ topic, subtopic, lang, openai, model });
    },
    getSummary: async ({ content, lang }) => {
      return getSummary({ content, lang, openai, model });
    },

    extractImage: async ({ imageUrl }) => {
      if (variant === "deepseek") {
        throw new Error("Operation not supported");
      }
      return extractImage({ imageUrl, openai, model });
    },

    listComponents,
    listHskWords,
  };
};

module.exports = {
  mandarinoApi,
  listComponents,
  chineseConverter,
  isChinese,
  starBucksMenu,
  starBucksMenuWithCoordinates,
};

// const mandarino = mandarinoApi({
//   apiKey: ``,
//   variant: "deepseek",
// });

// mandarino
//   .genSentences({ content: "想要更上一层楼的话 那你得努力挣扎" })
//   .then((resp) => {
//     console.log("RESP", resp);
//   });
// mandarino
//   .detectLanguage({ content: "想要更上一层楼的话 那你得努力挣扎" })
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
