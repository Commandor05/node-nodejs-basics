const fsOperationError = (
  error,
  condition,
  message = "Error: FS operation failed"
) => {
  if (condition) {
    process.stdout.write(`${message}\n`);
  } else {
    console.log(error);
  }
};

export const alreadyExistsError = (error) => {
  fsOperationError(error, error.code === "EEXIST");
};

export const notExistsError = (error) => {
  fsOperationError(error, error.code === "ENOENT");
};

export const alreadyExistsOrNotExistsError = (error) => {
  fsOperationError(error, error.code === "EEXIST" || error.code === "ENOENT");
};
