const { detectLanguage } = require("./detect-language");
const { discover } = require("./discover");
const { genConversation } = require("./gen-conversation");
const { genSentences } = require("./gen-sentences");
const { getSummary } = require("./get-summary");
const { listComponents } = require("./list-components");
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
    getSummary: async ({ content, lang }) => {
      return getSummary({ content, apiKey, lang });
    },

    listComponents: listComponents,
  };
};

module.exports = {
  mandarinoApi,
  listComponents,
};
