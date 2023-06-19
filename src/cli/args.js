import Formatter from "../utils/formatter.js";

const parseArgs = () => {
  const args = process.argv.slice(2);
  const argsFormatter = new Formatter(Formatter.formatTypes.args);
  process.stdout.write(argsFormatter.format(args));
};

parseArgs();
