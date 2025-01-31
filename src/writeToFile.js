const fs = require('fs').promises;
const path = require('path');

function writeToFile(filePath, content) {
  return fs
    .writeFile(filePath, content)
    .then(() => fs.stat(filePath))
    .then((stats) => stats.size / 1024) // Convert size to kilobytes
    .catch(() => null);
}

writeToFile('example.txt', 'Hello, World! \nfile content').then((size) => {
  if (size !== null) {
    console.log(`File saved successfully. Size: ${size.toFixed(2)} KB`);
  } else {
    console.log('File saving failed.');
  }
});
