import { access, rename as fsRename } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
    // Write your code here 
  const sourceFileName = "wrongFilename.txt";
  const destinationFileName = "properFilename.md";
  const folderName = 'files'
  const folderPath = path.join(__dirname, folderName);
  const sourcePath = path.join(folderPath , sourceFileName);
  const destinationPath = path.join(folderPath , destinationFileName);

  try {
    await checkCopyFoldersAccess(sourcePath, destinationPath);
    await fsRename(sourcePath, destinationPath);
  } catch (e) {
    console.log(e);
  }
};


const checkCopyFoldersAccess = async (sourcePath, destinationPath) => {
  let isDestinationExists = false;

  try {
    await access(destinationPath);
    isDestinationExists = true;
  } catch (e) {
    //ignore the Destination is not exists
  }
  //destination shouldn't exist
  if (isDestinationExists) {
    throw new Error("FS operation failed");
  }

  try {
    await access(sourcePath);
  } catch (e) {
    //sourse should exist
    throw new Error("FS operation failed");
  }
};

await rename();