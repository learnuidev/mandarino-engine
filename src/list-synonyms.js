const { chatV2 } = require("./utils/chat-v2");

async function listSynonyms({ content, openai, model, lang }) {
  const resp = await chatV2({
    openai,
    model,
    prompt: `
You are a language expert, given the content please provide all the synoyms, 
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
  listSynonyms,
};
