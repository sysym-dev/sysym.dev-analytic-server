const { Page } = require('./page.model');

exports.getPages = async () => {
  return await Page.find();
};
