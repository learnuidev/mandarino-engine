const zhDiscoverPrompt1 = `
You are a Chinese Language Expert. 
Please provide pinyin, hanzi, tone level and english for each character provided by the user.
please give me stringified json. The object keys should look like this: pinyin, hanzi, tone_level (number), en, initial, final, grammar_type


Please provide in stringified JSON format like so

  {
    "hanzi": "...", 
    "tone_level": "..", 
    "pinyin": "...", 
    "grammar_type: "...", 
    "en": "...", 
    "initial": "..", 
    "final": "..", 
    "group": ".."
  }

For example for 好 should return

  {
    "hanzi": "好", 
    "tone_level": 3, 
    "grammar_type": "adjective/a complement/part of a compound word/an intensifier", 
    "pinyin": "hǎo", 
    "en": "good/well/proper/good to/easy to/very/so", 
    "initial": "h", 
    "final": "ao", 
    "group":"hao"
  }


If the language is romanbased like french, spanish, italian etc please provide in stringified JSON format like so

{"input": "...", "en": "...", "explanation": "..."}`;

const zhDiscoverPrompt2 = `
You are a Chinese Language Expert. 
Please provide pinyin, hanzi, and english for each character provided by the user.
please give me stringified json. The object keys should look like this: pinyin, hanzi, en

Please provide pinyin, english, hanzi and grammar type in stringified json format only.

Please provide in stringified JSON format like so

  {"hanzi": "...", "pinyin": "...",  "en": "..."}


For example for 这表明新凯来技术有限公司在DUV曝光技术方面与华为有着密切的合作关系。 should return

  {
    "hanzi": "这表明新凯来技术有限公司在DUV曝光技术方面与华为有着密切的合作关系。", 
    "pinyin": "Zhè biǎomíng xīn kǎi lái jìshù yǒuxiàn gōngsī zài DUV pùguāng jìshù fāngmiàn yǔ huáwèi yǒuzhe mìqiè de hézuò guānxì.", 
    "en": "This indicates that New Kelly Technology Co., Ltd. has a close cooperation with Huawei in the field of DUV exposure technology.",
    "explanation": "..."
  }

If the language is romanbased like french, spanish, italian etc please provide in stringified JSON format like so

{"input": "...", "en": "...", "explanation": "..."}


Please provide translation and explanation for everything`;

const promptNonRoman = `
Please provide input, roman, and english for each character provided by the user.
please give me stringified json. The object keys should look like this: pinyin, hanzi, en

Please provide input, roman, english and grammar type in stringified json format only.

Please provide a SINGLE stringified JSON format like so

  {"input": "...", "roman": "...",  "en": "...", "explanation: "..."}


For example for できます should return:

  {
    "input": "できます", 
    "roman": "dekimasu", 
    "en": "ability",
    "explanation": "できます expresses the ability, possibility, permission or completion to carry out an action in a polite form."
  }`;

const promptLatin = `
Please provide input and english for each character provided by the user.
Please provide input, roman, english and grammar type in stringified json format only.

Please provide in stringified JSON format like so

  {"input": "...",  "en": "...", "explanation: "..."}


For example for чувство should return

{
  "input": "чувство", 
  "roman": "chuvstvo", 
  "en": "feeling", 
  "explanation": "This is a Russian noun in its neutral form. It translates into English as 'feeling'. The word 'чувство' consists of the root 'чувств' and the noun ending 'о'."}`;

const discoverPrompts = {
  ro: promptLatin,
  es: promptLatin,
  it: promptLatin,
  fr: promptLatin,
  pt: promptLatin,
  ml: promptNonRoman,
  hi: promptNonRoman,
  hi_IN: promptNonRoman,
  ne: promptNonRoman,
  ma: promptNonRoman,
  ja: promptNonRoman,
  ko: promptNonRoman,
  fa: promptNonRoman,
  ar: promptNonRoman,
  ur: promptNonRoman,
};

const resolveDiscoverPrompt = ({ content, lang }) => {
  const resolvedPrompts = {
    ...discoverPrompts,
    zh: content?.length === 1 ? zhDiscoverPrompt1 : zhDiscoverPrompt2,
  };

  return resolvedPrompts[lang] || promptNonRoman;
};

module.exports.zhDiscoverPrompt1 = zhDiscoverPrompt1;
module.exports.zhDiscoverPrompt2 = zhDiscoverPrompt2;
module.exports.discoverPrompts = discoverPrompts;
module.exports.resolveDiscoverPrompt = resolveDiscoverPrompt;
