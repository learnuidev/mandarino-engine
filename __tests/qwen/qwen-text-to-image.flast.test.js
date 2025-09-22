const { mandarinoQwen } = require("../test.client");

mandarinoQwen
  .textToImage({
    model: "wan2.2-t2i-flash",
    text: "A cute, cartoon-style anthropomorphic penguin plush toy, standing in a painting studio, wearing a red knitted scarf and beret.",
  })
  .then((resp) => {
    console.log("resp", JSON.stringify(resp, null, 4));
  });

const sampleResp = {
  id: "01K5QR6GG8GHECNR38M762RXZV",
  latency: 12103.941667000001,
  model: "wan2.2-t2i-flash",
  imageUrl:
    "https://dashscope-result-sgp.oss-ap-southeast-1.aliyuncs.com/1d/a1/20250922/652f5a73/35992b6c-420c-4a59-8201-1ccef2e893521834650970.png?Expires=1758598891&OSSAccessKeyId=LTAI5tRcsWJEymQaTsKbKqGf&Signature=uOmj35%2F2MElfqSbZJzk6JaUJvkc%3D",
  createdAt: 1758512497162,
};
