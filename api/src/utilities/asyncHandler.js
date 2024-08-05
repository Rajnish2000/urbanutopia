const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => {
      console.log("Here error comes.", err);
      next(err);
    });
  };
};

export { asyncHandler };
