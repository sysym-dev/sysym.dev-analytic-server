const { isValidObjectId } = require('mongoose');
const { Session } = require('./session.model');
const dayjs = require('dayjs');

exports.findOrUpdateSession = async (sessionId) => {
  const now = new Date();
  const nextExpireAt = dayjs().add(30, 'minute').toISOString();

  if (!isValidObjectId(sessionId)) {
    return await Session.create({ startAt: now, expireAt: nextExpireAt });
  }

  return (
    (await Session.findOneAndUpdate(
      {
        _id: sessionId,
        expireAt: {
          $gt: now,
        },
      },
      {
        expireAt: nextExpireAt,
      },
    )) || (await Session.create({ startAt: now, expireAt: nextExpireAt }))
  );
};
