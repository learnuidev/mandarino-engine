const ulid = require("ulid");

const qwenTextToImage = async ({ apiKey, text, model = "wan2.2-t2i-plus" }) => {
  const t0 = performance.now();

  const data = {
    model,
    input: { prompt: text },
    parameters: { size: "1024*1024", n: 1 },
  };

  // Start image generation - async mode enabled
  const initiateResp = await fetch(
    "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/text2image/image-synthesis",
    {
      method: "POST",
      headers: {
        "X-DashScope-Async": "enable",
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  const initiateJson = await initiateResp.json();

  const taskId = initiateJson?.output?.task_id;
  if (!taskId) throw new Error("Failed to get task_id");

  // Polling the status endpoint
  const pollInterval = 3000; // poll every 3 seconds
  let maxTries = 900; // timeout after ~90 seconds

  for (let i = 0; i < maxTries; i++) {
    console.log(`Trying: ${i} / ${maxTries}...`);
    const statusResp = await fetch(
      `https://dashscope-intl.aliyuncs.com/api/v1/tasks/${taskId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json",
        },
      }
    );
    const statusJson = await statusResp.json();
    const status = statusJson?.output?.task_status;
    if (status === "SUCCEEDED" || status === "COMPLETED") {
      // Image generated, return full response

      const t1 = performance.now();

      const latency = t1 - t0;
      console.log(`Latency`, latency);

      console.log("JSON", JSON.stringify(statusJson, null, 4));

      const response = {
        id: ulid.ulid(),
        latency,
        model,
        imageUrl: statusJson?.output?.results?.[0]?.url,
        createdAt: Date.now(),
      };

      return response;
    } else if (status === "FAILED") {
      throw new Error("Image generation failed");
    }

    await new Promise((resolve) => setTimeout(resolve, pollInterval));
  }

  throw new Error("Image generation timed out");
};

module.exports = {
  qwenTextToImage,
};

// testing
// require("dotenv").config();
// const apiKey = process.env.QWEN_API_KEY;

// qwenTextToImage({
//   apiKey,
//   text: "A cute, cartoon-style anthropomorphic penguin plush toy, standing in a painting studio, wearing a red knitted scarf and beret.",
// }).then((resp) => {
//   console.log("resp", JSON.stringify(resp, null, 4));
// });
