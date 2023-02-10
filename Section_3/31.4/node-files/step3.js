const fs = require('fs');
const axios = require('axios');
const arg3 = process.argv[2];

const writeOut = (data) => {
  const outFile = process.argv[3];
  fs.writeFile(`./${ outFile }`, data, 'utf8', err => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    }
    console.log('Successfully wrote to file!');
  });
}

const cat = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    } else if (arg3 === '--out') {
      writeOut(data);
    } else {
      console.log(data);
    }
  });
}

const webCat = async function (url) {
  try {
    const { data: content } = await axios.get(url);
    if (arg3 === '--out') {
      writeOut(content);
    } else {
    console.log(content);
    }
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

if (arg3 != '--out') {
  arg3.startsWith('http') ? webCat(arg3) : cat(arg3);
} else {
  const arg5 = process.argv[4];
  arg5.startsWith('http') ? webCat(arg5) : cat(arg5);
}
