const { resolveHumanLangs } = require("./langs");
const { detectLanguage } = require("./detect-language");
const { parseInput } = require("./utils/parse-input");

const promptLatin = `
You are a {{language}} language expert, given the {{language}} content and the language, please generate 5 simple and complete sentences examples using the content. Sentences should be atleast 5 characters in length.

Please keep in mind: this is not a english word, but word is in the following language: {{language}}

Please return a stringified JSON response. 

For example if the language latin like spanish, italian or portugese based:
como estas should return:

[
  {"input": "¡Hola! ¿Cómo estás?", "en": "Hello! How are you?", "explanation": "In this sentence, '¡Hola!' is a greeting that means 'Hello!' and '¿Cómo estás?' is a familiar way to ask 'How are you?' in Spanish."},
  {"input": "¡Buenos días! ¿Cómo estás hoy?", "en": "Good morning! How are you today?", "explanation": "'¡Buenos días!' means 'Good morning!' and '¿Cómo estás hoy?' is asking 'How are you today?'." },

  {"input": "¿Cómo estás esta tarde, amigo?", "en": "How are you this afternoon, friend?", "explanation": "In this sentence, '¿Cómo estás esta tarde, amigo?' is asking 'How are you this afternoon, friend?'."},
  
  {"input": "Mamá, ¿cómo estás?", "en": "Mom, how are you?", "explanation": "'Mamá, ¿cómo estás?' means 'Mom, how are you?' in English."},
  
  {"input": "Después de mucho tiempo, ¿cómo estás?", "en": "After a long time, how are you?", "explanation": "'Después de mucho tiempo, ¿cómo estás?' translates to 'After a long time, how are you?' in English."}
]`;

const promptMalay = `
You are a language expert, given the content, please generate 5 simple and complete sentences examples using the content. Sentences should be atleast 5 characters in length

Please provide input, roman and english for the sentence as well as detailed explanation for the sentence

Please provide in stringified JSON format like so

For example if the language is a Dravidian:
പ should return:
[
  {"input": "പൂക്കൾ പച്ചപ്പാണ്.", "en": "Flowers are green.", "roman": "pookkal pachappaanu.", "explanation": "..."},
  {"input": "പാവം പട്ടിണിയാണ്.", "en": "...", "roman": "...", "explanation": "..."}
] `;

const promptZh = `
You are a language expert, given the content, please generate 5 simple and complete sentences examples using the content. Sentences should be atleast 5 characters in length
If the language is chinese, please provide hanzi, pinyin and english for the sentence as well as detailed explanation for the sentence
Note: for hanzi, please use simplified chinese instead of traditional chinese
Please provide in stringified JSON format like so:
[{"hanzi": "...", "pinyin": "...", "en": "...", "explanation": "..."}


For example:
们 should return:

[
  {"lang": "zh", "hanzi": "我们是朋友。", "pinyin": "Wǒmen shì péngyou.", "en": "We are friends.", "explanation": "In this sentence, 我们 means 'we' and 朋友 means 'friends'. Combined, 我们是朋友 means 'we are friends'."},
  {"lang": "zh", "hanzi": "他们正在吃饭。", "pinyin": "Tāmen zhèngzài chīfàn.", "en": "They are eating a meal.", "explanation": "Here, 他们 means 'they' and 吃饭 means 'eating'. Combined, 他们正在吃饭 means 'They are eating a meal'."},

  {"lang": "zh", "hanzi": "你们很棒！", "pinyin": "Nǐmen hěn bàng!", "en": "You guys are great!", "explanation": "In this sentence, 你们 means 'you (plural)' and 很棒 means 'great'. Combined, 你们很棒 means 'You guys are great'."},
  
  {"lang": "zh", "hanzi": "她们喜欢阅读。", "pinyin": "Tāmen xǐhuān yuèdú.", "en": "They (females) like to read.", "explanation": "Here, 她们 means 'they (for females)' and 喜欢阅读 means 'like to read'. Combined, 她们喜欢阅读 means 'They (females) like to read'."},
  
  {"lang": "zh", "hanzi": "你们去哪里?", "pinyin": "Nǐmen qù nǎlǐ?", "en": "Where are you guys going?", "explanation": "In this sentence, 你们 means 'you (plural)' and 去哪里 means 'going where'. Combined, 你们去哪里 means 'where are you guys going'."}
]
  
  `;

