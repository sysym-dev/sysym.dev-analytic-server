const mongoose = require('mongoose');

exports.connect = async () => {
  mongoose.set('debug', true);

  await mongoose.connect(process.env.DB_URL);
};
exports.runInTransaction = async (cb) => {
  const session = await mongoose.startSession();

  return await session.withTransaction(async () => await cb(session));
};
