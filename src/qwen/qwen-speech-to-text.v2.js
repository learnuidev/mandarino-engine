const WebSocket = require("ws");
const { v4: uuidv4 } = require("uuid");
const http = require("http");
const https = require("https");
const url = require("url");
// index.js (Node.js v18+)
require("dotenv").config();

const apiKey = process.env.QWEN_API_KEY;

// Open WebSocket connection
const openWebSocket = (wsUrl, apiKey) =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(wsUrl, {
      headers: {
        Authorization: `bearer ${apiKey}`,
        "X-DashScope-DataInspection": "enable",
      },
    });
    ws.on("open", () => resolve(ws));
    ws.on("error", reject);
  });

// Send JSON command over WebSocket
const sendCommand = (ws, cmd) =>
  new Promise((resolve, reject) => {
    ws.send(JSON.stringify(cmd), (err) => (err ? reject(err) : resolve()));
  });

// Stream audio from URL to WebSocket binary, chunked every 100 ms
const streamAudioUrlToWebSocket = (audioUrl, ws, chunkSize = 1024) =>
  new Promise((resolve, reject) => {
    const parsedUrl = url.parse(audioUrl);
    const httpModule = parsedUrl.protocol === "https:" ? https : http;

    const req = httpModule.get(audioUrl, (res) => {
      if (res.statusCode !== 200) {
        reject(
          new Error(`Failed to fetch audio, status code: ${res.statusCode}`)
        );
        return;
      }

      let buffer = Buffer.alloc(0);
      res.pause();

      res.on("data", (chunk) => {
        buffer = Buffer.concat([buffer, chunk]);

        while (buffer.length >= chunkSize) {
          const sendChunk = buffer.slice(0, chunkSize);
          buffer = buffer.slice(chunkSize);
          ws.send(sendChunk, { binary: true }, (err) => {
            if (err) reject(err);
          });
          res.pause();
          setTimeout(() => res.resume(), 100);
        }
      });

      res.on("end", () => {
        if (buffer.length > 0) {
          ws.send(buffer, { binary: true }, (err) =>
            err ? reject(err) : resolve()
          );
        } else {
          resolve();
        }
      });

      res.on("error", reject);
      res.resume();
    });

    req.on("error", reject);
  });

// Generate a run-task command object
const createRunTaskCommand = (taskId, sampleRate, format) => ({
  header: {
    action: "run-task",
    task_id: taskId,
    streaming: "duplex",
  },
  payload: {
    task_group: "audio",
    task: "asr",
    function: "recognition",
    model: "paraformer-realtime-v2",
    parameters: {
      format,
      sample_rate: sampleRate,
    },
    input: {},
  },
});

// Generate a finish-task command object
const createFinishTaskCommand = (taskId) => ({
  header: {
    action: "finish-task",
    task_id: taskId,
    streaming: "duplex",
  },
  payload: {
    input: {},
  },
});

// Main recognition function
const qwenSpeechtoTextV2 = async ({ apiKey, audioUrl, options = {} }) => {
  const sampleRate = options.sampleRate || 16000;
  const format = options.format || "wav";
  const wsUrl = "wss://dashscope-intl.aliyuncs.com/api-ws/v1/inference/";
  const taskId = uuidv4().replace(/-/g, "").slice(0, 32);

  const ws = await openWebSocket(wsUrl, apiKey);

  await sendCommand(ws, createRunTaskCommand(taskId, sampleRate, format));

  return new Promise((resolve, reject) => {
    const results = [];

    const onMessage = async (data) => {
      try {
        const msg = JSON.parse(data);
        const event = msg.header && msg.header.event;

        switch (event) {
          case "task-started":
            try {
              await streamAudioUrlToWebSocket(audioUrl, ws);
              await sendCommand(ws, createFinishTaskCommand(taskId));
            } catch (err) {
              ws.removeListener("message", onMessage);
              ws.close();
              reject(err);
            }
            break;

          case "result-generated":
            if (
              msg.payload &&
              msg.payload.output &&
              msg.payload.output.sentence
            ) {
              results.push(msg.payload.output.sentence.text);
            }
            break;

          case "task-finished":
            ws.removeListener("message", onMessage);
            ws.close();
            resolve(results);
            break;

          case "task-failed":
            ws.removeListener("message", onMessage);
            ws.close();
            reject(new Error(`Task failed: ${msg.header.error_message}`));
            break;

          default:
            break;
        }
      } catch (err) {
        reject(err);
      }
    };

    ws.on("message", onMessage);
    ws.on("error", (err) => {
      ws.removeListener("message", onMessage);
      reject(err);
    });
  });
};

