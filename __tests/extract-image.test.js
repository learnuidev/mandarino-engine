const { mandarinoClient } = require("./test.client");

mandarinoClient
  .extractImage({
    imageUrl:
      "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/01K57CEHAB61QBSBCF8YRVDW6R.jpeg",
  })
  .then((resp) => {
    console.log("RESP", resp);
  });
