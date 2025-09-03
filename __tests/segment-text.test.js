const { mandarinoClient } = require("./test.client");

mandarinoClient
  .segmentText({
    text: "Tienes cafe or te. Porfavor senior, diga me!",
    granularity: "sentence",
  })
  .then((resp) => {
    console.log("RESP", resp);
  });

// mandarinoClient
//   .segmentText({
//     text: "我昨天在图书馆看书。",
//     lang: "zh",
//     granularity: "grapheme",
//   })
//   .then((resp) => {
//     console.log("RESP", resp);
//   });
