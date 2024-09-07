const { PageView } = require('../pageview/pageview.model');

exports.getPages = async () =>
  await PageView.aggregate([
    {
      $group: {
        _id: '$url',
        totalViews: { $sum: 1 },
        totalUniqueViews: { $sum: { $cond: ['$unique', 1, 0] } },
      },
    },
    { $project: { url: '$_id', totalViews: 1, totalUniqueViews: 1 } },
  ]);
