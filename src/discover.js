// An endpoints that checks if the character exisits or not
// if it does - then adds pinyin and english, pinyin level, initial and final to the component and saves it
// if it does not then creates a new component and adds pinyin, english, initial, final and group
const OpenAI = require("openai");

const { detectLanguage } = require("./detect-language");
const { resolveDiscoverPrompt } = require("./discover.prompts");
const { removeNull } = require("./utils/remove-null");
const { models } = require("./data/models");
const z = require("zod").z;

const discoverSchema = z.object({
  content: z.string(),
  lang: z.string().nullable().optional(),
  apiKey: z.string(),
});

const discover = async ({ content, lang, apiKey }) => {
  const openai = new OpenAI({
    apiKey: apiKey,
  });
  const t0 = performance.now();

  try {
    discoverSchema.parse({ content, lang, apiKey });
  } catch (err) {
    // console.log("ERR", err);
    return {
      error: true,
      message: err.issues
        ?.map((issue) => `${issue?.path?.[0]}: ${issue?.message}`)
        ?.join(". "),
      issues: err.issues,
    };
  }

  try {
    const resolvedLang = lang || (await detectLanguage({ content, apiKey }));

    const prompt = resolveDiscoverPrompt({ content, lang: resolvedLang });

    // console.log("---prompt---", prompt);
    const chatCompletion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: `${prompt}
        
        Also the content is of the following language: ${lang}`,
        },
        { role: "user", content: `content: ${content}` },
      ],
      model: models.mini4o,
    });

    const resp = await chatCompletion?.choices?.[0]?.message?.content;

    const t1 = performance.now();

    console.log(`Call to doSomething took ${t1 - t0} milliseconds.`);

    // eslint-disable-next-line no-useless-catch
    try {
      const item = JSON.parse(resp);

      return removeNull({
        ...item,
        // nmmIndex: nmmComponents[content],
        lang: resolvedLang,
        group: (item?.initial || "") + (item?.final || ""),
        discovered_at: Date.now(),
      });
    } catch (err) {
      throw err;
      // return removeNull({
      //   raw: resp,
      // });
    }
  } catch (err) {
    return {
      error: true,
      message: err.message,
    };
    // throw err.message;
  }
};

// Test 1
discover({
  content:
    "这表明新凯来技术有限公司在DUV曝光技术方面与华为有着密切的合作关系。",
  lang: "zh",
  apiKey:
    "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",
}).then((resp) => {
  console.log("RESP", resp);
});
// RESP {
//   hanzi: '这表明新凯来技术有限公司在DUV曝光技术方面与华为有着密切的合作关系。',
//   pinyin: 'Zhè biǎomíng xīn kǎi lái jìshù yǒuxiàn gōngsī zài DUV pùguāng jìshù fāngmiàn yǔ huáwèi yǒuzhe mìqiè de hézuò guānxì.',
//   en: 'This indicates that New Kelly Technology Co., Ltd. has a close cooperation with Huawei in the field of DUV exposure technology.',
//   discoveredAt: 1712254442674
// }

// Test 2
// discover("这").then((resp) => {
//   console.log("RESP", resp);
// });
// // RESP {
// //   hanzi: '这',
// //   tone_level: 4,
// //   pinyin: 'zhè',
// //   grammar_type: 'pronoun/demonstrative adjective',
// //   en: 'this/these',
// //   initial: 'zh',
// //   final: 'e',
// //   group: 'zhe',
// //   discoveredAt: 1712254535757
// // }

// Test 3: Nepali
// Date: 23th April 2024
// discover("क").then((resp) => {
//   console.log("RESP", resp);
// });
// {
//   input: 'क',
//   en: 'K',
//   roman: 'ka',
//   explanation: "The letter 'क' in Hindi, pronounced as 'ka', corresponds to the consonant 'K' in English.",
//   lang: 'hi_IN',
//   group: '',
//   discoveredAt: 1713893578756
// }

// Test: 1st May 2024
// discover({ content: "习近平", lang: "zh" }).then((resp) => {
//   console.log("TEST", resp);
// });

// discover({ content: "да, я согласен с этим планом.", lang: "ru" }).then(
//   (lang) => {
//     console.log("DISCOVERED", lang);
//   }
// );

module.exports.discover = discover;
