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

const chineseExample1 = {
  input: {
    content:
      "今天，哟要给大家分享我的中文学习故事。我要分享我如何学习中文。我的中文学习方法。好吧，那我们开始吧。在二零二三年我开始学中文！为什么呢？因为我感兴趣AI。我要学习AI by learning chinese. I basically wanted to apply chinese language into nlp",
    sourceLang: "en",
    targetLang: "zh",
  },
  output: {
    content:
      "今天，哟要给大家分享我的中文学习故事。我要分享我如何学习中文。我的中文学习方法。好吧，那我们开始吧。在二零二三年我开始学中文！为什么呢？因为我感兴趣AI。我要学习AI by learning chinese. I basically wanted to apply chinese language into nlp",
    corrected:
      "今天，我要给大家分享我的中文学习故事。我要分享我是如何学习中文的，以及我的中文学习方法。好吧，那我们开始吧。在二〇二三年我开始学中文！为什么呢？因为我对人工智能感兴趣。我想通过学中文来学习AI。我基本上想把中文应用到自然语言处理中。",
    details: [
      { original: "哟", correction: "我", startIndex: 3, endIndex: 4 },
      {
        original: "我要分享我如何学习中文。我的中文学习方法。",
        correction: "我要分享我是如何学习中文的，以及我的中文学习方法。",
        startIndex: 19,
        endIndex: 40,
      },
      {
        original: "我感兴趣AI",
        correction: "我对人工智能感兴趣",
        startIndex: 70,
        endIndex: 76,
      },
      {
        original: "我要学习AI by learning chinese.",
        correction: "我想通过学中文来学习AI。",
        startIndex: 77,
        endIndex: 104,
      },
      {
        original: "I basically wanted to apply chinese language into nlp",
        correction: "我基本上想把中文应用到自然语言处理中。",
        startIndex: 105,
        endIndex: 158,
      },
    ],
    sourceLang: "en",
    targetLang: "zh",
  },
};

mandarinoClient.getCorrection(chineseExample1.input).then((resp) => {
  console.log("RESP", resp);
});
