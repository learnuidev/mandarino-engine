const { chatV2 } = require("./utils/chat-v2");

async function casualTranslate({
  content,
  openai,
  model,
  targetLang,
  sourceLang,
}) {
  const resp = await chatV2({
    openai,
    model,
    prompt: `
You are a language expert, given the content please provide casual spoken translation for the language: ${targetLang}


Please provide in stringified JSON format like so:
{"input": "", "roman": "...", "output": "..."}

For example for: when i was a kid, i loved drawing, reading and singing

if should return
{"input": "when i was a kid, i loved drawing, reading and singing",
"output": "小时候，我特喜欢画画、看书和唱歌。",
"roman": "xiǎoshíhou, wǒ tè xǐhuan huàhuà, kànshū hé chànggē."}
`,
    content,
  });

  return { ...resp, sourceLang, targetLang };
}

module.exports = {
  casualTranslate,
};
