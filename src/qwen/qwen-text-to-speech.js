// const fetch = require("node-fetch");
const fs = require("fs");
require("dotenv").config();

const qwenApiKey = process.env.QWEN_API_KEY;

async function generateTTS({
  text,
  voice = "Cherry",
  model = "qwen-omni-turbo-latest",
}) {
  // https://dashscope-intl.aliyuncs.com/compatible-mode/v1
  const url = "https://dashscope-intl.aliyuncs.com/api/v1/audio/qwen_tts";
  const payload = {
    // model,
    text,
    // voice, // Optional: voices like 'Cherry', 'Ethan', etc
    output_format: "mp3", // or mp3 if preferred
  };

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${qwenApiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  console.log("response", response);

  const data = await response.json();
  //   if (!data.output || !data.output.audio || !data.output.audio.url) {
  //     throw new Error("No audio URL returned");
  //   }
  return data;
}

generateTTS({ text: "hello world" }).then((resp) => {
  console.log("resp", resp);
});

// async function downloadAudio(audioUrl, savePath) {
//   const res = await fetch(audioUrl);
//   const fileStream = fs.createWriteStream(savePath);
//   await new Promise((resolve, reject) => {
//     res.body.pipe(fileStream);
//     res.body.on("error", reject);
//     fileStream.on("finish", resolve);
//   });
//   console.log(`Saved to ${savePath}`);
// }

// // Usage
// (async () => {
//   const text = "你好，世界！";
//   const audioUrl = await generateTTS(text);
//   await downloadAudio(audioUrl, "output.wav");
// })();
