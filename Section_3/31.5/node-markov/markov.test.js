const fs = require('fs');
const { MarkovMachine } = require('./markov');
const makeWordsArr = (text) => {
  return text.split(/(?:[ \r\n]+|\b)(?=\.{3}|\b)/);
}

describe('test Markov Machine', () => {

  let mm;

  beforeAll(() => {
    try {
      const content = fs.readFileSync('eggs.txt', 'utf8')
      mm = new MarkovMachine(content);
    } catch (err) {
      console.error(err);
      process.exit(1);
    }
  });

  test('should return a string', () => {
    const textOut = mm.makeText();
    expect(typeof textOut).toBe('string');
  });

  test('should return a string of 100 words, if no argument provided', () => {
    const textOut = mm.makeText();
    const wordsOut = makeWordsArr(textOut);
    expect(wordsOut).toHaveLength(100);
  });

  test('should return a string with the same number of words as the argument number, if provided', () => {
    const textOut = mm.makeText(234);
    const wordsOut = makeWordsArr(textOut);
    expect(wordsOut).toHaveLength(234);
  });

  test('should return a string of words consisting only of words in the source text', () => {
    const textOut = mm.makeText();
    const wordsIn = mm.words;
    const wordsOut = makeWordsArr(textOut);
    const isWordsOutInWordsIn = wordsOut.every(word => wordsIn.includes(word));
    expect(isWordsOutInWordsIn).toEqual(true);
  });

  test("should return a string with each pair of adjacent words generated from the chain's key-value pairs", () => {
    const wordChains = mm.makeChains();
    const textOut = mm.makeText();
    const wordsOut = makeWordsArr(textOut);
    const isAdjacentWordsFromKeyValue = wordsOut.slice(0, -1).every((word, index) => wordChains[word].includes(wordsOut[index + 1]));
    expect(isAdjacentWordsFromKeyValue).toEqual(true);
  });

});
