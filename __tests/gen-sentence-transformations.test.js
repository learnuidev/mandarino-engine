const { mandarinoClient } = require("./test.client");

// mandarinoClient
//   .genSentenceTransformations({
//     content: "Tienes cafe or te",
//     lang: "es",
//   })
//   .then((resp) => {
//     console.log("RESP", resp);
//   });

const exampleSentences = [
  {
    input: "¿Tienes café o té?",
    en: "Do you have coffee or tea?",
    explanation:
      "Base sentence: asking if the listener has either coffee or tea.",
    lang: "es",
    component: "tienes cafe or te",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "¿Tuviste café o té ayer?",
    en: "Did you have coffee or tea yesterday?",
    explanation:
      "Transformation: changed time to past ('ayer') and verb to preterite 'tuviste'.",
    lang: "es",
    component: "tienes cafe or te",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "¿Tienen café o té en casa?",
    en: "Do they have coffee or tea at home?",
    explanation:
      "Transformation: changed subject to plural 'tienen' and added location 'en casa'.",
    lang: "es",
    component: "tienes cafe or te",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "¿Tienes leche o agua?",
    en: "Do you have milk or water?",
    explanation:
      "Transformation: changed objects from 'café o té' to 'leche o agua'.",
    lang: "es",
    component: "tienes cafe or te",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "¿Tendrás café o té mañana?",
    en: "Will you have coffee or tea tomorrow?",
    explanation:
      "Transformation: changed time to future ('mañana') and verb to future 'tendrás'.",
    lang: "es",
    component: "tienes cafe or te",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "¿Tienes café con leche o té con limón?",
    en: "Do you have coffee with milk or tea with lemon?",
    explanation:
      "Transformation: expanded objects by adding modifiers 'con leche' and 'con limón'.",
    lang: "es",
    component: "tienes cafe or te",
    model: "kimi-k2-turbo-preview",
  },
];

mandarinoClient
  .genSentenceTransformations({
    content: "我昨天在图书馆看书。",
  })
  .then((resp) => {
    console.log("RESP", resp);
  });

const sampleResponse2 = [
  {
    input: "我昨天在图书馆看书。",
    roman: "Wǒ zuótiān zài túshūguǎn kàn shū.",
    en: "I read books at the library yesterday.",
    explanation:
      "Base sentence: 昨天 (yesterday) sets the time, 图书馆 (library) the place, 看书 (read books) the action.",
    lang: "zh",
    component: "我昨天在图书馆看书。",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "我明天在图书馆看书。",
    roman: "Wǒ míngtiān zài túshūguǎn kàn shū.",
    en: "I will read books at the library tomorrow.",
    explanation:
      "Transformation: Changed time from 昨天 (yesterday) to 明天 (tomorrow).",
    lang: "zh",
    component: "我昨天在图书馆看书。",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "我昨天在公园看书。",
    roman: "Wǒ zuótiān zài gōngyuán kàn shū.",
    en: "I read books in the park yesterday.",
    explanation:
      "Transformation: Changed place from 图书馆 (library) to 公园 (park).",
    lang: "zh",
    component: "我昨天在图书馆看书。",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "妹妹昨天在图书馆看书。",
    roman: "Mèimei zuótiān zài túshūguǎn kàn shū.",
    en: "My younger sister read books at the library yesterday.",
    explanation:
      "Transformation: Changed subject from 我 (I) to 妹妹 (younger sister).",
    lang: "zh",
    component: "我昨天在图书馆看书。",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "我昨天在图书馆写作业。",
    roman: "Wǒ zuótiān zài túshūguǎn xiě zuòyè.",
    en: "I did homework at the library yesterday.",
    explanation:
      "Transformation: Changed object/action from 看书 (read books) to 写作业 (do homework).",
    lang: "zh",
    component: "我昨天在图书馆看书。",
    model: "kimi-k2-turbo-preview",
  },
  {
    input: "弟弟明天在咖啡馆写作业。",
    roman: "Dìdi míngtiān zài kāfēiguǎn xiě zuòyè.",
    en: "My younger brother will do homework at the café tomorrow.",
    explanation:
      "Transformation: Changed subject (弟弟), time (明天), place (咖啡馆), and object/action (写作业) all at once.",
    lang: "zh",
    component: "我昨天在图书馆看书。",
    model: "kimi-k2-turbo-preview",
  },
];
