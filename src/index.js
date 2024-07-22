const { detectLanguage } = require("./detect-language");
const { discover } = require("./discover");
const { genConversation } = require("./gen-conversation");
const { genSentences } = require("./gen-sentences");
const { listGrammarAnaysis } = require("./list-grammar-analysis");

const mandarinoApi = ({ apiKey }) => {
  return {
    discover: async ({ content, lang }) => {
      return discover({ apiKey, content, lang });
    },
    listGrammarAnaysis: async ({ content, lang }) => {
      return listGrammarAnaysis({ apiKey, content, lang });
    },
    detectLanguage: async ({ content }) => {
      return detectLanguage({ apiKey, content });
    },

    genSentences: async ({ content, lang }) => {
      return genSentences({ content, lang, apiKey });
    },
    genConversation: async ({ topic, subtopic, lang }) => {
      return genConversation({ topic, subtopic, lang, apiKey });
    },
  };
};

module.exports = {
  mandarinoApi,
};
