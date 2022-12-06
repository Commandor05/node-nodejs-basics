import { fork } from 'child_process';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const spawnChildProcess = async (args) => {
    // Write your code here
  const fileName = 'script.js';
  const destinationDir = 'files';
  const destinationDirPath = path.join(__dirname, destinationDir);
  const destinationFilePath = path.join(destinationDirPath, fileName); 
  const child = fork(destinationFilePath, [...args]);
};

spawnChildProcess([1, 2, 3, 4, 5]);