const { mandarinoClient } = require("./test.client");

mandarinoClient
  .genRoman({
    content: "पहला नशा, पहला खुमार",
    lang: "zh",
  })
  .then((sentences) => {
    console.log("synonyms", JSON.stringify(sentences, null, 4));
  });

// pahalaa nashaa, pahalaa khumaar
