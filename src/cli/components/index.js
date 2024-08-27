const { detectLanguage } = require("./detect-language");
const { step } = require("./step");

const components = {
  "detect-language": detectLanguage,
  step: step,
};

module.exports.components = components;
