const { mandarinoClient } = require("./test.client");

// mandarinoClient
//   .genRoman({
//     content: "पहला नशा, पहला खुमार",
//     lang: "zh",
//   })
//   .then((sentences) => {
//     console.log("synonyms", JSON.stringify(sentences, null, 4));
//   });

// pahalaa nashaa, pahalaa khumaar

mandarinoClient
  .genRoman({
    content: "想要更上一层楼的话 那你得努力挣扎",
    lang: "zh",
  })
  .then((sentences) => {
    console.log("synonyms", JSON.stringify(sentences, null, 4));
  });
