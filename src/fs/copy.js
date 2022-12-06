import { readdir, access, copyFile, mkdir } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
    // Write your code here 
  const sourceFolder = "files";
  const destinationFolder = "files_copy";
  const sourcePath = path.join(__dirname, sourceFolder);
  const destinationPath = path.join(__dirname, destinationFolder);

  try {
    await checkCopyFoldersAccess(sourcePath, destinationPath);
    await mkdir(destinationPath, { recursive: true });
    await copyAllFilesFromFolder(sourcePath, destinationPath);
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
    //sourse shouldn exist
    throw new Error("FS operation failed");
  }
};

const copyAllFilesFromFolder = async (sourceFolderPath,destinationFolderPath) => {
  try {
    const directoryItems = await readdir(sourceFolderPath, { withFileTypes: true });
    for (let directoryItem of directoryItems) {
      const fileSourcePath = path.join(sourceFolderPath, directoryItem.name);
      const fileDestinationPath = path.join(
        destinationFolderPath,
        directoryItem.name
      );
      await copyFile(fileSourcePath, fileDestinationPath);
    }
  } catch (err) {
    console.log(err);
  }
};

copy();