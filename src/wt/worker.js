import { workerData, parentPort } from 'worker_threads';

// n should be received from main thread
const n = workerData;
const nthFibonacci = (n) => n < 2 ? n : nthFibonacci(n - 1) + nthFibonacci(n - 2);

const sendResult = () => {
    // This function sends result of nthFibonacci computations to main thread
    const result = { status: 'resolved', data: nthFibonacci(n) };
    parentPort.postMessage(result);
};

sendResult();