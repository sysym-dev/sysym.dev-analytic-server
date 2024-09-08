const { overviewRoutes } = require('./features/overview/overview.routes');
const { pageviewRoutes } = require('./features/pageview/pageview.routes');

exports.routes = [pageviewRoutes, overviewRoutes];
