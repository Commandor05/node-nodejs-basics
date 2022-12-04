import { stdout as output, stdin as input} from 'process';
import { Transform, Readable } from 'stream';
import readline from 'readline';

const transform = async () => {
    const revertTransform = new Transform({
        transform(chunk, encoding, callback) {
            callback(null, String(chunk).split("").reverse().join(""));
        },
    });

    const readLine = readline.createInterface({ input, output });
    const inStream = new Readable({
        read() {}
    });
  
    output.write(`Start typing. Any typed line will be reversed.\n`);
  
    readLine.on('line', (input) => {
      inStream.push(input);
      inStream.pipe(revertTransform).pipe(output);
      readLine.close();
    });

    process.on('exit', () => output.write(`\n`));
};

await transform();