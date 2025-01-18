function validatorHandler(schema, property) {
  return (req, res, next) => {
    const data = req[property];

    const { error } = schema.validate(data, { abortEarly: false });

    if (error) {
      // console.log('error', error);
      const { details } = error;
      const message = details.map((i) => i.message).join(',');

      console.log('error', message);
    } else {
      next();
    }
  };
}

module.exports = validatorHandler;
