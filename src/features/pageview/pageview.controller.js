const { getGeoFromIp } = require('../../cores/ipgeo');
const bowser = require('bowser');
const { PageView } = require('./pageview.model');
const { findSessionAndUniqueStatus } = require('../session/session.service');
const { Page } = require('../page/page.model');

exports.storePageViewVisit = async ({ ip: requestIp, userAgent, body }) => {
  const ip = requestIp === '::1' ? process.env.LOCAL_IP : requestIp;
  const geo = await getGeoFromIp(requestIp);
  const parsedUserAgent = bowser.parse(userAgent);

  const sessionStatus = await findSessionAndUniqueStatus(body.sessionId);
  const page =
    (await Page.findOne({ url: body.page.url })) ||
    (await Page.create({ url: body.page.url }));

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
    session: sessionStatus.session._id,
    visitor: sessionStatus.session.visitor,
    unique: sessionStatus.unique,
    page: page._id,
  });
};

exports.storePageViewLeave = async ({ id, body }) => {
  const pageView = await PageView.findOneAndUpdate(
    { _id: id, leaveAt: null },
    { duration: body.duration, bounce: body.bounce, leaveAt: body.leaveAt },
  ).populate('session');

  if (!pageView) {
    return null;
  }

  pageView.session.lastLeaveAt = new Date();

  await pageView.session.save();

  pageView.depopulate('session');

  return pageView;
};
