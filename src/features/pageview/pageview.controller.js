const { getGeoFromIp } = require('../../cores/ipgeo');
const bowser = require('bowser');
const { PageView } = require('./pageview.model');
const { findOrUpdateSession } = require('../session/session.service');
const { findOrCreateVisitor } = require('../visitor/visitor.service');
const { Session } = require('../session/session.model');
const { checkVisitorIsUnique } = require('./pageview.service');

exports.storePageViewVisit = async ({ ip: requestIp, userAgent, body }) => {
  const ip = requestIp === '::1' ? process.env.LOCAL_IP : requestIp;
  const geo = await getGeoFromIp(requestIp);
  const parsedUserAgent = bowser.parse(userAgent);

  const session = await findOrUpdateSession(body.sessionId);
  const visitor = await findOrCreateVisitor(body.visitorId);

  const unique =
    visitor._id.toString() !== body.visitorId ||
    (await checkVisitorIsUnique(body.page.url, visitor._id));

  return await PageView.create({
    browser: parsedUserAgent.browser.name,
    city: geo.city,
    country: geo.country,
    device: parsedUserAgent.os.name,
    ip,
    lang: body.lang,
    loadTime: body.loadTime,
    platform: parsedUserAgent.platform.type,
    refferer: body.page.refferer,
    region: geo.region,
    screenHeight: body.screen.height,
    screenWidth: body.screen.width,
    title: body.page.title,
    url: body.page.url,
    visitAt: body.visitAt,
    session: session._id,
    visitor: visitor._id,
    unique: unique,
  });
};

exports.storePageViewLeave = async ({ id, body }) => {
  const pageView = await PageView.findOneAndUpdate(
    { _id: id, leaveAt: null },
    { duration: body.duration, bounce: body.bounce, leaveAt: body.leaveAt },
  );

  if (pageView.session) {
    await Session.updateOne(
      {
        _id: pageView.session,
      },
      { lastLeaveAt: new Date() },
    );
  }

  return pageView;
};
