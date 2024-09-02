const { getGeoFromIp } = require('../../cores/ipgeo');
const bowser = require('bowser');
const { PageView } = require('./pageview.model');

exports.storePageViewVisit = async ({ ip: requestIp, userAgent, body }) => {
  const ip = requestIp === '::1' ? process.env.LOCAL_IP : requestIp;
  const geo = await getGeoFromIp(requestIp);
  const parsedUserAgent = bowser.parse(userAgent);

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
  });
};

exports.storePageViewLeave = async ({ id, body }) => {
  return await PageView.updateOne(
    { _id: id, leaveAt: null },
    { duration: body.duration, bounce: body.bounce, leaveAt: body.leaveAt },
  );
};
