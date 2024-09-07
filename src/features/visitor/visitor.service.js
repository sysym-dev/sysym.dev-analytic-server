const { Visitor } = require('./visitor.model');

exports.findOrCreateVisitor = async (visitorId) => {
  return (await Visitor.findById(visitorId)) || (await Visitor.create({}));
};
