const { isValidObjectId } = require('mongoose');
const { Visitor } = require('../visitor/visitor.model');
const { Session } = require('./session.model');

exports.findSessionAndUniqueStatus = async (sessionId) => {
  if (!sessionId || !isValidObjectId(sessionId)) {
    return {
      session: await createSession(),
      unique: true,
    };
  }

  const session = await Session.findById(sessionId).populate('visitor');

  if (!session) {
    return {
      session: await createSession(),
      unique: true,
    };
  }

  if (session.expired) {
    session.depopulate('visitor');

    return {
      session: await Session.create({
        startAt: new Date(),
        lastVisitAt: new Date(),
        lastLeaveAt: null,
        unique: false,
        visitor: session.visitor,
      }),
      unique: false,
    };
  }

  session.lastVisitAt = new Date();
  session.visitor.lastVisitAt = new Date();

  await session.save();
  await session.visitor.save();

  session.depopulate('visitor');

  return {
    session,
    unique: false,
  };
};

async function createSession() {
  const visitor = await Visitor.create({
    firstVisitAt: new Date(),
    lastVisitAt: new Date(),
  });

  return await Session.create({
    startAt: new Date(),
    lastVisitAt: new Date(),
    lastLeaveAt: null,
    unique: true,
    visitor: visitor._id,
  });
}
