const fs = require('fs');
const { MarkovMachine } = require('./markov');

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
});
