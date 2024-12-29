const {
  ml,
  es,
  zh,
  universalTemplate,
} = require("./list-grammar-analysis.prompt");

const { resolveHumanLangs } = require("./langs");
const { detectLanguage } = require("./detect-language");
const { parseInput } = require("./utils/parse-input");

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

async function listSentences({ content, lang, openai, model }) {
  console.log(`Generating grammar for: ${content}`);

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
    model,
  });

  const resp = await parseInput(chatCompletion?.choices?.[0]?.message?.content);

  return resp;
}

async function listGrammarAnaysis({ content, lang, openai, model }) {
  try {
    const t0 = performance.now();

    const resolvedLang =
      lang ||
      (await detectLanguage({ content: content?.slice(0, 16), openai, model }));

    const sents = await listSentences({
      content,
      lang: resolvedLang,
      openai,
      model,
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
