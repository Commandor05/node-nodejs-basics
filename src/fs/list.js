import { readdir } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { notExistsError } from "../utils/errorsHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const list = async () => {
  const sourceDir = "files";
  const sourceDirPath = path.join(__dirname, sourceDir);
  try {
    const files = await readdir(sourceDirPath, { withFileTypes: true });
    const filesList = [];

    function FileListItem(name, type) {
      this.name = name;
      this.type = type;
    }

    for (const file of files) {
      filesList.push(
        new FileListItem(file.name, file.isDirectory() ? "Directory" : "File")
      );
    }

    console.table(filesList);
  } catch (error) {
    notExistsError(error);
  }
};

await list();
