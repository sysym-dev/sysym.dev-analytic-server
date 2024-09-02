exports.responseJson = (handler) => async (req, res, next) => {
  try {
    return res.json(await handler(req, res));
  } catch (err) {
    return next(err);
  }
};
