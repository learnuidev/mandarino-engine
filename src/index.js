const { detectLanguage } = require("./detect-language");
const { discover } = require("./discover");
const { genConversation } = require("./gen-conversation");
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
const { genSentences } = require("./gen-sentences");
const { listSynonyms } = require("./list-synonyms");
const { casualTranslate } = require("./casual-translate");
const { verifyModel } = require("./utils/verify-model");
const { getDefaultModel } = require("./utils/get-defaullt-model");
const { genPinyin } = require("./gen-pinyin");
const { genRoman } = require("./gen-roman");
const { MiniMaxOpenAi } = require("./providers/minimax/chat");
const { genEn } = require("./gen-en");
const { genChinglish } = require("./gen-chinglish");
const {
  genSentenceTransformations,
} = require("./gen-sentence-transformations");
const { segmentText } = require("./segment-text");
const { segmentTextRaw } = require("./segment-text-raw");
const { getCorrection } = require("./get-correction");
const { createMinimaxApi } = require("./minimax/create-minimax-api");
const { listTranscript } = require("./list-transcript");

const supportedPlatforms = [
  "deepseek",
  "moonshot",
  "openai",
  "qwen",
  "mistral",
  "minimax",
];

const mandarinoApi = (props) => {
  const {
    apiKey,
    variant = "deepseek",
    modelName,
    dangerouslyAllowBrowser = false,
    baseUrl,
  } = props;

  if (!supportedPlatforms?.includes(variant)) {
    throw new Error(
      `The following platforms are supported: ${JSON.stringify(supportedPlatforms)}`
    );
  }

  let openai;
  const model = modelName
    ? verifyModel({ variant, modelName })
    : getDefaultModel(variant);

  if (variant === "openai") {
    openai = new OpenAI({
      apiKey: apiKey,
      dangerouslyAllowBrowser,
    });
  }

  if (variant === "deepseek") {
    openai = new OpenAI({
      baseURL: "https://api.deepseek.com",
      apiKey: apiKey,
      dangerouslyAllowBrowser,
    });
  }

  if (variant === "moonshot") {
    openai = new OpenAI({
      baseURL: "https://api.moonshot.ai/v1",
      apiKey: apiKey,
      dangerouslyAllowBrowser,
    });
  }
  if (variant === "qwen") {
    openai = new OpenAI({
      baseURL: "https://dashscope-intl.aliyuncs.com/compatible-mode/v1",
      apiKey: apiKey,
      dangerouslyAllowBrowser,
    });
  }

  if (variant === "mistral") {
    openai = new OpenAI({
      baseURL: "https://api.mistral.ai/v1",
      apiKey: apiKey,
      dangerouslyAllowBrowser,
    });
  }

  if (variant === "minimax") {
    openai = MiniMaxOpenAi({
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
      return genSentences({ lang, content, openai, model });
    },
    genSentenceTransformations: async ({ content, lang }) => {
      return genSentenceTransformations({ lang, content, openai, model });
    },
    genConversation: async ({ topic, subtopic, lang }) => {
      return genConversation({ topic, subtopic, lang, openai, model });
    },
    getSummary: async ({ content, lang }) => {
      return getSummary({ content, lang, openai, model });
    },

    extractImage: async ({ imageUrl }) => {
      if (!["openai", "moonshot", "qwen"].includes(variant)) {
        throw new Error("Operation currently not supported");
      }

      if (variant === "moonshot") {
        return extractImage({
          imageUrl,
          openai,
          model: "kimi-latest",
          variant,
          // model: "moonshot-v1-128k-vision-preview",
          // model: "moonshot-v1-8k-vision-preview",
        });
      }
      return extractImage({ imageUrl, openai, model, variant });
    },

    listSynonyms: async ({ content, lang }) => {
      return listSynonyms({ content, lang, openai, model });
    },

    genPinyin: async ({ content }) => {
      return genPinyin({ content, openai, model });
    },
    genRoman: async ({ content }) => {
      return genRoman({ content, openai, model });
    },
    genEn: async ({ content }) => {
      return genEn({ content, openai, model });
    },
    genChinglish: async ({ content }) => {
      return genChinglish({ content, openai, model });
    },
    segmentText: async ({ text, lang, granularity }) => {
      return segmentText({ text, lang, openai, model, granularity });
    },

    casualTranslate: async ({ content, targetLang, sourceLang }) => {
      return casualTranslate({
        content,
        openai,
        model,
        targetLang,
        sourceLang,
      });
    },
    getCorrection: async ({ content, targetLang, sourceLang }) => {
      return getCorrection({
        content,
        openai,
        model,
        targetLang,
        sourceLang,
      });
    },

    listComponents,
    listHskWords,
    model,
    segmentTextRaw,
    source: variant,
  };
};

module.exports = {
  mandarinoApi,
  listComponents,
  chineseConverter,
  listTranscript,
  isChinese,
  starBucksMenu,
  starBucksMenuWithCoordinates,
  createMinimaxApi,
};

// const mandarino = mandarinoApi({
//   apiKey: ``,
//   variant: "deepseek",
// });
