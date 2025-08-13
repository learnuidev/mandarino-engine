const { supportedMinimaxTextModels } = require("../providers/minimax/chat");

const models = {
  mini4o: "gpt-4o-mini",
  turbo35: "gpt-3.5-turbo",
  deepSeekChat: "deepseek-chat",
  moonshotAuto: "moonshot-v1-auto",
};

const moonShotModels = [
  "moonshot-v1-8k",
  "moonshot-v1-32k",
  "moonshot-v1-128k",
  "moonshot-v1-auto",
];

const deepseekModels = ["deepseek-chat", "deepseek-r1"];

const modelsV2 = {
  moonshot: moonShotModels,
  deepseek: deepseekModels,
  openai: ["gpt-3.5-turbo", "gpt-4o-mini"],
  qwen: ["qwen-plus"],
  mistral: [
    "mistral-large-latest",
    "ministral-3b-latest",
    "ministral-8b-latest",
  ],

  minimaxMax: Object.values(supportedMinimaxTextModels),
};

module.exports = {
  models,
  modelsV2,
};
