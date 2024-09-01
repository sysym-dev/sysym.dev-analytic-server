const { ipinfo } = require('./ipinfo');

exports.getGeoFromIp = async (ip) => {
  if (ip === '::1') {
    return {
      city: process.env.LOCAL_CITY,
      region: process.env.LOCAL_REGION,
      country: process.env.LOCAL_COUNTRY,
    };
  }

  return await ipinfo.lookupIp(ip);
};
