import { writeFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { alreadyExistsError } from "../utils/errorsHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const create = async () => {
  const fileContent = "I am fresh and young";
  const fileName = "fresh.txt";
  const targetDir = "files";
  const targetDirPath = path.join(__dirname, targetDir);
  const targetFilePath = path.join(targetDirPath, fileName);
  try {
    const promise = writeFile(targetFilePath, fileContent, { flag: "wx" });
    await promise;
    process.stdout.write("File created successfully!\n");
  } catch (error) {
    alreadyExistsError(error);
  }
};

await create();
