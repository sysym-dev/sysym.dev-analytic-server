const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema({
  url: {
    type: String,
    unique: true,
  },
  totalViews: {
    type: Number,
    default: 1,
  },
  totalUniqueViews: {
    type: Number,
    default: 1,
  },
});

exports.Page = mongoose.model('Page', pageSchema);
