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
