const fs = require('fs').promises;

async function readTextFileAsync(path) {
  try {
    return await fs.readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    } else {
      throw new Error('something went wrong');
    }
  }
}

(async () => {
  try {
    const contents = await readTextFileAsync('./example.txt');
    if (contents !== null) {
      console.log('File contents:', contents);
    } else {
      console.log('File not found');
    }
  } catch (error) {
    console.error('Error reading file:', error);
  }
})();
