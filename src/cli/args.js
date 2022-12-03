const { argv, stdout } = process;

const parseArgs = () => {
    // Write your code here 
    const args = argv;
    args.forEach((currentValue, index, array) => {
      if (currentValue.includes("--")) {
        let output = `${currentValue.replace("--", "")} is ${array[index + 1]},`;
        stdout.write(output + "\n");
      }
    });
};

parseArgs();