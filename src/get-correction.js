const { chatV2 } = require("./utils/chat-v2");

async function getCorrection({
  content,
  openai,
  model,
  targetLang,
  sourceLang,
}) {
  const resp = await chatV2({
    openai,
    model,
    prompt: `
You are a language expert, given the content please provide corrections in ${targetLang}

Please provide in stringified JSON format like so:
{"corrected": "", "details": [...] }

For example for source lang of en and target lang of es, or zh for: So today was a great day. voy al cine con mi esposa et mi nina victoria.

if should return
{"correction": "Hoy fue un gran día. Voy al cine con mi esposa y mi niña Victoria.",
 "details": [{
   "original": "So today was a great day.",
   "correction": "Hoy fue un gran día."
 },

 {
   "original": "So today was a great day.",
   "correction": "Hoy fue un gran día."


 },

 {
 "original": "voy",
 "correction": "Voy"
 },
 {
 "original": "nina victoria",
 "correction": "niña Victoria"
 
 }
 
 ]
}
`,
    content,
  });

  return {
    content,
    ...resp,

    details: resp?.details?.map((detail) => {
      const startIndex = content?.indexOf(detail?.original);

      return {
        ...detail,
        startIndex: content?.indexOf(detail?.original),
        endIndex: startIndex + detail?.original?.length,
      };
    }),
    sourceLang,
    targetLang,
  };
}

module.exports = {
  getCorrection,
};
