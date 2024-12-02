const { expect } = require("chai");
const { chineseConverter } = require("../../src");
// const { isPattern } = require("../../src/utils/is-pattern");

describe("chinese-converter", () => {
  it("if the input is 你好。你叫什麼名字, it should return 你好。你叫什么名字", () => {
    const config = chineseConverter("你好。你叫什麼名字");

    expect(config).to.equal("你好。你叫什么名字");
  });
  it(`if the input is { input: "我喜歡學習中文", from: "traditional",}, it should return 我喜欢学习中文`, () => {
    const config = chineseConverter({
      input: "我喜歡學習中文",
      from: "traditional",
    });

    expect(config).to.equal("我喜欢学习中文");
  });
  it(`if the input is { input: "你好。你叫什么名字", from: "simplified",}, it should return 你好。你叫什麼名字`, () => {
    const config = chineseConverter({
      input: "你好。你叫什么名字",
      from: "simplified",
    });

    expect(config).to.equal("你好。你叫什麼名字");
  });
});
