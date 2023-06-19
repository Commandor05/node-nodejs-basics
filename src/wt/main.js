import os from "os";
import { Worker } from "worker_threads";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const performCalculations = async () => {
  const cpusCount = os.cpus().length;
  const workerFilePath = path.join(__dirname, "worker.js");
  const initialNumberForCalculations = 10;
  const workersList = new Map();

  for (let i = 0; i < cpusCount; i++) {
    const worker = new Worker(workerFilePath);
    const numberForCalculations = initialNumberForCalculations + i;

    worker.postMessage(numberForCalculations);

    const workerResult = await new Promise((resolve, reject) => {
      worker.on("message", (message) => {
        resolve({ status: "resolved", data: message });
      });
      worker.on("error", (error) => {
        resolve({ status: "error", data: null });
      });
      worker.on("exit", (code) => {
        if (code !== 0) {
          reject(new Error(`Worker stopped with exit code ${code}`));
        }
      });
    });

    workersList.set(worker.threadId, workerResult);
  }

  console.log(`CPUs count: ${cpusCount}`);

  for (const [workerId, workerResult] of workersList.entries()) {
    process.stdout.write(
      `(Worker ${workerId}) status: ${workerResult.status}  data: ${workerResult.data}\n`
    );
  }

  process.exit();
};

await performCalculations();
