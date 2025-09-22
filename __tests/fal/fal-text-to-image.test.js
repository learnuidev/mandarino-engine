const { mandarinoFal } = require("../test.client");

mandarinoFal
  .textToImage({
    text: "A cute, cartoon-style anthropomorphic penguin plush toy, standing in a painting studio, wearing a red knitted scarf and beret.",
  })
  .then((resp) => {
    console.log("resp", JSON.stringify(resp, null, 4));
  });
