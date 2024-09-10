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

exports.getPages = async ({ query }) => {
  const { skip, limit } = query;

  const [res] = await PageView.aggregate([
    {
      $group: {
        _id: '$path',
        totalViews: { $sum: 1 },
        totalUniqueViews: { $sum: { $cond: ['$unique', 1, 0] } },
        totalBounce: { $sum: { $cond: ['$bounce', 1, 0] } },
        averageDuration: { $avg: { $cond: ['$duration', '$duration', 0] } },
        averageLoadTime: { $avg: { $cond: ['$loadTime', '$loadTime', 0] } },
        lastVisitAt: { $max: '$visitAt' },
      },
    },
    {
      $project: {
        path: '$_id',
        totalViews: 1,
        totalUniqueViews: 1,
        totalBounce: 1,
        averageDuration: 1,
        averageLoadTime: 1,
        lastVisitAt: 1,
      },
    },
    {
      $facet: {
        meta: [{ $count: 'total' }],
        data: [
          {
            $sort: {
              totalViews: -1,
            },
          },
          {
            $skip: skip,
          },
          {
            $limit: limit,
          },
        ],
      },
    },
  ]);

  return {
    meta: res.meta[0],
    data: res.data,
  };
};

exports.getSources = async () =>
  await PageView.aggregate([
    { $group: { _id: '$refferer', total: { $sum: 1 } } },
    { $project: { url: '$_id', total: 1 } },
    { $sort: { total: -1 } },
    { $limit: 5 },
  ]);

exports.getCountries = async () =>
  await PageView.aggregate([
    { $group: { _id: '$country', total: { $sum: 1 } } },
    { $project: { name: '$_id', total: 1 } },
    { $sort: { total: -1 } },
    { $limit: 5 },
  ]);

exports.getBrowsers = async () =>
  await PageView.aggregate([
    { $group: { _id: '$browser', total: { $sum: 1 } } },
    { $project: { name: '$_id', total: 1 } },
    { $sort: { total: -1 } },
    { $limit: 5 },
  ]);

exports.getPlatforms = async () =>
  await PageView.aggregate([
    { $group: { _id: '$platform', total: { $sum: 1 } } },
    { $project: { name: '$_id', total: 1 } },
    { $sort: { total: -1 } },
    { $limit: 5 },
  ]);
