import { rm } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { notExistsError } from "../utils/errorsHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const remove = async () => {
  const fileName = "fileToRemove.txt";
  const targetDir = "files";
  const targetDirPath = path.join(__dirname, targetDir);
  const targetFilePath = path.join(targetDirPath, fileName);
  try {
    await rm(targetFilePath);
    process.stdout.write(`File ${fileName} was deleted successfully!\n`);
  } catch (error) {
    notExistsError(error);
  }
};

await remove();
