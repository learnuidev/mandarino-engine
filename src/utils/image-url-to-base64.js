async function imageUrlToBase64(url) {
  // Fetch the remote image and get the ArrayBuffer
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch image: ${response.status} ${response.statusText}`
    );
  }

  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  // Determine the extension from the Content-Type header
  const contentType = response.headers.get("content-type") || "image/png";
  const ext = contentType.split("/")[1]; // e.g. "png", "jpeg", etc.

  // Convert to Base64
  const base64 = buffer.toString("base64");
  const dataUrl = `data:${contentType};base64,${base64}`;

  return dataUrl;
}

module.exports = {
  imageUrlToBase64,
};
