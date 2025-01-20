const { mandarinoClient } = require("./test.client");

mandarinoClient
  .casualTranslate({
    content: "How do you learn French",
    sourceLang: "en-US",
    targetLang: "es-ES",
  })
  .then((resp) => {
    console.log("RESP", resp);
  });
// mandarinoClient
//   .casualTranslate({
//     content: "你好，我是安德里亚娜，我出生在摩尔多瓦",
//     sourceLang: "zh-CN",
//     targetLang: "en-US",
//   })
//   .then((resp) => {
//     console.log("RESP", resp);
//   });
