import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createUnzip } from 'zlib';
import { pipeline } from 'stream';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
    // Write your code here 
  const sourceFileName = "archive.gz";
  const destinationFileName = "fileToCompress.txt";
  const folderName = 'files'
  const folderPath = path.join(__dirname, folderName);
  const sourcePath = path.join(folderPath , sourceFileName);
  const destinationPath = path.join(folderPath , destinationFileName);
  
  const decompress = createUnzip();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);   

  pipeline(
    source,
    decompress,
    destination,
    (err) => {
        if (err) {
            console.log(`Error: ${err}`);
            process.exitCode = 1;
        }
    }
);
};

await decompress();