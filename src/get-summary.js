const { detectLanguage } = require("./detect-language");

// const { openaiEnv } = require("./open-api-key");
const { resolveHumanLangs } = require("./langs");
const { chat } = require("./utils/chat");

const promptLong = `
You are a language translation expert
For the given content, give:
- The summary
- Explanation of the content
- Possible use cases
`;

const prompt = `
You are an expert summarizer, given context, return its information in english.

---
The Chinese character "长" (cháng) has several translations in English, depending on the context:
## 1. Long (长, cháng)
The most common translation of "长" is "long" when referring to length or duration. For example:
这条河很长。 (Zhè tiáo hé hěn cháng.) - This river is very long.
这次旅行持续了很长时间。 (Zhè cì lǚxíng chíxùle hěn cháng shíjiān.) - This trip lasted a very long time.
## 2. Tall (长, cháng)
"长" can also mean "tall" when describing the height of a person or object. For example:
他很长。 (Tā hěn cháng.) - He is very tall.
这栋大楼很长。 (Zhè dòng dàlóu hěn cháng.) - This building is very tall.
## 3. Chief, Head (长, zhǎng)
In certain contexts, "长" can mean "chief" or "head" when referring to a leader or person in charge. For example:
公司的长官 (Gōngsī de zhǎngguān) - The company's chief/head
村长 (Cūnzhǎng) - The village head
## 4. Grow (长, zhǎng)
When used as a verb, "长" can mean "to grow" or "to increase in size/length/height". For example:
这棵树长得很快。 (Zhè kē shù zhǎng dé hěn kuài.) - This tree is growing very quickly.
他从小就一直在长高。 (Tā cóng xiǎo jiù yīzhí zài zhǎng gāo.) - He has been growing taller since he was young.

So in summary, the English translations of the Chinese character "长" can include "long", "tall", "chief/head", and "grow", depending on the specific context in which it is used.
`;

// const prompts = {
//   ml: "",
// };

const resolvePrompt = async ({ content, lang }) => {
  if (lang === "zh") {
    if (content?.length > 3) {
      console.log("LONG PROMPT");
      return promptLong;
    }
    return prompt;
  }
  return prompt;
};
async function getSummary({ content, lang, openai, model }) {
  const resolvedLang =
    lang || (await detectLanguage({ content, openai, model }));
  try {
    console.log(`Generating Summary for: ${content}`);

    const resolvedPrompt = await resolvePrompt({ content, lang: resolvedLang });
    const resp = await chat(
      {
        openai,
        model,
        messages: [
          {
            role: "system",
            content: `${resolvedPrompt}
        
        Also the content is of the following language: ${resolveHumanLangs(resolvedLang)}`,
          },
          { role: "user", content: `content: ${content}` },
        ],
      },
      {
        parse: false,
      }
    );

    console.log(`Summary successfully generated for ${content}!!!`);

    return resp;
  } catch (err) {
    return "";
  }
}

// getSummary("字").then((meanings) => {
//   console.log("Summary", meanings);
// });

module.exports.getSummary = getSummary;
