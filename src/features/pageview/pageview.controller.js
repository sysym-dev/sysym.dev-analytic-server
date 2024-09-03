const { getGeoFromIp } = require('../../cores/ipgeo');
const bowser = require('bowser');
const { PageView } = require('./pageview.model');
const { findVisitorAndUniqueStatus } = require('../visitor/visitor.service');

exports.storePageViewVisit = async ({ ip: requestIp, userAgent, body }) => {
  const ip = requestIp === '::1' ? process.env.LOCAL_IP : requestIp;
  const geo = await getGeoFromIp(requestIp);
  const parsedUserAgent = bowser.parse(userAgent);

  const visitor = await findVisitorAndUniqueStatus(body.visitor_id);

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
    visitor: visitor.visitor._id,
    unique: visitor.unique,
  });
};

exports.storePageViewLeave = async ({ id, body }) => {
  return await PageView.updateOne(
    { _id: id, leaveAt: null },
    { duration: body.duration, bounce: body.bounce, leaveAt: body.leaveAt },
  );
};
