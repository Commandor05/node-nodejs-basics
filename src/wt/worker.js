import { parentPort } from "worker_threads";

// n should be received from main thread
const nthFibonacci = (n) =>
  n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
  parentPort.on("message", (n) => {
    // Uncomment rows below to check the working with errors
    // if (n % 2 === 0) {
    //   parentPort.postMessage(nthFibonacci(n));
    // } else {
    //   throw new Error("Error: Worker thread error!");
    // }
    parentPort.postMessage(nthFibonacci(n));
  });
};

sendResult();
