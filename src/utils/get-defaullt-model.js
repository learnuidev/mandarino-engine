const { models, modelsV2 } = require("../data/models");

const getDefaultModel = (variant) => {
  switch (variant) {
    case "openai":
      return models.mini4o;
    case "moonshot":
      return models.moonshotAuto;
    case "qwen":
      return modelsV2?.qwen?.[0];
    case "mistral":
      return modelsV2.mistral?.[0];
    case "deepseek":
    default:
      return models.deepSeekChat;
  }
};

module.exports = {
  getDefaultModel,
};
