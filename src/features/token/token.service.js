const crypto = require('crypto');
const { Token } = require('./token.model');

exports.createToken = async () => {
  return await Token.create({
    token: crypto.randomBytes(20).toString('hex'),
  });
};
