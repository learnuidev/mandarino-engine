const { modelsV2 } = require("../data/models");

const getDefaultModel = (variant) => {
  return Object.values(modelsV2?.[variant])?.[0];
};

module.exports = {
  getDefaultModel,
};
