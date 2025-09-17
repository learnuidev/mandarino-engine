const ulid = require("ulid");
const { fetchTranscript } = require("youtube-transcript-plus");

function toVTT(segments) {
  // Format seconds to VTT timestamp
  const formatTime = (seconds) => {
    const hrs = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const mins = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const secs = String(Math.floor(seconds % 60)).padStart(2, "0");
    const ms = String(Math.floor((seconds % 1) * 1000)).padStart(3, "0");
    return `${hrs}:${mins}:${secs}.${ms}`;
  };

  // Build file
  const header = "WEBVTT\n\n";
  const cues = segments.map((seg, idx) => {
    const start = formatTime(seg.start);
    const end = formatTime(seg.end);
    return `${idx + 1}\n${start} --> ${end}\n${seg.input}\n`;
  });

  return header + cues.join("\n");
}

const listTranscript = async ({ videoId, lang, format = "mandarino" }) => {
  return fetchTranscript(videoId, {
    lang,
  }).then(async (resp) => {
    const values = resp.map((item) => {
      return {
        id: ulid.ulid(),
        lang,
        input: item.text,
        start: item.offset,
        end: item.duration + item.offset,
      };
    });

    if (format === "mandarino") {
      return values;
    }

    if (format === "vtt") {
      const vtt = toVTT(values);

      return vtt;
    }

    return values;
  });
};

module.exports = {
  listTranscript,
};
