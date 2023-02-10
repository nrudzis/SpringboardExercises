const fs = require('fs');
const fileToRead = process.argv[2];

const cat = (path) => {
  fs.readFile(path, 'utf8', (err, data) => {
    if (err) {
      console.log('ERROR: ', err);
      process.exit(1);
    }
    console.log(data);
  });
}

cat(fileToRead);
