const fs = require('fs');
const axios = require('axios');
const args = process.argv;
const isWriteOut = args[2] === '--out';

const writeOut = (i, data) => {
  const outFiles = args.slice(3).filter((_, index) => index % 2 == 0);
  console.log(outFiles);
  const outFile = outFiles[i];
  fs.writeFile(`./${ outFile }`, data, 'utf8', err => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    }
    console.log('Successfully wrote to file!');
  });
}

const cat = (i, path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    } else if (isWriteOut) {
      writeOut(i, data);
    } else {
      console.log(data);
    }
  });
}

const webCat = async function (i, url) {
  try {
    const { data: content } = await axios.get(url);
    if (isWriteOut) {
      writeOut(i, content);
    } else {
    console.log(content);
    }
  } catch (err) {
    console.log('ERROR: ', err);
  }
}

let inputSources;
!isWriteOut ? inputSources = args.slice(2) : inputSources = args.slice(3).filter((_, index) => index % 2 != 0);
console.log(inputSources);
inputSources.forEach((inputSource, index) => {
  inputSource.startsWith('http') ? webCat(index, inputSource) : cat(index, inputSource);
});
