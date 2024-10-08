exports.validate = (path, schema) => async (req, res, next) => {
  const valdiation = await schema.safeParseAsync(req[path]);

  if (!valdiation.success) {
    return res.status(422).json(valdiation.error.issues);
  }

  req[path] = valdiation.data;

  next();
};
