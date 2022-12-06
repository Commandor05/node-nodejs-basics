const { stdout } = process;
import { readdir, access } from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
    // Write your code here 
  const targetFolder = "files";
  const targetPath = path.join(__dirname, targetFolder);
  let files = null;

  try {
    await checkFileAccess(targetPath);
    files = await readdir(targetPath);
    if (files) {
      files.forEach(file => {
        const output = `${file} \n`;
        stdout.write(output);
      });
    }
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
}

await list();