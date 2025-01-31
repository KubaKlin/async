const fs = require('fs').promises;

function readTextFile(path) {
  return fs
    .readFile(path, 'utf8')
    .then((contents) => contents)
    .catch((error) => {
      if (error.code === 'ENOENT') {
        return null;
      } else {
        throw error;
      }
    });
}

readTextFile('./example.txt')
  .then((contents) => {
    if (contents !== null) {
      console.log('File contents:', contents);
    } else {
      console.log('File not found');
    }
  })
  .catch((error) => console.error('Error reading file:', error));
