const { parseInput } = require("./utils/parse-input");

const systemContent = `
You are a Language Expert.
Please provide chinglish for the following sentence

Please provide in stringified JSON format like so:

{
"chinglish": "..."}

For example, for 小妹/小弟啊。你帮我查一下。今天下午，去上海的高铁。那个G1234次的。还有票吗？有？好！那你给我拿一张。最便宜的那种就可以。没关系，硬座也可以。我就坐两个小时，不用卧铺。我的身份证，你拿去。啊，付钱？我手机扫一下就可以了，对吧？很方便。好，好了。谢谢你啊，小妹。

Should return:

{
  "chinglish": "Little sister/little brother ah. You help me check check. This afternoon, go Shanghai high-iron, that G one-two-three-four number, still have ticket or not? Have? Good! Then you take one piece for me. Cheapest kind can already. No problem, hard seat also can. I only sit two hour, no need sleeper. My ID card, you take go. Ah, pay money? I phone scan scan can already, right? Very convenient. Ok, ok. Thank you ah, little sister."
}



`;

const genChinglish = async ({ openai, content, model }) => {
  const t0 = performance.now();

  try {
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemContent,
        },

        { role: "user", content: `sentence: ${content}` },
      ],
      model: model,
    });

    const resp = await chatCompletion?.choices?.[0]?.message?.content;

    const t1 = performance.now();

    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);

    const respJSON = parseInput(resp);
    return respJSON;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  genChinglish,
};
