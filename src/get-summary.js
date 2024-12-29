const { detectLanguage } = require("./detect-language");

// const { openaiEnv } = require("./open-api-key");
const { resolveHumanLangs } = require("./langs");

const promptLong = `
You are a language translation expert
For the given content, give:
- The summary
- Explanation of the content
- Possible use cases
`;

// eslint-disable-next-line no-unused-vars
const prompt_old = `
You are an expert summarizer, given context, return its information in english.

---
For example for 一, it should return:

"One" is the cardinal number representing a single unit or the first in a series.
It is the most basic and fundamental number in the English number system.

## Numerical Representation

The written form is "one"
The numerical symbol is "1"

## Usage

Used to indicate a single item or person
Can function as a noun (e.g. "I have one apple"), adjective (e.g. "I have one apple"), or pronoun (e.g. "Give me one")
Used in ordinal numbers to indicate the first position (e.g. "first")


## Idioms and Expressions

"All in one" - everything combined into a single unit
"At one" - in agreement or harmony
"In one's own right" - by one's own merit
"Of one mind" - sharing the same opinion

So in summary, the number "one" is the fundamental building block of the English number system, with important numerical, grammatical, and idiomatic uses. Its simplicity belies its significance in the language.`;

const prompt = `
You are an expert summarizer, given context, return its information in english.

---
For example for 长, it should return:

The Chinese character "长" has several translations in English, depending on the context:

## 1. Long

The most common translation of "长" is "long" when referring to length or duration. For example:
这条河很长。 - This river is very long.
这次旅行持续了很长时间。 - This trip lasted a very long time.

## 2. Tall

"长" can also mean "tall" when describing the height of a person or object. For example:
他很长。 - He is very tall.
这栋大楼很长。 - This building is very tall.

## 3. Chief, Head

In certain contexts, "长" can mean "chief" or "head" when referring to a leader or person in charge. For example:
公司的长官 - The company's chief/head
村长 - The village head

## 4. Grow

When used as a verb, "长" can mean "to grow" or "to increase in size/length/height". For example:
这棵树长得很快。 - This tree is growing very quickly.
他从小就一直在长高。 - He has been growing taller since he was young.

So in summary, the English translations of the Chinese character "长" can include "long", "tall", "chief/head", and "grow", depending on the specific context in which it is used.`;

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
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `${resolvedPrompt}
          
          Also the content is of the following language: ${resolveHumanLangs(resolvedLang)}`,
        },
        { role: "user", content: `content: ${content}` },
      ],
      model,
    });

    const resp = await chatCompletion?.choices?.[0]?.message?.content;

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
