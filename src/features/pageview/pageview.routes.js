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

const router = Router();

router.post(
  '/api/v1/pageviews/visit',
  validate('body', storePageViewVisitBody),
  async (req, res) => {
    return res.json(
      await storePageViewVisit({
        ip: req.ip,
        userAgent: req.get('user-agent'),
        body: req.body,
      }),
    );
  },
);
router.post(
  '/api/v1/pageviews/leave',
  validate('body', storePageViewLeaveBody),
  async (req, res) => {
    return res.json(
      await storePageViewLeave({ id: req.body.id, body: req.body }),
    );
  },
);

exports.pageviewRoutes = router;
