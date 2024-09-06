const { Router } = require('express');
const { requireTokenHeader } = require('../token/token.middleware');
const { responseJson } = require('../../cores/response');
const { getPages } = require('./page.controller');

const router = Router();

router.get('/api/v1/pages', requireTokenHeader, responseJson(getPages));

exports.pageRoutes = router;
