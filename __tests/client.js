const { mandarinoApi } = require("../src");

const mandarinoClient = mandarinoApi({
  apiKey: ``,
  variant: "deepseek",
});

module.exports = {
  mandarinoClient,
};