// Export the functional API
module.exports = { qwenSpeechtoTextV2 };

const audioUrl = `https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3-accelerate.amazonaws.com/01K2XNCWRV8842N9VJ6CWE5NBV.mp3?AWSAccessKeyId=ASIA3EL4T6TB3YDR6PHB&Expires=1757729442&Signature=dzo9yq2%2Bl0dVVqG%2BEpZKLAru74M%3D&X-Amzn-Trace-Id=Root%3D1-68c38122-365c26936178ebbf7cf084bb%3BParent%3D0bd3c5ea153adebc%3BSampled%3D0&x-amz-security-token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIGRZ1qilw5WFye8cVXcLeS3Ll3q3fDSLlIVrk2vqQGeYAiA5Njt6NPe7B0jyg7eQIi%2FDusdldJFyk53wANuy3h0ThSqTAwgjEAEaDDc2NTMwMjQwNDI5MSIMUc%2B9Rz%2F1HNUHrf%2F4KvAChmlbna%2FfCRD8dm%2FwSBaq8eGAN2YvwTk4bPvX0ZiG6S2SaAs6xOG51f6YtUU6HqLdyJtNKKT2FtBx8QegTsvRLT5rnveNLQzNW4sSRlUVcULDHbwopPG6rUPFE9T1fxmNZTgMm3eYTsLpGsDMLT6Tvs7lo8VS1r%2FjbakqNcuDm2uq%2FxzHIqlfhDjuu5XPxoEUgfTKk7h1ck8Sy2NonbGWJj5WEzLKfPuQj7f8zLsHgzn%2BNFezaCaREv6j56IFJ7eiuMZ5JTxRsukEcOojXQ3sYkBmFTqEur79S%2BrRn86lR2ScYt0c%2BElFRziukXN2m%2BB%2Fc2IEyPObkis6vvpc7Jrt%2FQ%2BOSYpTlmC9RUjADbBrL5KTjca83gJKdGsQZ9izY4kzHD4Xh6RJkre%2BdV9ltkc8ttcO%2BzgE5hPwYrgwRWAfJr%2FyG%2FUE8gEHTQuP0YJDjGQhtI56xzE7vB%2BW%2BCECMCUw%2BataIfpZDtsQrh%2BzcvnvA1AwnIKOxgY6ngGoExmv5XJpDyZopVxACKi3pZEtDAiK943lWQmzxh7rZtShcrHNnokiHSK%2FkD3TgDJ9Kg7Xhk9MEuR6MjeRpISF0S%2FItzBoZeATI%2FXyQKfZJhBoJuzXen1fx5vjduQnrvy3po1GmOCKrDpUvA7FcoZLUFtXzwtZ61XyXz9vtGOZnj7xRIi4WUI4IQPk1f3EHQLdWIAvryYDagv6cKXLDw%3D%3D`;

qwenSpeechtoTextV2({
  apiKey,
  audioUrl,
}).then((resp) => {
  console.log("RESP", JSON.stringify(resp, null, 4));
});

/*
Example usage:

const { recognizeFromAudioUrl } = require('./paraformerFunctional');



(async () => {
  try {
    const apiKey = process.env.DASHSCOPE_API_KEY;
    const audioUrl = 'https://example.com/audio.wav';
    const results = await recognizeFromAudioUrl(apiKey, audioUrl);
    console.log('Transcription:', results.join(' '));
  } catch (err) {
    console.error('Error recognizing speech:', err);
  }
})();
*/
