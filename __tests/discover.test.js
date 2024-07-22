const { expect } = require("chai");
const { isPattern } = require("../src/utils/is-pattern");
const { discover } = require("../src/discover");
const { ZodError } = require("zod");

describe("discover", () => {
  it("should return null", async () => {
    const config = await discover({
      content: false,
      lang: undefined,
      apiKey: 42,
    });

    // expect(config).to.equal(null);

    expect(config.error).to.equal(true);
    expect(config.issues?.length).to.equal(2);
    expect(config.message).to.equal(
      `content: Expected string, received boolean. apiKey: Expected string, received number`
    );
  });
  it("should return opan-ai error object", async () => {
    const config = await discover({
      content: "I love Linear Algebra",
      lang: "en",
      apiKey: "invalid-api",
    });

    expect(config.error).to.equal(true);
    expect(config.message).to.equal(
      "401 Incorrect API key provided: invalid-api. You can find your API key at https://platform.openai.com/account/api-keys."
    );
  });
});
