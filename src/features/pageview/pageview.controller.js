const { getGeoFromIp } = require('../../cores/ipgeo');
const uap = require('ua-parser-js');

exports.storePageViewVisit = async ({ ip: requestIp, userAgent, body }) => {
  const ip = requestIp === '::1' ? process.env.LOCAL_IP : requestIp;
  const geo = await getGeoFromIp(requestIp);

  return {
    ip,
    userAgent: uap(userAgent),
    geo: geo,
  };
};
