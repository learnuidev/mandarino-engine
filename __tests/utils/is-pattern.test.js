const { expect } = require("chai");
const { isPattern } = require("../../src/utils/is-pattern");

describe("is-pattern", () => {
  it("if the input is 42, it should return false", () => {
    const config = isPattern(42);

    expect(config).to.equal(false);
  });
  it("if the input is 'hello world' should return false", () => {
    const config = isPattern("hello world");

    expect(config).to.equal(false);
  });
  it("if the input is: '如果…那么…', should return true", () => {
    const config = isPattern("如果…那么…");

    expect(config).to.equal(true);
  });
});
