import { rm, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
    // Write your code here 
  const fileName = 'fileToRemove.txt';
  const destinationDir = 'files';
  const destinationDirPath = path.join(__dirname, destinationDir);
  const destinationFilePath = path.join(destinationDirPath, fileName);

  try {
    await checkFileAccess(destinationFilePath);
    await rm(destinationFilePath)
  } catch(e) {
    console.log(e)
  }
};

const checkFileAccess = async (filePath) => {
  try {
    await access(filePath);
  } catch (e) {
    throw new Error("FS operation failed");
  }
}

await remove();