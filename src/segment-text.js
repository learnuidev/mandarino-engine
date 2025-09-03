const { detectLanguage } = require("./detect-language");
const { segmentTextRaw } = require("./segment-text-raw");

async function segmentText({ text, lang, openai, model, granularity }) {
  let resolvedLang;
  if (lang) {
    console.log(`Lang provided: ${lang}`);
    resolvedLang = lang;
  } else {
    console.log(`Lang not found. Resolving now`);
    resolvedLang = await detectLanguage({
      content: text?.slice(0, 16),
      openai,
      model,
    });

    console.log(`Resolved lang: ${resolvedLang}`);
  }

  const resp = await segmentTextRaw({ text, lang: resolvedLang, granularity });

  return resp;
}

module.exports = {
  segmentText,
};
