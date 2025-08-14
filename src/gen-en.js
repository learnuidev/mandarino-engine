const { parseInput } = require("./utils/parse-input");

const systemContent = `
You are a Language Expert.
Please translate the following into english

Please provide in stringified JSON format like so
{
"en": "..."}
`;

const genEn = async ({ openai, content, model }) => {
  const t0 = performance.now();

  try {
    // console.log("---prompt---", prompt);
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
    return respJSON.en;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  genEn,
};
