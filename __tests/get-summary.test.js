const { mandarinoClient } = require("./test.client");

// mandarinoClient
//   .genSentences({ content: "想要更上一层楼的话 那你得努力挣扎" })
//   .then((resp) => {
//     console.log("RESP", resp);
//   });

mandarinoClient
  .getSummary({
    // content: "dont la troisième Chinoise dans l'espace",
    content: "Pingzhi était un peu sceptique à ce sujet à cause du travail",
    lang: "zh",
  })
  .then((resp) => {
    console.log("RESP", resp);
  });
