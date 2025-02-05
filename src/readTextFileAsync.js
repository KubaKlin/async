const fs = require('fs').promises;

async function readTextFileAsync(path) {
  try {
    return await fs.readFile(path, 'utf8');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw new Error('something went wrong');
  }
}

async function readExampleFile() {
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
}

readExampleFile();