const promptNonRoman = `

Given the content, please generate 5 simple and complete sentences examples using the content. Sentences should be atleast 5 characters in length

Please provide input, roman and english for the sentence as well as detailed explanation for the sentence

Please provide in stringified JSON format like so

For example if the language is a Nepali:
ख should return sententes beginning with ख:

[
  {
    input: 'खजुर खानु राम्रो छ.',
    en: 'Eating dates is good.',
    roman: 'khajur khanu ramro chha.',
    explanation: 'This sentence talks about the action of eating dates being beneficial.'
}
...]


`;

const prompts = {
  zh: promptZh,
  ro: promptLatin,
  es: promptLatin,
  it: promptLatin,
  fr: promptLatin,
  ["fr-FR"]: promptLatin,
  pt: promptLatin,
  ml: promptMalay,
  ja: promptNonRoman,
  ko: promptNonRoman,
  fa: promptNonRoman,
  ar: promptNonRoman,
  ur: promptNonRoman,
  // Hindi
  hi_IN: promptNonRoman,
  hi: promptNonRoman,
  // Nepali
  ne: promptNonRoman,
  nepali: promptNonRoman,
};

const vsPrompt = `

You are a language expert, given the content, please generate 6 simple and complete sentences examples using the content. Sentences should be atleast 5 characters in length

For example if the language latin like spanish, italian or portugese based:
For example: 煎 vs 炸, should

Generate 3 sentences for 煎 and 3 sentences for 炸

Please provide in stringified JSON format like so:
[
  {"hanzi": "我们是朋友。", "pinyin": "Wǒmen shì péngyou.", "en": "We are friends.", "explanation": "In this sentence, 我们 means 'we' and 朋友 means 'friends'. Combined, 我们是朋友 means 'we are friends'."},
  {"hanzi": "他们正在吃饭。", "pinyin": "Tāmen zhèngzài chīfàn.", "en": "They are eating a meal.", "explanation": "Here, 他们 means 'they' and 吃饭 means 'eating'. Combined, 他们正在吃饭 means 'They are eating a meal'."},

  {"hanzi": "你们很棒！", "pinyin": "Nǐmen hěn bàng!", "en": "You guys are great!", "explanation": "In this sentence, 你们 means 'you (plural)' and 很棒 means 'great'. Combined, 你们很棒 means 'You guys are great'."},
  
  {"hanzi": "她们喜欢阅读。", "pinyin": "Tāmen xǐhuān yuèdú.", "en": "They (females) like to read.", "explanation": "Here, 她们 means 'they (for females)' and 喜欢阅读 means 'like to read'. Combined, 她们喜欢阅读 means 'They (females) like to read'."},
  
  {"hanzi": "你们去哪里?", "pinyin": "Nǐmen qù nǎlǐ?", "en": "Where are you guys going?", "explanation": "In this sentence, 你们 means 'you (plural)' and 去哪里 means 'going where'. Combined, 你们去哪里 means 'where are you guys going'."}
]

`;

async function _genSentences({ content, lang, openai, model }) {
  const isVs = content?.toLowerCase().split("vs")?.length === 2;

  const resolvedPrompt = isVs ? vsPrompt : prompts[lang] || promptNonRoman;

  const humanLang = resolveHumanLangs(lang);

  const finalPrompt = `${resolvedPrompt}
  
        
  Also the content: '${content}' is in the language: ${humanLang}. Please keep that in mind`?.replaceAll(
    `{{language}}`,
    humanLang
  );

  console.log("PROMPT", finalPrompt);

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: finalPrompt,
      },
      {
        role: "user",
        content: `content: ${content}`,
      },
    ],
    model: model,
  });

  const respContent = chatCompletion?.choices?.[0]?.message?.content;
  const resp = await parseInput(respContent);

  return resp?.map((sentence) => {
    return {
      ...sentence,
      lang,
      component: content,
      model: model,
    };
  });
}

async function genSentences({ content, lang, openai, model }) {
  const resolvedLang = lang
    ? lang
    : await detectLanguage({ content: content?.slice(0, 16), openai, model });

  try {
    const t0 = performance.now();
    const sents = await _genSentences({
      content: content.toLowerCase(),
      lang: resolvedLang,
      openai,
      model,
    });
    const t1 = performance.now();

    console.log(`Call to genSentences took ${t1 - t0} milliseconds.`);

    return sents;
  } catch (err) {
    console.log("ERROR", err);
    return [];
  }
}

module.exports = {
  genSentences,
};
