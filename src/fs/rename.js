import { rename as renameFile, access } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { alreadyExistsOrNotExistsError } from "../utils/errorsHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rename = async () => {
  const sourceFileName = "wrongFilename.txt";
  const targetFileName = "properFilename.mdd";
  const sourceDir = "files";
  const sourceDirPath = path.join(__dirname, sourceDir);
  const oldFilePath = path.join(sourceDirPath, sourceFileName);
  const newFilePath = path.join(sourceDirPath, targetFileName);

  try {
    await access(newFilePath);
    //if properFilename.md already exists - show Error with message FS operation failed and exit
    process.stdout.write("Error: FS operation failed\n");
    return;
  } catch (error) {
    //do noting
  }

  try {
    await renameFile(oldFilePath, newFilePath);

    process.stdout.write(
      `File ${sourceFileName} was renamed to -> ${targetFileName}\n`
    );
  } catch (error) {
    alreadyExistsOrNotExistsError(error);
  }
};

await rename();
