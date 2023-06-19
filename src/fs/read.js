import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { notExistsError } from "../utils/errorsHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const read = async () => {
  const fileName = "fileToRead.txt";
  const targetDir = "files";
  const targetDirPath = path.join(__dirname, targetDir);
  const targetFilePath = path.join(targetDirPath, fileName);
  try {
    const fileContent = await readFile(targetFilePath);
    process.stdout.write(`${fileContent}\n`);
  } catch (error) {
    notExistsError(error);
  }
};

await read();
