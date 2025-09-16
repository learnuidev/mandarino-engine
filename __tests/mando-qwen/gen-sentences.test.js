// const { mandarinoClient } = require("./test.client");

const { mandarinoQwen } = require("../test.client");

mandarinoQwen
  .genSentences({
    content: "Es esa mi fortuna, es ese mi castigo",
    lang: "es",
  })
  .then((resp) => {
    console.log("RESP", resp);
  });
