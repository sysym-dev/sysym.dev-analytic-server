const mongoose = require('mongoose');

exports.connect = async () => {
  mongoose.set('debug', true);

  await mongoose.connect(process.env.DB_URL);
};
exports.runInTransaction = async (cb) => {
  const session = await mongoose.startSession();

  session.startTransaction();

  try {
    const res = await cb(session);

    await session.commitTransaction();

    return res;
  } catch (err) {
    await session.abortTransaction();

    throw err;
  } finally {
    session.endSession();
  }
};
