# Mandarino

Mandarino API in JS

## Features

- Multi Model support: can either use openai or deepseek 🤗

## Install

```bash
npm install mandarino@latest
```

## Usage via OpenAI

```javascript
import { mandarinoApi, chineseConverter, isChinese } from "mandarino";

const mandarino = mandarinoApi({
  apiKey: "DEEPSEEK_API_KEY",
  variant: "deepseek",
});

// or
const mandarino = mandarinoApi({
  apiKey: "OPENAI_API_KEY",
  variant: "openai",
});

// Available Features
const {
  discover,
  listGrammarAnaysis,
  detectLanguage,
  genSentences,
  genConversation,
  getSummary,
  listComponents,
  listHskWords
  extractImage,
} = mandarino;
```

---

## API Feature Usage Guide

1. Discover `discover`
2. Grammar Analysis `listGrammarAnalysis`
3. Detect Langauge `detectLanguage`
4. Generate Sentences `genSentences`
5. Generate Conversation `genConversation`
6. Get Summary `getSummary`
7. List Components `listComponents`
8. List HSK Words `listHskWords`
9. Extract Image `extractImage`

## 1. Discover

```javascript
mandarino.discover({ content: "从" }).then((character) => {
  console.log("Char", character);
});

// =>
{
  hanzi: '从',
  tone_level: 2,
  pinyin: 'cóng',
  grammar_type: 'preposition',
  en: 'from/by/since/obey/follow/along/entrust/keep an eye on',
  initial: 'c',
  final: 'ong',
  group: 'cong',
  lang: 'zh',
  discovered_at: 1721593687888
}
```

---

## 2. Grammar Analysis

```js
mandarino
  .listGrammarAnaysis({
    lang: "zh",
    content: "不但…而且…",
  })
  .then((grammarAnalysis) => {
    console.log("grammar-analysis", grammarAnalysis);
  });

//  =>
[
  {
    hanzi: "不但",
    pinyin: "bùdàn",
    en: "not only",
    explanation:
      "Expresses a contrast between two elements, emphasizing that the first mentioned condition is true and the second condition is also true.",
  },
  {
    hanzi: "而且",
    pinyin: "érqiě",
    en: "but also",
    explanation:
      "Connects two clauses or phrases, indicating an additional or sequential relationship, implying that there is another relevant point to be mentioned.",
  },
  { hanzi: "...", pinyin: "...", en: "...", explanation: "..." },
];
```

---

## 3. Detect Language

```js
mandarino.detectLanguage({ content: "从" }).then((lang) => {
  console.log("lang", lang);
});

// => 'zh'
```

---

## 4. Generate Sentences

```javascript
mandarino.genSentences({ content: "从" }).then((sentences) => {
  console.log("sentences", sentences);
});

// =>
[
  {
    hanzi: "从这里开始。",
    pinyin: "Cóng zhèli kāishǐ.",
    en: "Start from here.",
    explanation:
      "In this sentence, 从 means 'from' and 这里 means 'here'. Combined, 从这里开始 means 'Start from here'.",
    lang: "zh",
    component: "从",
  },
  {
    hanzi: "从左往右看。",
    pinyin: "Cóng zuǒ wǎng yòu kàn.",
    en: "Look from left to right.",
    explanation:
      "Here, 从 means 'from', 左 means 'left', 右 means 'right', and 看 means 'look'. Combined, 从左往右看 means 'Look from left to right'.",
    lang: "zh",
    component: "从",
  },
  {
    hanzi: "从小学就喜欢阅读。",
    pinyin: "Cóng xiǎoxué jiù xǐhuān yuèdú.",
    en: "Have loved reading since elementary school.",
    explanation:
      "In this sentence, 从 means 'from', 小学 means 'elementary school', 就 means 'since', 喜欢 means 'like', and 阅读 means 'reading'. Combined, 从小学就喜欢阅读 means 'Have loved reading since elementary school'.",
    lang: "zh",
    component: "从",
  },
  {
    hanzi: "从山上往下走。",
    pinyin: "Cóng shānshàng wǎng xià zǒu.",
    en: "Walk down from the mountain.",
    explanation:
      "Here, 从 means 'from', 山上 means 'mountain top', 往下 means 'downwards', and 走 means 'walk'. Combined, 从山上往下走 means 'Walk down from the mountain'.",
    lang: "zh",
    component: "从",
  },
  {
    hanzi: "从星期一到星期五。",
    pinyin: "Cóng xīngqī yī dào xīngqīwǔ.",
    en: "From Monday to Friday.",
    explanation:
      "In this sentence, 从 means 'from', 星期一 means 'Monday', 到 means 'to', and 星期五 means 'Friday'. Combined, 从星期一到星期五 means 'From Monday to Friday'.",
    lang: "zh",
    component: "从",
  },
];
```

