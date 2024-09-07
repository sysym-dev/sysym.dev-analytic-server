const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    startAt: Date,
    expireAt: Date,
    lastLeaveAt: Date,
  },
  { timestamps: true },
);

exports.Session = mongoose.model('Session', sessionSchema);
