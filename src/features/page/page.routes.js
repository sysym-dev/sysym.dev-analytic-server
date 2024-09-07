const { Router } = require('express');
const { responseJson } = require('../../cores/response');
const { getPages } = require('./page.controller');

const router = Router();

router.get(
  '/api/v1/pages',
  responseJson(async () => await getPages()),
);

exports.pageRoutes = router;
