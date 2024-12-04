const OpenAI = require("openai");
const { models } = require("../data/models");

const deepSeekApiKey = ``;

const openai = new OpenAI({
  baseURL: "https://api.deepseek.com",
  apiKey: deepSeekApiKey,
});

const prompt = `
You are a language translation expert
For the given content, give a detailed translation in english and pinyin and detailed explanation.


Example Response
For 一个通过研究生级别问题评估高阶科学解题能力的评测集，旨在考察科学问题解决能力。, it should return:

yī gè tōng guò yán jiū shēng jí bié wèn tí píng gū gāo jiē kē xué jiě tí néng lì de píng cè jí，zhǐ zài kǎo chá kē xué wèn tí jiě jué néng lì.
English: An evaluation set that assesses high-level scientific problem-solving abilities through postgraduate-level questions, aiming to examine scientific problem-solving abilities.

## Explanation:
“一个（yī gè）” simply indicates a single item or entity, here referring to the specific evaluation set that will be described.
“通过（tōng guò）” means by means of or using a certain method or tool. In this context, it shows that the way to conduct the assessment is by using postgraduate-level questions.
“研究生级别（yán jiū shēng jí bié）” refers to the level or standard of questions that are typically associated with postgraduate studies. These questions are usually more complex, require deeper knowledge and higher-order thinking skills compared to undergraduate or lower-level questions.
“问题（wèn tí）” means questions, which are the elements used for the evaluation process.
“评估（píng gū）” means to evaluate or assess, indicating the action of determining the level or quality of something. Here it's about assessing the high-level scientific problem-solving abilities.
“高阶科学解题能力（gāo jiē kē xué jiě tí néng lì）” refers to the abilities related to solving scientific problems at a high level. This implies that the problems are not simple or basic ones but rather require advanced knowledge and skills in the scientific field.
“评测集（píng cè jí）” means an evaluation set or collection. It's a group of materials (in this case, questions) that are put together for the purpose of evaluation.
“旨在（zhǐ zài）” means aiming at or with the intention of. It clarifies the purpose of this evaluation set, which is to examine the scientific problem-solving abilities. Overall, this sentence describes an evaluation set that uses relatively difficult postgraduate-level questions to assess people's higher-level skills in solving scientific problems with the main goal of testing their overall scientific problem-solving abilities.
`;

async function getSummary({ content, lang }) {
  const t0 = performance.now();
  try {
    console.log(`Generating Summary for: ${content}`);

    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `${prompt}
            
            Also the content is of the following language: ${lang}`,
        },
        { role: "user", content: `content: ${content}` },
      ],
      model: "deepseek-chat",
    });

    const resp = await chatCompletion?.choices?.[0]?.message?.content;

    const t1 = performance.now();
    const latency = t1 - t0;

    console.log("LATENCY", latency);

    console.log(`Summary successfully generated for ${content}!!!`);

    return resp;
  } catch (err) {
    console.log("ERR", err);
    return "";
  }
}

getSummary({
  content:
    "这些成果充分体现了QwQ在分析和问题解决能力方面的显著进步，尤其是在需要深度推理的技术领域。",
  lang: "zh",
}).then((resp) => {
  console.log("RESP", resp);
});

const deepSeekResp = {
  latency: 27429.87212562561,
  resp: `
zhè xiē chéng guǒ chōng fēn tǐ xiàn le QwQ zài fēn xī hé wèn tí jiě jué néng lì fāng miàn de xiǎn zhù jìn bù，yóu qí shì zài xū yào shēn dù tuī lǐ de jì shù lǐng yù。
English: These achievements fully demonstrate QwQ's significant progress in analytical and problem-solving abilities, especially in technical fields that require deep reasoning.

## Explanation:
“这些成果（zhè xiē chéng guǒ）” refers to the specific achievements or results mentioned, indicating that the following description is about the accomplishments of QwQ.
“充分（chōng fēn）” means fully or sufficiently, emphasizing that the following description is comprehensive and thorough.
“体现了（tǐ xiàn le）” means to demonstrate or reflect, indicating that the achievements show or reveal something.
“QwQ” is a placeholder for a specific entity or individual, likely a person or a team, whose progress is being discussed.
“在分析和问题解决能力方面（zài fēn xī hé wèn tí jiě jué néng lì fāng miàn）” refers to the areas of analytical and problem-solving abilities. This phrase specifies the particular skills that have shown progress.
“的显著进步（de xiǎn zhù jìn bù）” means significant progress, highlighting the substantial improvement in the mentioned abilities.
“尤其是（yóu qí shì）” means especially or particularly, indicating that the following part of the sentence is a more specific or emphasized point.
“在需要深度推理的技术领域（zài xū yào shēn dù tuī lǐ de jì shù lǐng yù）” refers to technical fields that require deep reasoning. This phrase specifies the context in which the progress is most notable, emphasizing the complexity and depth of the reasoning involved.

Overall, this sentence describes the comprehensive and significant progress made by QwQ in their analytical and problem-solving abilities, with a particular emphasis on their advancements in technical fields that demand deep reasoning.`,
};

const openAiResp = {
  latency: `11100.824000358582`,
  resp: `

zhè xiē chéng guǒ shùn fēn tǐ xiàn le QwQ zài fèn xī hé wèn tí jiě jué néng lì fāng miàn de xiǎn zhù jìn bù，yóu qí shì zài xū yào shēn dù tuī lǐng de jì shù lǐng yù.

English: These results fully reflect QwQ's significant progress in analytical and problem-solving abilities, especially in technical fields that require deep reasoning.

## Explanation:
“这些（zhè xiē）” means "these," referring to the results that have been previously mentioned or presented.
“成果（chéng guǒ）” translates to "results" or "achievements," indicating the outcomes obtained from certain processes or efforts.
“充分（shùn fēn）” means "fully" or "adequately," emphasizing the extent to which the results demonstrate progress.
“体现（tǐ xiàn）” means "to reflect" or "to embody," indicating that the results show or reveal something about QwQ's capabilities.
“QwQ” is likely a proper noun referring to a specific entity, organization, or individual.
“在（zài）” means "in" or "at," indicating the context in which the reflection or demonstration occurs.
“分析（fèn xī）” translates to “analytical” or "analysis," referring to the capability related to breaking down complex information or problems.
“和（hé）” means "and," connecting the two areas of abilities being discussed.
“问题解决能力（wèn tí jiě jué néng lì）” refers to "problem-solving abilities," emphasizing skill in addressing and resolving issues or challenges.
“方面（fāng miàn）” translates to "aspects" or "domains," indicating the areas in which QwQ has made progress.
“显著（xiǎn zhù）” means "significant" or "remarkable," emphasizing the level of progress achieved.
“进步（jìn bù）” means "progress" or "advancement," indicating improvement over time.
“尤其（yóu qí）” translates to "especially," highlighting that the mentioned area is of particular importance.
“在（zài）” again means "in," indicating the specific context that follows.
“需要（xū yào）” means "require" or "need," indicating what is necessary in the mentioned fields.
“深度（shēn dù）” translates to "deep," referring to the level of reasoning or thought involved.
“推理（tuī lǐ）” means "reasoning," indicating the cognitive process needed to make inferences or deductions.
“的（de）” is a structural particle that signifies possession or attribution.
“技术领域（jì shù lǐng yù）” translates to "technical fields," referring to specialized areas of knowledge or expertise.

Overall, the sentence conveys that the achievements of QwQ illustrate a notable improvement in both analytical and problem-solving skills, with a special emphasis on their ability to reason deeply in technical disciplines.`,
};
