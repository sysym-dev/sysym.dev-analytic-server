const { Visitor } = require('./visitor.model');
const { isValidObjectId } = require('mongoose');

exports.findVisitorAndUniqueStatus = async (visitorId) => {
  if (!visitorId || !isValidObjectId(visitorId)) {
    const visitor = await Visitor.create({
      firstVisitAt: new Date(),
      lastVisitAt: new Date(),
    });

    return {
      unique: true,
      visitor,
    };
  }

  const visitor = await Visitor.findOne({ _id: visitorId });

  if (!visitor) {
    const newVisitor = await Visitor.create({
      firstVisitAt: new Date(),
      lastVisitAt: new Date(),
    });

    return {
      unique: true,
      visitor: newVisitor,
    };
  }

  visitor.lastVisitAt = new Date();

  await visitor.save();

  return {
    unique: false,
    visitor,
  };
};
