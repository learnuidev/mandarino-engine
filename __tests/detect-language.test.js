const { mandarinoApi } = require("../src");

const mandarino = mandarinoApi({
  apiKey: ``,
  variant: "deepseek",
});

mandarino
  .detectLanguage({ content: "想要更上一层楼的话 那你得努力挣扎" })
  .then((resp) => {
    console.log("RESP", resp);
  });
