const { minimax } = require("../test.client");

minimax
  .textToSpeech({
    text: "你好兄弟",
    lang: "zh",
    emotion: "happy",
  })
  .then((resp) => {
    console.log("resp", resp);
  });
