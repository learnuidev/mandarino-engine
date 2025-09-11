const { listSystemVoicesApi } = require("./list-system-voices-api");
const { minimaxTextToSpeechApi } = require("./minimax-text-to-speech-api");

const createMinimaxApi = ({ minimaxApiKeys }) => {
  const listSystemVoices = ({ lang }) => {
    return listSystemVoicesApi({ minimaxApiKeys, lang });
  };

  const textToSpeech = ({ text, lang, emotion, model }) => {
    return minimaxTextToSpeechApi({
      text,
      lang,
      emotion,
      model,
      minimaxApiKeys,
    });
  };

  return {
    listSystemVoices,
    textToSpeech,
  };
};

module.exports = {
  createMinimaxApi,
};
