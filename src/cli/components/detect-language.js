const detectLanguageCode =
  'const OpenAI = require("openai");\n\nasync function detectLanguage({ content, apiKey }) {\n  const openai = new OpenAI({\n    apiKey: apiKey,\n  });\n\n  const chatCompletion = await openai.chat.completions.create({\n    messages: [\n      {\n        role: "system",\n        content: `\nYou are a language detection expert,\nGiven a text, try to guess which language it is using ISO 639 language codes\nFor example:\n\nHello should return en\n你好 should return zh\n\ngelato should return it\n\nकल सूरज उगेगा। should return hi\n\nപറയുവാൻ ഇതാദ്യമായ് വരികൾ മായേ... should return ml\n\n\n        `,\n      },\n      { role: "user", content: `content: ${content}` },\n    ],\n    model: "gpt-3.5-turbo",\n  });\n\n  const resp = chatCompletion?.choices?.[0]?.message?.content;\n\n  if (\n    resp?.toLowerCase().includes("hi") ||\n    resp?.toLowerCase().includes("in")\n  ) {\n    return "hi";\n  }\n\n  return resp;\n\n  // return resp;\n}\n\nmodule.exports.detectLanguage = detectLanguage';

const detectLanguage = {
  id: "detect-language",
  code: detectLanguageCode,
  basePath: "./mandarino",
};

module.exports.detectLanguage = detectLanguage;
