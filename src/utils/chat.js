import { parseInput } from "./parse-input";

export const chat = async (
  { openai, messages, model },
  { parse } = { parse: true }
) => {
  const chatCompletion = await openai.chat.completions.create({
    messages,
    model,
  });

  const resp = chatCompletion?.choices?.[0]?.message?.content;

  if (parse) {
    return parseInput(resp);
  }

  return resp;
};

module.exports = {
  chat,
};
