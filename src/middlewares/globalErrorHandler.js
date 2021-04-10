const handleDuplicateKeyError = err => {
  const field = Object.keys(err.keyValue);
  return {
    status: 409,
    message: `An account with that ${field} already exists.`,
  };
};

//handle field formatting and empty fields
const handleValidationError = err => {
  const messagesErrors = Object.values(err.errors).map(el => el.message);
  if (messagesErrors.length > 1) {
    const formattedErrors = messagesErrors.join(' ');
    return { status: 422, message: formattedErrors };
  }
  return { status: 422, message: messagesErrors[0] };
};

export default function () {
  return (err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;

    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // Api request, response json format
    if (req.originalUrl.startsWith('/api/v1/')) {
      if (err.name === 'ValidationError') err = handleValidationError(err);
      if (err.code && err.code === 11000) err = handleDuplicateKeyError(err);
      res.status(err.status).json({
        status: 'fail',
        code: err.status,
        message: err.message,
      });
    } else {
      res.status(500).send('An unknown error occurred.');
    }
  };
}
