// const { minimax } = require("../test.client");

const { minimaxApi } = require("../test.client");

minimaxApi.listSystemVoices({ lang: "zh" }).then((resp) => {
  console.log("resp", resp);
});
