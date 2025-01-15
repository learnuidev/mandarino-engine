const { chatV2 } = require("./utils/chat-v2");

async function generateSynonymSentences({ content, openai, model, lang }) {
  const resp = await chatV2({
    openai,
    model,
    prompt: `
You are a language expert, given the content, please generate 6 sentences that conveys the same meaning, 
the input for each sentences should be different than the content while preserving the original meaning


Please provide in stringified JSON format like so:
[
  {"input": "", "roman": "...", "en": "...", "..."}]
    
    `,
    content,
  });

  return resp.map((item) => {
    return {
      ...item,
      lang,
    };
  });
}

module.exports = {
  generateSynonymSentences,
};
