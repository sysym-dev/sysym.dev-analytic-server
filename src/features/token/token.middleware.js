const { Token } = require('./token.model');

exports.requireTokenHeader = async (req, res, next) => {
  const tokenGiven = req.headers.authorization;

  if (!tokenGiven) {
    return res.status(401).json({ message: 'token required' });
  }

  const tokenExists = await Token.exists({ token: tokenGiven });

  if (!tokenExists) {
    return res.status(401).json({ message: 'token invalid' });
  }

  next();
};

exports.requireTokenBody = async (req, res, next) => {
  const tokenGiven = req.body.token;

  if (!tokenGiven) {
    return res.status(401).json({ message: 'token required' });
  }

  const tokenExists = await Token.exists({ token: tokenGiven });

  if (!tokenExists) {
    return res.status(401).json({ message: 'token invalid' });
  }

  next();
};
