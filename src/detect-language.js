const { parseInput } = require("./utils/parse-input");

async function detectLanguage({ content, openai, model }) {
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `
You are a language detection expert,
Given a text, try to guess which language it is using ISO 639 language codes

please return in JSON format like so
{"lang": "..."}

For example:


Hello should return
{"lang": "en"}
 en
你好 should return
{"lang": "zh"}

gelato should return
{"lang": "id"}

कल सूरज उगेगा। should return
{"lang": "hi"}

പറയുവാൻ ഇതാദ്യമായ് വരികൾ മായേ... should return
{"lang": "ml"}

想要更上一层楼的话 那你得努力挣扎 should return
{"lang": "zh"}
        `,
      },
      { role: "user", content: `content: ${content}` },
    ],
    model,
  });

  const resp = parseInput(chatCompletion?.choices?.[0]?.message?.content);

  return resp?.lang;

  // return resp;
}

module.exports.detectLanguage = detectLanguage;
