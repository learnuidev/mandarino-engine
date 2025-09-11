const { minimax } = require("../test.client");

minimax.listSystemVoices({ lang: "zh" }).then((resp) => {
  console.log("resp", resp);
});
