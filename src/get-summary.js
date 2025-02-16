const { detectLanguage } = require("./detect-language");

// const { openaiEnv } = require("./open-api-key");
const { resolveHumanLangs } = require("./langs");
const { chat } = require("./utils/chat");

// const { currentModel } = require("./models");

const promptSimple = `
You are a language translation expert
For the given content, give a detailed translation in english and pinyin and detailed explanation.
Example Response
For 等他付完钱之后我过去拍, it should return:
**Explanation:**
The first part of the sentence (“等他付完钱之后 - After he finishes paying”) indicates a condition that needs to be met. 
The speaker is waiting for the other person to complete the act of paying. 
Once that condition is fulfilled, the speaker will take an action as described in the second part (“我过去拍 - I will go over and take a photo”). 
This could be a situation where someone is waiting for an opportune moment to take a photo after a certain event (in this case, the person finishing paying) has occurred.
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
You are an expert summarizer, given context, return its information in English.

--

For example for 长 (cháng), it should return:
The Chinese character "长" (cháng) has several translations in English, depending on the context:

## 1. Long
The most common translation of "长" (cháng) is "long" when referring to length or duration. For example:
这条河很长。 (zhè tiáo hé hěn cháng) - This river is very long.
这次旅行持续了很长时间。 (zhè cì lǚxíng chíxùle hěn cháng shíjiān) - This trip lasted a very long time.

## 2. Tall
"长" (cháng) can also mean "tall" when describing the height of a person or object. For example:
他很长。 (tā hěn cháng) - He is very tall.
这栋大楼很长。 (zhè dòng dàlóu hěn cháng) - This building is very tall.

## 3. Chief, Head
In certain contexts, "长" (cháng) can mean "chief" or "head" when referring to a leader or person in charge. For example:
公司的长官 (gōngsī de zhǎngguān) - The company's chief/head
村长 (cūnzhǎng) - The village head

## 4. Grow
When used as a verb, "长" (cháng) can mean "to grow" or "to increase in size/length/height". For example:
这棵树长得很快。 (zhè kē shù zhǎng dé hěn kuài) - This tree is growing very quickly.
他从小就一直在长高。 (tā cóng xiǎo jiù yīzhí zài zhǎng gāo) - He has been growing taller since he was young.
So in summary, the English translations of the Chinese character "长" (cháng) can include "long", "tall", "chief/head", and "grow", depending on the specific context in which it is used.`;
// const prompts = {
//   ml: "",
// };
const promptLatin = `

You are a latin language expert.

Please return the summary for the given word "fit" in {{language}}. Keep in mind this word is not a english or any other language but a word in the language: {{language}}.


For example: if the word is "fit" and the language is french/fr, then please return the following:

French Word: fit
Explanation:
Fit is the third-person singular past historic tense (passé simple) of the verb faire (to do/make) in French.

It is used in formal writing or literature to describe a completed action in the past.

It is not used in spoken French, where the passé composé (il a fait) replaces it.

Translation:

English: he/she/one did or he/she/one made

Example:

Il fit ses devoirs → He did his homework.

Elle fit un gâteau → She made a cake.

Pronunciation:

Phonetic: Pronounced like fee (IPA: /fi/).

The final -t is silent.

Context and Usage:

Formality: The passé simple is almost exclusively used in literary or historical contexts (novels, essays, formal reports).

Spoken French: Il a fait (he did/made).

Conjugation:

Je fis (I did) | Tu fis (You did) | Il/Elle/On fit (He/She/One did)

Nuance: Implies a singular, definitive action in the past, often with a sense of detachment or formality.

`;
const vsPrompt = `
You are an expert language teacher, given context, return its information in english.
---
For example for 煎 vs 炸, it should return:
For example:
Both 煎 (jiān) and 炸 (zhà) are generally translated as "fry," but they refer to different cooking methods:
## 煎 (jiān)
煎 typically means to pan-fry or shallow-fry. This method involves:
- Using a small amount of oil in a pan
- Cooking food on medium to high heat
- Often flipping the food to cook both sides
Common English terms for 煎 include:
- Pan-fry
- Sauté
- Shallow-fry
Examples of 煎 in cooking:
- Frying eggs (煎蛋)
- Cooking pancakes (煎饼)
- Sautéing vegetables
## 炸 (zhà)
炸 refers to deep-frying. This method involves:
- Submerging food completely in hot oil
- Cooking at a higher temperature than pan-frying
- Often resulting in a crispy exterior
Common English terms for 炸 include:
- Deep-fry
- Deep-fat fry
Examples of 炸 in cooking:
- Frying chicken (炸鸡)
- Making french fries (炸薯条)
- Preparing tempura
## Key Differences
- Oil quantity: 煎 uses less oil, while 炸 requires enough oil to submerge the food14.
- Temperature: 炸 typically involves higher cooking temperatures than 煎3.
- Texture: 炸 often results in a crispier texture due to the complete oil immersion5.
- Health considerations: 煎 is generally considered healthier than 炸 due to less oil absorption1.
In some contexts, 煎炸 (jiānzhá) is used as a combined term to refer to various frying methods, which can be translated as "frying" or "fried foods" in English48.
`;
// const prompts = {
//   ml: "",
// };

const prompts = {
  ro: promptLatin,
  es: promptLatin,
  it: promptLatin,
  fr: promptLatin,
  ["fr-FR"]: promptLatin,
  pt: promptLatin,
};

