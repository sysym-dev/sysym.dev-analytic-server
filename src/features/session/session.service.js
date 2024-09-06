const { isValidObjectId } = require('mongoose');
const { Visitor } = require('../visitor/visitor.model');
const { Session } = require('./session.model');

exports.findSessionAndUniqueStatus = async (
  sessionId,
  { session: dbSession },
) => {
  if (!sessionId || !isValidObjectId(sessionId)) {
    return {
      session: await createSession({ session: dbSession }),
      unique: true,
    };
  }

  const session = await Session.findById(sessionId).populate('visitor');

  if (!session) {
    return {
      session: await createSession({ session: dbSession }),
      unique: true,
    };
  }

  if (session.expired) {
    session.depopulate('visitor');

    const [newSession] = await Session.create(
      [
        {
          startAt: new Date(),
          lastVisitAt: new Date(),
          lastLeaveAt: null,
          unique: false,
          visitor: session.visitor,
        },
      ],
      { session: dbSession },
    );

    return {
      session: newSession,
      unique: false,
    };
  }

  session.lastVisitAt = new Date();
  session.visitor.lastVisitAt = new Date();

  await session.save({ session: dbSession });
  await session.visitor.save({ session: dbSession });

  session.depopulate('visitor');

  return {
    session,
    unique: false,
  };
};

async function createSession({ session: dbSession }) {
  const [visitor] = await Visitor.create(
    [
      {
        firstVisitAt: new Date(),
        lastVisitAt: new Date(),
      },
    ],
    { session: dbSession },
  );

  const [session] = await Session.create(
    [
      {
        startAt: new Date(),
        lastVisitAt: new Date(),
        lastLeaveAt: null,
        unique: true,
        visitor: visitor._id,
      },
    ],
    { session: dbSession },
  );

  return session;
}
