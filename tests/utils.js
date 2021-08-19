export function getWords(elem) {
  return elem.text().replace(/\s+/g, "");
}
