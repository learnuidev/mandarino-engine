const { mandarinoClient } = require("./test.client");

// mandarinoClient
//   .casualTranslate({
//     // content: "How do you learn French",
//     content:
//       "ces êtres magiques sont souvent des jeunes filles. elles sont capables de se transformer en phoque et leur chant est également magique c'est leur manteau qui leur donne leur poroir, si elles en sont privées, elles sont en grand danger",
//     sourceLang: "fr-FR",
//     targetLang: "en",
//   })
//   .then((resp) => {
//     console.log("RESP", resp);
//   });
mandarinoClient
  .casualTranslate({
    // content: "How do you learn French",
    content: "i love you",
    sourceLang: "en",
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
