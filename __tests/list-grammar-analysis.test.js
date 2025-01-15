const { mandarinoClient } = require("./test.client");

mandarinoClient
  .listGrammarAnaysis({ content: "diminetile-s la fel", lang: "ro" })
  .then((resp) => {
    console.log("RESP", resp);
  });

const sampleResp = [
  {
    input: "diminetile-s",
    en: "morning-PL",
    explanation:
      "The word 'diminetile' is the plural form of 'dimineață' (morning) in Romanian. The suffix '-s' is added to indicate plurality. This is a colloquial or regional variation, as the standard plural form is 'dimineți'.",
  },
  {
    input: "la",
    en: "at/to",
    explanation:
      "The preposition 'la' in Romanian can mean 'at' or 'to,' depending on the context. Here, it is used to indicate a general time or state.",
  },
  {
    input: "fel",
    en: "same/way",
    explanation:
      "The word 'fel' means 'same' or 'way' in English. In this context, it implies 'the same' or 'in the same way.'",
  },
  {
    input: "diminetile-s la fel",
    en: "mornings the same",
    explanation:
      "The phrase 'diminetile-s la fel' translates to 'mornings the same' or 'mornings in the same way.' It suggests that the mornings are similar or unchanged in some context, possibly implying routine or repetition.",
  },
];
