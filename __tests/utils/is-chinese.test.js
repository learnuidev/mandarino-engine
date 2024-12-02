const { expect } = require("chai");
const { isChinese } = require("../../src");

describe("is-chinese", () => {
  it("if the input is 你好。你叫什麼名字, it should return true", () => {
    const config = isChinese("你好。你叫什麼名字");

    expect(config).to.equal(true);
  });
  it("if the input is hello world, it should return false", () => {
    const config = isChinese("hello world");

    expect(config).to.equal(false);
  });
});
