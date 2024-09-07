const { PageView } = require('../pageview/pageview.model');
const { Session } = require('../session/session.model');
const { Visitor } = require('../visitor/visitor.model');

exports.getOverview = async () => {
  const [countPages] = await PageView.aggregate([
    { $group: { _id: '$url' } },
    { $count: 'total' },
  ]);
  return {
    totalPages: countPages.total,
    totalPageviews: await PageView.countDocuments(),
    uniqueVisitors: await Visitor.countDocuments(),
    totalSessions: await Session.countDocuments(),
  };
};
