const { PageView } = require('./pageview.model');

exports.checkVisitorIsUnique = async (path, visitorId) =>
  (await PageView.exists({ path, visitor: visitorId })) === null;
