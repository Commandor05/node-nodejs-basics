import { createReadStream } from "node:fs";
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
    const readableSream = createReadStream(targetFilePath);

    readableSream.on("data", (chunk) => {
      process.stdout.write(chunk);
    });

    readableSream.on("end", () => {
      process.stdout.write("\n");
    });
  } catch (error) {
    notExistsError(error);
  }
};

await read();
