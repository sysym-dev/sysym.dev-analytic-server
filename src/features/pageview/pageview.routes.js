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

const router = Router();

router.post(
  '/api/v1/pageviews/visit',
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
  validate('body', storePageViewLeaveBody),
  responseJson(async (req) =>
    storePageViewLeave({ id: req.body.id, body: req.body }),
  ),
);

exports.pageviewRoutes = router;
