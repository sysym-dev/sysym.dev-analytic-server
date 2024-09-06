const { pageRoutes } = require('./features/page/page.routes');
const { pageviewRoutes } = require('./features/pageview/pageview.routes');

exports.routes = [pageviewRoutes, pageRoutes];
