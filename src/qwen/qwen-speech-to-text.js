// index.js (Node.js v18+)
require("dotenv").config();

const apiKey = process.env.QWEN_API_KEY;

const qwenSpeechToText = ({ audioUrl }) => {
  const data = {
    model: "qwen3-asr-flash",
    input: {
      messages: [
        {
          content: [{ text: "" }],
          role: "system",
        },
        {
          content: [
            {
              audio: audioUrl,
            },
          ],
          role: "user",
        },
      ],
    },
    parameters: {
      asr_options: {
        enable_lid: true,
        enable_itn: false,
        enable_timestamp: true,
      },
    },
  };

  return fetch(
    "https://dashscope-intl.aliyuncs.com/api/v1/services/aigc/multimodal-generation/generation",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  )
    .then((response) => response.json())
    .then((resp) => {
      const sampleError = {
        request_id: "91ddd01e-bd38-956e-9e41-89e62b7a370b",
        code: "InvalidParameter",
        message:
          "<400> InternalError.Algo.InvalidParameter: The audio is too long",
      };

      if (resp.code === sampleError.code) {
        throw new Error(resp.message);
      }

      return resp;
    });
};
