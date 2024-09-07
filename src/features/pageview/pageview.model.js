const mongoose = require('mongoose');

const pageViewSchema = new mongoose.Schema(
  {
    visitAt: Date,
    leaveAt: Date,
    duration: Number,
    bounce: Boolean,
    lang: String,
    loadTime: Number,
    title: String,
    url: String,
    path: String,
    refferer: String,
    screenWidth: Number,
    screenHeight: Number,
    ip: String,
    platform: String,
    device: String,
    browser: String,
    city: String,
    region: String,
    country: String,
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Session',
    },
    visitor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Visitor',
    },
    unique: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

exports.PageView = mongoose.model('PageView', pageViewSchema);
