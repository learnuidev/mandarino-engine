const { genChinglish } = require("../src/gen-chinglish");
const {
  mandarinoClient,
  mandarinoDeepseek,
  mandarinoMoonshot,
} = require("./test.client");

mandarinoMoonshot
  .genChinglish({
    content: `小妹/小弟啊。你帮我查一下。今天下午，去上海的高铁。那个G1234次的。还有票吗？有？好！那你给我拿一张。最便宜的那种就可以。没关系，硬座也可以。我就坐两个小时，不用卧铺。我的身份证，你拿去。啊，付钱？我手机扫一下就可以了，对吧？很方便。好，好了。谢谢你啊，小妹。`,
    lang: "zh",
  })
  .then((chinglish) => {
    console.log("chinglish", chinglish);
  });
