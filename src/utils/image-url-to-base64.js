const https = require("https"); // Use 'http' for non-HTTPS URLs

function imageUrlToBase64(url) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (resp) => {
        let data = [];

        resp.on("data", (chunk) => {
          data.push(chunk);
        });

        resp.on("end", () => {
          const buffer = Buffer.concat(data);
          const base64String = buffer.toString("base64");
          resolve(base64String);
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

module.exports = {
  imageUrlToBase64,
};
