const { segmentTextRaw } = require("./segment-text-raw");

async function segmentText({ text, lang, openai, model }) {
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

  const resp = await segmentTextRaw({ text, lang });
}

module.exports = {
  segmentText,
};
