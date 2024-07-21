const OpenAI = require("openai");

async function detectLanguage({ content, apiKey }) {
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a language detection expert,
Given a text, try to guess which language it is using ISO 639 language codes
For example:

Hello should return en
你好 should return zh

gelato should return it

कल सूरज उगेगा। should return hi

പറയുവാൻ ഇതാദ്യമായ് വരികൾ മായേ... should return ml


        `,
      },
      { role: "user", content: `content: ${content}` },
    ],
    model: "gpt-3.5-turbo",
  });

  const resp = chatCompletion?.choices?.[0]?.message?.content;

  if (
    resp?.toLowerCase().includes("hi") ||
    resp?.toLowerCase().includes("in")
  ) {
    return "hi";
  }

  return resp;

  // return resp;
}

module.exports.detectLanguage = detectLanguage;
