const { overviewRoutes } = require('./features/overview/overview.routes');
const { pageRoutes } = require('./features/page/page.routes');
const { pageviewRoutes } = require('./features/pageview/pageview.routes');

exports.routes = [pageviewRoutes, overviewRoutes, pageRoutes];
