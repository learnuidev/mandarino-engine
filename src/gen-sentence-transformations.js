const { detectLanguage } = require("./detect-language");
const { resolveHumanLangs } = require("./langs");
const { parseInput } = require("./utils/parse-input");

const promptZhNewFormat = `
You are a language expert and tutor. The main method you MUST use is 句子变换 (sentence transformation). This means you should take one base sentence in Chinese, then create transformations of that sentence by changing elements such as time, location, subject, AND object. Do NOT just give random sentences. The goal is to show how a single sentence can expand into many variations, building flexibility and grammar awareness. Each sentence you create should be at least 5 characters long, natural, and simple enough for learners.

Please generate 6 transformed sentences based on this method. Provide the output in the following format:

Please provide in stringified JSON format like so:

[
  {"input": "我昨天在图书馆看书。", "roman": "Wǒ zuótiān zài túshūguǎn kàn shū.", "en": "I read books at the library yesterday.", "explanation": "Base sentence: 昨天 means 'yesterday', 图书馆 is 'library', 看书 means 'read books'."},
  {"input": "我明天要在图书馆看书。", "roman": "Wǒ míngtiān yào zài túshūguǎn kàn shū.", "en": "I will read at the library tomorrow.", "explanation": "Transformation: Changed time from 昨天 (yesterday) to 明天 (tomorrow)."},
  {"input": "我昨天在咖啡馆看书。", "roman": "Wǒ zuótiān zài kāfēiguǎn kàn shū.", "en": "I read books at the café yesterday.", "explanation": "Transformation: Changed place from 图书馆 (library) to 咖啡馆 (café)."}
]

📌 Important: Always emphasize 句子变换. Start with a base sentence, then make variations that change time, place, subject, AND object. Show how one fact can generate multiple examples for active SRS learning.
`;

const promptLatinNewFormat = `
You are a language expert and tutor. The main method you MUST use is sentence transformation. This means you should take one base sentence in the {{language}} language, then create transformations of that sentence by changing elements such as time, location, subject, AND object. Do NOT just give random sentences. The goal is to show how a single sentence can expand into many variations, building flexibility and grammar awareness. Each sentence you create should be at least 5 characters long, natural, and simple enough for learners.

Please generate 6 transformed sentences based on this method. Provide the output in the following format:

Please provide in stringified JSON format like so:

[
  {"input": "Hola, ¿cómo estás?", "en": "Hello, how are you?", "explanation": "Base sentence: 'Hola' means 'hello' and '¿cómo estás?' means 'how are you?'."},
  {"input": "Hola, ¿cómo estuviste ayer?", "en": "Hello, how were you yesterday?", "explanation": "Transformation: Changed time to 'ayer' (yesterday)."},
  {"input": "Hola amigos, ¿cómo están?", "en": "Hello friends, how are you all?", "explanation": "Transformation: Changed subject from singular to plural."}
]

📌 Important: Always emphasize sentence transformation. Start with a base sentence, then make variations that change time, place, subject, AND object. Show how one fact can generate multiple examples for active SRS learning.
`;

const promptMalayNewFormat = `
You are a language expert and tutor. The main method you MUST use is sentence transformation. This means you should take one base sentence in the Malay language, then create transformations of that sentence by changing elements such as time, location, subject, AND object. Do NOT just give random sentences. The goal is to show how a single sentence can expand into many variations, building flexibility and grammar awareness. Each sentence you create should be at least 5 characters long, natural, and simple enough for learners.

Please generate 6 transformed sentences based on this method. Provide the output in the following format:

Please provide in stringified JSON format like so:

[
  {"input": "Saya suka makan nasi.", "roman": "Saya suka makan nasi.", "en": "I like to eat rice.", "explanation": "Base sentence: 'Saya' means 'I', 'suka' means 'like', 'makan nasi' means 'eat rice'."},
  {"input": "Saya suka makan nasi pada pagi hari.", "roman": "Saya suka makan nasi pada pagi hari.", "en": "I like to eat rice in the morning.", "explanation": "Transformation: Added time phrase 'pada pagi hari' (in the morning)."},
  {"input": "Dia suka makan nasi.", "roman": "Dia suka makan nasi.", "en": "He/She likes to eat rice.", "explanation": "Transformation: Changed subject from 'Saya' (I) to 'Dia' (he/she)."}
]

📌 Important: Always emphasize sentence transformation. Start with a base sentence, then make variations that change time, place, subject, AND object. Show how one fact can generate multiple examples for active SRS learning.
`;

