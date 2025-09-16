const { imageUrlToBase64 } = require("../../utils/image-url-to-base64");
const { parseInput } = require("../../utils/parse-input");

function parseString(inputString) {
  // Remove the "```json" and "```" markers
  const jsonString = inputString
    .replace(/```json\n?/, "")
    .replace(/\n?```/, "");

  // Parse the JSON string
  try {
    const parsedData = parseInput(jsonString);
    return parsedData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return inputString;
  }
}

function transformMenuData(menuObj) {
  const { title, description, details } = menuObj;

  // Split lines
  // const inputLines = input.split("\n");
  // const pinyinLines = pinyin.split("\n");
  // const enLines = en.split("\n");

  // Helper to see if a line contains a price (so it's a menu item, not header)
  // const hasPrice = (line) => /\d+\.\d{1,2}/.test(line);

  // const details = [];
  // for (let i = 0; i < inputLines.length; i++) {
  //   if (hasPrice(inputLines[i])) {
  //     details.push({
  //       hanzi: inputLines[i],
  //       pinyin: pinyinLines[i],
  //       en: enLines[i],
  //     });
  //   }
  // }

  return {
    title,
    description,
    details,
  };
}

const prompt = `
You are an expert chinese tutor,
Please extract all the chinese text as well as provide title and description of the image.

In additon please provide pinyin and english translations as well. Please extract the images from top to bottom.

Also please make sure that if a sentence is breaking, then ensure that it flows as a continuous sentence.

Please provide the response in stringified JSON format. For example
{
"title": "Title of the image in english.",
"description": "description of the image in english.",
 "details": [{"input": "这是位于法国塞里昂的法布尔故居", "pinyin": "Zhè shì wèi yú Fǎguó Sāilóng de Fǎbù'ěr gùjū", "en": "This is Fabre's former residence located in Sérignan, France."}]
}


Please ensure that title and description are in ENGLISH. Title should be short and sweet

`;

const extractImage = async (
  { imageUrl, openai, model, variant },
  { includeCoordinates } = {}
) => {
  const t0 = performance.now();

  console.log("variant", variant);

  const base64Url = await imageUrlToBase64(imageUrl);

  const response = await openai.chat.completions.create({
    model: model,
    messages: [
      {
        role: "user",
        content: [
          {
            type: "text",
            text: prompt,
          },
          {
            type: "image_url",
            image_url: {
              url: base64Url,
            },
          },
        ],
      },
    ],
  });

  const t1 = performance.now();

  console.log("latency: ", t1 - t0);

  const originalResponse = response?.choices?.[0]?.message?.content;
  const responseContent = parseString(originalResponse);

  return { ...responseContent, originalResponse, model };

  // return parseString(response?.choices?.[0]?.message?.content);
};

// extractImage(
//   {
//     imageUrl:
//       "https://active.starbucks.com.cn/sortable/2dfd57e3-a38d-4405-beaa-3950f625bcb6.jpg",
//     // "https://lh3.googleusercontent.com/p/AF1QipN8wI37zUPGdDPsACABaqPZA8_K61ueuba6zHuo=s1360-w1360-h1020-rw",
//     // "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
//     // "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/learnuidev@gmail.com/01JE0DPA6DB2N36VZTJQ7CDP99.png",
//     apiKey: openaiEnv.apiKey,
//   },
//   {
//     includeCoordinates: false,
//   }
// ).then((resp) => {
//   console.log("resp", JSON.stringify(resp, null, 4));
// });

module.exports = {
  extractImage,
};
