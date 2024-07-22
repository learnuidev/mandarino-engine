const z = require("zod").z;

const patternInputSchema = z.string();

const isPattern = (sent) => {
  try {
    // if the value is anything other than sentence, it throws error
    patternInputSchema.parse(sent);

    // const exampleSent = '如果…那么…'
    return sent?.includes("…") || sent?.includes("...");
  } catch (err) {
    return false;
  }
};

module.exports.isPattern = isPattern;
