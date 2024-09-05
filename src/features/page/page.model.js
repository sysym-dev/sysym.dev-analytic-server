const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
  },
});

exports.Page = mongoose.model('Page', pageSchema);
