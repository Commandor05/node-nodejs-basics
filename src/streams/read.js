const { stdout } = process;
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
    const readStream = fs.createReadStream(destinationFilePath, 'utf-8');
    readStream.on('data', chunk => stdout.write(chunk));
    readStream.on('end', () => stdout.write('\n'));
  } catch(e) {
    console.log(e);
  }
};

await read();