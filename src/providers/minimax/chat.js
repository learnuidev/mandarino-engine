require("dotenv").config();

const minimaxApiKey = process.env.MINIMAX_API_KEY;

const url = `https://api.minimax.io/v1/text/chatcompletion_v2`;

const supportedMinimaxTextModels = {
  m1: "MiniMax-M1",
  text01: "MiniMax-Text-01",
};

const minimaxChat = async ({
  apiKey,
  messages,
  model = supportedMinimaxTextModels.m1,
}) => {
  if (!Object.values(supportedMinimaxTextModels)?.includes(model)) {
    throw new Error(
      `Only the following models are supported: ${JSON.stringify(supportedMinimaxTextModels)}`
    );
  }
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: model,
      messages: messages,
    }),
  }).then((resp) => {
    return resp.json();
  });
};

// chat({
//   apiKey: minimaxApiKey,
//   messages: [
//     {
//       role: "system",
//       name: "MiniMax AI",
//     },
//     {
//       role: "user",
//       name: "user",
//       content: "Hello",
//     },
//   ],
// }).then((resp) => {
//   console.log("RESP", JSON.stringify(resp));
// });

const sampleResponse = {
  id: "04ec226a137a1937f9490f48f1a4e877",
  choices: [
    {
      finish_reason: "stop",
      index: 0,
      message: {
        content: "Hello! How can I assist you today?",
        role: "assistant",
        name: "MiniMax AI",
        audio_content: "",
      },
    },
  ],
  created: 1755115370,
  model: "MiniMax-Text-01",
  object: "chat.completion",
  usage: {
    total_tokens: 34,
    total_characters: 0,
    prompt_tokens: 25,
    completion_tokens: 9,
  },
  input_sensitive: false,
  output_sensitive: false,
  input_sensitive_type: 0,
  output_sensitive_type: 0,
  output_sensitive_int: 0,
  base_resp: { status_code: 0, status_msg: "" },
};

const MiniMaxOpenAi = ({ apiKey }) => {
  return {
    chat: {
      completions: {
        create: async ({ messages, model }) => {
          const resp = await minimaxChat({ messages, model, apiKey });

          return resp;
        },
      },
    },
  };
};

module.exports = {
  MiniMaxOpenAi,
  minimaxChat,
  supportedMinimaxTextModels,
};
