/* eslint-disable no-undef */

const { listSystemVoicesApi } = require("./list-system-voices-api");

const ulid = require("ulid");

const emotionTypes = [
  "happy",
  "sad",
  "angry",
  "fearful",
  "disgusted",
  "surprised",
  "neutral",
];

const emotionsMap = emotionTypes.reduce((acc, curr) => {
  return {
    ...acc,
    [curr]: curr,
  };
}, {});

const minimaxTextToSpeechApi = async ({
  minimaxApiKeys,
  text,
  lang,
  emotion,
  model,
  apiKeyIndex = 0,
  // apiKeyVersion = minimaxApiKeys.main,
}) => {
  const apiKeyVersion = minimaxApiKeys?.[apiKeyIndex];

  const isLastIndex = minimaxApiKeys?.length - 1 === apiKeyIndex;

  if (!apiKeyVersion) {
    return;
  }

  const voices = await listSystemVoicesApi({
    lang,
    apiKeyIndex,
    minimaxApiKeys,
  });

  if (!voices || voices?.length === 0) {
    console.log("VOICES NOT FOUND");
  }

  const chineseVoice = {
    id: "Chinese (Mandarin)_Lyrical_Voice",
    name: "Lyrical Voice",
    createdAt: "2025-01-01",
    lang: "zh",
  };
  // const chineseVoice = {
  //   id: "Chinese (Mandarin)_Humorous_Elder",
  //   name: "Humorous Elder",
  //   createdAt: "2025-01-01",
  //   lang: "zh",
  // };

  const emotionInput = emotionsMap?.[emotion] || emotionsMap.happy;

  const voiceId = lang === "zh" ? chineseVoice.id : voices?.[0]?.id || "Grinch";

  try {
    const bodyParams = {
      model: model || "speech-02-hd",
      text: text,
      stream: false,
      voice_setting: {
        voice_id: voiceId,
        speed: 0.9,
        vol: 1,
        pitch: 0,
      },
      emotion: emotionInput,
      audio_setting: {
        sample_rate: 32000,
        bitrate: 128000,
        format: "mp3",
        channel: 1,
      },
      subtitle_enable: true,
    };

    const url = `https://api.minimax.io/v1/t2a_v2?GroupId=${apiKeyVersion.groupId}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKeyVersion.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bodyParams),
    });

    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const respJson = await response.json();

    if (respJson.base_resp?.status_msg === "invalid params, text too long") {
      if (!isLastIndex) {
        console.log(`Error occured using main account, trying using next key`);

        return minimaxTextToSpeechApi({
          minimaxApiKeys,
          text,
          lang,
          emotion,
          model,
          apiKeyIndex: apiKeyIndex + 1,
        });
      } else {
        return {
          error: true,
          type: "VALIDATION:TEXT_TOO_LONG",
          message: "text too long",
        };
      }
    }

    if (
      ["insufficient credit", "insufficient balance"]?.includes(
        respJson.base_resp?.status_msg
      )
    ) {
      if (!isLastIndex) {
        console.log(
          `Error occured using main account, trying using backup key`
        );

        return minimaxTextToSpeechApi({
          minimaxApiKeys,
          text,
          lang,
          emotion,
          model,
          apiKeyIndex: apiKeyIndex + 1,
        });
      } else {
        return {
          error: true,
          type: "FINANCE:INSUFFICIENT_CREDIT",
          message: "insufficient credit",
        };
      }
    }

    const subtitles = await fetch(respJson.data.subtitle_file);

    const subtitlesJson = await subtitles.json();

    const chunks = {
      value: text,
      chunks: subtitlesJson.map((subtitle) => {
        return {
          id: ulid.ulid(),
          type: "word",
          start: subtitle.text_begin,
          end: subtitle.text_end,
          startTime: subtitle.time_begin,
          endTime: subtitle.time_end,
          value: subtitle.text,
        };
      }),
    };

    const sentences = chunks?.chunks?.map((chunk) => {
      return {
        id: ulid.ulid(),
        lang,
        input: chunk?.value,
        startIndex: chunk?.start,
        endIndex: chunk?.end,
        start: (chunk?.startTime || 0) / 1000,
        end: chunk?.endTime / 1000,
      };
    });

    const audioBuffer = Buffer.from(respJson.data.audio, "hex");

    const finalResponse = {
      audio: audioBuffer,
      groupId: apiKeyVersion.groupId,
      apiKeyType: apiKeyVersion.type,
      creditsUsed: respJson?.extra_info?.usage_characters,
      wordCount: respJson?.extra_info?.word_count,
      sentences,
      serviceProvider: "minimax",
    };

    return finalResponse;
  } catch (err) {
    if (apiKeyVersion.type === "main") {
      console.log(`Error occured using main account, trying using backup key`);

      return minimaxTextToSpeechApi({
        minimaxApiKeys,
        text,
        lang,
        emotion,
        model,
        apiKeyIndex: apiKeyIndex + 1,
      });
    } else {
      throw err;
    }
  }
};

module.exports = {
  minimaxTextToSpeechApi,
  emotionsMap,
};

// let text = `还真是这样，我的项目就是用这个新版流程搞出来的。现在ai可以直接出带交互甚至比较美观的gui/cli，设计师的工作往后挪了，而且设计师也可以指挥ai实现自己的设计。`;
// Insight If chinese 1 char = 2 credits (1 credit for space)
// If non-chinese 1 character = 1 credit (including space)
// minimaxTextToSpeechApi({
//   text: "你好兄弟",
//   lang: "zh",
//   emotion: "happy",
//   apiKeyVersion: { type: "main", apiKey: "booboo" },
// })
//   .then((result) => {
//     console.log("API response:", JSON.stringify(result, null, 4));
//   })
//   .catch((error) => {
//     console.error("Error:", error);
//   });

// const resp = {
//   audio: `...`,
//   speechMarks: {
//     value:
//       "还真是这样，我的项目就是用这个新版流程搞出来的。现在ai可以直接出带交互甚至比较美观的gui/cli，设计师的工作往后挪了，而且设计师也可以指挥ai实现自己的设计。",
//     chunks: [
//       {
//         type: "word",
//         start: 0,
//         end: 24,
//         startTime: 0,
//         endTime: 6761.496598639456,
//         value: "还真是这样，我的项目就是用这个新版流程搞出来的。",
//       },
//       {
//         type: "word",
//         start: 24,
//         end: 82,
//         startTime: 6961.496598639456,
//         endTime: 18158.004535147393,
//         value:
//           "现在ai可以直接出带交互甚至比较美观的gui/cli，设计师的工作往后挪了，而且设计师也可以指挥ai实现自己的设计。",
//       },
//     ],
//   },
// };
