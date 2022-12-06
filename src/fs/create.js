import { writeFile, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
    // Write your code here
    const fileName = 'fresh.txt';
    const content = 'I am fresh and young';
    const destinationDir = 'files';
    const destinationDirPath = path.join(__dirname, destinationDir);
    const destinationFilePath = path.join(destinationDirPath, fileName);
    let isFileExists = false;

    try {
      await access(destinationFilePath);
      isFileExists = true;
    } catch(e) {
      //ignore the file is not exists
    }

    try {   
      if (isFileExists) {
        throw new Error('FS operation failed');
      }
      
      await writeFile(destinationFilePath, content);
    } catch(e) {
      console.log(e)
    }
};

await create();