---

## 5. Generate Conversation

```js

mandarino
  .genConversation({
    lang: "zh",
    topic: "Booking a High Speed Return Ticket",
    subtopic: "Travel",
  })
  .then((conversations) => {
    console.log("convos", conversations);
  });



// =>
{
  title: 'Booking a High Speed Return Ticket - Travel',
  topic: 'travel',
  subtopic: 'booking a high speed return ticket',
  lang: 'zh',
  conversation: [
    {
      input: '你好，请问有高铁往返票吗？',
      en: 'Hello, do you have high-speed return tickets available?',
      speaker: 'Customer',
      roman: 'Nǐ hǎo, qǐngwèn yǒu gāotiě wǎngfǎn piào ma?'
    },
    {
      input: '对不起，高铁往返票已经售罄了。',
      en: "I'm sorry, the high-speed return tickets are sold out.",
      speaker: 'Staff',
      roman: 'Duìbùqǐ, gāotiě wǎngfǎn piào yǐjīng shòuqìng le.'
    },
    {
      input: '那有其他时间的票吗？',
      en: 'Do you have tickets available for other times?',
      speaker: 'Customer',
      roman: 'Nà yǒu qítā shíjiān de piào ma?'
    },
    {
      input: '是的，我们还有晚点的高铁票。',
      en: 'Yes, we still have high-speed tickets for later times.',
      speaker: 'Staff',
      roman: 'Shì de, wǒmen hái yǒu wǎndiǎn de gāotiě piào.'
    }
  ],
  responseTime: 4231.86862501502
}

```

---

## 6. Get Summary

```js
mandarino
  .getSummary({
    lang: "zh",
    content: "不但…而且…",
  })
  .then((summary) => {
    console.log("summary", summary);
  });

// =>
`
Explanation:
The phrase "不但...而且..." is used to express a contrast or addition between two elements or actions. It typically emphasizes that in addition to the first mentioned element, there is also the second mentioned element.

Possible use cases:
This phrase can be used to highlight a dual effect, action, or situation, emphasizing that both aspects are relevant or important. For example, "不但漂亮，而且聪明" means "Not only beautiful, but also smart." This structure can be applied in various contexts such as describing qualities of a person, product features, or comparing different options.
`;
```

---

## 7. List Components

`listComponents` is a synchronous function that returns a list of components.

```js
const components = mandarino.listComponents();

console.log(components[0]);

// =>
{
    initial: 'd',
    en: 'electric',
    pinyin: 'diàn',
    group: 'diàn',
    data_version: '2023-10-07',
    updated_at: 1700684107708,
    count: 291,
    grammar_type: 'noun',
    tone_level: 4,
    level: 43,
    final: 'iàn',
    id: '8e13afa5-f14b-5a14-ab4e-acbe51281b58',
    hanzi: '电',
    nmmIndex: 100,
    hskIndex: 41
}
```

---

## 8. List Hsk Words

`listHskWords` is a synchronous function that returns a list of HSK Words.

```js
const hskWords = mandarino.listHskWords();
```

---

## 9. Extract Image

`extractImage` accepts `imageUrl` and returns a list of extacted text (hanzi, pinyin and en) in JSON format

