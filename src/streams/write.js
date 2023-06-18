import { createWriteStream } from "node:fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const write = async () => {
  const fileName = "fileToWrite.txt";
  const targetDir = "files";
  const targetDirPath = path.join(__dirname, targetDir);
  const targetFilePath = path.join(targetDirPath, fileName);
  try {
    const writableSream = createWriteStream(targetFilePath);
    process.stdout.write(
      `Start typing. Any typed data will be written to file ${fileName}.\n`
    );
    process.stdout.write("For exit press 'ctrl + c'.\n");

    process.stdin.on("data", (chank) => {
      writableSream.write(chank);
    });
  } catch (error) {
    console.log(error);
  }
};

await write();
