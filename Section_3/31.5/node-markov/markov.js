/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/(?:[ \r\n]+|\b)(?=\.{3}|\b)/);
    this.words = words;
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    const wordChains = {};
    this.words.forEach((word, index) => {
      if (!wordChains[word]) {
        wordChains[word] = [];
      }
      let nextWord;
      this.words[index + 1] === undefined ? nextWord = null : nextWord = this.words[index + 1];
      if (!wordChains[word].includes(nextWord)) {
        wordChains[word].push(nextWord);
      }
    });
    return wordChains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    const chains = this.makeChains();
    const chainsKeys = Object.keys(chains);
    const textArr = [];
    let textWord;
    do {
      textWord = chainsKeys[Math.floor(Math.random() * chainsKeys.length)];
    } while (JSON.stringify(chains[textWord]) === JSON.stringify([null]));
    textArr.push(textWord);
    let nextTextWord;
    while (textArr.length < numWords) {
      do {
        nextTextWord = chains[textWord][Math.floor(Math.random() * chains[textWord].length)];
      } while (nextTextWord === null || textArr.length !== numWords - 1 && JSON.stringify(chains[nextTextWord]) === JSON.stringify([null]));
      textArr.push(nextTextWord);
      textWord = nextTextWord;
    }
    const randomText = textArr.map((el, index) => (index + 1 === textArr.length || /[a-z]/i.test(el) && /[.,;!?:-]$/.test(textArr[index + 1]) || /[-]$/.test(el) && /[a-z]/i.test(textArr[index + 1])) ? el : el + ' ').join('');
    return randomText;
  }
}

module.exports = {
  MarkovMachine: MarkovMachine
};
