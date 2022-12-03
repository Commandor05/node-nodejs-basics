const { stdout } = process;

const parseEnv = () => {
    // Write your code here 
    const env = process.env;
    for (let [key, value] of Object.entries(env)) {
      if (key.includes("RSS_")) {
        const output = `${key}=${value};`;
        stdout.write(output + "\n");
      }
    }
};

parseEnv();