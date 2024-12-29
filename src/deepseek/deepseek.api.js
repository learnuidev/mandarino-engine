const OpenAI = require("openai");

const deepSeekApiKey = "";

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

    return {
      date: new Date().toISOString(),
      latency,
      resp,
    };
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
  date: `03/12/2024 9:22PM`,
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

const deepSeekV3Resp = {
  latency: 9146.373998641968,
  date: `26/12/2024 9:04PM`,
  resp: `
Summary successfully generated for 这些成果充分体现了QwQ在分析和问题解决能力方面的显著进步，尤其是在需要深度推理的技术领域。!!!
RESP zhè xiē chéng guǒ chōng fèn tǐ xiàn le QwQ zài fēn xī hé wèn tí jiě jué néng lì fāng miàn de xiǎn zhù jìn bù，yóu qí shì zài xū yào shēn dù tuī lǐ de jì shù lǐng yù.

English: These achievements fully demonstrate QwQ's significant progress in analytical and problem-solving abilities, especially in technical fields that require deep reasoning.

## Explanation:
“这些（zhè xiē）” means these, referring to the achievements or results that are being discussed.
“成果（chéng guǒ）” means achievements or results, indicating the successful outcomes or accomplishments.
“充分（chōng fèn）” means fully or thoroughly, emphasizing the extent to which something is demonstrated or shown.
“体现了（tǐ xiàn le）” means to embody or demonstrate, showing that the achievements reflect or manifest certain qualities or abilities.
“QwQ” is a placeholder name, likely referring to a person, team, or entity whose progress is being discussed.
“在（zài）” means in or at, indicating the area or aspect being discussed.
“分析（fēn xī）” means analysis, referring to the ability to break down and understand complex information.
“和（hé）” means and, connecting two related concepts or abilities.
“问题解决能力（wèn tí jiě jué néng lì）” means problem-solving abilities, indicating the skills needed to address and resolve issues.
“方面（fāng miàn）” means aspect or area, specifying the domain in which progress has been made.
“的（de）” is a possessive or descriptive particle, linking the subject to its characteristics or achievements.
“显著进步（xiǎn zhù jìn bù）” means significant progress, highlighting notable improvement or development.
“尤其是（yóu qí shì）” means especially or particularly, emphasizing a specific area or aspect.
“在（zài）” again means in or at, indicating the specific field or domain.
“需要（xū yào）” means require, indicating what is necessary or demanded in a particular context.
“深度推理（shēn dù tuī lǐ）” means deep reasoning, referring to the ability to think critically and logically about complex issues.
“的（de）” again links the description to the noun it modifies.
“技术领域（jì shù lǐng yù）” means technical fields, indicating areas of expertise or study that involve specialized knowledge or skills.

Overall, this sentence highlights QwQ's notable improvement in analytical and problem-solving skills, particularly in technical areas that demand advanced reasoning abilities.
  
  
  `,
};

const deepSeekV3Test2 = {
  date: "2024-12-27T02:05:36.444Z",
  latency: 9386.05604171753,
  resp:
    "zhè xiē chéng guǒ chōng fèn tǐ xiàn le QwQ zài fēn xī hé wèn tí jiě jué néng lì fāng miàn de xiǎn zhù jìn bù，yóu qí shì zài xū yào shēn dù tuī lǐ de jì shù lǐng yù.  \n" +
    "English: These achievements fully demonstrate QwQ's significant progress in analytical and problem-solving abilities, especially in technical fields that require deep reasoning.  \n" +
    "\n" +
    "## Explanation:  \n" +
    "1. **这些成果 (zhè xiē chéng guǒ)**  \n" +
    '   - "这些 (zhè xiē)" means "these," referring to specific achievements or results.  \n' +
    '   - "成果 (chéng guǒ)" means "achievements" or "results," indicating the outcomes of efforts or work.  \n' +
    "\n" +
    "2. **充分体现了 (chōng fèn tǐ xiàn le)**  \n" +
    '   - "充分 (chōng fèn)" means "fully" or "thoroughly," emphasizing completeness.  \n' +
    '   - "体现 (tǐ xiàn)" means "demonstrate" or "reflect," indicating that something is clearly shown or manifested.  \n' +
    '   - "了 (le)" is a particle indicating the completion of an action.  \n' +
    "\n" +
    "3. **QwQ在分析和问题解决能力方面的显著进步 (QwQ zài fēn xī hé wèn tí jiě jué néng lì fāng miàn de xiǎn zhù jìn bù)**  \n" +
    '   - "QwQ" is the subject being discussed.  \n' +
    '   - "在...方面 (zài...fāng miàn)" means "in the aspect of" or "in terms of," specifying the area being discussed.  \n' +
    '   - "分析 (fēn xī)" means "analysis," referring to the ability to break down and understand complex information.  \n' +
    '   - "和 (hé)" means "and," connecting two related concepts.  \n' +
    '   - "问题解决能力 (wèn tí jiě jué néng lì)" means "problem-solving ability," the capacity to find solutions to challenges.  \n' +
    '   - "显著进步 (xiǎn zhù jìn bù)" means "significant progress," highlighting notable improvement in the mentioned areas.  \n' +
    "\n" +
    "4. **尤其是在需要深度推理的技术领域 (yóu qí shì zài xū yào shēn dù tuī lǐ de jì shù lǐng yù)**  \n" +
    '   - "尤其是 (yóu qí shì)" means "especially," emphasizing a particular aspect.  \n' +
    '   - "在...领域 (zài...lǐng yù)" means "in the field of," specifying the domain being discussed.  \n' +
    '   - "需要 (xū yào)" means "require," indicating a necessity.  \n' +
    '   - "深度推理 (shēn dù tuī lǐ)" means "deep reasoning," referring to advanced logical or analytical thinking.  \n' +
    '   - "技术 (jì shù)" means "technical," relating to specialized knowledge or skills.  \n' +
    "\n" +
    "Overall, this sentence highlights QwQ's notable improvement in analytical and problem-solving skills, particularly in technical areas that demand advanced reasoning.",
};
