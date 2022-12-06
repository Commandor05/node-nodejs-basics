const { stdout } = process;
import { access } from 'fs/promises';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
    // Write your code here
  const fileName = 'fileToRead.txt';
  const destinationDir = 'files';
  const destinationDirPath = path.join(__dirname, destinationDir);
  const destinationFilePath = path.join(destinationDirPath, fileName); 

  try {
    await checkFileAccess(destinationFilePath);

    const readStream = fs.createReadStream(destinationFilePath, 'utf-8');
    readStream.on('data', chunk => stdout.write(chunk));
    readStream.on('end', () => stdout.write('\n'));
  } catch(e) {
    console.log(e);
  }
};

const checkFileAccess = async (filePath) => {
  try {
    await access(filePath);
  } catch (e) {
    throw new Error("FS operation failed");
  }
};

await read();