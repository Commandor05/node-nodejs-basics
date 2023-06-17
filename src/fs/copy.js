import { mkdir, readdir, copyFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { alreadyExistsOrNotExistsError } from "../utils/errorsHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const copy = async () => {
  const sourceDir = "files";
  const sourceDirPath = path.join(__dirname, sourceDir);
  const targetDir = "files_copy";
  const targetDirPath = path.join(__dirname, targetDir);
  let copiedFilesCount = 0;

  try {
    const files = await readdir(sourceDirPath, { withFileTypes: true });
    await mkdir(targetDirPath, { recursive: false });
    for (const file of files) {
      if (file.isFile()) {
        const fileName = file.name;
        const targetFilePath = path.join(targetDirPath, fileName);
        const sourceFilePath = path.join(sourceDirPath, fileName);
        await copyFile(sourceFilePath, targetFilePath);
        copiedFilesCount++;
      }
    }

    process.stdout.write(
      `${copiedFilesCount} file${
        copiedFilesCount > 1 ? "s were" : " was"
      } copied\n`
    );
  } catch (error) {
    alreadyExistsOrNotExistsError(error);
  }
};

copy();
