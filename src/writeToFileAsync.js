const fs = require('fs').promises;

async function writeToFileAsync(filePath, content) {
  try {
    await fs.writeFile(filePath, content);
    const stats = await fs.stat(filePath);
    return stats.size / 1024;
  } catch {
    return null;
  }
}

async function writeHelloWorldExample() {
  const size = await writeToFileAsync(
    'example.txt',
    'Hello, World! \nasync file content included',
  );
  if (size !== null) {
    console.log(`File saved successfully. Size: ${size.toFixed(2)} KB`);
  } else {
    console.log('File saving failed.');
  }
}

writeHelloWorldExample();
