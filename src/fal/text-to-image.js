require("dotenv").config();

const { fal } = require("@fal-ai/client");

async function textToImage({ prompt, model = "fal-ai/flux/dev", apiKey }) {
  fal.config({
    credentials: apiKey,
  });

  const result = await fal.subscribe(
    // slow 0.10c
    // "fal-ai/hunyuan-image/v2.1/text-to-image",
    // faster than hunyan image and cost effective 0.04c
    // "fal-ai/imagen4/preview",

    // fastest so far and cheapest as well $0.03 per image gen
    model,
    {
      input: {
        prompt,
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    }
  );

  return result.data;

  console.log("Image generation data:", result.data);
  console.log("Request ID:", result.requestId);
}

module.exports = {
  textToImage,
};
// generateImage({
//   prompt: "A book image cover of: Harry Potter and the Philosophers Stone",
//   apiKey: process.env.FAL_API_KEY,
// })
//   .then((resp) => {
//     console.log("RESP", resp);
//   })
//   .catch(console.error);

const responses = [
  {
    images: [
      {
        url: "https://v3b.fal.media/files/b/panda/6n8Hxa_YsKcuCEQznRIfa.png",
        content_type: "image/png",
        file_name: null,
        file_size: null,
        width: 1024,
        height: 1024,
      },
    ],
    seed: 315025955,
  },

  {
    images: [
      {
        url: "https://v3.fal.media/files/zebra/xBMbgPxRMLYZzt9WBYlRO_output.png",
        content_type: "image/png",
        file_name: "output.png",
        file_size: 1364271,
      },
    ],
    seed: 1584629535,
  },

  {
    images: [
      {
        url: "https://v3b.fal.media/files/b/monkey/Tq5rePbA5pajWOC02KLKK.jpg",
        width: 1024,
        height: 768,
        content_type: "image/jpeg",
      },
    ],
    timings: { inference: 1.2240952858701348 },
    seed: 208232507,
    has_nsfw_concepts: [false],
    prompt:
      "A cute, cartoon-style anthropomorphic penguin plush toy, standing in a painting studio, wearing a red knitted scarf and beret.",
  },

  {
    images: [
      {
        url: "https://v3b.fal.media/files/b/monkey/LCq-bsWi6dRaYUKEMgfxQ.jpg",
        width: 1024,
        height: 768,
        content_type: "image/jpeg",
      },
    ],
    timings: { inference: 1.2006000317633152 },
    seed: 145261295,
    has_nsfw_concepts: [false],
    prompt: "A book image cover of: Harry Potter and the Philosophers Stone",
  },
];
