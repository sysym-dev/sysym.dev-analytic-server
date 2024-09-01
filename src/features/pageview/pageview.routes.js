const { Router } = require('express');
const { storePageViewVisit } = require('./pageview.controller');
const { validate } = require('../../cores/validator');
const { storePageViewVisitBody } = require('./pageview.validator');

const router = Router();

router.post(
  '/api/v1/pageviews/visit',
  validate('body', storePageViewVisitBody),
  (req, res) => {
    return res.json(
      storePageViewVisit({
        ip: req.ip,
        userAgent: req.get('user-agent'),
        body: req.body,
      }),
    );
  },
);

exports.pageviewRoutes = router;
