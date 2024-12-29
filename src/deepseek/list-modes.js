// curl -L -X GET 'https://api.deepseek.com/models' \
// -H 'Accept: application/json' \
// -H 'Authorization: Bearer <TOKEN>'

const deepSeekApiKey = ``;

fetch(`https://api.deepseek.com/models`, {
  method: "GET",
  headers: {
    Authorization: `Bearer ${deepSeekApiKey}`,
  },
}).then(async (resp) => {
  const respJson = await resp.json();

  console.log("RESP", respJson);
});