```js
const components = await mandarino.extractImage({
  imageUrl:
    "https://active.starbucks.com.cn/sortable/2dfd57e3-a38d-4405-beaa-3950f625bcb6.jpg",
});

console.log(components);

// =>
// Latency:  15623.749208
[
  {
    hanzi: "手工调制咖啡",
    pinyin: "Shǒugōng tiáozhì kāfēi",
    en: "Handcrafted Coffee",
  },
  {
    hanzi: "经典咖啡",
    pinyin: "Jīngdiǎn kāfēi",
    en: "Classic Coffee",
  },
  {
    hanzi: "馨茸白®",
    pinyin: "Xīnróng bái",
    en: "Flat White",
  },
  {
    hanzi: "拿铁/卡布奇诺",
    pinyin: "Ná tiě/Kǎ bù qí nuò",
    en: "Caffè Latte/Cappuccino",
  },
  {
    hanzi: "浓郁咖啡拿铁",
    pinyin: "Nóngyù kāfēi ná tiě",
    en: "Extra Shot Latte",
  },
  {
    hanzi: "焦糖玛奇朵",
    pinyin: "Jiāotáng mǎqíduǒ",
    en: "Caramel Macchiato",
  },
  {
    hanzi: "香草/榛果风味拿铁",
    pinyin: "Xiāngcǎo/Zhēnguǒ fēngwèi ná tiě",
    en: "Vanilla/Hazelnut Flavored Latte",
  },
  {
    hanzi: "摩卡",
    pinyin: "Mókǎ",
    en: "Caffè Mocha",
  },
  {
    hanzi: "美式咖啡",
    pinyin: "Měishì kāfēi",
    en: "Caffè Americano",
  },
  {
    hanzi: "鲜萃滴漏咖啡",
    pinyin: "Xiāncuì dīlòu kāfēi",
    en: "Immersion Brewer Coffee",
  },
  {
    hanzi: "推荐咖啡是：佛罗娜/哥伦比亚",
    pinyin: "Tuījiàn kāfēi shì: Fóluónà/Gēlúnbǐyà",
    en: "Recommended coffee: Verona/Colombia",
  },
  {
    hanzi: "植物基选择",
    pinyin: "Zhíwù jī xuǎnzé",
    en: "Plant-Based Choice",
  },
  {
    hanzi: "燕麦拿铁/巴旦木拿铁",
    pinyin: "Yànmài ná tiě/Bādànmù ná tiě",
    en: "Oat Milk Latte/Almond Latte",
  },
  {
    hanzi: "燕麦丝绒拿铁",
    pinyin: "Yànmài sīróng ná tiě",
    en: "Oat Milk Velvet Latte",
  },
  {
    hanzi: "燕麦焦糖玛奇朵",
    pinyin: "Yànmài jiāotáng mǎqíduǒ",
    en: "Oat Milk Caramel Macchiato",
  },
  {
    hanzi: "大溪地香草风味巴旦木拿铁",
    pinyin: "Dàxī dì xiāngcǎo fēngwèi bādànmù ná tiě",
    en: "Tahitian Vanilla Flavored Almond Latte",
  },
  {
    hanzi: "榛果风味巴旦木拿铁",
    pinyin: "Zhēnguǒ fēngwèi bādànmù ná tiě",
    en: "Hazelnut Flavored Almond Latte",
  },
];
```

You can also pass `includeCoordinates`, if you want to extract coordinates of the image. Warning though it comes with cost: latency and may return innaccurate results. Please see below

##### **Example**

