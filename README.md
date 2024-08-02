# Mandarino

Mandarino API in JS

## Install

```bash
npm install mandarino@latest
```

## Usage

```javascript
import { mandarinoApi } from "mandarino";

const mandarino = mandarinoApi({
  apiKey: "OPENAI_API_KEY",
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
} = mandarino;
```

---

## Feature Usage Guide

1. Discover `discover`
2. Grammar Analysis `listGrammarAnalysis`
3. Detect Langauge `detectLanguage`
4. Generate Sentences `genSentences`
5. Generate Conversation `genConversation`
6. Get Summary `getSummary`
7. List Components `listComponents`

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

### 5. Generate Conversation

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

### 6. Get Summary

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

#### 7. List Components

`listComponents` is a synchronous function that returns a list of components

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
