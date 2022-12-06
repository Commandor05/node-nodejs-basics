import { createHash, } from 'crypto';
import { readFile } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
    // Write your code here 
  const fileName = 'fileToCalculateHashFor.txt';
  const destinationDir = 'files';
  const destinationDirPath = path.join(__dirname, destinationDir);
  const destinationFilePath = path.join(destinationDirPath, fileName); 

  const fileBuffer = await readFile(destinationFilePath, { encoding: 'utf8' });
  const hash = createHash('sha256');
  hash.update(fileBuffer);

  const hex = hash.digest('hex');

  console.log(hex);
};

await calculateHash();