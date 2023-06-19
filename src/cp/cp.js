import { spawn } from "node:child_process";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const spawnChildProcess = async (args) => {
  const fileName = "script.js";
  const targetDir = "files";
  const targetDirPath = path.join(__dirname, targetDir);
  const targetFilePath = path.join(targetDirPath, fileName);
  const childProcess = spawn(process.argv[0], [targetFilePath, ...args], {});
  process.stdin.pipe(childProcess.stdin);
  childProcess.stdout.pipe(process.stdout);
};

spawnChildProcess(["arg1", "arg2", "arg3"]);
