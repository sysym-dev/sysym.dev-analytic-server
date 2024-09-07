const { PageView } = require('./pageview.model');

exports.checkVisitorIsUnique = async (url, visitorId) =>
  (await PageView.exists({ url, visitor: visitorId })) === null;
