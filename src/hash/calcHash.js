import { createReadStream } from "node:fs";
const { createHash } = await import("node:crypto");
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const calculateHash = async () => {
  const fileName = "fileToCalculateHashFor.txt";
  const targetDir = "files";
  const targetDirPath = path.join(__dirname, targetDir);
  const targetFilePath = path.join(targetDirPath, fileName);
  try {
    const stream = createReadStream(targetFilePath);
    const hash = createHash("sha256");

    stream.pipe(hash).setEncoding("hex").pipe(process.stdout);

    stream.on("end", () => process.stdout.write("\n"));
  } catch (error) {
    console.log(error);
  }
};

await calculateHash();
