const filesystem = require('fs').promises;

function readTextFile(path) {
  return filesystem.readFile(path, 'utf8').catch((error) => {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw new Error('something went wrong');
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
