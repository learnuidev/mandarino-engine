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

For example for source lang of en and target lang of zh-CN, or zh for: when i was a kid, i loved drawing, reading and singing

if should return
{"input": "when i was a kid, i loved drawing, reading and singing",
"output": "小时候，我特喜欢画画、看书和唱歌。",
"roman": "xiǎoshíhou, wǒ tè xǐhuan huàhuà, kànshū hé chànggē."}

For example for source lang of fr-FR and target lang of en for: ces êtres magiques sont souvent des jeunes filles. elles sont capables de se transformer en phoque et leur chant est également magique c'est leur manteau qui leur donne leur poroir, si elles en sont privées, elles sont en grand danger

it should return
{"input": "ces êtres magiques sont souvent des jeunes filles. elles sont capables de se transformer en phoque et leur chant est également magique c'est leur manteau qui leur donne leur poroir, si elles en sont privées, elles sont en grand danger",
"output": "these magical beings are often young girls. they are capable of transforming into a seal and their song is also magical it is their coat which gives them their poroir, if they are deprived of it, they are in great danger",
"roman": null}
`,
    content,
  });

  return { ...resp, sourceLang, targetLang };
}

module.exports = {
  casualTranslate,
};
