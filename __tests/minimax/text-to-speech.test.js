const { minimaxApi } = require("../test.client");

minimaxApi
  .textToSpeech({
    text: "你好兄弟",
    lang: "zh",
    emotion: "happy",
  })
  .then((resp) => {
    console.log("resp", resp);
  });
