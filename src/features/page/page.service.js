const { Page } = require('./page.model');

exports.updatePageOverview = async (url, data, options) => {
  const page = await Page.findOne({ url });

  if (!page) {
    const [newPage] = await Page.create([{ url }], {
      session: options.session,
    });

    return newPage;
  }

  page.totalViews++;

  if (data.unique) {
    page.totalUniqueViews++;
  }

  await page.save({ session: options.session });

  return page;
};
