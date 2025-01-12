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
//   apiKey: "",
//   variant: "deepseek",
// });

// mandarino
//   .getSummary({ content: "它的训练成本比其他模型要低得多", lang: "zh" })
//   .then((resp) => {
//     console.log("RESP", resp);
//   });
