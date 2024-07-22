const OpenAI = require("openai");
const {
  ml,
  es,
  zh,
  universalTemplate,
} = require("./list-grammar-analysis.prompt");

const { resolveHumanLangs } = require("./langs");
const { detectLanguage } = require("./detect-language");

function determineAnalysisPrompt({ lang }) {
  switch (lang) {
    case "zh":
      return zh;
    case "ml":
      return ml;
    case "ne":
      return ml;
    case "nepali":
      return ml;
    case "hi":
      return ml;
    case "es":
    case "fr":
    case "it":
      return es;
    case "hi_IN":
      return ml;

    default: {
      const prompt = universalTemplate.replace("{{lang}}", lang);
      return prompt;
    }
  }
}

async function listSentences({ content, lang, apiKey }) {
  console.log(`Generating grammar for: ${content}`);

  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const prompt = determineAnalysisPrompt({ lang });
  console.log("list-grammar-analysis/lang", lang);

  console.log("PROMPT", prompt);
  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: `${prompt}
          
        Also the content is of the following language: ${resolveHumanLangs(lang)}`,
      },
      { role: "user", content: `content: ${content}` },
    ],
    model: "gpt-3.5-turbo",
  });

  const resp = await JSON.parse(chatCompletion?.choices?.[0]?.message?.content);

  return resp;
}

async function listGrammarAnaysis({ content, lang, apiKey }) {
  try {
    const t0 = performance.now();

    const resolvedLang =
      lang ||
      (await detectLanguage({ content: content?.slice(0, 16), apiKey }));

    const sents = await listSentences({
      content,
      lang: resolvedLang,
      apiKey,
    });

    console.log("SENTS", sents);

    const t1 = performance.now();

    console.log(`Call to listGrammarAnalysis took ${t1 - t0} milliseconds.`);

    return sents;
  } catch (err) {
    return [];
  }
}

module.exports.listGrammarAnaysis = listGrammarAnaysis;
