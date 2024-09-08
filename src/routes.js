const { overviewRoutes } = require('./features/overview/overview.routes');
const { pageRoutes } = require('./features/page/page.routes');
const { pageviewRoutes } = require('./features/pageview/pageview.routes');
const { sourceRoutes } = require('./features/source/source.routes');

exports.routes = [pageviewRoutes, overviewRoutes, pageRoutes, sourceRoutes];
