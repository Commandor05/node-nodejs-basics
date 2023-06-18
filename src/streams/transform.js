import { pipeline } from "stream/promises";
import { Transform } from "stream";

const transform = async () => {
  try {
    process.stdout.write(`Start typing. Any typed line will be reversed.\n`);
    process.stdout.write("For exit press 'ctrl + c'.\n");

    const reversesText = new Transform({
      transform(chunk, encoding, callback) {
        callback(
          null,
          chunk.toString().replace(/\n$/, "").split("").reverse().join("") +
            "\n"
        );
      },
    });

    await pipeline(process.stdin, reversesText, process.stdout);
  } catch (error) {
    console.log(error);
  }
};

await transform();
