const { default: IPinfoWrapper } = require('node-ipinfo');

exports.ipinfo = new IPinfoWrapper(process.env.IP_INFO_TOKEN);