const promptNonRomanNewFormat = `
You are a language expert and tutor. The main method you MUST use is sentence transformation. This means you should take one base sentence in the {{language}} language, then create transformations of that sentence by changing elements such as time, location, subject, AND object. Do NOT just give random sentences. The goal is to show how a single sentence can expand into many variations, building flexibility and grammar awareness. Each sentence you create should be at least 5 characters long, natural, and simple enough for learners.

Please generate 6 transformed sentences based on this method. Provide the output in the following format:

Please provide in stringified JSON format like so:

[
  {"input": "खाना स्वादिष्ट छ।", "roman": "khaana swaadisht chha.", "en": "The food is delicious.", "explanation": "Base sentence: 'खाना' means 'food', 'स्वादिष्ट' means 'delicious'."},
  {"input": "खाना आज स्वादिष्ट छ।", "roman": "khaana aaj swaadisht chha.", "en": "The food is delicious today.", "explanation": "Transformation: Added time 'आज' (today)."},
  {"input": "त्यो खाना स्वादिष्ट छ।", "roman": "tyo khaana swaadisht chha.", "en": "That food is delicious.", "explanation": "Transformation: Changed subject to 'त्यो' (that)."}
]

📌 Important: Always emphasize sentence transformation. Start with a base sentence, then make variations that change time, place, subject, AND object. Show how one fact can generate multiple examples for active SRS learning.
`;

const promptsNewFormat = {
  zh: promptZhNewFormat,
  ro: promptLatinNewFormat,
  es: promptLatinNewFormat,
  it: promptLatinNewFormat,
  fr: promptLatinNewFormat,
  ["fr-FR"]: promptLatinNewFormat,
  pt: promptLatinNewFormat,
  ml: promptMalayNewFormat,
  ja: promptNonRomanNewFormat,
  ko: promptNonRomanNewFormat,
  fa: promptNonRomanNewFormat,
  ar: promptNonRomanNewFormat,
  ur: promptNonRomanNewFormat,
  hi_IN: promptNonRomanNewFormat,
  hi: promptNonRomanNewFormat,
  ne: promptNonRomanNewFormat,
  nepali: promptNonRomanNewFormat,
};

const vsPromptNewFormat = `
You are a language expert and tutor. Use 句子变换 (sentence transformation) as your main method. Take one base sentence for each of the two words or characters being compared, then create 3 variations for each by changing time, place, subject, AND object. Each sentence should be at least 5 characters long, natural, and simple enough for learners.

Please provide output in stringified JSON format like so:

[
  {"input": "我昨天煎了鱼。", "roman": "Wǒ zuótiān jiānle yú.", "en": "I pan-fried fish yesterday.", "explanation": "Base sentence for 煎: '昨天' means 'yesterday', '煎' means 'pan-fry'."},
  {"input": "我今天煎鸡蛋。", "roman": "Wǒ jīntiān jiān jīdàn.", "en": "I fry eggs today.", "explanation": "Transformation for 煎: Changed subject and object."},
  {"input": "他喜欢煎牛排。", "roman": "Tā xǐhuān jiān niúpái.", "en": "He likes to pan-fry steak.", "explanation": "Transformation for 煎: Changed subject and object."},

  {"input": "我昨天炸了鸡翅。", "roman": "Wǒ zuótiān zhàle jīchì.", "en": "I deep-fried chicken wings yesterday.", "explanation": "Base sentence for 炸: '昨天' means 'yesterday', '炸' means 'deep-fry'."},
  {"input": "她喜欢炸薯条。", "roman": "Tā xǐhuān zhà shǔtiáo.", "en": "She likes to deep-fry fries.", "explanation": "Transformation for 炸: Changed subject and object."},
  {"input": "我们今天炸鱼。", "roman": "Wǒmen jīntiān zhà yú.", "en": "We deep-fry fish today.", "explanation": "Transformation for 炸: Changed subject and time."}
]

📌 Important: Start with base sentences for each character, then make variations changing time, place, subject, AND object for active SRS learning.
`;

async function _genSentenceTransformations({ content, lang, openai, model }) {
  const isVs = content?.toLowerCase().split("vs")?.length === 2;

  const resolvedPrompt = isVs
    ? vsPromptNewFormat
    : promptsNewFormat[lang] || promptNonRomanNewFormat;

  const humanLang = resolveHumanLangs(lang);

  const finalPrompt = `${resolvedPrompt}

  
  
        
  Also the content: '${content}' is in the language: ${humanLang}. Please keep that in mind`?.replaceAll(
    `{{language}}`,
    humanLang
  );

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

async function genSentenceTransformations({ content, lang, openai, model }) {
  let resolvedLang;
  if (lang) {
    console.log(`Lang provided: ${lang}`);
    resolvedLang = lang;
  } else {
    console.log(`Lang not found. Resolving now`);
    resolvedLang = await detectLanguage({
      content: content?.slice(0, 16),
      openai,
      model,
    });

    console.log(`Resolved lang: ${resolvedLang}`);
  }

  try {
    const t0 = performance.now();
    const sents = await _genSentenceTransformations({
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
  genSentenceTransformations,
};
