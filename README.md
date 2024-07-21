# Narakeet

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

## 1. Discover

```javascript
mandarino.discover({ content: "从" }).then((character) => {
  console.log("Char", character);
});

// logs
{
  hanzi: '从',
  tone_level: 2,
  pinyin: 'cóng',
  grammar_type: 'preposition/part of a word',
  en: 'from/obey/follow/engage in (work, study)/on the basis of',
  initial: 'c',
  final: 'ong',
  group: 'cong',
  discoveredAt: 1721593278899
}
```
