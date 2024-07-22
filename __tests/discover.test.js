const { expect } = require("chai");
const { isPattern } = require("../src/utils/is-pattern");
const { discover } = require("../src/discover");
const { ZodError } = require("zod");

describe("discover", () => {
  const fistInput = {
    content: false,
    lang: undefined,
    apiKey: 42,
  };

  it("if content and apiKey is wrong, it should return mandarino validation error object", async () => {
    const config = await discover(fistInput);

    expect(config.error).to.equal(true);
    expect(config.issues?.length).to.equal(2);
    expect(config.message).to.equal(
      `content: Expected string, received boolean. apiKey: Expected string, received number`
    );
  });

  const secondInput = {
    content: false,
    lang: false,
    apiKey: 42,
  };

  it("if all content, apiKey and language is wrong, it should return mandarino validation error object 2/2", async () => {
    const config = await discover(secondInput);

    expect(config.error).to.equal(true);
    expect(config.issues?.length).to.equal(3);
    expect(config.message).to.equal(
      `content: Expected string, received boolean. lang: Expected string, received boolean. apiKey: Expected string, received number`
    );
  });

  const thirdInput = {
    content: "I love Linear Algebra",
    lang: "en",
    apiKey: "invalid-api",
  };

  it("if the openai api-key is wrong, it should return should return opan-ai error object", async () => {
    const config = await discover(thirdInput);

    expect(config.error).to.equal(true);
    expect(config.message).to.equal(
      "401 Incorrect API key provided: invalid-api. You can find your API key at https://platform.openai.com/account/api-keys."
    );
  });
});
