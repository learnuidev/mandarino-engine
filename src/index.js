const { discover } = require("./discover");

const mandarinoApi = ({ apiKey }) => {
  return {
    discover: async ({ content, lang }) => {
      return discover({ apiKey, content, lang });
    },
  };
};

module.exports = {
  mandarinoApi,
};
