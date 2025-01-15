// import { parseInput } from "./parse-input";

const { parseInput } = require("./parse-input");

const chatV2 = async (
  { openai, model, prompt, content },
  { parse } = { parse: true }
) => {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: prompt,
      },
      { role: "user", content: `content: ${content}` },
    ],
    model,
  });

  const resp = chatCompletion?.choices?.[0]?.message?.content;

  if (parse) {
    return parseInput(resp);
  }

  return resp;
};

module.exports = {
  chatV2,
};
