const { modelsV2 } = require("../data/models");

const verifyModel = ({ variant, modelName }) => {
  const models = modelsV2?.[variant];

  if (!models) {
    throw new Error(
      `Provider: ${variant} is not supported. Please provide from one of the following providers: ${JSON.stringify(Object.keys(modelsV2))}`
    );
  }

  if (!models?.includes(modelName)) {
    throw new Error(
      `Wrong model, should be one of the following ${JSON.stringify(models)}`
    );
  }

  console.log("Yayy! Model is supported 🔥");

  return modelName;
};

module.exports = {
  verifyModel,
};
