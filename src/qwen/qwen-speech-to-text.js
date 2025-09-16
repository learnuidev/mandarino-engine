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

const audioUrlShort = `https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3-accelerate.amazonaws.com/01K4XTC6YHPRASPVGC2G0XN8VK.mp3?AWSAccessKeyId=ASIA3EL4T6TBUDOMN2XP&Expires=1757728766&Signature=cJYz3dKB6JlSTeWuijvon%2FS8I6s%3D&X-Amzn-Trace-Id=Root%3D1-68c37e78-1efa9b8e2005bfe14edfc5c8%3BParent%3D02290597d1dc7e96%3BSampled%3D0&x-amz-security-token=IQoJb3JpZ2luX2VjEKr%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCICY3njJ%2Bb1ysyqRKNKewWm6Slz8Qqsy00Bz7ZZmEyZaJAiEArpLBzygZe13s2116zo1PDZz02Nfob5Oerody5yM61poqhAMIIxABGgw3NjUzMDI0MDQyOTEiDDJLmT6IsDWgSp2%2BPyrhAoO5esxVlK6tIHG2jojp9Ka8z2vB%2FrGaEKgL3%2FSk%2FP5w6B5j5PsgnLPU7cbMw53N5RejPkFQxXWjQ5XkDLIeuo6dDZZrJcGbLhenx14LlPLqI5ZPDLK%2FVZBb5sn53SQiV87vS4k9rKUDKniULZ77TOwFBU8ScsUjdIa3OZqye%2FmEmjU%2FzZuZE0o1%2BcZ9rvzz1hCsq4ISmBnhF%2BWpaTY%2FGTgyFULXL8ghUSU68UU6N0CyZrgb5SzSdEb0fCWiltpdrnM3KCfMQ1CpDED3hA1fJtYlPh0YohLLPbmWiKBJFVTD48Upqo%2FLuojH1MfH7Bgm8HC86BTNd5zGWbx2KeZWtCEVWIPI5X3HGSA1auNuNHYdIzuDw5vsbSs4PVex46u3wh%2Ft9VyOLq4eYsBfqzkAplNoarbYsegI6wbEwwm5ruYGBxmWvVvoHt%2F8X%2B8FH3zLNZpFi8DjI4tXrI%2BN7SBV4dQeMOz8jcYGOp4BqtWRtuw6HWEwLFeG6nybxdLjD3OxQXRq9A5HNVrWLhZQ9HqArVvIVQHoxlnot0%2BBt%2BGAB1jK%2FpW2ozVqy1FYXTZd9xLodujCdRHGly3o5LVMI4pJKD9CQhuUxa59e8qxh5dB6cTL7Sbw7mqtFk3e3rmnofmwvoFFpD9RBqhDQP39J3%2F6oFw4XUMSV5FGWMuMVVG%2BdTIfPGYTh5uKciM%3D`;
const audioUrl = `https://nomadmethod-api-dev-assetsbucket-2u2iqsv5nizc.s3-accelerate.amazonaws.com/01K2XNCWRV8842N9VJ6CWE5NBV.mp3?AWSAccessKeyId=ASIA3EL4T6TB3YDR6PHB&Expires=1757729442&Signature=dzo9yq2%2Bl0dVVqG%2BEpZKLAru74M%3D&X-Amzn-Trace-Id=Root%3D1-68c38122-365c26936178ebbf7cf084bb%3BParent%3D0bd3c5ea153adebc%3BSampled%3D0&x-amz-security-token=IQoJb3JpZ2luX2VjEKv%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJGMEQCIGRZ1qilw5WFye8cVXcLeS3Ll3q3fDSLlIVrk2vqQGeYAiA5Njt6NPe7B0jyg7eQIi%2FDusdldJFyk53wANuy3h0ThSqTAwgjEAEaDDc2NTMwMjQwNDI5MSIMUc%2B9Rz%2F1HNUHrf%2F4KvAChmlbna%2FfCRD8dm%2FwSBaq8eGAN2YvwTk4bPvX0ZiG6S2SaAs6xOG51f6YtUU6HqLdyJtNKKT2FtBx8QegTsvRLT5rnveNLQzNW4sSRlUVcULDHbwopPG6rUPFE9T1fxmNZTgMm3eYTsLpGsDMLT6Tvs7lo8VS1r%2FjbakqNcuDm2uq%2FxzHIqlfhDjuu5XPxoEUgfTKk7h1ck8Sy2NonbGWJj5WEzLKfPuQj7f8zLsHgzn%2BNFezaCaREv6j56IFJ7eiuMZ5JTxRsukEcOojXQ3sYkBmFTqEur79S%2BrRn86lR2ScYt0c%2BElFRziukXN2m%2BB%2Fc2IEyPObkis6vvpc7Jrt%2FQ%2BOSYpTlmC9RUjADbBrL5KTjca83gJKdGsQZ9izY4kzHD4Xh6RJkre%2BdV9ltkc8ttcO%2BzgE5hPwYrgwRWAfJr%2FyG%2FUE8gEHTQuP0YJDjGQhtI56xzE7vB%2BW%2BCECMCUw%2BataIfpZDtsQrh%2BzcvnvA1AwnIKOxgY6ngGoExmv5XJpDyZopVxACKi3pZEtDAiK943lWQmzxh7rZtShcrHNnokiHSK%2FkD3TgDJ9Kg7Xhk9MEuR6MjeRpISF0S%2FItzBoZeATI%2FXyQKfZJhBoJuzXen1fx5vjduQnrvy3po1GmOCKrDpUvA7FcoZLUFtXzwtZ61XyXz9vtGOZnj7xRIi4WUI4IQPk1f3EHQLdWIAvryYDagv6cKXLDw%3D%3D`;

qwenSpeechToText({
  audioUrl: audioUrl,
}).then((resp) => {
  console.log(JSON.stringify(resp, null, 4));
});
