import { stdout as output, stdin as input} from 'process';
import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
    // Write your code here
  const fileName = 'fileToWrite.txt'; 
  const destinationDir = 'files';
  const destinationDirPath = path.join(__dirname, destinationDir);
  const destinationFilePath = path.join(destinationDirPath, fileName);  
  const readLine = readline.createInterface({ input, output });
  let writeStream = fs.createWriteStream(destinationFilePath);

  output.write(`Start typing. Any typed line will be written to file ${fileName}.\n`);
  output.write("For exit press 'ctrl + c' or just type 'exit'.\n");

  readLine.on('line', (input) => {

    if (input.trim() === 'exit') {
      process.exit();
    }
  
    writeStream.write(`${input}\n`);
  });
  
};

await write();