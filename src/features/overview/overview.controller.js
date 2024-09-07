const { PageView } = require('../pageview/pageview.model');
const { Session } = require('../session/session.model');
const { Visitor } = require('../visitor/visitor.model');

exports.getOverview = async () => {
  const [countPages] = await PageView.aggregate([
    { $group: { _id: '$path' } },
    { $count: 'total' },
  ]);
  return {
    totalPages: countPages ? countPages.total : 0,
    totalPageviews: await PageView.countDocuments(),
    totalUniqueVisitors: await Visitor.countDocuments(),
    totalSessions: await Session.countDocuments(),
  };
};
