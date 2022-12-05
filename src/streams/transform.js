import { stdout, stdin } from 'process';
import { Transform, pipeline } from 'stream';

const transform = async () => {
    const readSteram = stdin;
    const writeStream = stdout;
    const revertTransform = new Transform({
        transform(chunk, encoding, callback) {
            const chunkStingified = chunk.toString().trim();
            callback(null, chunkStingified.split("").reverse().join(""));
        },
    });
  
    stdout.write(`Start typing. Any typed line will be reversed.\n`);

    pipeline(
        readSteram,
        revertTransform,
        writeStream,
        err => console.log(`Error: ${err}`)
    );
};

await transform();