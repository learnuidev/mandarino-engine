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
  const { description, input, pinyin, en } = menuObj;

  // Split lines
  const inputLines = input.split("\n");
  const pinyinLines = pinyin.split("\n");
  const enLines = en.split("\n");

  // Helper to see if a line contains a price (so it's a menu item, not header)
  const hasPrice = (line) => /\d+\.\d{1,2}/.test(line);

  const details = [];
  for (let i = 0; i < inputLines.length; i++) {
    if (hasPrice(inputLines[i])) {
      details.push({
        hanzi: inputLines[i],
        pinyin: pinyinLines[i],
        en: enLines[i],
      });
    }
  }

  return {
    description,
    details,
  };
}

const prompt = `
You are an expert chinese tutor,
Please extract all the chinese text as well as provide description of the image.

In additon please provide pinyin and english translations as well. Please extract the images from top to bottom.

Please provide the response in stringified JSON format. For example
{
"description": "...",
 "details": [{"hanzi": "...", "pinyin": "..", "en": ".."}]
}

`;

const extractImage = async (
  { imageUrl, openai, model, variant },
  { includeCoordinates } = {}
) => {
  const t0 = performance.now();

  console.log("variant", variant);

  if (variant === "moonshot") {
    const base64Url = await imageUrlToBase64(imageUrl);

    const response = await openai.chat.completions.create({
      model: model,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
You are an expert image text extractor
Please extract all the original text input as well as provide description of the image.

In additon please provide pinyin and english translations as well. Please extract the images from top to bottom.

Please provide the response in stringified csv format like so,
description, input, pinyin, en
}

`,
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

    const responseContent = transformMenuData(
      parseString(response?.choices?.[0]?.message?.content)
    );

    console.log("RESPONSE CONTENT", responseContent);
    return responseContent;

    // return parseString(response?.choices?.[0]?.message?.content);
  }

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

  return parseString(response?.choices?.[0]?.message?.content);
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
