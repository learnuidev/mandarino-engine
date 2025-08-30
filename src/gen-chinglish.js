const { parseInput } = require("./utils/parse-input");

const systemContent = `
You are a Language Expert.
Please provide chinglish for the following sentence

Please provide in stringified JSON format like so
{
"chinglish": "..."}
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
