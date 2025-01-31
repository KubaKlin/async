const fs = require('fs').promises;

async function readTextFileAsync(path) {
  try {
    const contents = await fs.readFile(path, 'utf8');
    return contents;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    } else {
      throw error;
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
