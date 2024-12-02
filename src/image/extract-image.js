const OpenAI = require("openai");
const { models } = require("../data/models");

function parseString(inputString) {
  // Remove the "```json" and "```" markers
  const jsonString = inputString
    .replace(/```json\n?/, "")
    .replace(/\n?```/, "");

  // Parse the JSON string
  try {
    const parsedData = JSON.parse(jsonString);
    return parsedData;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return inputString;
  }
}

const prompt = `
You are an expert chinese tutor,
extract all the chinese text. In additon please provide pinyin and english translations as well

Please provide the response in stringified JSON format. For example
[{"hanzi": "...", "pinyin": "..", "en": ".."}]

`;

const extractImage = async ({ imageUrl, apiKey }) => {
  const openai = new OpenAI({
    apiKey: apiKey,
  });

  const response = await openai.chat.completions.create({
    model: models.mini4o,
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: {
              url: imageUrl,
            },
          },
        ],
      },
    ],
  });

  return parseString(response?.choices?.[0]?.message?.content);
};

// extractImage({
//   imageUrl:
//     "https://active.starbucks.com.cn/sortable/2dfd57e3-a38d-4405-beaa-3950f625bcb6.jpg",
//   // "https://lh3.googleusercontent.com/p/AF1QipN8wI37zUPGdDPsACABaqPZA8_K61ueuba6zHuo=s1360-w1360-h1020-rw",
//   // "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Gfp-wisconsin-madison-the-nature-boardwalk.jpg/2560px-Gfp-wisconsin-madison-the-nature-boardwalk.jpg",
//   // "https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3.amazonaws.com/learnuidev@gmail.com/01JE0DPA6DB2N36VZTJQ7CDP99.png",
//   apiKey: openaiEnv.apiKey,
// }).then((resp) => {
//   console.log("resp", JSON.stringify(resp, null, 4));
// });

module.exports = {
  extractImage,
};
