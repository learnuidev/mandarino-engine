const { supportedMinimaxTextModels } = require("../providers/minimax/chat");

const models = {
  mini4o: "gpt-4o-mini",
  turbo35: "gpt-3.5-turbo",
  deepSeekChat: "deepseek-chat",
  moonshotAuto: "moonshot-v1-auto",
};

const moonShotModels = [
  "kimi-k2-turbo-preview",
  "kimi-k2-0711-preview",
  "moonshot-v1-auto",
  "moonshot-v1-8k",
  "moonshot-v1-32k",
  "moonshot-v1-128k",
];

const qwenModels = {
  qwen3: "qwen3-coder-plus",
  plus: "qwen-plus",
  q3NextInstruct: "qwen3-next-80b-a3b-instruct",
};

const deepseekModels = ["deepseek-chat", "deepseek-r1"];

const modelsV2 = {
  openai: ["gpt-4o-mini", "gpt-3.5-turbo"],
  moonshot: moonShotModels,
  qwen: Object.values(qwenModels),
  mistral: [
    "mistral-large-latest",
    "ministral-3b-latest",
    "ministral-8b-latest",
  ],
  minimax: Object.values(supportedMinimaxTextModels),
  deepseek: deepseekModels,
};

module.exports = {
  models,
  modelsV2,
  qwenModels,
};
