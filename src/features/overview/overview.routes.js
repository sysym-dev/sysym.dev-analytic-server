const { Router } = require('express');
const { responseJson } = require('../../cores/response');
const {
  getOverview,
  getPages,
  getSources,
  getCountries,
  getBrowsers,
  getPlatforms,
} = require('./overview.controller');
const { validate } = require('../../cores/validator');
const { getPagesQuery } = require('./overview.validator');

const router = Router();

router.get(
  '/api/v1/overview',
  responseJson(async () => await getOverview()),
);
router.get(
  '/api/v1/overview/pages',
  validate('query', getPagesQuery),
  responseJson(async (req) => await getPages({ query: req.query })),
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
router.get(
  '/api/v1/overview/platforms',
  responseJson(async () => await getPlatforms()),
);

exports.overviewRoutes = router;
