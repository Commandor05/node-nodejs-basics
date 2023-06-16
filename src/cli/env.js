import Formatter from "../utils/formatter.js";

const parseEnv = () => {
  const selector = /^RSS_/;
  const envFormatter = new Formatter(Formatter.formatTypes.env);
  const envVarsAsArray = Object.entries(process.env);
  const targetVarsArray = envVarsAsArray.filter((key, value) =>
    selector.test(key)
  );

  process.stdout.write(envFormatter.format(targetVarsArray));
};

parseEnv();
