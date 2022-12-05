import { createReadStream, createWriteStream } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createGzip } from 'zlib';
import { pipeline } from 'stream';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const compress = async () => {
    // Write your code here 
  const sourceFileName = "fileToCompress.txt";
  const destinationFileName = "archive.gz";
  const folderName = 'files'
  const folderPath = path.join(__dirname, folderName);
  const sourcePath = path.join(folderPath , sourceFileName);
  const destinationPath = path.join(folderPath , destinationFileName);
  
  const gzip = createGzip();
  const source = createReadStream(sourcePath);
  const destination = createWriteStream(destinationPath);

  pipeline(
      source,
      gzip,
      destination,
      (err) => {
          if (err) {
              console.log(`Error: ${err}`);
              process.exitCode = 1;
          }
      }
  );
};

await compress();