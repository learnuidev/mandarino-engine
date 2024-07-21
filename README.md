# Mandarino

Mandarino API in JS

## Install

```bash
npm install mandarino
```

## Usage

```javascript
// Using Require
const { mandarinoApi } = require("mandarino");

// Using Import
// import {  mandarinoApi } from "mandarino";

const mandarino = mandarinoApi({
  apiKey: "OPENAI_API_KEY",
});
```

---

# API's

1. Discover `discover`
2. Detect Langauge `detectLanguage`
3. Generate Sentences `genSentences`

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

## 2. Detect Language

```js
mandarino.detectLanguage({ content: "从" }).then((lang) => {
  console.log("lang", lang);
});

// => 'zh'
```

## 3. Generate Sentences (`genSentences`)

```javascript
mandarino.genSentences({ content: "从" }).then((sentences) => {
  console.log("sentences", sentences);
});

// =>
[
  {
    hanzi: "从这里开始",
    pinyin: "Cóng zhèlǐ kāishǐ",
    en: "Start from here",
    explanation:
      "In this sentence, 从 means 'from', 这里 means 'here', and 开始 means 'start'. Combined, 从这里开始 means 'Start from here'.",
  },
  {
    hanzi: "从左边到右边",
    pinyin: "Cóng zuǒbiān dào yòubiān",
    en: "From left to right",
    explanation:
      "Here, 从 means 'from', 左边 means 'left side', 右边 means 'right side'. Combined, 从左边到右边 means 'From left to right'.",
  },
  {
    hanzi: "他从学校回家了",
    pinyin: "Tā cóng xuéxiào huí jiāle",
    en: "He went home from school",
    explanation:
      "In this sentence, 他 means 'he', 学校 means 'school', 回家 means 'go home'. Combined, 他从学校回家了 means 'He went home from school'.",
  },
  {
    hanzi: "从早到晚",
    pinyin: "Cóng zǎo dào wǎn",
    en: "From morning till night",
    explanation:
      "Here, 从 means 'from', 早 means 'early/morning', 晚 means 'night'. Combined, 从早到晚 means 'From morning till night'.",
  },
  {
    hanzi: "出发从这里",
    pinyin: "Chūfā cóng zhèlǐ",
    en: "Depart from here",
    explanation:
      "In this sentence, 出发 means 'depart', 从 means 'from', 这里 means 'here'. Combined, 出发从这里 means 'Depart from here'.",
  },
];
```
