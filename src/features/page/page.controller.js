const { PageView } = require('../pageview/pageview.model');

exports.getPages = async () =>
  await PageView.aggregate([
    {
      $group: {
        _id: '$path',
        totalViews: { $sum: 1 },
        totalUniqueViews: { $sum: { $cond: ['$unique', 1, 0] } },
        averageDuration: { $avg: '$duration' },
        totalBounce: { $sum: { $cond: ['$bounce', 1, 0] } },
      },
    },
    {
      $project: {
        path: '$_id',
        totalViews: 1,
        totalUniqueViews: 1,
        averageDuration: 1,
        totalBounce: 1,
      },
    },
  ]);
