const { mandarinoClient } = require("./test.client");

mandarinoClient
  .extractImage({
    imageUrl: "",
  })
  .then((resp) => {
    console.log("RESP", resp);
  });
