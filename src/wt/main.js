import os from 'os'
import { Worker } from 'worker_threads';
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
    // Write your code here
  const numbersOfCPU = os.cpus().length;
  const startNumber = 10;
  const endNumber = startNumber + numbersOfCPU;
  const fileName = 'worker.js';
  const destinationFilePath = path.join(__dirname, fileName);
  const argNumbers = [];

  for(let argNumber = startNumber; argNumber < endNumber; argNumber++) {
    argNumbers.push(argNumber);
  }

  const results = await Promise.all(argNumbers.map(n => {
    return  new Promise((resolve, reject) => {
      const worker = new Worker(destinationFilePath, {
        workerData: n
      });
      worker.on('message', resolve );
      worker.on('error', reject);
      worker.on('exit', (code) => {
        if (code !== 0)
          reject(new Error(`Worker stopped with exit code ${code}`));
      });
    });
  }));

  console.log(results);
}

await performCalculations();