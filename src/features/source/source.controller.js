const { PageView } = require('../pageview/pageview.model');

exports.getSources = async () =>
  await PageView.aggregate([
    { $group: { _id: '$refferer', total: { $sum: 1 } } },
    { $project: { url: '$_id', total: 1 } },
    { $sort: { total: -1 } },
  ]);
