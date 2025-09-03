function uuid() {
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    // Works in modern Node.js and browsers
    return crypto.randomUUID();
  }

  const { v4: uuidv4 } = require("uuid");
  // Fallback to uuid package method
  return uuidv4();
}

async function segmentTextRaw({ text, lang }) {
  const segmenter = new Intl.Segmenter(lang, { granularity: "word" });

  const segments = segmenter.segment(text);
  let res = [];

  for (const segment of segments) {
    res.push({
      input: segment.segment,
      startIndex: segment.index,
      endIndex: segment.index + segment.segment.length,
      lang,
      id: uuid(),
    });
  }

  return res;
}

module.exports = {
  segmentTextRaw,
};
