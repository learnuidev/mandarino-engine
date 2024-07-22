const OpenAI = require("openai");

const { resolveHumanLangs } = require("./langs");

const prompt = `
You are a {{lang}} language expert. give me a conversation  sentences on {{topic}} - {{subtopic}}. please provide english and roman in json format


For example if the lang is zh, topic is travel and subtopic is booking a flight to hong kong then
Please use the following json format:

{
  title: "Celebrating Lunar New Year",
  topic: "culture",
  subtopic: "lunar new year",
  lang: "yue",
  conversation: [
    {
      "input": "新年快到了，你会怎么庆祝春节呢？",
      "en": "Lunar New Year is approaching, how do you usually celebrate Spring Festival?",
      "speaker": "Alice",
      "roman": "Xīnnián kuài dào le, nǐ huì zěnme qìngzhù chūnjié ne?"
    },

`;
async function _genConversation({ lang, topic, subtopic, apiKey }) {
  console.log(`Generating conversation for: ${topic} - ${subtopic}`);

  const openai = new OpenAI({
    apiKey,
  });

  const resolvedPrompt = prompt
    .replaceAll("{{lang}}", lang)
    .replaceAll("{{topic}}", topic)
    .replaceAll("{{subtopic}}", subtopic);

  const finalPrompt = `${resolvedPrompt}
        
  Also the content is of the following ISO language: ${resolveHumanLangs(lang)}`;

  console.log("FINAL PROMPT", finalPrompt);

  const chatCompletion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: finalPrompt,
      },
    ],
    model: "gpt-3.5-turbo",
  });

  const resp = await JSON.parse(chatCompletion?.choices?.[0]?.message?.content);

  console.log("RESP", resp);

  return resp;
}

async function genConversation({ lang, topic, subtopic, apiKey }) {
  console.log("genConversation/detecting language...");

  try {
    const t0 = performance.now();
    const sents = await _genConversation({
      lang,
      topic,
      subtopic,
      apiKey,
    });
    const t1 = performance.now();

    // console.log("SENTS", sents);

    console.log(`Call to genConversation took ${t1 - t0} milliseconds.`);

    // Avoiding Hallucination attempt #1
    return { ...sents, responseTime: t1 - t0 };
  } catch (err) {
    console.log("ERR", err);
    return [];
  }
}

module.exports.genConversation = genConversation;
