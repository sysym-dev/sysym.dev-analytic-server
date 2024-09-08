const { Router } = require('express');
const { responseJson } = require('../../cores/response');
const {
  getOverview,
  getPages,
  getSources,
  getCountries,
  getBrowsers,
} = require('./overview.controller');

const router = Router();

router.get(
  '/api/v1/overview',
  responseJson(async () => await getOverview()),
);
router.get(
  '/api/v1/overview/pages',
  responseJson(async () => await getPages()),
);
router.get(
  '/api/v1/overview/sources',
  responseJson(async () => await getSources()),
);
router.get(
  '/api/v1/overview/countries',
  responseJson(async () => await getCountries()),
);
router.get(
  '/api/v1/overview/browsers',
  responseJson(async () => await getBrowsers()),
);

exports.overviewRoutes = router;
