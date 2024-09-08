const { Router } = require('express');
const { responseJson } = require('../../cores/response');
const { getSources } = require('./source.controller');

const router = Router();

router.get(
  '/api/v1/sources',
  responseJson(async () => await getSources()),
);

exports.sourceRoutes = router;
