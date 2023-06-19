import { createReadStream, createWriteStream } from "node:fs";
import { createUnzip } from "node:zlib";
import { pipeline } from "stream/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const decompress = async () => {
  const sourceFileName = "archive.gz";
  const targetFileName = "fileToCompress.txt";
  const targetDir = "files";
  const targetDirPath = path.join(__dirname, targetDir);
  const sourceFilePath = path.join(targetDirPath, sourceFileName);
  const targetFilePath = path.join(targetDirPath, targetFileName);

  try {
    const readableSream = createReadStream(sourceFilePath);
    const writableSream = createWriteStream(targetFilePath);
    const unzip = createUnzip();

    await pipeline(readableSream, unzip, writableSream);

    process.stdout.write(
      `File - "${sourceFileName}" was decompressed to "${targetFileName}" in "/${targetDir}"\n`
    );
  } catch (error) {
    console.log(error);
  }
};

await decompress();
