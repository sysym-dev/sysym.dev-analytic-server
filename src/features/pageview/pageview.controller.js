const { getGeoFromIp } = require('../../cores/ipgeo');
const bowser = require('bowser');
const { PageView } = require('./pageview.model');
const { findSessionAndUniqueStatus } = require('../session/session.service');
const { updatePageOverview } = require('../page/page.service');
const { runInTransaction } = require('../../cores/db');

exports.storePageViewVisit = async ({ ip: requestIp, userAgent, body }) => {
  const ip = requestIp === '::1' ? process.env.LOCAL_IP : requestIp;
  const geo = await getGeoFromIp(requestIp);
  const parsedUserAgent = bowser.parse(userAgent);

  return await runInTransaction(async (session) => {
    const pageSessionStatus = await findSessionAndUniqueStatus(body.sessionId, {
      session,
    });
    const page = await updatePageOverview(
      body.page.url,
      { uniqe: pageSessionStatus.unique },
      { session },
    );

    const [pageView] = await PageView.create(
      [
        {
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
          session: pageSessionStatus.session._id,
          visitor: pageSessionStatus.session.visitor,
          unique: pageSessionStatus.unique,
          page: page._id,
        },
      ],
      { session },
    );

    return pageView;
  });
};

exports.storePageViewLeave = async ({ id, body }) => {
  return await runInTransaction(async (session) => {
    const pageView = await PageView.findOneAndUpdate(
      { _id: id, leaveAt: null },
      { duration: body.duration, bounce: body.bounce, leaveAt: body.leaveAt },
      { session },
    ).populate('session');

    if (!pageView) {
      return null;
    }

    pageView.session.lastLeaveAt = new Date();

    await pageView.session.save({ session });

    pageView.depopulate('session');

    return pageView;
  });
};
