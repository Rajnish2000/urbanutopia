class ApiError extends Error {
  constructor(statusCode, message = "something went wrong", errors = []) {
    super();
    this.statusCode = statusCode;
    this.message = message;
    this.data = null;
    this.errors = errors;
    this.success = false;
  }
}

export { ApiError };
