/** Command-line tool to generate Markov text. */

const fs = require('fs');
const axios = require('axios');
const sourceType = process.argv[2];
const source = process.argv[3];
const { MarkovMachine } = require('./markov');

const logText = (data) => {
  const mm = new MarkovMachine(data);
  const textOut = mm.makeText();
  console.log(textOut);
}

const cat = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.error(`ERROR: Unable to read file ${source}.`, err);
      process.exit(1);
    }
    logText(data);
  });
}

const webCat = async function (url) {
  try {
    const { data: content } = await axios.get(url);
    logText(content);
  } catch (err) {
    console.error(`ERROR: Unable to read URL ${source}.`, err);
  }
}

if (sourceType === 'file') {
  cat(source);
} else if (sourceType === 'url') {
  webCat(source);
} else {
  console.error(`ERROR: Unknown type '${sourceType}'. Use 'file' or 'url'.`);
}
