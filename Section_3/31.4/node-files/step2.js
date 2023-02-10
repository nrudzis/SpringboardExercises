const fs = require('fs');
const axios = require('axios');
const arg = process.argv[2];

const cat = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    }
    console.log(data);
  });
}

const webCat = async function (url) {
  try {
    const { data: content } = await axios.get(url);
    console.log(content);
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

arg.startsWith('http') ? webCat(arg) : cat(arg);
