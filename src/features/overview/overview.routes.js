const { Router } = require('express');
const { responseJson } = require('../../cores/response');
const { getOverview } = require('./overview.controller');

const router = Router();

router.get(
  '/api/v1/overview',
  responseJson(async () => await getOverview()),
);

exports.overviewRoutes = router;
