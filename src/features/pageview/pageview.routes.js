const { Router } = require('express');
const {
  storePageViewVisit,
  storePageViewLeave,
} = require('./pageview.controller');
const { validate } = require('../../cores/validator');
const {
  storePageViewVisitBody,
  storePageViewLeaveBody,
} = require('./pageview.validator');
const { responseJson } = require('../../cores/response');
const multer = require('multer');
const {
  requireTokenHeader,
  requireTokenBody,
} = require('../token/token.middleware');

const router = Router();

router.post(
  '/api/v1/pageviews/visit',
  requireTokenHeader,
  validate('body', storePageViewVisitBody),
  responseJson(async (req) =>
    storePageViewVisit({
      ip: req.ip,
      userAgent: req.get('user-agent'),
      body: req.body,
    }),
  ),
);
router.post(
  '/api/v1/pageviews/leave',
  multer().none(),
  requireTokenBody,
  validate('body', storePageViewLeaveBody),
  responseJson(async (req) =>
    storePageViewLeave({ id: req.body.id, body: req.body }),
  ),
);

exports.pageviewRoutes = router;
