const { Visitor } = require('./visitor.model');

exports.findVisitorAndUniqueStatus = async (visitorId) => {
  if (!visitorId) {
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
