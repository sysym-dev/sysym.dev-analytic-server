const { getGeoFromIp } = require('../../cores/ipgeo');

exports.storePageViewVisit = async ({ ip: requestIp, userAgent, body }) => {
  const ip = requestIp === '::1' ? process.env.LOCAL_IP : requestIp;
  const geo = await getGeoFromIp(requestIp);

  return {
    ip,
    geo: geo,
  };
};
