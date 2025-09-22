const { mandarinoQwen } = require("../test.client");

mandarinoQwen
  .textToImage({
    text: "A cute, cartoon-style anthropomorphic penguin plush toy, standing in a painting studio, wearing a red knitted scarf and beret.",
  })
  .then((resp) => {
    console.log("resp", JSON.stringify(resp, null, 4));
  });

const proResp = {
  id: "01K5QR8EVTQQBNZANDM90TD6S2",
  latency: 18632.299625,
  model: "wan2.2-t2i-plus",
  imageUrl:
    "https://dashscope-result-sgp.oss-ap-southeast-1.aliyuncs.com/1d/ea/20250922/42f0a931/7c15d2e3-7f3e-43ee-857c-656c458792624082439432.png?Expires=1758598953&OSSAccessKeyId=LTAI5tRcsWJEymQaTsKbKqGf&Signature=OIDpGJbgiInuTNppm3rHz0RIc20%3D",
  createdAt: 1758512561023,
};
