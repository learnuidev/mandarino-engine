const { models } = require("../data/models");

const getDefaultModel = (variant) => {
  switch (variant) {
    case "openai":
      return models.mini4o;
    case "moonshot":
      return models.moonshotAuto;
    case "deepseek":
    default:
      return models.deepSeekChat;
  }
};

module.exports = {
  getDefaultModel,
};
