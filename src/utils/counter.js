const counter = (sentence) => {
  const wordCount = sentence.split(" ").filter((el) => el !== "").length;
  const characterCount = sentence.length;

  return { wordCount, characterCount };
};

export default counter;