function isChinesePunctuationMark(content) {
  // List of common Chinese punctuation marks
  const chinesePunctuationMarks = [
    "，",
    "。",
    "、",
    "；",
    "：",
    "？",
    "！",
    "“",
    "”",
    "‘",
    "’",
    "（",
    "）",
    "《",
    "》",
    "【",
    "】",
    "『",
    "』",
    "〔",
    "〕",
    "—",
    "…",
    "～",
    "‧",
  ];

  // Check if the content is in the list of Chinese punctuation marks
  return chinesePunctuationMarks.includes(content);
}

const chinesePunctuationPrompt = `
Given a Chinese punctuation, please give intro, history and use case of the chinese punctuation:


For example for ，it should return:

Introduction to the Chinese Comma: ，
The Chinese comma, known as 逗号 (dòu hào), is a punctuation mark used in written Chinese to indicate a brief pause within a sentence. It is similar in function to the comma in English but has some unique rules and applications specific to Chinese grammar and sentence structure. The Chinese comma is represented by the symbol ，, which is distinct from the English comma (,).

History of the Chinese Comma
The use of punctuation in Chinese writing is relatively modern compared to its long literary history. Traditional Chinese texts were written without punctuation, and readers were expected to interpret pauses and sentence breaks based on context and classical grammar rules. This practice, known as 句读 (jù dòu), required a deep understanding of the language.

During the late 19th and early 20th centuries, as part of the New Culture Movement and efforts to modernize the Chinese language, Western-style punctuation was introduced. Scholars like Hu Shi and Chen Duxiu advocated for the adoption of punctuation marks to make written Chinese more accessible and easier to read. The comma, along with other punctuation marks, was formally standardized in the 20th century as part of the modernization of written Chinese.

Use Cases of the Chinese Comma
The Chinese comma is used in a variety of contexts to clarify meaning, separate clauses, and improve readability. Here are some common use cases:

Separating Items in a List:

Example: 我喜欢吃苹果，香蕉，和橘子。
(I like to eat apples, bananas, and oranges.)

Pausing Between Clauses:

The comma is often used to separate clauses within a sentence, especially in complex or compound sentences.

Example: 如果下雨，我们就不去公园了。
(If it rains, we won’t go to the park.)

Marking a Natural Pause:

The comma is used to indicate a pause in speech or to break up long sentences for better flow.

Example: 他来了，我们开始吧。
(He’s here, let’s start.)

Separating Subjects or Phrases:

When a sentence has multiple subjects or phrases, the comma is used to distinguish them.

Example: 昨天，我和朋友去了电影院。
(Yesterday, I went to the cinema with my friend.)

Before Conjunctions:

In Chinese, a comma is often used before conjunctions like 但是 (but), 因为 (because), or 所以 (so) to separate clauses.

Example: 我想去，但是没时间。
(I want to go, but I don’t have time.)

In Direct Address:

When addressing someone directly, a comma is used to separate the name or title from the rest of the sentence.

Example: 小明，你过来一下。
(Xiao Ming, come here for a moment.)

Differences Between the Chinese and English Comma
Shape: The Chinese comma (，) is a small dot with a tail that curves downward, while the English comma (,) is a simple curved line.

Usage: In Chinese, the comma is often used more liberally to indicate pauses, even where an English sentence might not require one. For example, Chinese frequently uses commas before conjunctions like 和 (and), whereas English typically does not.

Conclusion
The Chinese comma is an essential punctuation mark that plays a crucial role in clarifying meaning and improving readability in written Chinese. Its introduction during the modernization of the Chinese language reflects the broader cultural and linguistic shifts of the 20th century. Today, it is widely used in both formal and informal writing, adhering to specific rules that distinguish it from its English counterpart.
`;

const resolvePrompt = async ({ content, language }) => {
  if (isChinesePunctuationMark(content)) {
    return chinesePunctuationPrompt;
  }
  if (language === "zh") {
    // check if it is vs: i.e 煎 vs 炸
    const isVs = content.toLowerCase().split("vs")?.length === 2;
    if (isVs) {
      return vsPrompt;
    }
    return content?.length > 3 ? promptSimple : prompt;
    // return promptSimple;
  }

  const latinPrompt = prompts?.[language];

  if (latinPrompt) {
    return latinPrompt;
  }
  return promptSimple;
  // if (["es", "fr", "es-ES", "it-IT", "ro-RO", "fr-FR"]?.includes(language)) {
  //   return promptLatin;
  // }
  // return prompt;
};

async function getSummary({ content, lang, openai, model }) {
  const resolvedLang =
    lang || (await detectLanguage({ content, openai, model }));

  try {
    console.log(`Generating Summary for: ${content}`);

    const resolvedPrompt = await resolvePrompt({
      content,
      language: resolvedLang,
    });

    const finalPrompt = resolvedPrompt?.replaceAll(
      "{{language}}",
      resolvedLang
    );

    console.log("PROMPT", finalPrompt);
    const resp = await chat(
      {
        openai,
        model,
        messages: [
          {
            role: "system",
            content: `${finalPrompt}
        
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

    return {
      summary: resp,
      model,
    };
  } catch (err) {
    return "";
  }
}

// getSummary("字").then((meanings) => {
//   console.log("Summary", meanings);
// });

module.exports.getSummary = getSummary;
