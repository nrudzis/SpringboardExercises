const fs = require('fs');
const axios = require('axios');
const path = process.argv[2];

const cat = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    }
    console.log(data);
  });
}

const webCat = async function (path) {
  try {
    const { data: content } = await axios.get(path);
    console.log(content);
  } catch (err) {
    console.log('ERROR: ', err);
  }
}


path.startsWith('http') ? webCat(path) : cat(path);
