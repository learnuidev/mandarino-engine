const removeNull = (obj) => {
  // eslint-disable-next-line no-unused-vars
  return Object.fromEntries(Object.entries(obj).filter(([_, v]) => Boolean(v)));
};

module.exports.removeNull = removeNull;

const isPattern = (sent) => {
  // const exampleSent = '如果…那么…'
  return sent?.includes("…") || sent?.includes("...");
};

module.exports.isPattern = isPattern;
