const { mandarinoClient } = require("./test.client");

const spanishExample1 = {
  input: {
    content: "Hola amigos. Necessito sleep on time. Porque no sleep, no good",
    sourceLang: "en",
    targetLang: "es-ES",
  },
  output: {
    content: "Hola amigos. Necessito sleep on time. Porque no sleep, no good",
    correction:
      "Hola amigos. Necesito dormir a tiempo. Porque si no duermo, no está bien.",
    details: [
      {
        original: "Necessito",
        correction: "Necesito",
        startIndex: 13,
        endIndex: 22,
      },
      {
        original: "sleep on time",
        correction: "dormir a tiempo",
        startIndex: 23,
        endIndex: 36,
      },
      {
        original: "Porque no sleep, no good",
        correction: "Porque si no duermo, no está bien",
        startIndex: 38,
        endIndex: 62,
      },
    ],
    sourceLang: "en",
    targetLang: "es-ES",
  },
};

const frenchExample1 = {
  input: {
    content:
      "Bonjour mes amies, c'est trop tard. Il faut que, je dois dormir. Au revoir",
    sourceLang: "en",
    targetLang: "fr",
  },
  output: {
    content:
      "Bonjour mes amies, c'est trop tard. Il faut que, je dois dormir. Au revoir",
    corrected:
      "Bonjour mes amies, il est trop tard. Il faut que je dorme. Au revoir.",
    details: [
      {
        original: "c'est trop tard",
        correction: "il est trop tard",
        startIndex: 19,
        endIndex: 34,
      },
      {
        original: "Il faut que, je dois dormir",
        correction: "Il faut que je dorme",
        startIndex: 36,
        endIndex: 63,
      },
    ],
    sourceLang: "en",
    targetLang: "fr",
  },
};
mandarinoClient.getCorrection(frenchExample1.input).then((resp) => {
  console.log("RESP", resp);
});