```js
const components = await mandarino.extractImage(
  {
    imageUrl:
      "https://active.starbucks.com.cn/sortable/2dfd57e3-a38d-4405-beaa-3950f625bcb6.jpg",
  },
  {
    includeCoordinates: true,
  }
);

console.log(components);

// =>
// Latency: 26246.31725
[
  {
    hanzi: "手工调制咖啡",
    pinyin: "shǒu gōng tiáo zhì kā fēi",
    en: "Handcrafted Coffee",
    coordinates: {
      x: 40,
      y: 40,
      width: 220,
      height: 30,
    },
  },
  {
    hanzi: "经典咖啡",
    pinyin: "jīng diǎn kā fēi",
    en: "Classic Coffee",
    coordinates: {
      x: 40,
      y: 80,
      width: 100,
      height: 30,
    },
  },
  {
    hanzi: "扁茄白®",
    pinyin: "biǎn qié bái",
    en: "Flat White",
    coordinates: {
      x: 40,
      y: 120,
      width: 130,
      height: 30,
    },
  },
  {
    hanzi: "拿铁/卡布奇诺",
    pinyin: "ná tiě / kǎ bù qí nuò",
    en: "Caffè Latte/Cappuccino",
    coordinates: {
      x: 40,
      y: 160,
      width: 200,
      height: 30,
    },
  },
  {
    hanzi: "_extra shot latte_",
    pinyin: "zhòng diǎn kā fēi",
    en: "Extra Shot Latte",
    coordinates: {
      x: 40,
      y: 200,
      width: 120,
      height: 30,
    },
  },
  {
    hanzi: "焦糖玛奇诺",
    pinyin: "jiāo táng mǎ qí nuò",
    en: "Caramel Macchiato",
    coordinates: {
      x: 40,
      y: 240,
      width: 140,
      height: 30,
    },
  },
  {
    hanzi: "香草/榛子风味拿铁",
    pinyin: "xiāng cǎo / zhēn zǐ fēng wèi ná tiě",
    en: "Vanilla/Hazelnut Flavored Latte",
    coordinates: {
      x: 40,
      y: 280,
      width: 200,
      height: 30,
    },
  },
  {
    hanzi: "摩卡",
    pinyin: "mó kǎ",
    en: "Caffè Mocha",
    coordinates: {
      x: 40,
      y: 320,
      width: 80,
      height: 30,
    },
  },
  {
    hanzi: "美式咖啡",
    pinyin: "měi shì kā fēi",
    en: "Caffè Americano",
    coordinates: {
      x: 40,
      y: 360,
      width: 90,
      height: 30,
    },
  },
  {
    hanzi: "鲜萃浸泡咖啡",
    pinyin: "xiān cuì jìn pào kā fēi",
    en: "Immersion Brewer Coffee",
    coordinates: {
      x: 40,
      y: 400,
      width: 140,
      height: 30,
    },
  },
  {
    hanzi: "推荐咖啡是：佛罗娜/哥伦比亚",
    pinyin: "tuī jiàn kā fēi shì: fó luó nà / gē lún bǐ yǎ",
    en: "Recommended Coffee: Verona/Colombia",
    coordinates: {
      x: 40,
      y: 440,
      width: 250,
      height: 30,
    },
  },
  {
    hanzi: "植物基选择",
    pinyin: "zhí wù jī xuǎn zé",
    en: "Plant-Based Choice",
    coordinates: {
      x: 40,
      y: 480,
      width: 120,
      height: 30,
    },
  },
  {
    hanzi: "燕麦拿铁/巴旦木拿铁",
    pinyin: "yàn mài ná tiě / bā dàn mù ná tiě",
    en: "Oat Milk Latte/Almond Latte",
    coordinates: {
      x: 40,
      y: 520,
      width: 180,
      height: 30,
    },
  },
  {
    hanzi: "燕麦丝绒拿铁",
    pinyin: "yàn mài sī róng ná tiě",
    en: "Oat Milk Velvet Latte",
    coordinates: {
      x: 40,
      y: 560,
      width: 100,
      height: 30,
    },
  },
  {
    hanzi: "燕麦焦糖玛奇诺",
    pinyin: "yàn mài jiāo táng mǎ qí nuò",
    en: "Oat Milk Caramel Macchiato",
    coordinates: {
      x: 40,
      y: 600,
      width: 160,
      height: 30,
    },
  },
  {
    hanzi: "大溪地香草风味巴旦木拿铁",
    pinyin: "dà xī dì xiāng cǎo fēng wèi bā dàn mù ná tiě",
    en: "Tahitian Vanilla Flavored Almond Latte",
    coordinates: {
      x: 40,
      y: 640,
      width: 220,
      height: 30,
    },
  },
  {
    hanzi: "榛子风味巴旦木拿铁",
    pinyin: "zhēn zǐ fēng wèi bā dàn mù ná tiě",
    en: "Hazelnut Flavored Almond Latte",
    coordinates: {
      x: 40,
      y: 680,
      width: 180,
      height: 30,
    },
  },
];
```

---

# Other API's

## 1. Chinese Converter `chineseConverter`

Utility function to convert traditional chinese to simplified (and vice versa)

Examples

```js
chineseConverter("你好。你叫什麼名字");
// => 你好。你叫什么名字

// or
chineseConverter({ input: "你好。你叫什麼名字", from: "traditional" });
// => 你好。你叫什么名字

// you can also convert traditional to simplified
chineseConverter({ input: "你好。你叫什么名字", from: "simplified" });
// => 你好。你叫什麼名字
```
