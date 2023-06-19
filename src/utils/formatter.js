class Formatter {
  static #formatTypes = {
    args: "args",
    env: "env",
  };

  #formatterConfig = {
    [Formatter.formatTypes.args]: {
      formatter: "argsFormatter",
      valueSeparator: " is ",
      devider: ", ",
    },
    [Formatter.formatTypes.env]: {
      formatter: "envFormatter",
      valueSeparator: "=",
      devider: "; ",
    },
  };

  type = Formatter.formatTypes.args;

  constructor(type, valueSeparator, devider) {
    if (Object.values(Formatter.formatTypes).includes(type)) {
      this.type = type;

      if (valueSeparator) {
        this.#formatterConfig[type].valueSeparator = valueSeparator;
      }

      if (devider) {
        this.#formatterConfig[type].devider = devider;
      }
    }
  }

  static get formatTypes() {
    return this.#formatTypes;
  }

  format(args) {
    return this[this.#formatterConfig[this.type].formatter](args);
  }

  argsFormatter(args) {
    const valueSeparator = this.#formatterConfig[this.type].valueSeparator;
    const devider = this.#formatterConfig[this.type].devider;

    const preFormattingFunction = (args, index) => {
      return /^--/.test(args[index])
        ? `${args[index].replace("--", "")}${valueSeparator}`
        : args[index];
    };

    const deviderCondition = (args, index) => {
      return index % 2 !== 0 && index !== args.length - 1;
    };

    return this.#generalFormatter(
      args,
      preFormattingFunction,
      deviderCondition,
      devider
    );
  }

  envFormatter(args) {
    const valueSeparator = this.#formatterConfig[this.type].valueSeparator;
    const devider = this.#formatterConfig[this.type].devider;

    const preFormattingFunction = (args, index) => {
      return `${args[index][0]}${valueSeparator}${args[index][1]}`;
    };

    const deviderCondition = (args, index) => {
      return index % 2 === 0 && index !== args.length - 1;
    };

    return this.#generalFormatter(
      args,
      preFormattingFunction,
      deviderCondition,
      devider
    );
  }

  #generalFormatter(args, preFormattingFunction, deviderCondition, devider) {
    let output = "";
    for (let i = 0; i < args.length; i++) {
      output += preFormattingFunction(args, i);

      if (deviderCondition(args, i)) {
        output += devider;
      }

      if (i === args.length - 1) {
        output += "\n";
      }
    }

    return output;
  }
}

export default Formatter;
