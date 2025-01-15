const { mandarinoApi } = require("../src");
const { mandarinoClient } = require("./client");

mandarinoClient
  .detectLanguage({ content: "想要更上一层楼的话 那你得努力挣扎" })
  .then((resp) => {
    console.log("RESP", resp);
  });
