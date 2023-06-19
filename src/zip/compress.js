import { createReadStream, createWriteStream } from "node:fs";
import { createGzip } from "node:zlib";
import { pipeline } from "stream/promises";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compress = async () => {
  const sourceFileName = "fileToCompress.txt";
  const targetFileName = "archive.gz";
  const targetDir = "files";
  const targetDirPath = path.join(__dirname, targetDir);
  const sourceFilePath = path.join(targetDirPath, sourceFileName);
  const targetFilePath = path.join(targetDirPath, targetFileName);

  try {
    const readableSream = createReadStream(sourceFilePath);
    const writableSream = createWriteStream(targetFilePath);
    const gzip = createGzip();

    await pipeline(readableSream, gzip, writableSream);

    process.stdout.write(
      `File - "${sourceFileName}" was compressed to "${targetFileName}" in "/${targetDir}"\n`
    );
  } catch (error) {
    console.log(error);
  }
};

await compress();
