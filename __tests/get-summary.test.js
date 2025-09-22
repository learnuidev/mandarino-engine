const { mandarinoClient, mandarinoDeepseek } = require("./test.client");

// mandarinoClient
//   .genSentences({ content: "想要更上一层楼的话 那你得努力挣扎" })
//   .then((resp) => {
//     console.log("RESP", resp);
//   });

mandarinoDeepseek
  .getSummary({
    // content: "dont la troisième Chinoise dans l'espace",
    content: "少林寺 逐渐 成汋 中国 武林 的 圣地 之一",
    lang: "zh",
  })
  .then((resp) => {
    console.log("RESP", resp);
  });
