const { getGeoFromIp } = require('../../cores/ipgeo');
const bowser = require('bowser');

exports.storePageViewVisit = async ({ ip: requestIp, userAgent, body }) => {
  const ip = requestIp === '::1' ? process.env.LOCAL_IP : requestIp;
  const geo = await getGeoFromIp(requestIp);
  const parsedUserAgent = bowser.parse(userAgent);

  return {
    ip,
    platform: parsedUserAgent.platform.type,
    device: parsedUserAgent.os.name,
    browser: parsedUserAgent.browser.name,
    geo: geo,
  };
};
